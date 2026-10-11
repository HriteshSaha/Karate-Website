import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/** Read-only (Viewer) token. Server-only; never import this from a client component. */
export const readToken = process.env.SANITY_API_READ_TOKEN;

/**
 * Fields the code reads for logic (icon names, slugs, links, image URLs, form option values…).
 * Stega — the invisible characters that power click-to-edit — would corrupt them, so they are
 * never encoded. Everything rendered as visible text still is.
 */
const NO_STEGA = new Set([
  "icon", "color", "slug", "href", "src", "position", "alt", "phoneLink", "mapsUrl", "email", "logoMark",
  "ageGroups", "programOptions", "experienceLevels", "classTimes", "callTimes",
]);

/** Client used only in Draft Mode: sees unpublished drafts and tags text for click-to-edit. */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
  perspective: "drafts",
  stega: {
    enabled: true,
    studioUrl: "/studio",
    filter: (props) => {
      if (props.sourcePath.some((p) => typeof p === "string" && NO_STEGA.has(p))) return false;
      return props.filterDefault(props);
    },
  },
});
