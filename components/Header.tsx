"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { LinkItem } from "@/lib/content/types";
import { Logo, type Brand } from "./Logo";
import { ButtonLink } from "./ui";

export function Header({ brand, nav, ctaLabel }: { brand: Brand; nav: LinkItem[]; ctaLabel: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 backdrop-blur transition-all duration-300 ${
        scrolled ? "bg-black/90 shadow-lg shadow-black/30" : "bg-black/95"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 transition-[height] duration-300 sm:px-8 ${
          scrolled ? "h-16" : "h-[72px]"
        }`}
      >
        <Logo brand={brand} />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative py-1 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-brand after:transition-transform after:duration-300 hover:text-white ${
                isActive(item.href)
                  ? "text-white after:scale-x-100"
                  : "text-zinc-300 after:scale-x-0 hover:after:scale-x-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href="/contact#trial" className="whitespace-nowrap">
              {ctaLabel}
            </ButtonLink>
          </div>
          <button
            type="button"
            className="-mr-2 flex size-11 items-center justify-center rounded-md text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="menu-in max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-black px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block border-b border-white/10 py-3.5 text-base font-medium ${
                    isActive(item.href) ? "text-brand" : "text-zinc-200"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/contact#trial" className="mt-5 w-full">
            {ctaLabel}
          </ButtonLink>
        </nav>
      )}
    </header>
  );
}
