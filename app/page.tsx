import Link from "next/link";
import { getPosts } from "@/lib/hashnode";
import { PostCard } from "@/components/PostCard";

export const revalidate = 3600; // revalidate at most every hour

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const after = typeof resolvedSearchParams.after === 'string' ? resolvedSearchParams.after : undefined;

  const postsData = await getPosts(10, after);
  const posts = postsData?.edges || [];

  return (
    <main className="container mx-auto px-6 py-12 md:py-16 max-w-6xl w-full flex-1">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-ink-navy mb-4">
          Insights & Updates
        </h1>
        <p className="text-xl text-slate-gray max-w-2xl mx-auto md:mx-0">
          Read our latest thoughts on technology, product development, and the future of startups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {posts.length > 0 ? (
          posts.map(({ node }: any) => (
            <PostCard key={node.id} post={node} />
          ))
        ) : (
          <p className="text-lg text-slate-gray col-span-full text-center py-10">No posts found yet.</p>
        )}
      </div>
      
      {postsData?.pageInfo?.hasNextPage && (
        <div className="mt-16 text-center">
          <Link 
            href={`/?after=${postsData.pageInfo.endCursor}`}
            className="inline-block px-8 py-4 bg-ink-navy text-white font-bold uppercase tracking-widest text-sm transition-all hover:bg-jade-green"
          >
            Load More
          </Link>
        </div>
      )}
    </main>
  );
}
