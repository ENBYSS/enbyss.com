import pLimit from "p-limit";

type Glob = {
    [key: string]: () => any,
}

export let prerender = true;

const limit = pLimit(10);

export const fetchMarkdownPosts = async () => {
    const allPostFiles: Glob = import.meta.glob('../../routes/**/*.md');
    const iterablePostFiles = Object.entries(allPostFiles);

    const extractPost = async (path: string, resolver: () => any) => {
        const { metadata } = await resolver();
        return {
            meta: metadata,
            path: path.slice(18, -3),
        }
    };

    const resolvers = iterablePostFiles.map(([path, resolver]) => limit(() => extractPost(path, resolver)))
    const allPosts = await Promise.all(resolvers)

    return allPosts;
}