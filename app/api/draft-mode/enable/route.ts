import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";
import { readToken } from "@/sanity/lib/preview";

/** Called by the Studio's Presentation tool to switch the site into Draft Mode. */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
});
