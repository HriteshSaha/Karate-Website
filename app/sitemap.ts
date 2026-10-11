import type { MetadataRoute } from "next";
import { getPublishedContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { settings, legal } = await getPublishedContent();
  const paths = [...settings.nav.map((n) => n.href), ...Object.keys(legal).map((s) => `/${s}`)];
  return [...new Set(paths)].map((p) => ({
    url: `${siteUrl}${p === "/" ? "" : p}`,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
