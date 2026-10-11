"use client";

import { Award, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Certification } from "@/lib/content/types";
import { SiteImage } from "./SiteImage";

/** Compact credential cards; tap one to open its details. */
export function Certifications({ items }: { items: Certification[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((c, i) => {
        const isOpen = open === i;
        const id = `cert-${i}`;
        return (
          <li key={c._id ?? c.title}>
            <div
              className={`overflow-hidden rounded-2xl bg-white ring-1 transition-all duration-300 ${
                isOpen ? "shadow-lg shadow-brand/15 ring-brand/60" : "shadow-sm ring-black/10 hover:-translate-y-1 hover:ring-brand/40"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start gap-3 p-4 text-left"
              >
                <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand/10 text-brand">
                  {c.badge?.src ? (
                    <SiteImage img={{ ...c.badge, alt: c.badge.alt || c.title }} sizes="44px" className="object-contain p-1" />
                  ) : (
                    <Award className="size-5" aria-hidden="true" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold leading-snug text-ink">{c.title}</span>
                  {(c.issuer || c.year) && (
                    <span className="mt-0.5 block text-xs text-zinc-500">{[c.issuer, c.year].filter(Boolean).join(" · ")}</span>
                  )}
                </span>
                {c.details && (
                  <ChevronDown
                    className={`mt-1 size-4 shrink-0 text-brand transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                )}
              </button>
              {c.details && (
                <div
                  id={id}
                  role="region"
                  aria-label={c.title}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-black/5 px-4 pb-4 pt-3 text-sm leading-6 text-zinc-600">{c.details}</p>
                  </div>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
