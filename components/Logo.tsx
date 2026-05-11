"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const article = !isHome && pathname ? pathname.replace(/^\//, '') : '';
  const redirectUrl = `/redirect-to-landing-page${article ? `?article=${article}` : ''}`;

  return (
    <a 
      href={redirectUrl} 
      rel="nofollow"
      aria-label="Provd Home" 
      className={cn(
        "font-heading font-bold text-secondary italic hover:opacity-80 transition-opacity text-2xl tracking-widest",
        className
      )}
    >
      Provd
    </a>
  );
}
