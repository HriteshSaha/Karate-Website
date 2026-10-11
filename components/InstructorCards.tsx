import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Instructor } from "@/lib/content/types";
import { Reveal } from "./motion";
import { SiteImage } from "./SiteImage";

const firstName = (name: string) => name.replace(/^Sensei\s+/i, "").split(" ")[0];

/** Placeholder used until an instructor has their own photo. */
const PLACEHOLDER = { src: "/images/instructor-sensei.webp", alt: "", position: "50% 100%" };

function photoOf(i: Instructor) {
  const has = !!i.photo?.src;
  return { photo: has ? i.photo! : PLACEHOLDER, cutout: has ? i.cutout !== false : true };
}

/** The figure: a cut-out photo that steps out of the card (regular photos fade into it). */
function Figure({ i }: { i: Instructor }) {
  const { photo, cutout } = photoOf(i);
  return (
    <div className="relative h-full w-full">
      <SiteImage
        img={{ ...photo, alt: photo.alt || i.name }}
        sizes="(min-width:1024px) 40vw, (min-width:768px) 50vw, 90vw"
        className={`origin-bottom transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
          cutout
            ? "object-contain object-bottom md:object-right-bottom"
            : "object-cover [mask-image:linear-gradient(to_top,transparent,black_35%),linear-gradient(to_left,black_65%,transparent)] [mask-composite:intersect]"
        }`}
      />
    </div>
  );
}

export function InstructorCard({ i, mark }: { i: Instructor; mark: string }) {
  return (
    <article className="card-hover spot spot-dark group relative h-full pt-24 md:pt-40">
      {/* Glass panel with glowing red edge; clips the aura so the figure can still break out */}
      <div className="absolute inset-x-0 bottom-0 top-24 overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800/80 via-zinc-950 to-black shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7)] ring-1 ring-red-500/40 transition-all duration-500 group-hover:shadow-[0_20px_60px_-16px_rgb(225_29_46/0.55)] group-hover:ring-red-500/80 md:top-40">
        <span aria-hidden="true" className="blob blob-a -right-10 -top-10 size-72 bg-brand/35" />
        <span aria-hidden="true" className="blob blob-b -bottom-16 right-1/4 size-60 bg-orange-600/20" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-10 select-none text-[16rem] font-black leading-none text-white/[0.03]"
        >
          {mark}
        </span>
      </div>

      <div className="relative flex flex-col md:min-h-[22rem] md:flex-row">
        {/* Figure: on top for phones, on the right from tablet up — taller than the card so it rises above it */}
        <div className="order-first -mt-24 h-80 w-full md:absolute md:bottom-0 md:right-0 md:order-none md:mt-0 md:h-[31rem] md:w-[50%]">
          <Figure i={i} />
        </div>

        <div className="relative p-6 pt-2 sm:p-8 md:flex md:w-[50%] md:flex-col md:justify-center md:pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">{i.role}</p>
          <span className="mt-2 block h-0.5 w-8 bg-brand transition-all duration-500 group-hover:w-16" aria-hidden="true" />
          <h3 className="mt-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-bold leading-[1.1] text-transparent sm:text-4xl">
            {i.name}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-zinc-400">
            <li className="text-red-400">{i.rank}</li>
            <li>{i.experience}</li>
          </ul>
          <p className="mt-1 text-xs text-zinc-500">Specializes in {i.focus}</p>
          {i.bio && <p className="mt-4 text-sm leading-6 text-zinc-300">{i.bio}</p>}
          <div>
            <Link
              href="/contact#trial"
              className="relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-red-500 to-red-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgb(225_29_46/0.55)] ring-1 ring-red-400/60 transition-all duration-200 hover:shadow-[0_0_34px_rgb(225_29_46/0.85)] active:scale-95 before:absolute before:-left-1/3 before:top-0 before:h-full before:w-1/4 before:-skew-x-[20deg] before:bg-white/30 before:opacity-0 hover:before:animate-[shine_0.9s_ease] hover:before:opacity-100"
            >
              Train with {firstName(i.name)}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Full instructor cards, one per row (Instructors page). */
export function InstructorCards({ instructors, mark }: { instructors: Instructor[]; mark: string }) {
  return (
    <div className="grid gap-y-6 md:gap-y-4">
      {instructors.map((i) => (
        <InstructorCard key={i._id ?? i.name} i={i} mark={mark} />
      ))}
    </div>
  );
}

/** Compact portrait tiles linking to the Instructors page (home page). */
export function InstructorStrip({ instructors }: { instructors: Instructor[] }) {
  return (
    <Reveal as="ul" stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {instructors.map((i) => {
        const { photo, cutout } = photoOf(i);
        return (
          <li key={i._id ?? i.name}>
            <Link
              href="/instructors"
              className="card-hover spot spot-dark group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-800 to-black ring-1 ring-white/10 hover:ring-brand/60"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgb(225_29_46/0.4),transparent_62%)] transition-opacity duration-500 group-hover:opacity-100"
              />
              <SiteImage
                img={{ ...photo, alt: photo.alt || i.name }}
                sizes="(min-width:1024px) 22vw, 45vw"
                className={`transition-transform duration-700 ease-out group-hover:scale-110 ${
                  cutout ? "origin-bottom scale-[1.18] object-contain object-bottom" : "object-cover"
                }`}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-12 sm:p-4 sm:pt-14">
                <span className="block text-sm font-bold leading-tight text-white sm:text-base">{i.name}</span>
                <span className="mt-0.5 block text-xs font-medium text-red-400">{i.role}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </Reveal>
  );
}
