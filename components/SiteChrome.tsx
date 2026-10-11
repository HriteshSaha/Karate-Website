"use client";

import { usePathname } from "next/navigation";
import { ArrowUp, CalendarCheck, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Scroll progress bar, back-to-top button and a sticky call/book bar for phones. */
export function SiteChrome({ phone, phoneHref, ctaLabel }: { phone: string; phoneHref: string; ctaLabel: string }) {
  const pathname = usePathname();
  const poppedRef = useRef(false);
  const [y, setY] = useState(0);
  const [progress, setProgress] = useState(0);

  // Back/forward buttons restore their own scroll position; remember that one was used.
  useEffect(() => {
    const onPop = () => {
      poppedRef.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Every normal navigation starts at the top of the new page. Next.js skips this when the new
  // page's first element is hidden at the current screen size, which left some pages scrolled.
  useEffect(() => {
    if (poppedRef.current) {
      poppedRef.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setY(window.scrollY);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const showBar = y > 520 && pathname !== "/contact";
  const showTop = y > 700;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* Phones: always-available call + book buttons */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-2 border-t border-white/10 bg-black/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href={phoneHref}
          aria-label={`Call ${phone}`}
          tabIndex={showBar ? 0 : -1}
          className="flex size-12 items-center justify-center rounded-xl border border-white/25 text-white active:scale-95"
        >
          <Phone className="size-5" aria-hidden="true" />
        </a>
        <a
          href="/contact#trial"
          tabIndex={showBar ? 0 : -1}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-white active:scale-[0.98]"
        >
          <CalendarCheck className="size-5" aria-hidden="true" /> {ctaLabel}
        </a>
      </div>

      <button
        type="button"
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed right-4 z-40 flex size-11 items-center justify-center rounded-full bg-ink text-white shadow-lg ring-1 ring-white/20 transition-all duration-300 hover:bg-brand active:scale-95 md:bottom-6 md:right-6 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        } ${showBar ? "bottom-[5.25rem]" : "bottom-5"}`}
      >
        <ArrowUp className="size-5" aria-hidden="true" />
      </button>
    </>
  );
}
