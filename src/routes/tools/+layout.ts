import type { LayoutLoad } from "./$types"

type status =
    | "complete"
    | "in progress"
    | "upcoming"

export interface Tool {
    link: string
    name: string
    items: Array<{
        name: string
        description: string
        link: string
        status: status
    }>
}

const tools: Tool[] = [
    {
        link: "twitch",
        name: "Twitch",
        items: [
            {
                name: "Channel Point Icons",
                description: "Generate the icons for Twitch channel points, in all three sizes.",
                link: "channel-point-icons",
                status: "complete"
            },
            {
                name: "Twitch-Resolve Marker Converter",
                description: "Convert your twitch stream markers to EDL files for Davinci Resolve.",
                link: "marker-converter",
                status: "complete"
            },
        ]
    },
    {
        link: "satisfactory",
        name: "Satisfactory",
        items: [
            {
                name: "Item Codex",
                description: "Lookup for items and their recipes.",
                link: "codex",
                status: "complete",
            },
        ]
    },
    {
        link: "youtube",
        name: "Youtube",
        items: [
            {
                name: "Marker Combinator",
                description: "Combine markers from multiple videos. Useful for compilations.",
                link: "marker-combinator",
                status: "complete",
            },
        ]
    }
]

export const load = (async ({ url }) => {
    const active_category = url.pathname.match(/tools\/([a-z]+)/)?.[1] ?? "all";
    return {
        tools,
        active_category,
    };
}) satisfies LayoutLoad;