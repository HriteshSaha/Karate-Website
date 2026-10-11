import { Globe, MessageCircle } from "lucide-react";
import type { SocialLink } from "@/lib/content/types";

// lucide-react has no brand logos, so these are drawn inline (24×24 grid).
const icons: Record<string, React.ReactNode> = {
  facebook: (
    <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.7V13h2.7v8h3.1z" fill="currentColor" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <path d="M10.2 9.3v5.4l4.7-2.7z" fill="currentColor" />
    </>
  ),
  tiktok: (
    <path d="M16.6 3c.3 2.2 1.6 3.7 3.9 3.9v3c-1.4 0-2.7-.4-3.8-1.2v5.5a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.6 2.6 0 101.8 2.5V3h2.8z" fill="currentColor" />
  ),
  x: <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />,
  linkedin: (
    <path d="M5 9h3v10H5zM6.5 4.5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM10.5 9h2.9v1.4c.5-.9 1.6-1.6 3-1.6 3 0 3.6 2 3.6 4.6V19h-3v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V19h-2.9z" fill="currentColor" />
  ),
};

const names: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  x: "X (Twitter)",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
};

export function SocialIcons({ socials }: { socials: SocialLink[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-3">
      {socials
        .filter((s) => s.url)
        .map((s) => {
          const label = names[s.platform] ?? "Social media";
          const glyph = icons[s.platform];
          return (
            <li key={s._key ?? s.platform + s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="group flex size-11 items-center justify-center rounded-full bg-white/[0.07] text-zinc-300 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-brand/40 active:scale-95"
              >
                {glyph ? (
                  <svg viewBox="0 0 24 24" className="size-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                    {glyph}
                  </svg>
                ) : s.platform === "whatsapp" ? (
                  <MessageCircle className="size-5" aria-hidden="true" />
                ) : (
                  <Globe className="size-5" aria-hidden="true" />
                )}
              </a>
            </li>
          );
        })}
    </ul>
  );
}
