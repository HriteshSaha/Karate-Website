import { Check } from "lucide-react";
import type { FormCard as FormCardData } from "@/lib/content/types";
import { Reveal } from "./motion";

/** Decorative card around a form: dark "hero" style or clean light style. */
export function FormCard({
  id,
  card,
  tone,
  mark,
  children,
}: {
  id: string;
  card: FormCardData;
  tone: "dark" | "light";
  /** Large faded character in the corner (the logo mark). */
  mark: string;
  children: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      id={id}
      className={`relative min-w-0 scroll-mt-24 overflow-hidden rounded-3xl p-5 sm:p-8 ${
        dark
          ? "bg-flow-dark shadow-2xl shadow-black/30 ring-1 ring-white/10"
          : "bg-flow-light shadow-xl shadow-black/5 ring-1 ring-black/5"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-orange-500 to-brand"
      />
      {/* Slowly drifting colour blobs */}
      <span aria-hidden="true" className={`blob blob-a -left-16 -top-16 size-72 ${dark ? "bg-brand/30" : "bg-brand/15"}`} />
      <span aria-hidden="true" className={`blob blob-b -bottom-24 -right-10 size-80 ${dark ? "bg-orange-500/20" : "bg-orange-400/20"}`} />
      <span aria-hidden="true" className={`blob blob-c left-1/3 top-1/2 size-56 ${dark ? "bg-red-700/25" : "bg-amber-300/25"}`} />
      <span
        aria-hidden="true"
        className={`float-y pointer-events-none absolute -right-6 -top-10 select-none text-[13rem] font-black leading-none ${
          dark ? "text-white/[0.05]" : "text-black/[0.04]"
        }`}
      >
        {mark}
      </span>

      <div className="relative">
        {card.eyebrow && <p className="eyebrow">{card.eyebrow}</p>}
        <h2 className={`display mt-1 text-[1.9rem] sm:text-4xl ${dark ? "text-white" : "text-ink"}`}>
          {card.title} {card.accent && <span className="text-brand">{card.accent}</span>}
        </h2>
        {card.text && (
          <p className={`mb-7 mt-3 text-sm leading-6 ${dark ? "text-zinc-300" : "text-zinc-600"}`}>{card.text}</p>
        )}

        {children}

        {card.perks && card.perks.length > 0 && (
          <ul className="mt-7 flex flex-wrap gap-2 border-t pt-5 text-xs font-medium" style={{ borderColor: dark ? "rgb(255 255 255 / 0.1)" : "rgb(0 0 0 / 0.08)" }}>
            {card.perks.map((p) => (
              <li
                key={p}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${
                  dark ? "bg-white/[0.07] text-zinc-200" : "bg-zinc-100 text-zinc-700"
                }`}
              >
                <Check className="size-3.5 text-brand" aria-hidden="true" /> {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}
