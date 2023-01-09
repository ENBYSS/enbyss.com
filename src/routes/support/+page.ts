import type { WSPatreon, WSTip, WSYoutube } from "$lib/stores/websocket.type";
import type { PageLoad } from "./$types"

export const load = (async ({ fetch }) => {
    const fetchPatreon = async () => {
        const res = await fetch(`https://api.enbyss.com/patreon/info`);
        return (await res.json()) as WSPatreon;
    }

    const fetchYoutube = async () => {
        const res = await fetch(`https://api.enbyss.com/youtube/info`);
        return (await res.json()) as WSYoutube;
    }

    const fetchTips = async () => {
        const res = await fetch(`https://api.enbyss.com/tips/kofi`);
        return (await res.json()) as WSTip[];
    }

    return {
        patreon: fetchPatreon(),
        youtube: fetchYoutube(),
        tips: fetchTips(),
    }
}) satisfies PageLoad;