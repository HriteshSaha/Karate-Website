"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/content/types";
import { Reveal } from "./motion";

/* ------------------------------------------------------------------ */
/* Lightbox                                                           */
/* ------------------------------------------------------------------ */

function useLightbox(count: number) {
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = useCallback((i: number, el: HTMLElement) => {
    opener.current = el;
    setIndex(i);
  }, []);
  const close = useCallback(() => {
    setIndex(null);
    opener.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null || count === 0 ? i : (i + dir + count) % count)),
    [count],
  );
  return { index, open, close, step };
}

function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  const item = items[index];
  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <X className="size-5" />
      </button>
      {items.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              onStep(-1);
            }}
            className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              onStep(1);
            }}
            className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}
      <div
        key={index}
        className="relative h-[68vh] w-full max-w-5xl overflow-hidden rounded-xl"
        style={{ animation: "pop 0.3s ease-out" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={item.image.src} alt={item.image.alt ?? item.caption ?? ""} fill sizes="100vw" className="object-contain" />
      </div>
      <p className="absolute bottom-4 left-0 right-0 px-12 text-center text-sm text-zinc-300">
        {index + 1} / {items.length}
        {item.caption ? ` · ${item.caption}` : ""}
      </p>
    </div>
  );
}

function Thumb({
  item,
  onOpen,
  className = "",
  sizes,
}: {
  item: GalleryItem;
  onOpen: (el: HTMLElement) => void;
  className?: string;
  sizes: string;
}) {
  return (
    <button
      type="button"
      aria-label={`Open photo: ${item.caption || item.image.alt || "photo"}`}
      onClick={(e) => onOpen(e.currentTarget)}
      className={`group relative block overflow-hidden rounded-2xl bg-zinc-900 ${className}`}
    >
      <Image
        src={item.image.src}
        alt={item.image.alt ?? ""}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ objectPosition: item.image.position ?? "50% 50%" }}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
      {item.caption && (
        <span className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          {item.caption}
        </span>
      )}
      <Expand
        className="absolute right-3 top-3 size-5 scale-75 text-white opacity-0 drop-shadow transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
        aria-hidden="true"
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Home page strip                                                    */
/* ------------------------------------------------------------------ */

export function GalleryStrip({ items }: { items: GalleryItem[] }) {
  const shown = items.slice(0, 5);
  const lb = useLightbox(shown.length);
  return (
    <>
      <Reveal as="ul" stagger className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {shown.map((g, i) => (
          <li key={g._key ?? g.image.src + i} className={i === 4 ? "max-sm:hidden" : ""}>
            <Thumb item={g} onOpen={(el) => lb.open(i, el)} className="aspect-square w-full" sizes="(min-width:640px) 15vw, 50vw" />
          </li>
        ))}
      </Reveal>
      {lb.index !== null && <Lightbox items={shown} index={lb.index} onClose={lb.close} onStep={lb.step} />}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery page: filterable mosaic                                    */
/* ------------------------------------------------------------------ */

// Every 8 photos: one big tile and one wide tile, for a mosaic look.
const span = (i: number) => (i % 8 === 0 ? "col-span-2 row-span-2" : i % 8 === 5 ? "col-span-2" : "");

export function GalleryGrid({ items, allLabel }: { items: GalleryItem[]; allLabel: string }) {
  const categories = useMemo(() => [...new Set(items.map((i) => i.category).filter((c): c is string => !!c))], [items]);
  const [active, setActive] = useState<string | null>(null);
  const shown = useMemo(() => (active ? items.filter((i) => i.category === active) : items), [items, active]);
  const lb = useLightbox(shown.length);

  const chip = (label: string, value: string | null) => {
    const on = active === value;
    return (
      <button
        key={label}
        type="button"
        aria-pressed={on}
        onClick={() => setActive(value)}
        className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
          on ? "border-brand bg-brand text-white shadow-md shadow-brand/30" : "border-zinc-300 text-ink hover:border-brand hover:text-brand"
        }`}
      >
        {label}
        <span className={`ml-2 text-xs ${on ? "text-white/80" : "text-zinc-400"}`}>
          {value ? items.filter((i) => i.category === value).length : items.length}
        </span>
      </button>
    );
  };

  return (
    <>
      {categories.length > 0 && (
        <div className="no-scrollbar -mx-5 flex scroll-px-5 gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {chip(allLabel, null)}
          {categories.map((c) => chip(c, c))}
        </div>
      )}

      <ul key={active ?? "all"} className="mt-6 grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {shown.map((g, i) => (
          <li key={g._key ?? g.image.src + i} className={`${span(i)}`} style={{ animation: `fade-up 0.5s ease-out ${Math.min(i, 8) * 50}ms both` }}>
            <Thumb item={g} onOpen={(el) => lb.open(i, el)} className="h-full w-full" sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw" />
          </li>
        ))}
      </ul>

      {lb.index !== null && <Lightbox items={shown} index={lb.index} onClose={lb.close} onStep={lb.step} />}
    </>
  );
}
