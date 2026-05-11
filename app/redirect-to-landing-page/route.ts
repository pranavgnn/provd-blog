export async function GET(request: Request) {
  try {
    let landingPageUrl = process.env.LANDING_PAGE_URL || "https://provd.in";

    const url = new URL(request.url);
    const article = url.searchParams.get("article");

    const redirectUrl = new URL(landingPageUrl);
    redirectUrl.searchParams.set("utm_source", "blog");

    if (article) {
      redirectUrl.searchParams.set("utm_campaign", article);
    }

    return Response.redirect(redirectUrl.toString(), 302);
  } catch (error) {
    return Response.redirect("https://provd.in/?utm_source=blog_fallback", 302);
  }
}
