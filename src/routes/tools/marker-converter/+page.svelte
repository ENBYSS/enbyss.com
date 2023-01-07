<script lang="ts">
	import Head from "$lib/head.svelte";
	import Title from "$lib/title.svelte";
	import { process_csv, process_marker_data } from "./csv-processor";

    let processed_edl: string | undefined; 
    
    interface InputEvent extends Event {
        target: HTMLInputElement & EventTarget
    }

    const on_file_change = (event: Event) => {
        processed_edl = undefined;
        const file = (event as InputEvent).target.files![0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const contents = event.target?.result?.toString();

            if(!contents) {
                alert("couldn't find contents of file.");
                return;
            }

            const marker = process_csv(contents);
            processed_edl = process_marker_data(marker);
        }

        reader.onerror = (error) => {
            alert(`something went wrong: ${error}`);
        }
        reader.readAsText(file);
    }
</script>

<Head
    title="Twitch-Resolve Marker Converter"
    description="Converts Twitch markers into an EDL file that can be used by Davinci Resolve."
    image="markerconverter.png"
/>

<div class="tool-container">
    <Title>
        <h2> Twitch-Resolve Marker Converter </h2>
    </Title>
    <input class="file-input" type="file" on:change={on_file_change} />
    {#if processed_edl}
        <div class="download-btn-container">
            <a id="download-btn" href={processed_edl} download="twitch_markers.edl" target="_blank" rel="noreferrer">
                <div class="i-material-symbols:cloud-download" />
            </a>
        </div>
    {/if}

    <div class="description">
        <p>
            This tool helps convert your twitch markers into <b>EDL</b> - a format used by Davinci Resolve for markers, amongst other things.
        </p>
        <p>
            First, you'll need to download your markers from Twitch - they should be in the CSV format. Then, upload that file here, and
            the tool will process it into an EDL file that can be downloaded.
        </p>
        <p>
            <b>Note:</b> This format is specifically for <i>Resolve</i> only. It will <i>not</i> work for other editors, as different editors
            use different flavours of EDL.
        </p>
        <p>
            If you need more details, I <a href="https://youtu.be/SJ867oKZhuM"> made a video </a> to help explain how to use the tool.
        </p>

        <hr>

        <p>
            For those curious among you, I plan on someday making an article to explain what the code is doing - both for documentation and to spread
            knowledge. This time I mean it.
        </p>
    </div>
</div>

<style lang="scss">
    .tool-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;

        max-width: 800px;

        input {
            background: var(--saturated-col-3);
            color: var(--saturated-col-1);
            padding: .8em 1.5em;
            border-radius: .5em;
        }

        b {
            color: var(--saturated-col-1);
        }
        i {
            color: var(--pop-col-1);
        }

        #download-btn {
            background: var(--saturated-col-1);
            color: var(--saturated-col-3);
            padding: .6em 3em;;
            border-radius: 1em;
            display: inline-block;

            &:hover {
                transform: scale(1.2);
            }

            div {
                transform: scale(1.5);
            }
        }

        .description {
            display: flex;
            flex-direction: column;
            gap: .6em;

            background: var(--base-col-3);
            color: var(--base-col-1);
            padding: 1.2em 2em;
            border-radius: .8em;
            align-items: center;

            p {
                font-size: 1em;
                width: 100%;
            }

            hr {
                background: var(--saturated-col-1);
                width: 50%;
                height: 5px;
                border: none;
                outline: none;
                margin: 1em;
            }
        }
    }
</style>