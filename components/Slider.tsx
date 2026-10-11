"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";

/** Horizontal scroll-snap slider with arrow buttons. Items are rendered by the caller. */
export function Slider({
  items,
  label,
  tone = "dark",
  compact = false,
}: {
  items: ReactNode[];
  label: string;
  /** "dark" = placed on a dark background, "light" = on a light one. */
  tone?: "dark" | "light";
  /** One card at a time (narrow containers). */
  compact?: boolean;
}) {
  const ref = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  const btn =
    tone === "dark"
      ? "border-white/30 text-white hover:bg-white/10"
      : "border-zinc-300 text-ink hover:bg-zinc-100";

  return (
    <div className="relative min-w-0">
      <ul
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
        aria-label={label}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className={`shrink-0 snap-start ${
              compact
                ? "w-[85%]"
                : "w-[78%] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)] xl:w-[calc(25%-0.75rem)]"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={`Previous — ${label}`}
          className={`flex size-11 items-center sm:size-10 justify-center rounded-full border transition-colors ${btn}`}
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={`Next — ${label}`}
          className={`flex size-11 items-center sm:size-10 justify-center rounded-full border transition-colors ${btn}`}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
