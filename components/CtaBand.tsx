import { CircleCheck } from "lucide-react";
import type { Settings } from "@/lib/content/types";
import { SiteImage } from "./SiteImage";
import { ButtonLink, Container } from "./ui";

export function CtaBand({ settings: s }: { settings: Settings }) {
  return (
    <section className="relative isolate overflow-hidden bg-black text-center">
      <div className="absolute inset-0 -z-10 opacity-80">
        <SiteImage img={s.ctaImage} sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 to-black/60" />
      <div aria-hidden="true" className="float-y absolute left-1/2 top-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl" />
      <Container reveal className="py-12 sm:py-20">
        <p className="eyebrow">{s.ctaEyebrow}</p>
        <h2 className="display mt-3 text-4xl text-white sm:text-5xl">{s.ctaTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl text-zinc-200">{s.ctaText}</p>
        <div className="mt-7 flex justify-center">
          <ButtonLink href="/contact#trial" className="pulse-ring !px-8 !py-4 text-base">
            {s.ctaButtonLabel}
          </ButtonLink>
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-200">
          {s.ctaPerks.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <CircleCheck className="size-4 text-brand" aria-hidden="true" /> {t}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
