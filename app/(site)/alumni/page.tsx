import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import { AlumniCard, beltBar } from "@/components/alumni";
import { CtaBand } from "@/components/CtaBand";
import { MobileHero } from "@/components/MobileHero";
import { BeltNav } from "@/components/interactive";
import { PageHero } from "@/components/PageHero";
import { Slider } from "@/components/Slider";
import { getContent, getPublishedContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { alumniPage } = await getPublishedContent();
  return { title: "Alumni", description: alumniPage.hero.text };
}

export default async function AlumniPage() {
  const { settings, alumniPage, beltLevels, alumni } = await getContent();

  // One section per belt, in belt order, skipping belts with no alumni yet.
  const sections = beltLevels
    .map((belt) => ({ belt, members: alumni.filter((a) => a.belt?.slug === belt.slug) }))
    .filter((s) => s.members.length > 0);

  return (
    <>
      {alumniPage.mobileHero && <MobileHero m={alumniPage.mobileHero} />}
      <PageHero hero={alumniPage.hero} className={alumniPage.mobileHero ? "max-md:hidden" : ""} />

      <section className="bg-white py-12">
        <Container reveal>
          <SectionHeading {...alumniPage.introSection} />
        </Container>
      </section>

      <BeltNav belts={sections.map(({ belt }) => ({ slug: belt.slug, title: belt.title, barClass: beltBar[belt.color] }))} />

      {sections.map(({ belt, members }, i) => (
        <section
          key={belt.slug}
          id={belt.slug}
          className={`scroll-mt-36 py-10 sm:py-14 ${i % 2 === 0 ? "bg-paper" : "bg-white"}`}
        >
          <Container reveal>
            <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <span className={`h-4 w-10 shrink-0 rounded-full sm:w-16 ${beltBar[belt.color]}`} aria-hidden="true" />
              <div>
                <h2 className="display text-3xl text-ink">{belt.title}</h2>
                {belt.description && <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600">{belt.description}</p>}
              </div>
            </div>
            <Slider
              tone="light"
              label={`${belt.title} alumni`}
              items={members.map((a) => <AlumniCard key={a._id ?? a.name} a={a} />)}
            />
          </Container>
        </section>
      ))}

      <CtaBand settings={settings} />
    </>
  );
}
