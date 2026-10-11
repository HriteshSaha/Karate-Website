import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { MobileHero as MobileHeroData } from "@/lib/content/types";
import { SiteImage } from "./SiteImage";

const brush = "font-[family-name:var(--font-brush)]";

/** Full-screen banner for phones (hidden from tablet up, where the regular banner is used). */
export function MobileHero({ m }: { m: MobileHeroData }) {
  const top = m.layout !== "textBottom";
  const tagline = (m.text ?? "").split("|").map((t) => t.trim()).filter(Boolean);

  return (
    <section className="relative isolate overflow-hidden bg-black md:hidden">
      <div className="relative flex h-[calc(100svh-4.5rem)] max-h-[52rem] min-h-[35rem] flex-col">
        {/* photo */}
        <div className={`absolute inset-x-0 ${top ? "bottom-0 h-[66%]" : "top-0 h-[72%]"}`}>
          <SiteImage img={m.image} loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
        </div>
        {/* fades into black where the text sits */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 ${
            top
              ? "top-0 h-[78%] bg-[linear-gradient(to_bottom,#000_0%,#000_44%,rgb(0_0_0/0.82)_60%,rgb(0_0_0/0.35)_82%,transparent_100%)]"
              : "bottom-0 h-[76%] bg-[linear-gradient(to_top,#000_0%,#000_36%,rgb(0_0_0/0.85)_52%,rgb(0_0_0/0.35)_80%,transparent_100%)]"
          }`}
        />
        <span
          aria-hidden="true"
          className={`blob blob-a size-56 bg-brand/30 ${top ? "-right-16 top-1/3" : "-left-16 bottom-10"}`}
        />

        {m.kanji && (
          <span
            aria-hidden="true"
            className="absolute right-5 top-6 select-none text-3xl font-medium text-zinc-400/60 [writing-mode:vertical-rl]"
          >
            {m.kanji}
          </span>
        )}

        {top ? (
          <div className="hero-in relative z-10 px-5 pt-7">
            <h1>
              <span className="block bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-[clamp(2.1rem,10.4vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-transparent">
                {m.title}
              </span>
              {m.accent && (
                <span
                  className={`${brush} -mt-1 block -rotate-1 text-[clamp(2.7rem,13.6vw,3.9rem)] leading-[1.05] text-brand [filter:drop-shadow(0_0_16px_rgb(225_29_46/0.55))]`}
                >
                  {m.accent}
                </span>
              )}
            </h1>
            {m.text && <p className="mt-4 max-w-[21rem] text-[0.95rem] leading-6 text-zinc-200">{m.text}</p>}
            <div className="mt-6 flex flex-col items-start gap-3">
              {m.primaryLabel && (
                <Link
                  href={m.primaryHref || "/contact#trial"}
                  className="inline-flex min-h-12 items-center gap-3 rounded-full bg-gradient-to-b from-red-500 to-red-700 px-6 text-[0.78rem] font-semibold uppercase tracking-[0.06em] min-[360px]:px-7 min-[360px]:tracking-[0.14em] text-white shadow-[0_0_28px_rgb(225_29_46/0.65)] ring-1 ring-red-400/50 active:scale-95"
                >
                  {m.primaryLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
              {m.secondaryLabel && (
                <Link
                  href={m.secondaryHref || "/contact#trial"}
                  className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/40 bg-black/40 px-6 text-[0.78rem] font-medium uppercase tracking-[0.06em] min-[360px]:px-7 min-[360px]:tracking-[0.14em] text-white backdrop-blur-sm active:scale-95"
                >
                  {m.secondaryLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="hero-in relative z-10 mt-auto px-5 pb-8 text-center">
            {m.eyebrow && <p className="text-sm font-medium italic uppercase tracking-[0.4em] text-white">{m.eyebrow}</p>}
            <h1 className={`${brush} uppercase`}>
              {m.accent && (
                <span className="block text-[clamp(3rem,16vw,4.6rem)] leading-[1] text-brand [filter:drop-shadow(0_0_16px_rgb(225_29_46/0.5))]">
                  {m.accent}
                </span>
              )}
              <span className="-mt-1 block text-[clamp(3rem,16vw,4.6rem)] leading-[1] text-white">{m.title}</span>
            </h1>
            {tagline.length > 0 && (
              <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-zinc-200">
                {tagline.map((t, i) => (
                  <li key={t} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-brand" />}
                    {t}
                  </li>
                ))}
              </ul>
            )}
            {m.primaryLabel && (
              <Link
                href={m.primaryHref || "/contact#trial"}
                className="mx-auto mt-6 flex min-h-14 w-full max-w-[20rem] items-center justify-center gap-3 bg-brand text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_30px_rgb(225_29_46/0.55)] [clip-path:polygon(1%_12%,99%_0,100%_88%,0_100%)] active:scale-95"
              >
                {m.primaryLabel}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            )}
            {m.secondaryLabel && (
              <Link href={m.secondaryHref || "/contact#trial"} className="mt-2 inline-block py-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300">
                {m.secondaryLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
