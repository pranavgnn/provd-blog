import Link from "next/link";
import { format } from "date-fns";
import type { PostNode } from "@/lib/hashnode";

interface PostCardProps {
  post: PostNode;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="flex flex-col gap-4 border-b border-border pb-8 last:border-0 last:pb-0">
      {post.coverImage && (
        <Link
          href={`/${post.slug}`}
          className="block overflow-hidden w-full aspect-[1.7916666667/1] relative bg-muted/30"
        >
          <img
            src={post.coverImage.url}
            alt={post.title}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
          />
        </Link>
      )}
      <div className="flex flex-col gap-2">
        <time className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
          {format(new Date(post.publishedAt), "MMMM d, yyyy")}
        </time>
        <Link href={`/${post.slug}`} className="group">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink-navy group-hover:text-jade-green transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-lg text-muted-foreground line-clamp-3 leading-relaxed">
          {post.brief}
        </p>
      </div>
      <div>
        <Link
          href={`/${post.slug}`}
          className="inline-flex items-center text-jade-green font-bold uppercase tracking-widest text-sm hover:text-ink-navy transition-colors"
        >
          Read Article &rarr;
        </Link>
      </div>
    </article>
  );
}
