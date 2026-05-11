import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <a 
      href="/redirect-to-landing-page" 
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
