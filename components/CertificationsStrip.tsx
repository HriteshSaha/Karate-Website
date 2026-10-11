import { ArrowRight, Award } from "lucide-react";
import Link from "next/link";
import type { Certification } from "@/lib/content/types";
import { Container } from "./ui";
import { Reveal } from "./motion";
import { SiteImage } from "./SiteImage";

/** Slim row of credentials for the home page; the details live on the About page. */
export function CertificationsStrip({ items }: { items: Certification[] }) {
  return (
    <section className="border-y border-black/5 bg-white py-6 sm:py-7">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
          <p className="eyebrow shrink-0 lg:w-36">Certified &amp; trusted</p>
          <Reveal as="ul" stagger className="grid flex-1 grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-4">
            {items.slice(0, 4).map((c) => (
              <li key={c._id ?? c.title} className="flex items-center gap-3">
                <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand/10 text-brand">
                  {c.badge?.src ? (
                    <SiteImage img={{ ...c.badge, alt: "" }} sizes="40px" className="object-contain p-1" />
                  ) : (
                    <Award className="size-5" aria-hidden="true" />
                  )}
                </span>
                <span className="min-w-0 text-[0.8rem] font-semibold leading-tight text-ink sm:text-sm">{c.title}</span>
              </li>
            ))}
          </Reveal>
          <Link href="/about#certifications" className="group flex shrink-0 items-center gap-1 py-2 text-sm font-semibold text-brand">
            See all credentials <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
