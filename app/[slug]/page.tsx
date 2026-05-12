import { notFound } from "next/navigation";
import { format } from "date-fns";
import type { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/hashnode";
import { SocialShare } from "@/components/SocialShare";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.brief,
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.brief,
      images: post.coverImage ? [post.coverImage.url] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map(({ node }: any) => ({
    slug: node.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const processedHtml = post.content.html.replace(
    /href="([^"]*provd\.in[^"]*)"/g,
    (match, urlString) => {
      if (urlString.includes("blog.provd.in")) {
        return match;
      }
      try {
        const url = new URL(urlString);
        if (!url.searchParams.has("utm_source")) {
          url.searchParams.set("utm_source", "blog");
          url.searchParams.set("utm_campaign", resolvedParams.slug);
          return `href="${url.toString()}"`;
        }
      } catch (e) {
        // Ignore invalid URLs
      }
      return match;
    },
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.seo?.description || post.brief,
    "image": post.coverImage ? [post.coverImage.url] : [],
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Provd Team",
      "image": post.author?.profilePicture || undefined
    },
    "publisher": {
      "@type": "Organization",
      "name": "Provd",
      "logo": {
        "@type": "ImageObject",
        "url": "https://blog.provd.in/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://blog.provd.in/${resolvedParams.slug}`
    }
  };

  return (
    <main className="container mx-auto px-6 py-12 md:py-16 max-w-4xl w-full flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="mb-10 text-center flex flex-col items-center">
          <time className="text-sm text-jade-green font-bold uppercase tracking-wider mb-4">
            {format(new Date(post.publishedAt), "MMMM d, yyyy")}
          </time>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-ink-navy mb-8 leading-tight">
            {post.title}
          </h1>
          {post.coverImage && (
            <div className="w-full aspect-video relative overflow-hidden bg-muted/30 mt-8">
              <img
                src={post.coverImage.url}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </header>

        <div
          className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-ink-navy prose-headings:mt-8 prose-headings:mb-4 prose-ul:my-2 prose-ol:my-2 prose-li:my-0 [&_a]:text-jade-green [&_a:hover]:text-ink-navy [&_a]:transition-colors prose-img:border prose-img:border-border"
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-jade-green rotate-45" />
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">End of article</span>
          </div>
          
          <SocialShare
            url={`https://blog.provd.in/${resolvedParams.slug}`}
            title={post.title}
          />
        </div>
      </article>
    </main>
  );
}
