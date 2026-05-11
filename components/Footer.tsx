"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const article = !isHome && pathname ? pathname.replace(/^\//, '') : '';
  const redirectUrl = `/redirect-to-landing-page${article ? `?article=${article}` : ''}`;

  return (
    <footer className="bg-ink-navy text-white py-16 md:py-24 border-t-8 border-jade-green w-full mt-12 md:mt-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
          <div>
            <Link 
              href="/" 
              className="font-heading font-bold italic text-4xl tracking-widest hover:text-jade-green transition-colors"
            >
              Provd
            </Link>
            <p className="mt-4 text-muted-foreground/80 max-w-sm text-lg">
              Insights on technology, product development, and the future of startups in the rental market.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-6">
            <a 
              href={redirectUrl} 
              rel="nofollow"
              className="px-8 py-4 bg-jade-green text-white font-bold uppercase tracking-widest text-sm transition-all hover:bg-white hover:text-ink-navy"
            >
              Try Provd
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-muted-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
          <div className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Provd. Built for the Indian Rental Market.
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Blog</Link>
            <a href={redirectUrl} className="hover:text-white transition-colors">Main Site</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
