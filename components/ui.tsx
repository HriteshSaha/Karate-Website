import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./motion";

export type ButtonVariant = "primary" | "outline" | "dark";
type Variant = ButtonVariant;

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-lg shadow-brand/25 hover:bg-brand-dark hover:shadow-brand/40 before:absolute before:-left-1/3 before:top-0 before:h-full before:w-1/4 before:-skew-x-[20deg] before:bg-white/30 before:opacity-0 hover:before:opacity-100 hover:before:animate-[shine_0.9s_ease]",
  outline: "border border-white/40 text-white backdrop-blur-sm hover:border-white hover:bg-white/10",
  dark: "bg-ink text-white hover:bg-zinc-800",
};

export const buttonClass = (variant: Variant = "primary", className = "") =>
  `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md px-6 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${variants[variant]} ${className}`;

export function ButtonLink({
  href,
  variant = "primary",
  arrow = true,
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      )}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  text,
  light = false,
}: {
  eyebrow?: string;
  title?: string;
  accent?: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`display mt-2 text-[1.75rem] sm:text-4xl ${light ? "text-white" : "text-ink"}`}>
        {title}
        {accent && <span className="text-brand"> {accent}</span>}
      </h2>
      {text && (
        <p className={`mt-3 max-w-xl text-base leading-7 ${light ? "text-zinc-300" : "text-zinc-600"}`}>{text}</p>
      )}
    </div>
  );
}

export function Container({
  children,
  className = "",
  reveal = false,
}: {
  children: ReactNode;
  className?: string;
  /** Fade the whole block in when it scrolls into view. */
  reveal?: boolean;
}) {
  const cls = `mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`;
  return reveal ? <Reveal className={cls}>{children}</Reveal> : <div className={cls}>{children}</div>;
}
