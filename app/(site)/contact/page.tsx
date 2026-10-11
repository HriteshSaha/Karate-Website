import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { CtaBand } from "@/components/CtaBand";
import { CallbackForm, TrialForm } from "@/components/ContactForms";
import { FormCard } from "@/components/FormCard";
import { PageHero } from "@/components/PageHero";
import { Faq, FeatureTile, GlassPanel } from "@/components/sections";
import { AlumniCard, ViewMoreLink } from "@/components/alumni";
import { Slider } from "@/components/Slider";
import { getContent, getPublishedContent, telHref } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getPublishedContent();
  return { title: "Contact & Free Trial", description: contact.hero.text };
}

export default async function ContactPage() {
  const { settings: s, contact: c, home, faqs, alumni } = await getContent();
  const featured = alumni.filter((a) => a.featured);

  return (
    <>
      <PageHero
        hero={c.hero}
        actions={
          <ButtonLink href={telHref(s.phoneLink)} variant="outline" arrow={false}>
            <Phone className="size-4" aria-hidden="true" /> {s.phone}
          </ButtonLink>
        }
      />

      {/* Forms */}
      <section className="relative overflow-hidden bg-paper py-10 sm:py-14">
        <Container reveal className="grid items-start gap-6 lg:grid-cols-2">
          <FormCard id="trial" tone="dark" mark={s.logoMark} card={c.trialForm}>
            <TrialForm
              ageGroups={c.ageGroups}
              programOptions={c.programOptions}
              classTimes={c.classTimes}
              experienceLevels={c.experienceLevels}
              submitLabel={c.trialSubmitLabel}
            />
          </FormCard>

          <FormCard id="callback" tone="light" mark={s.logoMark} card={c.callbackForm}>
            <CallbackForm callTimes={c.callTimes} programOptions={c.programOptions} submitLabel={c.callbackSubmitLabel} />
          </FormCard>
        </Container>
      </section>

      {/* Contact details */}
      <section className="relative overflow-hidden bg-black py-10 sm:py-12">
        <span aria-hidden="true" className="blob blob-a -left-20 top-0 size-72 bg-brand/25" />
        <span aria-hidden="true" className="blob blob-b -right-16 bottom-0 size-72 bg-orange-500/15" />
        <Container reveal className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.3fr]">
          {[
            {
              icon: Phone,
              label: s.callLabel,
              body: (
                <>
                  <a href={telHref(s.phoneLink)} className="inline-block whitespace-nowrap py-1 text-xl font-bold text-white hover:text-brand">
                    {s.phone}
                  </a>
                  <p className="text-xs text-zinc-400">{s.phoneNote}</p>
                </>
              ),
            },
            {
              icon: Mail,
              label: s.emailLabel,
              body: (
                <>
                  <a href={`mailto:${s.email}`} className="inline-block py-1 font-bold text-white [overflow-wrap:anywhere] hover:text-brand">
                    {s.email}
                  </a>
                  <p className="text-xs text-zinc-400">{s.emailNote}</p>
                </>
              ),
            },
            {
              icon: MapPin,
              label: s.visitLabel,
              body: (
                <>
                  <address className="text-sm font-medium not-italic text-white">
                    {s.addressLines.map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </address>
                  <a href={s.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block py-2 text-xs font-semibold text-brand hover:text-white">
                    {s.directionsLabel}
                  </a>
                </>
              ),
            },
            {
              icon: Clock,
              label: s.hoursLabel,
              body: (
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                  {s.hours.map((h) => (
                    <div key={h.days} className="contents">
                      <dt className="whitespace-nowrap text-zinc-400">{h.days}</dt>
                      <dd className="whitespace-nowrap font-medium text-white">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              ),
            },
          ].map(({ icon: Icon, label, body }) => (
            <div
              key={label}
              className="card-hover spot spot-dark group flex gap-4 rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10 backdrop-blur hover:ring-brand/50"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/30 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="eyebrow !text-xs">{label}</p>
                {body}
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Why reach out */}
      <section className="bg-paper py-10 sm:py-14">
        <Container reveal>
          <GlassPanel>
            <SectionHeading {...c.whyReachSection} light />
            <Reveal as="div" stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.whyReach.map((w) => (
                <FeatureTile key={w._key ?? w.title} card={w} />
              ))}
            </Reveal>
          </GlassPanel>
        </Container>
      </section>

      {/* FAQ + testimonial */}
      <section className="bg-white py-10 sm:py-14">
        <Container reveal className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading {...c.faqSection} />
            <div className="mt-6">
              <Faq faqs={faqs} />
            </div>
          </div>
          <div className="min-w-0 rounded-xl bg-black p-5 sm:p-8">
            {c.alumniSection.eyebrow && <p className="eyebrow">{c.alumniSection.eyebrow}</p>}
            <h2 className="display mb-6 mt-2 text-3xl text-white">
              {c.alumniSection.title}
              {c.alumniSection.accent && <span className="text-brand"> {c.alumniSection.accent}</span>}
            </h2>
            <Slider
              compact
              label="Featured alumni"
              items={(featured.length ? featured : alumni).slice(0, 6).map((a) => (
                <AlumniCard key={a._id ?? a.name} a={a} />
              ))}
            />
            <ViewMoreLink label={home.alumniButtonLabel} />
          </div>
        </Container>
      </section>

      <CtaBand settings={s} />
    </>
  );
}
