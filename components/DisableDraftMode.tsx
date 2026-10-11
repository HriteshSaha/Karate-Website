"use client";

import { useVisualEditingEnvironment } from "next-sanity/hooks";

/** Shown only when previewing outside the Studio, so editors can leave Draft Mode. */
export function DisableDraftMode() {
  const environment = useVisualEditingEnvironment();
  // Inside the Studio's Presentation tool the editor already has a way out.
  if (environment !== "standalone") return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-[100] rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white shadow-lg ring-1 ring-white/20 hover:bg-zinc-800"
    >
      Exit preview
    </a>
  );
}
