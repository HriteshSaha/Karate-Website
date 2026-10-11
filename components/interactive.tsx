"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ------------------------------------------------------------------ */
/* Collapsible weekly schedule (phones)                               */
/* ------------------------------------------------------------------ */

export type ScheduleDay = {
  day: string;
  slots: { time: string; title: string; className: string }[];
};

/** One day open at a time; today's day opens automatically. */
export function ScheduleDays({ days }: { days: ScheduleDay[] }) {
  // Server renders null (Monday opens); the browser knows today's weekday.
  const weekday = useSyncExternalStore(
    () => () => {},
    () => new Date().toLocaleDateString("en-US", { weekday: "long" }),
    () => null,
  );
  const todayIndex = days.findIndex((d) => d.day === weekday);
  const today = todayIndex >= 0 ? weekday : null;
  const [choice, setChoice] = useState<number | null | undefined>(undefined);
  const open = choice !== undefined ? choice : todayIndex >= 0 ? todayIndex : 0;
  const setOpen = setChoice;

  return (
    <div className="space-y-2.5">
      {days.map((d, i) => {
        const isOpen = open === i;
        const id = `schedule-day-${i}`;
        return (
          <section key={d.day} className="overflow-hidden rounded-xl bg-white ring-1 ring-black/10">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-14 w-full items-center gap-3 px-4 text-left transition-colors active:bg-zinc-50"
              >
                <span className="text-sm font-bold uppercase tracking-wide text-ink">{d.day}</span>
                {d.day === today && (
                  <span className="rounded-full bg-brand px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                    Today
                  </span>
                )}
                <span className="ml-auto text-xs text-zinc-500">
                  {d.slots.length} {d.slots.length === 1 ? "class" : "classes"}
                </span>
                <ChevronDown
                  className={`size-5 shrink-0 text-brand transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={id}
              role="region"
              aria-label={d.day}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="divide-y divide-black/5 border-t border-black/5">
                  {d.slots.map((s) => (
                    <li key={s.time} className="flex items-center justify-between gap-3 px-4 py-3">
                      <span className="text-sm font-semibold text-ink">{s.time}</span>
                      <span className={`rounded px-2.5 py-1 text-xs font-semibold ${s.className}`}>{s.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Alumni: sticky belt navigator with scroll-spy                      */
/* ------------------------------------------------------------------ */

export function BeltNav({ belts }: { belts: { slug: string; title: string; barClass: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = belts.map((b) => document.getElementById(b.slug)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-130px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [belts]);

  // keep the active chip visible in the horizontal row
  useEffect(() => {
    const chip = rowRef.current?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    const row = rowRef.current;
    if (!chip || !row) return;
    row.scrollTo({ left: chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Jump to belt level"
      className="sticky top-16 z-30 border-b border-black/10 bg-white/90 backdrop-blur-md"
    >
      <div ref={rowRef} className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8">
        {belts.map((b) => (
          <a
            key={b.slug}
            href={`#${b.slug}`}
            data-slug={b.slug}
            aria-current={active === b.slug ? "true" : undefined}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              active === b.slug
                ? "border-brand bg-brand text-white shadow-md shadow-brand/30"
                : "border-zinc-300 text-ink hover:border-brand hover:text-brand"
            }`}
          >
            <span className={`h-2.5 w-5 rounded-full ${b.barClass}`} aria-hidden="true" />
            {b.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
