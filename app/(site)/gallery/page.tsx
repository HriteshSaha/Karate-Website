import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { GalleryGrid } from "@/components/gallery";
import { PageHero } from "@/components/PageHero";
import { getContent, getPublishedContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { galleryPage } = await getPublishedContent();
  return { title: "Gallery", description: galleryPage.hero.text };
}

export default async function GalleryPage() {
  const { settings, galleryPage } = await getContent();

  return (
    <>
      <PageHero hero={galleryPage.hero} />
      <section className="bg-white py-12 sm:py-16">
        <Container reveal>
          <div className="mb-6">
            <SectionHeading {...galleryPage.introSection} />
          </div>
          <GalleryGrid items={galleryPage.items} allLabel={galleryPage.categoriesLabel} />
        </Container>
      </section>
      <CtaBand settings={settings} />
    </>
  );
}
