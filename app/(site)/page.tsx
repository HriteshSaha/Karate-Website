import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { CertificationsStrip } from "@/components/CertificationsStrip";
import { CtaBand } from "@/components/CtaBand";
import { MobileHero } from "@/components/MobileHero";
import { GalleryStrip } from "@/components/gallery";
import { ScheduleButton } from "@/components/ScheduleDialog";
import { Highlights, InstructorStrip, Marquee, ProgramCards, ScheduleCta, StatsBand } from "@/components/sections";
import { AlumniPreview } from "@/components/alumni";
import { getContent } from "@/lib/content";

export default async function Home() {
  const { settings, home, programs, instructors, alumni, timetable, galleryPage, certifications } = await getContent();
  const classNames = [...new Set(timetable.rows.flatMap((r) => r.cells.map((c) => c?.title)).filter((t): t is string => !!t))];
  const { hero } = home;

  return (
    <>
      {/* Hero: dedicated full-screen banner on phones, regular banner from tablet up */}
      {home.mobileHero && <MobileHero m={home.mobileHero} />}
      <PageHero
        className={home.mobileHero ? "max-md:hidden" : ""}
        hero={hero}
        overlap
        actions={
          home.secondaryCtaLabel && (
            <ScheduleButton variant="outline" icon={false}>
              <Play className="size-4 fill-current" aria-hidden="true" /> {home.secondaryCtaLabel}
            </ScheduleButton>
          )
        }
      />

      {/* Highlights: cards overlapping the banner */}
      <Highlights items={home.highlights} />

      {/* Animated numbers + scrolling keywords */}
      <StatsBand settings={settings} />
      <Marquee words={home.marqueeWords} />

      {/* Credentials (details on the About page) */}
      <CertificationsStrip items={certifications} />

      {/* Programs */}
      <section className="bg-white py-12 sm:py-16">
        <Container reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading {...home.programsSection} />
            <Link href="/programs" className="group flex items-center gap-1 py-2 text-sm font-semibold text-brand">
              View All Programs{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <ProgramCards programs={programs} />
        </Container>
      </section>

      {/* Instructors (compact) + schedule popup */}
      <section className="bg-paper py-10 sm:py-12">
        <Container reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading {...home.instructorsSection} />
            <Link href="/instructors" className="group flex items-center gap-1 py-2 text-sm font-semibold text-brand">
              Meet all instructors{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <InstructorStrip instructors={instructors} />
          <ScheduleCta heading={home.scheduleSection} buttonLabel={home.scheduleButtonLabel} classNames={classNames} />
        </Container>
      </section>

      {/* Alumni */}
      <AlumniPreview heading={home.alumniSection} alumni={alumni} buttonLabel={home.alumniButtonLabel} />

      {/* Gallery */}
      <section className="bg-white py-10 sm:py-14">
        <Container reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading {...home.gallerySection} />
            <Link href="/gallery" className="group flex items-center gap-1 py-2 text-sm font-semibold text-brand">
              {home.galleryButtonLabel}{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <GalleryStrip items={galleryPage.items} />
        </Container>
      </section>

      <CtaBand settings={settings} />
    </>
  );
}
