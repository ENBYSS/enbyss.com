import type { LayoutLoad } from "./$types";

export const load = (async ({ fetch }) => {
    const res = await fetch(`https://api.enbyss.com/ticker/items`) ;

    return {
        messages: await res.json(),
    }
}) satisfies LayoutLoad;