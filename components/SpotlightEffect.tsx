"use client";

import { useEffect } from "react";

/**
 * Cursor effects for the whole site: elements with `.spot` or `.glass` get a light that follows
 * the pointer (--mx/--my), and `.glass.tilt` cards also lean toward it (--rx/--ry).
 * One delegated listener, so cards stay plain server markup.
 */
export function SpotlightEffect() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let tilted: HTMLElement | null = null;

    const reset = (el: HTMLElement) => {
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(".spot, .glass") ?? null;
      if (tilted && tilted !== el) {
        reset(tilted);
        tilted = null;
      }
      if (!el || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        if (!calm && el.classList.contains("tilt")) {
          el.style.setProperty("--rx", `${((0.5 - y / r.height) * 10).toFixed(1)}deg`);
          el.style.setProperty("--ry", `${((x / r.width - 0.5) * 12).toFixed(1)}deg`);
          tilted = el;
        }
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
      if (tilted) reset(tilted);
    };
  }, []);
  return null;
}
