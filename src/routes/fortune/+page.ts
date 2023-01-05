import type { PageLoad } from "./$types";

export interface Considered {
    id: string
    name: string
    thoughts: string
    interest: "none" | "minimal" | "some" | "a lot" | "overwhelming"
    status: "ready" | "unfinished" | "demo" | "upcoming"
    planned_release: string
}

export const load = (async ({fetch}) => {
    const res = await fetch(`https://api.enbyss.com/considering/items`);
    return {
        fortune: (await res.json()) as Considered[],
    }
}) satisfies PageLoad