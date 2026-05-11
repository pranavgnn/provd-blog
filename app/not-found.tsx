import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center max-w-2xl py-20">
      <h1 className="text-8xl md:text-9xl font-heading font-bold text-ink-navy mb-6">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink-navy mb-6">
        Page Not Found
      </h2>
      <p className="text-lg text-slate-gray mb-12">
        The article or page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/"
        className="px-8 py-4 bg-jade-green text-white font-bold uppercase tracking-widest text-sm transition-all hover:bg-ink-navy"
      >
        Return to Blog
      </Link>
    </main>
  );
}
