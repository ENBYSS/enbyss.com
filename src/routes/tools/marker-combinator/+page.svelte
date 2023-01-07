<script lang="ts">
	import Head from "$lib/head.svelte";
import Title from "$lib/title.svelte";
	import autoAnimate from "@formkit/auto-animate";

    const basic = {
        timestamp: "00:00:00",
        markers: "",
        offset: {
            negative: false,
            timestamp: "00:00:00",
        }
    };

    let markers = [{...basic}];

    let result = "";

    const add_marker = () => markers = [...markers, {...basic}];
    const remove_marker = (idx: number) => {
        if (markers.length < 2) return;
        const _temp = markers.slice(0);
        _temp.splice(idx, 1);
        markers = _temp;
    };

    const parse_timestamp = (timestamp: string) => {
        const elements = timestamp.split(":").reverse();
        return elements.map(Number).reduce((sum, fragment, i) => {
            return sum + (fragment * Math.min(1, (i * 60)))
        }, 0);
    }

    const to_timestamp = (time: number) => [
        Math.floor(time / 60 * 60),
        Math.floor(time / 60) % 60,
        time % 60,
    ].map(num => num.toLocaleString('en', { minimumIntegerDigits: 2 })).join(':');

    const parse_markers = (markers: string) => markers.split('\n').filter(e => e !== "").map(marker => {
        const match = marker.match(/((?:[0-9]{2}:)?[0-9]{2}:[0-9]{2}) [-:] (.*)/);
        if (!match || match.length !== 3) {
            throw `[${marker}] isn't a valid marker\n{HH:?MM:SS} - {name}`;
        }
        const [, timestamp, name] = match!;
        return { name, time: parse_timestamp(timestamp) }
    });

    const parse_data = () => markers.map(entry => ({
        time: parse_timestamp(entry.timestamp),
        markers: parse_markers(entry.markers),
        offset: parse_timestamp(entry.offset.timestamp),
    }));

    const combine_markers = () => {
        try {
            const data = parse_data();
            let prefix = 0;
            let combination: Array<{ name: string, time: number }> = [];

            for(const {time, markers, offset} of data) {
                prefix += offset;
                combination = combination.concat(markers.map(marker => ({
                    name: marker.name,
                    time: marker.time + prefix,
                })));
                prefix += time;
            }

            result = combination.map(marker => `${to_timestamp(marker.time)} - ${marker.name}`).join('\n');
        } catch (err) {
            alert("error - failed to process");
        }
    }
</script>

<Head
    title="Marker Combinator"
    description="Combine multiple groups of markers from separate videos into a single list."
    image="backgrounds/dark.webp"
/>

<Title>
    <h2> Marker Combinator </h2>
</Title>

<ul class="marker-list" use:autoAnimate>
    {#each markers as marker, i}
        <li class="marker">
            <div class="info">
                <h3 class="video-count"> Video #{i+1} </h3>
                <button class="delete-btn" on:click={() => remove_marker(i)}>
                    <div class="i-material-symbols:delete-forever-rounded"/>
                </button>
            </div>
            <div class="offset">
                <input class="offset-timestamp" bind:value={marker.offset.timestamp} type="text" placeholder="enter offset..." />
                <button class="offset-toggle" on:click={() => marker.offset.negative = !marker.offset.negative}>
                    {#if marker.offset.negative}
                        <div class="i-ic:baseline-minus"/>
                    {:else}
                        <div class="i-ic:baseline-plus"/>
                    {/if}
                </button>
            </div>
            <input class="length" bind:value={marker.timestamp} type="text" placeholder="enter video length..." />
            <textarea class="text-markers" bind:value={marker.markers} placeholder="enter markers..."/>
        </li>
    {/each}
</ul>

<div class="list-actions">
    <button on:click={() => add_marker()}>
        add video
    </button>
    <button on:click={() => combine_markers()}>
        combine
    </button>
</div>

<div class="result-section">
    <textarea class="result" bind:value={result} placeholder="result will show here..."/>
</div>

<style lang="scss">
    ul {
        padding: 0;
    }
    li {
        list-style-type: none;
    }

    .marker {
        background: var(--base-col-3);
        padding: 1em;

        .info {
            display: flex;
            gap: .5em;
            justify-content: center;
            align-items: center;

            .video-count {
                text-align: center;
                display: flex;
            }
            .delete-btn {
                background: var(--pop-col-1);
                color: var(--pop-col-3);
                padding: .3em 1em;
                margin-bottom: .4em;

                div {
                    transform: scale(1.2);
                }

                border-radius: .5em;
                cursor: pointer;

                &:hover {
                    transform: scale(1.2);
                }
            }
        }

        .offset {
            display: flex;
            justify-content: center;
            align-items: center;

            .offset-timestamp {
                text-align: right;
                background: var(--saturated-col-1);
                color: var(--saturated-col-3);
                font-family: "IBM Plex Mono";
                font-weight: 700;
                outline: none;
                border: none;
                border-top-left-radius: .5em;
                padding: .3em .5em;
                font-size: .9em;
            }

            .offset-toggle {
                background: var(--saturated-col-2);
                color: var(--saturated-col-3);
                padding: .4em .5em;
                font-size: .9em;
                border-top-right-radius: .5em;
                cursor: pointer;
            }
        }

        .length {
            display: block;
            width: 100%;
            padding: .5em 1em;
            border-radius: .5em .5em 0 0;
            border: none;
            outline: none;
            -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
            -moz-box-sizing: border-box;    /* Firefox, other Gecko */
            box-sizing: border-box;         /* Opera/IE 8+ */

            font-family: "IBM Plex Mono";
            background: var(--pop-col-1);
            color: var(--pop-col-3);
            font-weight: 700;
            font-size: 1em;
        }

        .text-markers {
            display: block;
            width: 100%;
            height: 15em;
            padding: .5em 1em;
            border-radius: 0 0 .5em .5em;
            border: none;
            outline: none;
            -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
            -moz-box-sizing: border-box;    /* Firefox, other Gecko */
            box-sizing: border-box;         /* Opera/IE 8+ */

            font-family: "IBM Plex Mono";
            background: var(--pop-col-1);
            color: var(--pop-col-3);
            font-weight: 600;
            font-size: .8em;
            resize: vertical;

            filter: brightness(.8);
        }
    }

    .list-actions {
        display: flex;
        justify-content: center;
        margin: .8em;
        gap: .4em;

        button {
            padding: .5em 2em;
            background: var(--saturated-col-1);
            color: var(--saturated-col-3);
            border-radius: .4em;
            cursor: pointer;
            &:hover {
                transform: scale(1.05);
            }
        }
    }

    .result-section {
        background: var(--base-col-3);
        padding: 1em;
        border-radius: .5em;

        .result {
            width: 100%;
            height: 15em;
            padding: .5em 1em;
            font-size: .8em;
            font-family: "IBM Plex Mono";
            background: var(--pop-col-1);
            color: var(--pop-col-3);
            border: none;
            outline: none;
            font-weight: 600;
            border-radius: .5em;
            -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
            -moz-box-sizing: border-box;    /* Firefox, other Gecko */
            box-sizing: border-box;  
            filter: brightness(.9);
            resize: vertical;
        }
    }
</style>