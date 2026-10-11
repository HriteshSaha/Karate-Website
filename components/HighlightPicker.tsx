"use client";

import { useState } from "react";
import type { IconCard } from "@/lib/content/types";
import { Icon } from "./Icon";

/** Phones: a row of glass tiles; tapping one shows its details in a panel below. */
export function HighlightPicker({ items }: { items: IconCard[] }) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];
  if (!current) return null;

  return (
    <div>
      <ul className="grid grid-cols-3 gap-2" aria-label="What we offer">
        {items.map((h, i) => {
          const on = i === active;
          return (
            <li key={h._key ?? h.title}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setActive(i)}
                className={`glass flex h-full min-h-[5.5rem] w-full flex-col items-center justify-center gap-1.5 px-1.5 py-3 text-center transition-all duration-200 ${
                  on ? "!border-red-400 !bg-red-600/30 shadow-[0_0_22px_-4px_rgb(225_29_46/0.8)]" : ""
                }`}
              >
                <Icon name={h.icon} className={`size-6 transition-transform duration-300 ${on ? "scale-110 text-white" : "text-red-400"}`} />
                <span className="text-[0.72rem] font-medium leading-tight text-zinc-100">{h.title}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div key={active} aria-live="polite" className="glass mt-3 flex items-center gap-4 p-4" style={{ animation: "fade-up 0.35s ease both" }}>
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/40">
          <Icon name={current.icon} className="size-7" />
        </span>
        <div>
          <h3 className="text-base font-bold text-white">{current.title}</h3>
          <p className="mt-0.5 text-sm leading-6 text-zinc-200">{current.text}</p>
        </div>
      </div>
    </div>
  );
}
