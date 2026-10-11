"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** Fades/slides its content in the first time it scrolls into view. */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  stagger = false,
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Reveal the direct children one after another instead of the whole block. */
  stagger?: boolean;
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-in", "");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`}
      style={delay ? ({ ["--d"]: `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/** "500+" counts up from 0 when it scrolls into view. Non-numeric values render as-is. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const suffix = match?.[2] ?? "";
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState<number | null>(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setN(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  if (target === null) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {(n ?? target).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
