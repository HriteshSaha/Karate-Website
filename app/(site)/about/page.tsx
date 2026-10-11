import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { Certifications } from "@/components/Certifications";
import { CtaBand } from "@/components/CtaBand";
import { MobileHero } from "@/components/MobileHero";
import { PageHero } from "@/components/PageHero";
import { SiteImage } from "@/components/SiteImage";
import { FeatureTile, GlassPanel, StatsBand } from "@/components/sections";
import { AlumniPreview } from "@/components/alumni";
import { getContent, getPublishedContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getPublishedContent();
  return { title: "About", description: about.hero.text };
}

export default async function AboutPage() {
  const { settings, about, home, alumni, certifications } = await getContent();

  return (
    <>
      {about.mobileHero && <MobileHero m={about.mobileHero} />}
      <PageHero hero={about.hero} className={about.mobileHero ? "max-md:hidden" : ""} />

      {/* Story */}
      <section className="bg-white py-12 sm:py-16">
        <Container reveal className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading {...about.storySection} />
            <div className="mt-5 space-y-4 leading-7 text-zinc-600">
              {about.storyParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <figure className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black">
            <SiteImage img={about.storyImage} sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            {about.storyQuote && (
              <figcaption className="absolute bottom-4 right-5 text-right text-xs font-semibold uppercase tracking-wide text-white/90">
                {about.storyQuote}
              </figcaption>
            )}
          </figure>
        </Container>
      </section>

      {/* Mission / values */}
      <section className="bg-paper py-12 sm:py-16">
        <Container reveal>
          <GlassPanel>
            <SectionHeading {...about.valuesSection} light />
            <Reveal as="div" stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {about.values.map((v) => (
                <FeatureTile key={v._key ?? v.title} card={v} />
              ))}
            </Reveal>
          </GlassPanel>
        </Container>
      </section>

      {/* Numbers */}
      <StatsBand settings={settings} />

      {/* Why */}
      <section className="bg-paper py-12 sm:py-16">
        <Container reveal>
          <GlassPanel>
            <SectionHeading {...about.whySection} light />
            <Reveal as="div" stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {about.why.map((w) => (
                <FeatureTile key={w._key ?? w.title} card={w} />
              ))}
            </Reveal>
          </GlassPanel>
        </Container>
      </section>

      {/* Certifications */}
      <section id="certifications" className="scroll-mt-20 bg-white py-10 sm:py-14">
        <Container reveal>
          <div className="mb-6">
            <SectionHeading {...about.certificationsSection} />
          </div>
          <Certifications items={certifications} />
        </Container>
      </section>

      {/* Alumni */}
      <AlumniPreview heading={home.alumniSection} alumni={alumni} buttonLabel={home.alumniButtonLabel} />

      <CtaBand settings={settings} />
    </>
  );
}
