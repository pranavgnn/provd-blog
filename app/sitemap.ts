import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/hashnode";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const blogPosts = posts.map(({ node }: any) => ({
    url: `https://blog.provd.in/${node.slug}`,
    lastModified: new Date(node.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://blog.provd.in",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...blogPosts,
  ];
}
