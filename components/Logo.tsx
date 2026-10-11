import Image from "next/image";
import Link from "next/link";
import type { Settings } from "@/lib/content/types";

export type Brand = Pick<Settings, "name" | "shortName" | "logoMark" | "logo">;

export function Logo({ brand, className = "" }: { brand: Brand; className?: string }) {
  const [, ...rest] = brand.name.split(" ");
  const sub = rest.join(" ") || brand.name;

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`} aria-label={`${brand.name} — home`}>
      {brand.logo?.src ? (
        <span className="relative size-11 shrink-0">
          <Image src={brand.logo.src} alt="" fill sizes="44px" className="object-contain" />
        </span>
      ) : (
        <span
          className="flex size-11 items-center justify-center rounded-full border-[3px] border-brand bg-black text-2xl font-bold leading-none text-brand"
          aria-hidden="true"
        >
          {brand.logoMark}
        </span>
      )}
      <span className="leading-none">
        <span className="display block text-2xl tracking-[0.18em] text-white">{brand.shortName}</span>
        <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
          {sub}
        </span>
      </span>
    </Link>
  );
}
