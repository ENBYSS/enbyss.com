import type { PageLoad } from "./$types";

interface Metadata {
    title: string
    description: string
    image?: {
        src: string
        alt: string
    }
    createdAt: string
    updatedAt: string
}

export const load = (async ({ params }) => {
    console.log(params);
    const post = await import(/* @vite-ignore */ `/src/routes/babel/${params.slug}.md`);
        
    const { title, date } = post.metadata;
    const content = post.default;

    return {
        content,
        title,
        date,
        meta: post.metadata as Metadata,
    }
}) satisfies PageLoad;