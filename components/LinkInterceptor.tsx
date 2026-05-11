"use client";

import { useEffect } from "react";

export function LinkInterceptor({ slug }: { slug: string }) {
  useEffect(() => {
    const links = document.querySelectorAll(".prose a");
    links.forEach((element) => {
      const link = element as HTMLAnchorElement;
      if (
        link.hostname.includes("provd.in") &&
        !link.hostname.includes("blog.provd.in")
      ) {
        try {
          const url = new URL(link.href);
          if (!url.searchParams.has("utm_source")) {
            url.searchParams.set("utm_source", "blog");
            url.searchParams.set("utm_campaign", slug);
            link.href = url.toString();
          }
        } catch (e) {
          // Ignore invalid URLs
        }
      }
    });
  }, [slug]);

  return null;
}
