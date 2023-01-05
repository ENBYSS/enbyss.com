import type { PageLoad } from "./$types";

interface Schedule {
    name: string
    subtitle: string
    description: string
    image: string
    when: string
    type: "video" | "stream"
    link: string
}

export const load = (async ({ fetch }) => {
    const res = await fetch(`https://api.enbyss.com/schedule/items`);
    return {
        schedule: (await res.json()) as Schedule[]
    }
}) satisfies PageLoad;