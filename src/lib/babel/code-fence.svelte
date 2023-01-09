<script lang="ts">
	import { fade } from "svelte/transition";
    import { elasticOut } from "svelte/easing";


    export let lang: string = "";
    export let code: string | null;
    export let title: string | null;
    export let raw_code: string | null;

    let copied_successfully = false;

    const display_language_map = {
        yaml: "yml",
        shell: "bash",
    } as any;

    const map_display_language = (str: string) => {
        return display_language_map[str.toLowerCase()] || str;
    };

    const copy_code = async () => {
        try {
            const copied = raw_code;
            if (copied) await navigator.clipboard.writeText(copied);
        } catch (e) {}
        copied_successfully = true;
    };

    $: if (copied_successfully) {
        setTimeout(() => copied_successfully = false, 1000);
    }
    $: title = title ?? map_display_language(lang);
</script>

<div class="code-wrapper">
    <div class="code-info">
        <button on:click={copy_code} class="copy-btn">
            {title} 
            <span class="copy-label"> ({copied_successfully ? 'copied!' : 'copy'}) </span>
        </button>
    </div>
    <div class="code-container">
        {@html code}
    </div>
</div>

<style lang="scss">
    .code-wrapper {
        width: 120%;
        margin: 0 -50px;
    }

    .code-info {
        background: var(--base-col-3);

        display: flex;
        gap: .5em;
        justify-content: flex-start;
        font-size: .9em;

        .copy-btn {
            font-family: var(--un-prose-font-mono);
            font-weight: 700;
            // padding: 
            background: var(--saturated-col-3);
            color: var(--saturated-col-1);

            padding: .3em 4em .3em 4em;
            width: 100%;
            border-radius: .5em;
            cursor: pointer;
            text-align: left;

            &:hover {
                filter: brightness(1.2);
            }

            .copy-label {
                font-size: .8em;
            }
        }
    }

    .code-container {
        :global(.shiki) {
            padding: 1em 3.4em 1em 3.4em;
            margin: 0;

            scrollbar-color: var(--base-col-1) var(--base-col-3);
            line-height: 1.5;
        }

        :global(.shiki::-webkit-scrollbar-thumb) {
            border-radius: .5em;
        }
    }
</style>