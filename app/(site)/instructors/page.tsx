import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { InstructorCards } from "@/components/sections";
import { getContent, getPublishedContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { instructorsPage } = await getPublishedContent();
  return { title: "Instructors", description: instructorsPage.hero.text };
}

export default async function InstructorsPage() {
  const { settings, instructorsPage, instructors } = await getContent();
  return (
    <>
      <PageHero hero={instructorsPage.hero} />
      <section className="bg-paper py-12 sm:py-16">
        <Container reveal>
          <InstructorCards instructors={instructors} mark={settings.logoMark} />
        </Container>
      </section>
      <CtaBand settings={settings} />
    </>
  );
}
