import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { telHref } from "@/lib/content";
import { poweredBy } from "@/lib/site";
import type { Settings } from "@/lib/content/types";
import { Logo } from "./Logo";
import { ScheduleLink } from "./ScheduleDialog";
import { SocialIcons } from "./SocialIcons";
import { Container } from "./ui";

export function Footer({ settings: s }: { settings: Settings }) {
  return (
    <footer className="bg-black text-zinc-300">
      <Container className="grid gap-8 py-10 sm:py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_0.8fr]">
        <div>
          <Logo brand={s} />
          <p className="mt-5 text-xs font-bold uppercase tracking-wider text-white">{s.tagline}</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-400">{s.footerBlurb}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{s.footerLinksHeading}</h3>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 text-sm">
            {s.nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block py-2.5 text-zinc-400 transition-colors hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <ScheduleLink className="block whitespace-nowrap py-2.5 text-left text-zinc-400 transition-colors hover:text-white">
                Class Schedule
              </ScheduleLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{s.footerContactHeading}</h3>
          <ul className="mt-3 space-y-1 text-sm">
            <li className="flex items-start gap-3 py-0.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              <a href={telHref(s.phoneLink)} className="py-1 hover:text-white">{s.phone}</a>
            </li>
            <li className="flex items-start gap-3 py-0.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              <a href={`mailto:${s.email}`} className="py-1 hover:text-white">{s.email}</a>
            </li>
            <li className="flex items-start gap-3 py-0.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              <a href={s.mapsUrl} target="_blank" rel="noopener noreferrer" className="py-1 hover:text-white">
                {s.addressLines.join(", ")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{s.footerFollowHeading}</h3>
          <SocialIcons socials={s.socials} />
        </div>
      </Container>

      <div className="border-t border-white/10 max-md:pb-16">
        <Container className="flex flex-col items-start gap-1 py-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p>© {s.name}. All rights reserved.</p>
          <p className="flex items-center gap-6">
            <Link href="/privacy" className="py-2.5 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="py-2.5 hover:text-white">Terms of Service</Link>
          </p>
          <p>
            Powered by{" "}
            <a
              href={poweredBy.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2 font-semibold text-zinc-300 underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              {poweredBy.name}
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
