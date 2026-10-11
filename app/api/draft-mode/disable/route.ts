import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

/** Leaves Draft Mode (used by the "Exit preview" button). */
export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  const back = request.nextUrl.searchParams.get("redirect");
  // Only allow same-site relative redirects.
  const to = back && back.startsWith("/") && !back.startsWith("//") ? back : "/";
  return NextResponse.redirect(new URL(to, request.url));
}
