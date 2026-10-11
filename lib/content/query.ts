import { defineQuery } from "next-sanity";

// Image projection: URL, alt text and a CSS object-position derived from the Studio hotspot.
const IMG = `{
  "src": asset->url,
  alt,
  "position": select(defined(hotspot.x) => string(hotspot.x * 100) + "% " + string(hotspot.y * 100) + "%")
}`;

const HERO = `hero{ ..., "image": image${IMG} }`;
const MOBILE_HERO = `"mobileHero": mobileHero{ ..., "image": image${IMG} }`;
const PAGE = (id: string, extra = "") =>
  `*[_id == "${id}"][0]{ ..., ${HERO}, ${MOBILE_HERO}${extra ? `, ${extra}` : ""} }`;

/** One round-trip for the whole site; the result is cached and tagged "sanity". */
export const CONTENT_QUERY = defineQuery(`{
  "settings": {
    ...*[_id == "siteSettings"][0]{
      ...,
      "logo": logo${IMG},
      "ogImage": ogImage${IMG},
      "ctaImage": ctaImage${IMG}
    },
    ...*[_id == "contactInfo"][0]{
      phone, phoneLink, phoneNote, email, emailNote, addressLines, mapsUrl, hours,
      "socials": socials[]{ _key, platform, url },
      callLabel, emailLabel, visitLabel, hoursLabel, directionsLabel,
      footerLinksHeading, footerContactHeading, footerFollowHeading
    }
  },
  "home": ${PAGE("homePage")},
  "about": ${PAGE("aboutPage", `"storyImage": storyImage${IMG}`)},
  "programsPage": ${PAGE("programsPage")},
  "instructorsPage": ${PAGE("instructorsPage")},
  "schedulePage": *[_id == "schedulePage"][0],
  "galleryPage": ${PAGE("galleryPage", `"items": items[]{ _key, caption, category, "image": image${IMG} }`)},
  "alumniPage": ${PAGE("alumniPage")},
  "contact": ${PAGE("contactPage")},
  "programs": *[_type == "program"] | order(order asc, _createdAt asc){
    _id, title, "slug": slug.current, ages, blurb, detail, benefits, "image": image${IMG}
  },
  "instructors": *[_type == "instructor"] | order(order asc, _createdAt asc){
    _id, name, role, rank, experience, focus, bio, cutout, "photo": photo${IMG}
  },
  "beltLevels": *[_type == "beltLevel"] | order(order asc, _createdAt asc){
    _id, title, "slug": slug.current, color, description
  },
  "alumni": *[_type == "alumnus"] | order(order asc, _createdAt asc){
    _id, name, classOf, headline, story, featured, "photo": photo${IMG},
    "belt": beltLevel->{ title, "slug": slug.current, color }
  },
  "certifications": *[_type == "certification"] | order(order asc, _createdAt asc){
    _id, title, issuer, year, details, "badge": badge${IMG}
  },
  "certifications": *[_type == "certification"] | order(order asc, _createdAt asc){
    _id, title, issuer, year, details, "badge": badge${IMG}
  },
  "faqs": *[_type == "faq"] | order(order asc, _createdAt asc){ _id, question, answer },
  "timetable": *[_id == "timetable"][0]{
    "rows": rows[]{
      _key,
      time,
      "cells": [
        monday->{title, color}, tuesday->{title, color}, wednesday->{title, color},
        thursday->{title, color}, friday->{title, color}
      ]
    }
  },
  "legal": *[_type == "legalPage" && defined(slug.current)]{ "slug": slug.current, title, body }
}`);
