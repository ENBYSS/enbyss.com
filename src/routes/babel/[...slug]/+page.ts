import { error } from "@sveltejs/kit";
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

    const filePath = `../${params.slug}.md`;
    const files = import.meta.glob(`../**/*.md`);

    const postFile = Object.entries(files).filter(([path, resolver]) => path === filePath);

    console.log(postFile.map(e => e[0]));

    if (postFile.length !== 1) {
        throw error(404, "post not found");
    }

    const post = await postFile[0][1]() as any;
        
    const { title, date } = post.metadata;
    const content = post.default;

    return {
        content,
        title,
        date,
        meta: post.metadata as Metadata,
    }
}) satisfies PageLoad;