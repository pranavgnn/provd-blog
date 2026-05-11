import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const landingPageUrl = process.env.LANDING_PAGE_URL || "https://provd.in";
  return NextResponse.redirect(`${landingPageUrl}/?utm_source=blog`);
}

