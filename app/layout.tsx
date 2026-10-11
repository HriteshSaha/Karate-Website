import type { Metadata, Viewport } from "next";
import { Inter, Kaushan_Script, Saira_Condensed } from "next/font/google";
import "./globals.css";
import { getPublishedContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const saira = Saira_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const brush = Kaushan_Script({ variable: "--font-brush", subsets: ["latin"], weight: "400" });

export async function generateMetadata(): Promise<Metadata> {
  const { settings: s } = await getPublishedContent();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${s.name} — ${s.tagline}`, template: `%s | ${s.name}` },
    description: s.description,
    openGraph: {
      title: s.name,
      description: s.description,
      siteName: s.name,
      type: "website",
      images: s.ogImage?.src ? [{ url: s.ogImage.src }] : undefined,
    },
  };
}

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${saira.variable} ${brush.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
