import { cacheLife, cacheTag } from "next/cache";
import { cookies, draftMode } from "next/headers";
import { resolvePerspectiveFromCookies } from "next-sanity/live";
import { client } from "@/sanity/lib/client";
import { previewClient } from "@/sanity/lib/preview";
import { defaults } from "./defaults";
import { CONTENT_QUERY } from "./query";
import type { Content } from "./types";

type Raw = Record<string, unknown> | null | undefined;

const isEmpty = (v: unknown) => v == null || (Array.isArray(v) && v.length === 0);

/** Use the Studio document, filling any field it lacks from the built-in default. */
function fill<T extends object>(fetched: Raw, fallback: T): T {
  if (!fetched) return fallback;
  const out = { ...fallback } as Record<string, unknown>;
  for (const [k, v] of Object.entries(fetched)) {
    if (k.startsWith("_") || isEmpty(v)) continue;
    out[k] = v;
  }
  return out as T;
}

const list = <T>(fetched: T[] | null | undefined, fallback: T[]) =>
  fetched && fetched.length ? fetched : fallback;

type RawContent = {
  [K in keyof Content]?: unknown;
};

function normalize(raw: RawContent): Content {
  const timetableRaw = raw.timetable as { rows?: Content["timetable"]["rows"] } | null;
  const legal = { ...defaults.legal };
  for (const l of (raw.legal as { slug: string; title: string; body: string }[] | null) ?? []) {
    legal[l.slug] = { title: l.title, body: l.body };
  }

  return {
    settings: fill(raw.settings as Raw, defaults.settings),
    home: fill(raw.home as Raw, defaults.home),
    about: fill(raw.about as Raw, defaults.about),
    programsPage: fill(raw.programsPage as Raw, defaults.programsPage),
    instructorsPage: fill(raw.instructorsPage as Raw, defaults.instructorsPage),
    schedulePage: fill(raw.schedulePage as Raw, defaults.schedulePage),
    galleryPage: fill(raw.galleryPage as Raw, defaults.galleryPage),
    alumniPage: fill(raw.alumniPage as Raw, defaults.alumniPage),
    contact: fill(raw.contact as Raw, defaults.contact),
    programs: list(raw.programs as Content["programs"], defaults.programs),
    instructors: list(raw.instructors as Content["instructors"], defaults.instructors),
    beltLevels: list(raw.beltLevels as Content["beltLevels"], defaults.beltLevels),
    alumni: list(raw.alumni as Content["alumni"], defaults.alumni),
    certifications: list(raw.certifications as Content["certifications"], defaults.certifications),
    faqs: list(raw.faqs as Content["faqs"], defaults.faqs),
    timetable: timetableRaw?.rows?.length ? { rows: timetableRaw.rows } : defaults.timetable,
    legal,
  };
}

/**
 * Published content from Sanity, cached for a minute and invalidated instantly by the
 * `/api/revalidate` webhook. Falls back to built-in content if Sanity is empty or unreachable.
 * Use this for anything that must be clean text (metadata, emails, sitemap).
 */
export async function getPublishedContent(): Promise<Content> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 3600 });
  cacheTag("sanity");

  try {
    const raw = await client.fetch(CONTENT_QUERY);
    return normalize(raw as RawContent);
  } catch (error) {
    console.error("[content] Sanity fetch failed, using built-in content", error);
    return defaults;
  }
}

/**
 * Content for rendering pages. Normal visitors get the cached published content; in Draft Mode
 * (the Studio's live preview) it returns uncached drafts, tagged for click-to-edit.
 */
export async function getContent(): Promise<Content> {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return getPublishedContent();

  try {
    const perspective = (await resolvePerspectiveFromCookies({ cookies: await cookies() })) ?? "drafts";
    const raw = await previewClient.withConfig({ perspective }).fetch(CONTENT_QUERY);
    return normalize(raw as RawContent);
  } catch (error) {
    console.error("[content] Draft fetch failed, using published content", error);
    return getPublishedContent();
  }
}

/** E.g. "+19511234567" -> "tel:+19511234567" */
export const telHref = (phoneLink: string) => `tel:${phoneLink}`;

/** Splits a multi-paragraph text field on blank lines. */
export const paragraphs = (text: string) => text.split(/\n\s*\n/).filter(Boolean);
