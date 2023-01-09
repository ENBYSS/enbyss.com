import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { socket } from "./websocket";
import type { WSConsidered, WSPatreon, WSScheduleItem, WSStream, WSTip, WSVideo, WSYoutube } from "./websocket.type";
import type { PMessage, PTextRun } from "./youtube.type";

export const setup_youtube_data = () => {
    const { subscribe, set, update } = writable({} as WSYoutube);

    socket.on("update:youtube", data => {
        set(data);
    });

    return {
        set,
        subscribe,
    }
}

export const setup_patreon_data = () => {
    const { subscribe, set, update } = writable({} as WSPatreon);

    socket.on("update:patreon", data => {
        set(data);
    });

    return {
        set,
        subscribe,
    }
}

export const setup_tip_data = () => {
    const { subscribe, set, update } = writable([] as WSTip[]);

    socket.on("update:tips", data => {
        set(data);
    });

    return {
        set,
        subscribe,
    }
}

export const setup_stream_data = () => {
    const { subscribe, set, update } = writable([] as WSStream[]);

    socket.on("update:streams", data => {
        set(data);
    });

    return {
        set,
        subscribe,
    }
}

export const setup_video_data = () => {
    const { subscribe, set, update } = writable([] as WSVideo[]);

    socket.on("update:videos", data => {
        set(data);
    });

    return {
        set,
        subscribe,
    }
}

export const setup_schedule_data = () => {
    const { subscribe, set, update } = writable([] as WSScheduleItem[]);

    socket.on("update:schedule", data => {
        set(data);
    });

    return {
        set,
        subscribe,
    }
}

export const setup_ticker_data = () => {
    const { subscribe, set, update } = writable([] as string[]);

    socket.on("update:ticker", data => {
        set(data);
    });

    return {
        set,
        subscribe,
    }
}

export const setup_considered_data = () => {
    const { subscribe, set, update } = writable([] as WSConsidered[]);

    socket.on("update:considered", data => {
        set(data);
    });

    return {
        set,
        subscribe,
    }
}

export const setup_chat_data = () => {
    const { subscribe, set, update } = writable([] as [string, PMessage][]);

    const is_bot = (message: PMessage) : boolean => {
        const _checker = {
            message: (match: string) => !!message.message.find(m => (m as PTextRun).text?.toLowerCase().includes(match)),
            author: (match: string) => message.author.name.toLowerCase().includes(match),
        }

        const checker = {
            message: (...matches: string[]) => !!matches.find(m => _checker.message(m)),
            author: (...matches: string[]) => !!matches.find(m => _checker.author(m)),
        };

        const invalidate =
            checker.message(
                "xxx",
                "with hot girls"
            ) || checker.author(
                "adult",
                "sexchat",
                "xxx",
                "18",
                "info"
            );

        return invalidate; 
    }

    socket.on("chat:add", data => {
        if (!is_bot(data.msg)) update(curr => [...curr, [data.msg.messageId, data.msg]]);
        else console.warn(`Message flagged: (by: ${data.msg.author}) - ${data.msg.message}`);
    });

    socket.on("chat:remove", data => {
        update(curr => curr.filter(item => item[0] === data.id));
    });

    return {
        set,
        subscribe
    }
}

type Stores = {
    youtube: ReturnType<typeof setup_youtube_data>,
    patreon: ReturnType<typeof setup_patreon_data>,
    tip: ReturnType<typeof setup_tip_data>,
    stream: ReturnType<typeof setup_stream_data>,
    video: ReturnType<typeof setup_video_data>,
    schedule: ReturnType<typeof setup_schedule_data>,
    ticker: ReturnType<typeof setup_ticker_data>,
    considered: ReturnType<typeof setup_considered_data>,
    chat: ReturnType<typeof setup_chat_data>,
}

export let stores: Stores | undefined = undefined;

if (browser && !stores) {
    stores = {
        youtube: setup_youtube_data(),
        patreon: setup_patreon_data(),
        tip: setup_tip_data(),
        stream: setup_stream_data(),
        video: setup_video_data(),
        schedule: setup_schedule_data(),
        ticker: setup_ticker_data(),
        considered: setup_considered_data(),
        chat: setup_chat_data(),
    }
}