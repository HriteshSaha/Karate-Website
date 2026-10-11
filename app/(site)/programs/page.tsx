import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ButtonLink, Container } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { SiteImage } from "@/components/SiteImage";
import { getContent, getPublishedContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { programsPage } = await getPublishedContent();
  return { title: "Programs", description: programsPage.hero.text };
}

export default async function ProgramsPage() {
  const { settings, programsPage, programs } = await getContent();

  return (
    <>
      <PageHero hero={programsPage.hero} />

      <section className="bg-white py-12 sm:py-16">
        <Container reveal className="space-y-16">
          {programs.map((p, i) => (
            <article key={p._id ?? p.slug} id={p.slug} className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2">
              <div className={`group relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-900 shadow-lg ${i % 2 ? "lg:order-2" : ""}`}>
                <SiteImage img={p.image} sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div>
                <p className="eyebrow">{p.ages}</p>
                <h2 className="display mt-2 text-4xl text-ink">{p.title}</h2>
                <p className="mt-4 leading-7 text-zinc-600">{p.detail}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {p.benefits?.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-zinc-700">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <ButtonLink href="/contact#trial">{programsPage.programCtaLabel}</ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <CtaBand settings={settings} />
    </>
  );
}
