import type { PageLoad } from "./$types"

interface PatreonInfo {
    members: PatreonMember[],
    tiers: PatreonTier[]
}

interface PatreonMember {
    pledge_amount: number
    name: string
    status: "active_patron"
    entitled_tiers: PatreonTier[]
}

interface PatreonTier {
    attributes: {
        amount_cents: number
        title: string
    }
    id: string
    type: "tier"
}

interface YoutubeInfo {
    stats: {
        main: {
            subs: string
            views: string
            videoCount: string
        }
    }
}

interface Tip {
    currency: string
    amount: number
    from: string
    message: string
    when: string
}

export const load = (async ({ fetch }) => {
    const fetchPatreon = async () => {
        const res = await fetch(`https://api.enbyss.com/patreon/info`);
        return (await res.json()) as PatreonInfo;
    }

    const fetchYoutube = async () => {
        const res = await fetch(`https://api.enbyss.com/youtube/info`);
        return (await res.json()) as YoutubeInfo;
    }

    const fetchTips = async () => {
        const res = await fetch(`https://api.enbyss.com/tips/kofi`);
        return (await res.json()) as Tip[];
    }

    return {
        patreon: fetchPatreon(),
        youtube: fetchYoutube(),
        tips: fetchTips(),
    }
}) satisfies PageLoad;