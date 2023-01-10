import type { WSConsidered } from "$lib/stores/websocket.type";
import type { PageLoad } from "./$types";

export const load = (async ({fetch}) => {
    const res = await fetch(`https://api.enbyss.com/considering/items`);
    return {
        fortune: (await res.json()) as WSConsidered[],
    }
}) satisfies PageLoad