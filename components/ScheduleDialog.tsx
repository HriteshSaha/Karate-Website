"use client";

import { CalendarDays, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { buttonClass, type ButtonVariant } from "./ui";

const ScheduleContext = createContext<{ open: () => void }>({ open: () => {} });

/**
 * Hosts the schedule popup for the whole site. `panel` is the (server-rendered) timetable.
 * The popup also opens when the URL ends in #schedule.
 */
export function ScheduleProvider({
  panel,
  title,
  children,
}: {
  panel: ReactNode;
  title: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
    history.replaceState(null, "", `${location.pathname}${location.search}#schedule`);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (location.hash === "#schedule") history.replaceState(null, "", `${location.pathname}${location.search}`);
    opener.current?.focus?.();
  }, []);

  // Open from a #schedule link (also after redirects from the old /schedule URL).
  useEffect(() => {
    const sync = () => {
      if (location.hash === "#schedule") setIsOpen(true);
    };
    const t = window.setTimeout(sync, 0);
    window.addEventListener("hashchange", sync);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const el = dialogRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el?.querySelector<HTMLElement>("[data-close]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !el) return;
      const f = [...el.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(
        (n) => n.offsetParent !== null,
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <ScheduleContext.Provider value={value}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={close}
          style={{ animation: "fade-up 0.25s ease-out" }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8"
            style={{ animation: "pop 0.3s ease-out" }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-orange-500 to-brand" aria-hidden="true" />
            <button
              type="button"
              data-close
              onClick={close}
              aria-label="Close schedule"
              className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-zinc-100 text-ink transition-colors hover:bg-brand hover:text-white sm:right-5 sm:top-5"
            >
              <X className="size-5" />
            </button>
            {panel}
          </div>
        </div>
      )}
    </ScheduleContext.Provider>
  );
}

/** A button styled like the site's other buttons that opens the schedule popup. */
export function ScheduleButton({
  children,
  variant = "primary",
  className = "",
  icon = true,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  icon?: boolean;
}) {
  const { open } = useContext(ScheduleContext);
  return (
    <button type="button" onClick={open} className={buttonClass(variant, className)}>
      {icon && <CalendarDays className="size-4" aria-hidden="true" />}
      {children}
    </button>
  );
}

/** A plain text-link style trigger (used in the footer). */
export function ScheduleLink({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { open } = useContext(ScheduleContext);
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
