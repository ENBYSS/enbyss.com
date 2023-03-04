<script lang="ts">
	import Ticker from "$lib/ticker.svelte";
    import type { PageData } from "./$types";
    import "../../../app.scss";
    import "uno.css";
	import { stores } from "$lib/stores/site-data";

    export let data: PageData;

    let youtube = data.youtube;
    let tips = data.tips;

    stores?.youtube.set(youtube);
    stores?.tip.set(tips);

    stores?.youtube.subscribe(y => youtube = y);
    stores?.tip.subscribe(t => tips = t);

    const debug = false;
    const debug_time = (() => {
        const time = new Date();
        time.setHours(5);
        return time.getTime();
    })();

    let now = Date.now();
    setInterval(() => now = Date.now(), 1000);
    
    const time_from = (date?: number) => {
        if (!date) return "";
        const period = (now - date) / 1000;
        const [hrs, mins, secs] = [
            Math.floor(period / 60 / 60).toLocaleString('en', { minimumIntegerDigits: 2 }),
            Math.floor((period / 60) % 60).toLocaleString('en', { minimumIntegerDigits: 2 }),
            Math.floor(period % 60).toLocaleString('en', { minimumIntegerDigits: 2 }),
        ]
        return `${hrs}:${mins}:${secs}`;
    }

    let started_from: number;
    $: if (youtube.liveData) {
        started_from = Date.parse(youtube.liveData.started)
    }

    let stopwatch: string;
    $: if (now) {
        stopwatch = debug ? time_from(debug_time) : time_from(started_from);
    }

    const format_date = (date: Date) => date.toLocaleDateString("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
</script>

<div class="sub-count">
    <p class="count">{ youtube.stats.main.subs ?? Infinity }</p><div class="icon i-ph:spiral-duotone"/>
</div>

<div class="stream-length">
    <p> {stopwatch} </p>
</div>

<div class="tips">
    <Ticker 
        repeat={5}
        ticker_duration={40}>
        {#each tips as tip}
            <span class="tip-message">
                <span class="by"> {tip.from} </span>
                <span class="message"> "{tip.message}" </span>
                <span class="date"> {format_date(new Date(tip.when))} </span>
            </span>
        {/each}
    </Ticker>
</div>

<style lang="scss">

    :root {
        --bg: hsl(340 70% 30%);
        --txt: hsl(340 70% 90%);
    }

    .sub-count, .stream-length {
        font-family: "IBM Plex Mono";
        font-weight: 800;
    }

    .sub-count {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        background: var(--bg);
        color: var(--txt);
        font-size: 8em;
        padding: .05em .3em;
        border-bottom-right-radius: .1em;

        .count {
            margin: 0;
            display: inline;
        }

        .icon {
            transform: scale(.8);
        }
    }

    .stream-length {
        position: absolute;
        bottom: 0;
        right: 0;
        background: var(--bg);
        color: var(--txt);
        font-size: 7em;
        padding: .05em .3em;
        border-top-left-radius: .1em;

        p {
            margin: 0;
        }
    }

    :global(.text-lg) {
        line-height: 3rem !important;
    }
    
    :global(.tips) {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: var(--bg);
        color: var(--txt);
        padding: 1em 0 .6em 0;
        filter: brightness(80%);
        z-index: -1;
        font-family: "Fraunces";

        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box;    /* Firefox, other Gecko */
        box-sizing: border-box;         /* Opera/IE 8+ */

        .tip-message {
            font-size: 4em;
            margin-right: 1.5em;
            display: inline-block;

            .by {
                font-style: italic;
                margin-right: .4em;
                font-weight: 800;
            }

            .message {
                filter: hue-rotate(30deg);
                font-weight: 500;
                font-size: .9em;
            }

            .date {
                font-size: .6em;
                font-weight: 400;
            }
        }
    }
</style>