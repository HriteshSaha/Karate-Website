import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScheduleProvider } from "@/components/ScheduleDialog";
import { SchedulePanel } from "@/components/SchedulePanel";
import { SpotlightEffect } from "@/components/SpotlightEffect";
import { SiteChrome } from "@/components/SiteChrome";
import { getContent, telHref } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { settings, schedulePage, timetable } = await getContent();
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <ScheduleProvider
      title="Class schedule"
      panel={<SchedulePanel heading={schedulePage.tableSection} note={schedulePage.note} timetable={timetable} settings={settings} />}
    >
      <Header brand={settings} nav={settings.nav} ctaLabel={settings.headerCtaLabel} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <SiteChrome phone={settings.phone} phoneHref={telHref(settings.phoneLink)} ctaLabel={settings.headerCtaLabel} />
      {isDraftMode && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
      <SpotlightEffect />
    </ScheduleProvider>
  );
}
