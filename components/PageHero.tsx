import type { ReactNode } from "react";
import type { Hero } from "@/lib/content/types";
import { SiteImage } from "./SiteImage";
import { ButtonLink, Container } from "./ui";

/**
 * The banner used at the top of every page, so they all share one size.
 * `actions` sit next to the main button; `children` go underneath.
 */
export function PageHero({
  hero,
  actions,
  children,
  showCta = true,
  overlap = false,
  className = "",
}: {
  hero: Hero;
  actions?: ReactNode;
  children?: ReactNode;
  showCta?: boolean;
  /** Leave room for a card row that overlaps the bottom of the banner. */
  overlap?: boolean;
  className?: string;
}) {
  const hasButtons = (showCta && hero.ctaLabel) || actions;

  return (
    <section className={`relative isolate overflow-hidden bg-black ${className}`}>
      <div className="kenburns absolute inset-0 -z-10">
        <SiteImage img={hero.image} loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/75 to-transparent max-md:from-black/90 max-md:via-black/75 max-md:to-black/40" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      <Container className={`flex min-h-[420px] flex-col justify-center py-10 md:min-h-[380px] ${overlap ? "md:pb-24" : ""}`}>
        <div className="hero-in max-w-2xl">
          {hero.eyebrow && <p className="eyebrow">{hero.eyebrow}</p>}
          <h1 className="display mt-2 whitespace-pre-line text-4xl text-white sm:text-5xl">
            {hero.title}
            {hero.accent && <span className="block text-brand">{hero.accent}</span>}
          </h1>
          {hero.text && <p className="mt-3 max-w-lg text-[0.95rem] leading-6 text-zinc-100 sm:text-lg sm:leading-7">{hero.text}</p>}
          {hasButtons && (
            <div className="mt-6 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:flex-wrap [&>a]:w-full sm:[&>a]:w-auto">
              {showCta && hero.ctaLabel && <ButtonLink href="/contact#trial">{hero.ctaLabel}</ButtonLink>}
              {actions}
            </div>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
