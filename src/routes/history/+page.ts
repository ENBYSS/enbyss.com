import type { PageLoad } from "./$types";

export interface StreamGroup {
    id: string
    name: string
    type: "series" | "single"
    link: string
    status: "in_progress" | "complete" | "hiatus" | "suspended" | "perpetual"
    reason: string
    started: string
    ended: string
    tags: string
}

export interface Video {
    id: string
    from_stream: string[],
    name: string
    when: string
    link: string
    timestamp: string
    notes: string
}

export const load = (async ({ fetch }) => {
    const fetchStreams = async () => {
        const res = await fetch(`https://api.enbyss.com/streams/groups`);
        return (await res.json()) as StreamGroup[];
    }

    const fetchVideos = async () => {
        const res = await fetch(`https://api.enbyss.com/videos/list`);
        return (await res.json()) as Video[];
    }

    const fetchHistory = async () => {
        const [strs, vids] = await Promise.all([
            fetchStreams(),
            fetchVideos(),
        ]);

        return strs.map(s => ({
            ...s,
            videos: vids.filter(v => v.from_stream.includes(s.id)),
            tags: s.tags === "" ? [] : s.tags.split(","),
        }));
    }

    return {
        history: await fetchHistory(),
    }
}) satisfies PageLoad;