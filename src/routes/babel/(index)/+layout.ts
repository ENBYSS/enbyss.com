import type { LayoutLoad } from "./$types";

export interface Post {
    meta: {
        title: string
        description: string
        image: {
            src: string
            alt: string
        }
        createdAt: string
        updatedAt: string
        series?: string
        category?: string
        tags?: string[]
    }
    path: string
}

export const load = (async ({ fetch, params }) => {
    const response = await fetch(`/api/posts`);
    const posts = await response.json() as Post[];

    const series = ["all"].concat(posts.map(s => s.meta.series).filter(s => !!s).filter((v, i, a) => a.indexOf(v) === i) as string[]);
    const categories = ["all"].concat(posts.map(s => s.meta.category).filter(s => !!s).filter((v, i, a) => a.indexOf(v) === i) as string[]);

    const active_category = params.category ?? 'all';

    return {
        active_category,
        categories,
        series,
        posts,
    }
}) satisfies LayoutLoad