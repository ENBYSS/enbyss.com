import type { WSStream, WSVideo } from "$lib/stores/websocket.type";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
    const fetchStreams = async () => {
        const res = await fetch(`https://api.enbyss.com/streams/groups`);
        return (await res.json()) as WSStream[];
    }

    const fetchVideos = async () => {
        const res = await fetch(`https://api.enbyss.com/videos/list`);
        return (await res.json()) as WSVideo[];
    }

    const fetchHistory = async () => {
        const [strs, vids] = await Promise.all([
            fetchStreams(),
            fetchVideos(),
        ]);

        return strs.map(s => ({
            ...s,
            videos: vids.filter(v => v.from_stream.includes(s.id)),
            tags: s.tags === "" ? [] : s.tags?.split(","),
        }));
    }

    return {
        streams: fetchStreams(),
        videos: fetchVideos(),
    }
}) satisfies PageLoad;