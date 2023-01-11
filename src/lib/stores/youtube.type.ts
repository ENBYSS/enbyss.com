export type PImage = {
    src: string
    alt: string
}

export interface PRun {
    type: "link" | "text" | "emoji"
}

export interface PTextRun extends PRun {
    type: "text"
    text: string
}

export interface PLinkRun extends PRun {
    type: "link"
    text: string
    url: string
}

export interface PEmojiRun extends PRun {
    type: "emoji"
    src: string
    alt: string
    isStandard: boolean
}

export const is_text_run = (value: PRun): value is PTextRun => value.type === "text";
export const is_link_run = (value: PRun): value is PLinkRun => value.type === "link";
export const is_emoji_run = (value: PRun): value is PEmojiRun => value.type === "emoji";

export interface PMessage {
    author: {
        name: string
        id: string
        types: string[]
        customBadge?: PImage
        profileIcon: PImage
        url?: string
    }
    message: PRun[]
    messageId: string
    timestamp: string
    timestampText?: string
    params?: string 
    // Special types
    superChat?: unknown
    superSticker?: unknown
    membership?: unknown
    membershipGiftPurchase?: unknown
    membershipGiftRedeem?: unknown
}