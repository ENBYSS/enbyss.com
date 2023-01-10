import type { WSTip, WSYoutube } from "$lib/stores/websocket.type";
import type { PageLoad } from "./$types"

export const load = (async ({ fetch }) => {
    const fetchYoutube = async () => {
        const res = await fetch(`https://api.enbyss.com/youtube/info`);
        return (await res.json()) as WSYoutube;
    }

    const fetchTips = async () => {
        const res = await fetch(`https://api.enbyss.com/tips/kofi`);
        return (await res.json()) as WSTip[];
    }

    return {
        youtube: fetchYoutube(),
        tips: fetchTips(),
    }
}) satisfies PageLoad;