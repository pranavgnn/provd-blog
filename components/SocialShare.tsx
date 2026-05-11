"use client";

interface SocialShareProps {
  url: string;
  title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      icon: "/icons/twitter.svg",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:opacity-70",
    },
    {
      name: "LinkedIn",
      icon: "/icons/linkedin.svg",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:opacity-70",
    },
    {
      name: "Facebook",
      icon: "/icons/facebook.svg",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:opacity-70",
    },
  ];

  return (
    <div className="flex items-center gap-4 mt-12 py-6 border-y border-border">
      <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
        Share this post:
      </span>
      <div className="flex gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-opacity ${link.color}`}
            aria-label={`Share on ${link.name}`}
          >
            <img 
              src={link.icon} 
              alt="" 
              className="w-5 h-5 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all" 
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
