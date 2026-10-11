import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import type { Faq as FaqType, IconCard, Program, Settings, Stat, Timetable, TimetableColor } from "@/lib/content/types";
import { CalendarDays } from "lucide-react";
import { HighlightPicker } from "./HighlightPicker";
import { ScheduleButton } from "./ScheduleDialog";
import { Container } from "./ui";
import { Icon } from "./Icon";
import { ScheduleDays, type ScheduleDay } from "./interactive";
import { CountUp, Reveal } from "./motion";
import { SiteImage } from "./SiteImage";

// Full class names so Tailwind can see them.
const cellColors: Record<TimetableColor, string> = {
  emerald: "bg-emerald-100 text-emerald-900",
  violet: "bg-violet-100 text-violet-900",
  amber: "bg-amber-100 text-amber-900",
  sky: "bg-sky-100 text-sky-900",
  rose: "bg-rose-100 text-rose-900",
  zinc: "bg-zinc-200 text-zinc-800",
};

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((s) => (
        <li key={s.label}>
          <p className="display text-3xl text-amber-400">{s.value}</p>
          <p className="text-xs text-zinc-300">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}

/** Dark rounded panel with slowly drifting red glows — the backdrop that makes the glass cards read as glass. */
export function GlassPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-[#08080a] p-6 sm:p-10 ${className}`}>
      <span aria-hidden="true" className="blob blob-a -left-16 -top-20 size-72 bg-brand/45" />
      <span aria-hidden="true" className="blob blob-b -bottom-24 -right-16 size-80 bg-orange-500/25" />
      <span aria-hidden="true" className="blob blob-c left-1/3 top-1/3 size-56 bg-red-700/30" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function FeatureTile({ card }: { card: IconCard }) {
  return (
    <div className="h-full">
      <div className="glass tilt group h-full p-5">
        <span className="tilt-z flex size-11 items-center justify-center rounded-xl border border-red-400/35 bg-brand/15 text-red-400 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
          <Icon name={card.icon} className="size-5" />
        </span>
        <h3 className="mt-4 text-base font-bold text-white">{card.title}</h3>
        <p className="mt-1 text-sm leading-6 text-zinc-200">{card.text}</p>
      </div>
    </div>
  );
}

/**
 * Home highlights on a dark band: tilting glass cards on desktop, a tap-to-open
 * tile row on phones.
 */
export function Highlights({ items }: { items: IconCard[] }) {
  return (
    <section className="relative z-10 pb-10 pt-10 sm:pb-14 md:-mt-16 md:pt-0">
      {/* dark band with drifting glows; on desktop it starts below the top of the cards so they poke out over the banner */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-0 -z-10 overflow-hidden bg-[#08080a] md:top-16">
        <span className="blob blob-a -left-16 -top-24 size-80 bg-brand/45" />
        <span className="blob blob-b -bottom-28 -right-20 size-96 bg-orange-500/25" />
        <span className="blob blob-c left-[40%] top-1/4 size-64 bg-red-700/30" />
      </div>
      <Container className="relative">
        <Reveal as="ul" stagger className="hidden gap-4 md:grid md:grid-cols-3 lg:grid-cols-6">
          {items.map((h) => (
            <li key={h._key ?? h.title}>
              <div className="glass tilt group flex h-full flex-col p-5">
                <span className="tilt-z flex size-11 items-center justify-center rounded-xl border border-red-400/35 bg-brand/15 text-red-400 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon name={h.icon} className="size-5" />
                </span>
                <h2 className="mt-4 text-base font-bold leading-snug text-white">{h.title}</h2>
                <p className="mt-1 text-sm leading-6 text-zinc-200">{h.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
        <div className="md:hidden">
          <HighlightPicker items={items} />
        </div>
      </Container>
    </section>
  );
}

/** Banner that opens the schedule popup (replaces the old schedule page). */
export function ScheduleCta({
  heading,
  buttonLabel,
  classNames,
}: {
  heading: { eyebrow?: string; title?: string; accent?: string; text?: string };
  buttonLabel: string;
  classNames: string[];
}) {
  return (
    <div className="relative mt-10 overflow-hidden rounded-3xl bg-flow-dark p-6 ring-1 ring-white/10 sm:p-10">
      <span className="blob blob-a -left-10 -top-16 size-64 bg-brand/35" aria-hidden="true" />
      <span className="blob blob-b -bottom-20 right-10 size-72 bg-orange-500/20" aria-hidden="true" />
      <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
        <div>
          {heading.eyebrow && <p className="eyebrow">{heading.eyebrow}</p>}
          <h2 className="display mt-2 text-[1.75rem] text-white sm:text-4xl">
            {heading.title}
            {heading.accent && <span className="text-brand"> {heading.accent}</span>}
          </h2>
          {heading.text && <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">{heading.text}</p>}
          <ul className="mt-4 flex flex-wrap gap-2">
            {classNames.map((c) => (
              <li key={c} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-200 ring-1 ring-white/10">
                {c}
              </li>
            ))}
          </ul>
        </div>
        <ScheduleButton className="w-full !px-8 !py-4 text-base md:w-auto">{buttonLabel}</ScheduleButton>
      </div>
      <CalendarDays className="pointer-events-none absolute -bottom-6 right-6 hidden size-40 text-white/[0.04] md:block" aria-hidden="true" />
    </div>
  );
}

/** Dark band with animated counters. */
export function StatsBand({ settings }: { settings: Settings }) {
  return (
    <section className="relative overflow-hidden bg-black py-10 sm:py-12">
      <div aria-hidden="true" className="absolute -left-24 top-1/2 size-72 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 top-1/2 size-72 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
      <Container className="relative">
        <Reveal as="ul" stagger className="grid grid-cols-2 gap-y-8 text-center sm:grid-cols-5">
          {[...settings.stats, settings.achievement].map((s, i, all) => (
            <li key={s.label} className={i === all.length - 1 ? "col-span-2 sm:col-span-1" : ""}>
              <p className="display text-4xl text-amber-400 sm:text-5xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-1 text-sm text-zinc-300">{s.label}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/** Endless scrolling band of keywords. */
export function Marquee({ words }: { words: string[] }) {
  if (!words.length) return null;
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {words.map((w, i) => (
        <li key={w + i} className="display flex items-center whitespace-nowrap px-6 text-xl text-white sm:px-8 sm:text-2xl">
          {w}
          <span className="ml-12 text-white/40 sm:ml-16">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden bg-brand py-3 sm:py-4">
      <p className="sr-only">{words.join(", ")}</p>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}

export function ProgramCards({ programs }: { programs: Program[] }) {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
      {programs.map((p) => (
        <Link
          key={p._id ?? p.slug}
          href={`/programs#${p.slug}`}
          className="card-hover spot group w-[78%] shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 hover:ring-brand/40 sm:w-auto"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
            <SiteImage
              img={p.image}
              sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex items-start justify-between gap-3 p-5">
            <div>
              <h3 className="text-lg font-bold text-ink">{p.title}</h3>
              <p className="text-sm font-medium text-brand">{p.ages}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{p.blurb}</p>
            </div>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export { InstructorCards, InstructorStrip } from "./InstructorCards";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function ScheduleTable({ timetable }: { timetable: Timetable }) {
  const days: ScheduleDay[] = DAYS.map((day, i) => ({
    day,
    slots: timetable.rows
      .map((r) => ({ time: r.time, cell: r.cells[i] }))
      .filter((x) => x.cell)
      .map((x) => ({ time: x.time, title: x.cell!.title, className: cellColors[x.cell!.color] ?? cellColors.zinc })),
  })).filter((d) => d.slots.length > 0);

  return (
    <>
      {/* Phones: collapsible day-by-day list */}
      <div className="md:hidden">
        <ScheduleDays days={days} />
      </div>

      {/* Tablet and up: the full timetable */}
      <div className="hidden overflow-x-auto rounded-xl ring-1 ring-black/10 md:block">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <caption className="sr-only">Weekly class schedule</caption>
          <thead>
            <tr className="bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <th scope="col" className="p-3">Time</th>
              {DAYS.map((d) => (
                <th key={d} scope="col" className="p-3">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetable.rows.map((row) => (
              <tr key={row._key ?? row.time} className="border-t border-black/5">
                <th scope="row" className="whitespace-nowrap p-3 text-left font-semibold text-ink">{row.time}</th>
                {DAYS.map((d, i) => {
                  const cell = row.cells[i];
                  return (
                    <td key={d} className="p-1.5">
                      {cell && (
                        <span
                          className={`block rounded px-2 py-2 text-center text-xs font-semibold ${
                            cellColors[cell.color] ?? cellColors.zinc
                          }`}
                        >
                          {cell.title}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/** Distinct classes used in the timetable, for the legend. */
export function timetableLegend(t: Timetable) {
  const seen = new Map<string, TimetableColor>();
  for (const row of t.rows) for (const c of row.cells) if (c && !seen.has(c.title)) seen.set(c.title, c.color);
  return [...seen].map(([title, color]) => ({ title, className: cellColors[color] ?? cellColors.zinc }));
}

export function Faq({ faqs }: { faqs: FaqType[] }) {
  return (
    <div className="divide-y divide-black/10 rounded-xl bg-white ring-1 ring-black/10">
      {faqs.map((f) => (
        <details key={f._id ?? f.question} className="group px-5">
          <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-[0.95rem] font-semibold text-ink sm:text-sm">
            {f.question}
            <Plus className="faq-plus size-4 shrink-0 text-brand transition-transform" aria-hidden="true" />
          </summary>
          <p className="pb-4 text-sm leading-6 text-zinc-600">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
