import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Alumnus, BeltColor, Heading } from "@/lib/content/types";
import { SiteImage } from "./SiteImage";
import { Slider } from "./Slider";
import { ButtonLink, Container } from "./ui";

// Full class names so Tailwind can see them.
export const beltBar: Record<BeltColor, string> = {
  white: "bg-white ring-1 ring-inset ring-zinc-300",
  yellow: "bg-yellow-400",
  orange: "bg-orange-500",
  green: "bg-green-600",
  blue: "bg-blue-600",
  purple: "bg-purple-600",
  brown: "bg-amber-900",
  black: "bg-black ring-1 ring-inset ring-zinc-600",
};

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <div
      className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-zinc-800 via-zinc-900 to-red-950"
      role="img"
      aria-label={name}
    >
      <span className="display text-5xl text-white/80">{initials}</span>
    </div>
  );
}

export function AlumniCard({ a }: { a: Alumnus }) {
  return (
    <article className="card-hover spot group flex h-full flex-col overflow-hidden rounded-xl bg-white text-ink shadow-sm ring-1 ring-black/5 hover:ring-brand/40">
      <div className={`h-2 ${beltBar[a.belt?.color ?? "white"]}`} aria-hidden="true" />
      {a.photo?.src ? (
        <div className="relative aspect-[4/3] bg-zinc-900">
          <SiteImage
            img={{ ...a.photo, alt: a.photo.alt || a.name }}
            sizes="(min-width:1280px) 22vw, (min-width:640px) 45vw, 80vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <Initials name={a.name} />
      )}
      <div className="flex flex-1 flex-col p-4">
        {a.belt && (
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <span className={`h-2 w-6 rounded-full ${beltBar[a.belt.color]}`} aria-hidden="true" />
            {a.belt.title}
          </p>
        )}
        <h3 className="font-bold">{a.name}</h3>
        {a.classOf && <p className="text-sm font-medium text-brand">{a.classOf}</p>}
        {a.headline && <p className="text-xs text-zinc-500">{a.headline}</p>}
        {a.story && <p className="mt-3 text-sm leading-6 text-zinc-600">“{a.story}”</p>}
      </div>
    </article>
  );
}

/** Dark teaser section: a slider of featured alumni with a "view more" button to /alumni. */
export function AlumniPreview({
  heading,
  alumni,
  buttonLabel,
}: {
  heading: Heading;
  alumni: Alumnus[];
  buttonLabel: string;
}) {
  const featured = alumni.filter((a) => a.featured);
  const list = (featured.length ? featured : alumni).slice(0, 10);

  return (
    <section className="bg-black py-10 sm:py-14">
      <Container reveal className="grid items-center gap-8 lg:grid-cols-[280px_1fr]">
        <div>
          {heading.eyebrow && <p className="eyebrow">{heading.eyebrow}</p>}
          <h2 className="display mt-2 text-4xl text-white">
            {heading.title}
            {heading.accent && <span className="text-brand"> {heading.accent}</span>}
          </h2>
          {heading.text && <p className="mt-3 text-sm leading-6 text-zinc-300">{heading.text}</p>}
          <div className="mt-6">
            <ButtonLink href="/alumni">{buttonLabel}</ButtonLink>
          </div>
        </div>
        <Slider label="Featured alumni" items={list.map((a) => <AlumniCard key={a._id ?? a.name} a={a} />)} />
      </Container>
    </section>
  );
}

export function ViewMoreLink({ label }: { label: string }) {
  return (
    <Link href="/alumni" className="mt-4 inline-flex items-center gap-1 py-2.5 text-sm font-semibold text-brand">
      {label} <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}
