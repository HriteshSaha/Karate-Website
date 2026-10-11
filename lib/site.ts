/** Public origin of the site (used for canonical URLs, the sitemap and social cards). */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Who built and powers this website (shown in the footer). */
export const poweredBy = {
  name: "Codewise Technologies",
  href: "https://codewisetech.netlify.app/#services",
};
