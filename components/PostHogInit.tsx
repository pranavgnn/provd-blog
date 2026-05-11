"use client";

import { useEffect, Suspense } from "react";
import posthog from "posthog-js";
import { usePathname, useSearchParams } from "next/navigation";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && (window as any).posthog) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogInit() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (key && typeof window !== "undefined") {
      posthog.init(key, {
        api_host: host,
        person_profiles: "identified_only",
        capture_pageview: false,
        capture_pageleave: true,
        autocapture: true,
      });
      
      (window as any).posthog = posthog;
    } else if (!key) {
      console.warn("PostHog initialized without NEXT_PUBLIC_POSTHOG_KEY. Tracking disabled.");
    }
  }, []);

  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
