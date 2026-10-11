/**
 * Populates the Sanity dataset with the site's starter content (text + images).
 *
 *   npm run seed
 *
 * Safe to re-run: existing singletons and non-empty collections are left untouched,
 * so it never overwrites edits made in the Studio.
 */
import { createReadStream, existsSync } from "node:fs";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { getCliClient } from "sanity/cli";
import { classColors, defaults } from "../lib/content/defaults";
import type { Img } from "../lib/content/types";

try {
  process.loadEnvFile(".env.local");
} catch {
  /* env may already be set */
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
if (!projectId || !dataset) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID / _DATASET missing from .env.local");

const client = getCliClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-10",
  useCdn: false,
});

const key = () => randomBytes(6).toString("hex");

// ---- images -----------------------------------------------------------------------------------

const uploaded = new Map<string, string>();

async function assetId(src: string) {
  const cached = uploaded.get(src);
  if (cached) return cached;
  const file = join(process.cwd(), "public", src);
  if (!existsSync(file)) throw new Error(`Image not found: ${file}`);
  const asset = await client.assets.upload("image", createReadStream(file), { filename: src.split("/").pop() });
  uploaded.set(src, asset._id);
  return asset._id;
}

/** "48% 40%" -> Sanity hotspot (centre point of the focus area, as fractions). */
function hotspot(position?: string | null) {
  const m = position?.match(/([\d.]+)%\s+([\d.]+)%/);
  if (!m) return undefined;
  const x = Number(m[1]) / 100;
  const y = Number(m[2]) / 100;
  return {
    _type: "sanity.imageHotspot",
    x,
    y,
    width: Math.min(0.4, 2 * Math.min(x, 1 - x)),
    height: Math.min(0.4, 2 * Math.min(y, 1 - y)),
  };
}

async function image(img: Img) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: await assetId(img.src) },
    alt: img.alt ?? "",
    hotspot: hotspot(img.position),
  };
}

// ---- generic converter: defaults -> Sanity document values --------------------------------------

const typeFor = (k: string): string | undefined => {
  if (k === "hero") return "hero";
  if (k === "mobileHero") return "mobileHero";
  if (k.endsWith("Section")) return "sectionHeading";
  if (k === "trialForm" || k === "callbackForm") return "formCard";
  if (k === "stats" || k === "achievement") return "stat";
  if (k === "hours") return "hoursRow";
  if (k === "nav") return "linkItem";
  if (k === "socials") return "socialLink";
  if (["highlights", "values", "why", "whyReach"].includes(k)) return "iconCard";
  return undefined;
};

const isImg = (v: unknown): v is Img => !!v && typeof v === "object" && "src" in v;

async function convert(k: string, v: unknown): Promise<unknown> {
  if (v == null) return undefined;
  if (isImg(v)) return image(v);
  if (Array.isArray(v)) {
    const items = await Promise.all(v.map((item) => convert(k, item)));
    return items.map((item) =>
      item && typeof item === "object" && !("_key" in item) ? { _key: key(), ...item } : item,
    );
  }
  if (typeof v === "object") {
    const out: Record<string, unknown> = {};
    const t = typeFor(k);
    if (t) out._type = t;
    for (const [ck, cv] of Object.entries(v)) {
      const c = await convert(ck, cv);
      if (c !== undefined) out[ck] = c;
    }
    return out;
  }
  return v;
}

async function fields(obj: object) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    const c = await convert(k, v);
    if (c !== undefined) out[k] = c;
  }
  return out;
}

// ---- seeding ----------------------------------------------------------------------------------

async function singleton(type: string, value: object) {
  const existing = await client.getDocument(type);
  const values = await fields(value);
  if (!existing) {
    await client.create({ _id: type, _type: type, ...values });
    console.log(`✓ ${type}: created`);
    return;
  }
  // Only add fields the document doesn't have yet (e.g. new schema fields); never overwrite edits.
  const missing = Object.fromEntries(Object.entries(values).filter(([k]) => existing[k] === undefined));
  if (Object.keys(missing).length) {
    await client.patch(type).setIfMissing(missing).commit();
    console.log(`✓ ${type}: added ${Object.keys(missing).join(", ")}`);
  } else {
    console.log(`• ${type}: up to date`);
  }
}

async function collection(type: string, docs: () => Promise<Record<string, unknown>[]>) {
  if ((await client.fetch<number>("count(*[_type == $type])", { type })) > 0) {
    console.log(`• ${type}: has documents, skipped`);
    return;
  }
  const list = await docs();
  const tx = client.transaction();
  list.forEach((d) => tx.create({ _type: type, ...d }));
  await tx.commit();
  console.log(`✓ ${type}: created ${list.length}`);
}

/** One-off clean-up when testimonials were replaced by alumni. Safe to re-run. */
async function migrate() {
  const tx = client.transaction();
  let changes = 0;

  const unset = async (id: string, paths: string[]) => {
    const doc = await client.getDocument(id);
    const present = paths.filter((p) => doc && (doc as Record<string, unknown>)[p.split(".")[0]] !== undefined);
    if (present.length) {
      tx.patch(id, (p) => p.unset(present));
      changes++;
    }
  };
  await unset("siteSettings", ["ratingScore", "ratingNote"]);
  await unset("homePage", ["testimonialsSection"]);
  await unset("contactPage", ["testimonialsSection"]);
  await unset("homePage", ["gallery"]);
  await unset("schedulePage", ["hero"]);

  // Menu: Testimonials -> Alumni
  const settings = await client.getDocument<{ nav?: { _key: string; label: string; href: string }[] }>("siteSettings");
  if (settings?.nav?.some((n) => n.href === "/testimonials")) {
    const nav = settings.nav.map((n) => (n.href === "/testimonials" ? { ...n, label: "Alumni", href: "/alumni" } : n));
    tx.patch("siteSettings", (p) => p.set({ nav }));
    changes++;
  }

  // The schedule banner on the home page gained an intro text + highlighted word
  const home = await client.getDocument<{ scheduleSection?: { text?: string } }>("homePage");
  if (home?.scheduleSection && !home.scheduleSection.text) {
    tx.patch("homePage", (p) =>
      p.set({
        "scheduleSection.title": "Find a class that fits your",
        "scheduleSection.accent": "schedule.",
        "scheduleSection.text": defaults.home.scheduleSection.text,
      }),
    );
    changes++;
  }

  // Contact details + social links moved from "Site settings" into their own document
  const CONTACT_FIELDS = ["phone", "phoneLink", "phoneNote", "email", "emailNote", "addressLines", "mapsUrl", "hours"];
  const si = await client.getDocument<Record<string, unknown>>("siteSettings");
  const ci = await client.getDocument("contactInfo");
  if (si && !ci && CONTACT_FIELDS.some((k) => si[k] !== undefined)) {
    const platformOf = (s: string) =>
      (["facebook", "instagram", "youtube", "tiktok", "linkedin", "whatsapp"].find((p) => s.toLowerCase().includes(p)) ??
        (/twitter|x\.com/i.test(s) ? "x" : "other"));
    const oldSocials = (si.socials as { _key?: string; label?: string; href?: string }[] | undefined) ?? [];
    const doc: Record<string, unknown> = { _id: "contactInfo", _type: "contactInfo" };
    for (const k of CONTACT_FIELDS) if (si[k] !== undefined) doc[k] = si[k];
    if (oldSocials.length) {
      doc.socials = oldSocials.map((o) => ({
        _type: "socialLink",
        _key: o._key ?? key(),
        platform: platformOf(`${o.label ?? ""} ${o.href ?? ""}`),
        url: o.href ?? "",
      }));
    }
    tx.createIfNotExists(doc as { _id: string; _type: string });
    tx.patch("siteSettings", (p) => p.unset([...CONTACT_FIELDS, "socials"]));
    changes++;
  }
  await unset("aboutPage", ["leadershipSection"]);

  // Instructors without a photo get the placeholder cut-out (replace it in the Studio)
  const bare = await client.fetch<string[]>(`*[_type == "instructor" && !defined(photo.asset)]._id`);
  if (bare.length) {
    const photo = await image({ src: "/images/instructor-sensei.webp", alt: "Placeholder instructor photo", position: "50% 100%" });
    bare.forEach((id) => tx.patch(id, (p) => p.set({ photo, cutout: true })));
    changes += bare.length;
  }

  // Menu: Schedule page -> Gallery page (the schedule is a popup now)
  const current = await client.getDocument<{ nav?: { _key: string; label: string; href: string }[] }>("siteSettings");
  if (current?.nav?.some((n) => n.href === "/schedule")) {
    const nav = current.nav.map((n) => (n.href === "/schedule" ? { ...n, label: "Gallery", href: "/gallery" } : n));
    tx.patch("siteSettings", (p) => p.set({ nav }));
    changes++;
  }

  // Remove the old testimonial documents and page
  const old = await client.fetch<string[]>(`*[_type == "testimonial" || _id == "testimonialsPage"]._id`);
  old.forEach((id) => tx.delete(id));
  changes += old.length;

  if (changes) {
    await tx.commit();
    console.log(`✓ migrated testimonials -> alumni (${changes} changes)`);
  }
}

async function main() {
  const d = defaults;
  await migrate();

  const CONTACT_KEYS = [
    "phone", "phoneLink", "phoneNote", "email", "emailNote", "addressLines", "mapsUrl", "hours", "socials",
    "callLabel", "emailLabel", "visitLabel", "hoursLabel", "directionsLabel",
    "footerLinksHeading", "footerContactHeading", "footerFollowHeading",
  ];
  const entries = Object.entries(d.settings);
  await singleton("siteSettings", Object.fromEntries(entries.filter(([k]) => !CONTACT_KEYS.includes(k))));
  await singleton("contactInfo", Object.fromEntries(entries.filter(([k]) => CONTACT_KEYS.includes(k))));
  await singleton("homePage", d.home);
  await singleton("aboutPage", d.about);
  await singleton("programsPage", d.programsPage);
  await singleton("instructorsPage", d.instructorsPage);
  await singleton("schedulePage", d.schedulePage);
  await singleton("galleryPage", d.galleryPage);
  await singleton("alumniPage", d.alumniPage);
  await singleton("contactPage", d.contact);

  await collection("program", async () =>
    Promise.all(
      d.programs.map(async (p, i) => ({
        ...(await fields({ ...p, slug: undefined })),
        slug: { _type: "slug", current: p.slug },
        order: (i + 1) * 10,
      })),
    ),
  );
  await collection("instructor", async () =>
    Promise.all(d.instructors.map(async (p, i) => ({ ...(await fields(p)), order: (i + 1) * 10 }))),
  );
  await collection("certification", async () =>
    Promise.all(d.certifications.map(async (p, i) => ({ ...(await fields(p)), order: (i + 1) * 10 }))),
  );
  await collection("faq", async () =>
    Promise.all(d.faqs.map(async (p, i) => ({ ...(await fields(p)), order: (i + 1) * 10 }))),
  );

  await collection("beltLevel", async () =>
    Promise.all(
      d.beltLevels.map(async (b, i) => ({
        title: b.title,
        slug: { _type: "slug", current: b.slug },
        color: b.color,
        description: b.description,
        order: (i + 1) * 10,
      })),
    ),
  );
  await collection("alumnus", async () => {
    const belts = await client.fetch<{ _id: string; title: string }[]>(`*[_type == "beltLevel"]{_id, title}`);
    return Promise.all(
      d.alumni.map(async ({ belt, ...a }, i) => {
        const ref = belts.find((b) => b.title === belt?.title)?._id;
        return {
          ...(await fields(a)),
          ...(ref ? { beltLevel: { _type: "reference", _ref: ref } } : {}),
          order: (i + 1) * 10,
        };
      }),
    );
  });

  await collection("classType", async () =>
    Object.entries(classColors).map(([title, color]) => ({ title, color })),
  );

  if (await client.getDocument("timetable")) {
    console.log("• timetable: exists, skipped");
  } else {
    const types = await client.fetch<{ _id: string; title: string }[]>(`*[_type == "classType"]{_id, title}`);
    const idOf = (title: string) => types.find((t) => t.title === title)?._id;
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    const rows = d.timetable.rows.map((r) => ({
      _type: "timetableRow",
      _key: key(),
      time: r.time,
      ...Object.fromEntries(
        days.map((day, i) => {
          const id = r.cells[i] && idOf(r.cells[i]!.title);
          return [day, id ? { _type: "reference", _ref: id } : undefined];
        }),
      ),
    }));
    await client.create({ _id: "timetable", _type: "timetable", rows });
    console.log("✓ timetable: created");
  }

  await collection("legalPage", async () =>
    Object.entries(d.legal).map(([slug, p]) => ({
      title: p.title,
      slug: { _type: "slug", current: slug },
      body: p.body,
    })),
  );

  console.log("\nDone. Open /studio to edit content.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
