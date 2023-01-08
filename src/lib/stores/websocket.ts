import { browser } from "$app/environment";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client/build/esm/socket";
import type { Initial, AddMsgEvent, RemoveMsgEvent, WSTip, WSVideo, WSYoutube, WSPatreon, WSStream, WSScheduleItem, WSConsidered } from "./websocket.type";

interface ServerToClientEvents {
    "initialize": (data: Initial) => void;
	"chat:add": (msg: AddMsgEvent) => void;
	"chat:remove": (msg: RemoveMsgEvent) => void;
	"kofi:tip:add": (tip: WSTip) => void;
	"video:add": (video: WSVideo) => void;
	"stream:connect": (streamId: string) => void;
    "stream:disconnect": () => void;

    // Updaters
    "update:youtube": (data: WSYoutube) => void;
    "update:patreon": (data: WSPatreon) => void;
    "update:tips": (data: WSTip[]) => void;
    "update:streams": (data: WSStream[]) => void;
    "update:videos": (data: WSVideo[]) => void;
    "update:schedule": (data: WSScheduleItem[]) => void;
    "update:ticker": (data: string[]) => void;
    "update:considered": (data: WSConsidered[]) => void;
}

interface ClientToServerEvents {
    "ready": () => void;
}

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
export const setup_ws = () => {
    const socket: SocketType = io("https://ws.enbyss.com");

    return {
        socket,
    }
}

export let socket: SocketType;
if (browser) {
    socket = setup_ws().socket;
}