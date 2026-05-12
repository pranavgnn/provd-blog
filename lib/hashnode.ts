import { request, gql } from "graphql-request";

const ENDPOINT = process.env.HASHNODE_ENDPOINT!;
const HOST = process.env.HASHNODE_HOST!;

export interface PostNode {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage?: {
    url: string;
  } | null;
  publishedAt: string;
}

export interface PostDetails extends PostNode {
  content: {
    html: string;
  };
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
}

export async function getPosts(first = 10, after?: string) {
  const query = gql`
    query GetPosts($first: Int!, $after: String, $host: String!) {
      publication(host: $host) {
        title
        posts(first: $first, after: $after) {
          edges {
            node {
              id
              title
              brief
              slug
              coverImage {
                url
              }
              publishedAt
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;

  const variables = { first, after, host: HOST };

  const data: any = await request(ENDPOINT, query, variables);
  if (!data?.publication) return null;

  return data.publication.posts;
}

export async function getAllPosts() {
  let allEdges: any[] = [];
  let hasNextPage = true;
  let endCursor: string | undefined = undefined;

  while (hasNextPage) {
    const postsData = await getPosts(50, endCursor);

    if (postsData?.edges) {
      allEdges = [...allEdges, ...postsData.edges];
    }

    hasNextPage = postsData?.pageInfo?.hasNextPage ?? false;
    endCursor = postsData?.pageInfo?.endCursor;
  }

  return allEdges;
}

export async function getPostBySlug(slug: string) {
  const query = gql`
    query GetPostBySlug($slug: String!, $host: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          brief
          slug
          coverImage {
            url
          }
          publishedAt
          content {
            html
          }
          seo {
            title
            description
          }
        }
      }
    }
  `;

  const variables = { slug, host: HOST };
  const data: any = await request(ENDPOINT, query, variables);
  if (!data?.publication?.post) return null;

  return data.publication.post as PostDetails;
}