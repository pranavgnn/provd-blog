"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const article = !isHome && pathname ? pathname.replace(/^\//, '') : '';
  const redirectUrl = `/redirect-to-landing-page${article ? `?article=${article}` : ''}`;

  return (
    <header className="container mx-auto px-6 py-8 md:py-12 border-b border-gray-200 max-w-6xl w-full shrink-0">
      <nav className="flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-6">
          {!isHome && (
            <Link 
              href="/" 
              className="text-sm font-bold uppercase tracking-widest text-slate-gray hover:text-jade-green transition-colors hidden md:block"
            >
              &larr; Back to Blog
            </Link>
          )}
          <a href={redirectUrl} className="px-6 py-3 bg-ink-navy text-white font-bold uppercase tracking-widest text-sm transition-all hover:bg-jade-green hidden sm:block">
            Try Provd
          </a>
        </div>
      </nav>
    </header>
  );
}
