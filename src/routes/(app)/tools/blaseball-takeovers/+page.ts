import type { PageLoad } from "./$types";

type Takeover = {
    message: string
    by: string
    at: string
}

type Cluster = {
    from: string
    to: string
    items: Takeover[],
}

export const load = (async ({ fetch }) => {
    const takeovers = await fetch(`https://api.enbyss.com/blaseball/takeovers`);

    return {
        takeovers: [...(await takeovers.json()) as Cluster[]].reverse(),
    }
}) satisfies PageLoad