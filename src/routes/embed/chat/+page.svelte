<script lang="ts">
	import { stores } from "$lib/stores/site-data";
	import { is_emoji_run, is_link_run, is_text_run, type PEmojiRun, type PMessage, type PTextRun } from "$lib/stores/youtube.type";
	import autoAnimate from "@formkit/auto-animate";

    import "../../../app.scss";

    let chat = [] as [string, PMessage][];
    stores?.chat.subscribe(msgs => chat = msgs);

    $: formatted_chat = [...chat].reverse();

    const id_to_hue = {} as {[key: string]: number}
    const get_hue = (id: string) => {
        if (id in id_to_hue) return id_to_hue[id];
        else {
            const random_hue = Math.round(Math.random() * 359);
            id_to_hue[id] = random_hue;
            return random_hue;
        }
    }

    const debug = false;
    if (debug) {
        setInterval(() => chat = [...chat, [`message-${chat.length}`, {
            author: {
                name: "TestBot",
                id: `message-1`,
                types: [],
                profileIcon: {
                    src: "https://files.enbyss.com/images/enbyss.png",
                    alt: "enbyss",
                }
            },
            message: [
                {
                    type: "text",
                    text: "This is a demo text.",
                } as PTextRun,
                {
                    type: "emoji",
                    src: "https://files.enbyss.com/images/enbyss.png",
                    alt: "enbyss",
                } as PEmojiRun
            ],
            messageId: `message-${chat.length}`,
            timestamp: new Date().toDateString(),
        }]], 1000);
    }
</script>

<ul class="chat-box" use:autoAnimate>
    {#each formatted_chat as [id, message] (id)}
        <li class="chat-message">
            <img class="author-img" src={message.author.profileIcon.src} alt={message.author.profileIcon.alt} />
            <span style="filter: hue-rotate({get_hue(message.author.id)}deg) saturate(200%) invert(1);" class="author"> {message.author.name} </span>
            <span class="message">
                {#each message.message as element}
                    {#if is_text_run(element)}
                        <span class="text"> {element.text} </span>
                    {:else if is_link_run(element)}
                        <a class="link" href={element.url}> {element.text} </a>
                    {:else if is_emoji_run(element)}
                        <img class="emoji" src={element.src} alt={element.alt} />
                    {/if}
                {/each}
            </span>
        </li>
    {/each}
</ul>

<style lang="scss">
    * {
        font-family: "Fraunces";
    }

    .chat-box {
        padding: 0;
        display: flex;
        flex-direction: column-reverse;
        height: 100vh;
        width: 100vw;
        position: absolute;
        bottom: 0;
        left: 0;
        overflow: auto;
        scrollbar-width: none;

        --dark: hsl(340 70% 10%);
        --light: hsl(340 50% 85%);

        color: var(--light);
        --shadow-col: var(--dark);
        text-shadow: 
            -1px -1px 2px var(--shadow-col),
            -1px 1px 2px var(--shadow-col),
            1px -1px 2px var(--shadow-col),
            1px 1px 2px var(--shadow-col);
    }

    .chat-message {
        margin-bottom: .4em;
        list-style-type: none;
        font-size: 1.4em;

        &:hover {
            filter: invert(1);
            user-select: none;
            cursor: pointer;
        }

        .author-img {
            max-width: 1em;
            border-radius: 50%;
        }
        .author {
            font-weight: 800;
            font-style: italic;
            margin-right: .5em;
        }
        .message {
            font-weight: 500;
            .emoji {
                max-width: 1em;
            }
        }
    }
</style>