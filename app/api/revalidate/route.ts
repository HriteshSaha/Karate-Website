import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook target: makes Studio edits appear on the site immediately.
 * Configure in sanity.io/manage → API → Webhooks → URL: https://<your-site>/api/revalidate,
 * with the same secret as SANITY_REVALIDATE_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new Response("Webhook secret not configured", { status: 500 });

  try {
    const { isValidSignature } = await parseBody(req, secret, true);
    if (!isValidSignature) return new Response("Invalid signature", { status: 401 });

    revalidateTag("sanity", "max");
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
