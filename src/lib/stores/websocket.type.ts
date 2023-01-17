import type { PMessage } from "./youtube.type"

export interface Initial {
    youtube: WSYoutube
    patreon: WSPatreon
    tips: WSTip[]
    streams: WSStream[]
    videos: WSVideo[]
    schedule: WSScheduleItem[]
    ticker: string[]
    considered: WSConsidered[]
}

// Youtube
export interface WSYoutube {
    stats: {
        main: YoutubeStats
        // live: YoutubeStats
    }
    liveData: {
        id: string
        name: string
        description: string
        embedUrl: string
        started: string
    }
}

interface YoutubeStats {
    subs: string
    views: string
    videoCount: string
}

// Patreon
export interface WSPatreon {
    members: PatreonMember[]
    tiers: PatreonTier[]
}

export interface PatreonMember {
    pledge_amount: number
    name: string
    status: "former_patron" | "active_patron" | "declined_patron"
    entitled_tiers: PatreonTier[]
}

export interface PatreonTier {
    attributes: {
        amount_cents: number
        patron_count: number
        title: string
    }
    id: string
    type: "tier"
}

// Tip
export interface WSTip {
    currency: string
    amount: number
    from: string
    message: string
    when: string
}

// Stream
export interface WSStream {
    id: string
    name: string
    type: "series" | "single"
    link: string
    status: "in_progress" | "hiatus" | "suspended" | "complete" | "perpetual"
    reason: string
    started: string
    ended: string
    tags: string
}

// Video
export interface WSVideo {
    id: string
    from_stream: string[]
    name: string
    when: string
    link: string
    timestamp: string
    notes: string
}

// Schedules
export interface WSScheduleItem {
    id: string
    name: string
    subtitle?: string
    when: string
    type: "video" | "stream"
    link: string
    image: string
    description?: string
    whenReleased?: string
}

// Tickers
// export interface WSTickerMessage {
//     message: string
// }

// Chat
export interface AddMsgEvent {
    kind: "add",
    msg: PMessage,
}

export interface RemoveMsgEvent {
    kind: "remove"
    id: string
}

// Considerations
export interface WSConsidered {
    id: string
    name: string
    thoughts: string
    interest: "none" | "minimal" | "some" | "a lot" | "overwhelming"
    status: "ready" | "unfinished" | "demo" | "upcoming" | "realized"
    planned_release?: string
}