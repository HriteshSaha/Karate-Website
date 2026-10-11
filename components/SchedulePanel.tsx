import { telHref } from "@/lib/content";
import type { Settings, Timetable } from "@/lib/content/types";
import { ScheduleTable, timetableLegend } from "./sections";

/** Contents of the schedule popup. */
export function SchedulePanel({
  heading,
  note,
  timetable,
  settings,
}: {
  heading: { eyebrow?: string; title?: string; accent?: string };
  note: string;
  timetable: Timetable;
  settings: Settings;
}) {
  return (
    <div>
      {heading.eyebrow && <p className="eyebrow">{heading.eyebrow}</p>}
      <h2 className="display mt-1 pr-12 text-[1.75rem] text-ink sm:text-4xl">
        {heading.title}
        {heading.accent && <span className="text-brand"> {heading.accent}</span>}
      </h2>
      <div className="mt-5">
        <ScheduleTable timetable={timetable} />
      </div>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Legend">
        {timetableLegend(timetable).map((k) => (
          <li key={k.title} className={`rounded px-2.5 py-1 text-xs font-semibold ${k.className}`}>
            {k.title}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-zinc-600">
        {note}{" "}
        <a href={telHref(settings.phoneLink)} className="font-semibold text-brand">
          {settings.phone}
        </a>
        .
      </p>
    </div>
  );
}
