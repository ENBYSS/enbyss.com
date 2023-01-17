<script lang="ts">
	import Title from "$lib/title.svelte";
	import autoAnimate from "@formkit/auto-animate";
    import type { PageData } from "./$types";

    export let data: PageData;

    const dateFormat = (date: string) => new Date(date).toLocaleDateString('en', {
        month: "short",
        day: "numeric",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    });

    let reveal = [] as string[];

    const toggle = (date: string) => {
        if (reveal.includes(date)) {
            reveal = reveal.filter(d => d !== date);
        }
        else {
            reveal = [...reveal, date];
        }
    }
</script>

<div class="page-wrapper">
    <Title>
        <h1> Takeovers </h1>
    </Title>

    {#each data.takeovers as group (group.from)}
        <div class="takeover-cluster" use:autoAnimate>
            <button class="time-period" on:click={() => toggle(group.from)}>
                <date datetime={group.from}>{dateFormat(group.from)}</date>
                ~
                <date datetime={group.to}>{dateFormat(group.to)}</date>
            </button>
            {#if reveal.includes(group.from)}
                {#each group.items as message}
                    {#if message.message.length > 0 }
                        <div class="message-box">
                            <p class="message"> {message.message} </p>
                            <p>
                                <span class="author"> {message.by} </span>
                                <span class="timestamp"> {dateFormat(message.at)} </span>
                            </p>
                        </div>
                    {/if}
                {/each}
            {/if}
        </div>
    {/each}
</div>

<style lang="scss">
    .page-wrapper {
        margin: 0 auto;
        max-width: 800px;

        .takeover-cluster {
            background: var(--base-col-3);
            border-radius: 1em;
            padding: 1em;
            margin-top: .8em;

            .time-period {
                font-size: 2em;
                margin: 0 auto;
                padding: .3em 0;
                width: 100%;
                text-align: center;
                border-radius: 1em;
                cursor: pointer;

                background: var(--base-col-3);
                color: var(--base-col-1);

                date {
                    color: var(--saturated-col-1);
                }

                &:hover {
                    background: var(--saturated-col-1);
                    date {
                        color: var(--saturated-col-3);
                    }
                }
            }

            .message-box {
                margin: 1em 0;
                .author {
                    color: var(--saturated-col-1);
                    font-style: italic;
                }
                .timestamp {
                    color: var(--pop-col-1);
                    font-style: italic;
                }
            }
        }
    }
</style>