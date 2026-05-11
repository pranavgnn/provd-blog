import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const landingPageUrl = process.env.LANDING_PAGE_URL!;
  const { searchParams } = new URL(request.url);
  const article = searchParams.get("article");

  const redirectUrl = new URL(landingPageUrl);
  redirectUrl.searchParams.set("utm_source", "blog");

  if (article) {
    redirectUrl.searchParams.set("utm_campaign", article);
  }

  return NextResponse.redirect(redirectUrl.toString());
}

