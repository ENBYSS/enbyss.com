import { error } from "@sveltejs/kit";
import type { Post } from "../(index)/+layout";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
    const filePath = `../${params.slug}.md`;
    const files = import.meta.glob(`../**/*.md`);

    const postFile = Object.entries(files).filter(([path, resolver]) => path === filePath);

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
        meta: post.metadata as Post["meta"],
    }
}) satisfies PageLoad;