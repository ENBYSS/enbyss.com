<script lang="ts">
	import Head from "$lib/head.svelte";
	import IpxImage from "$lib/ipx-image.svelte";
	import type { PageData } from "./$types";

    export let data: PageData;

    const metadata = data.meta;

    console.log(metadata);

    const format_date = (date: string) => new Date(date).toLocaleDateString('en', {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
</script>

<Head
    title={metadata.title}
    description="{metadata.description} - {metadata.credit ? `Written by ${metadata.credit.writers.join(', ')} and edited by ${metadata.credit.editors.join(', ')}` : 'by enbyss'}"
    image={`babel/${metadata.image?.src ?? 'backgrounds/dark.webp'}`}
>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css" integrity="sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET" crossorigin="anonymous">
</Head>

<article class="box shadow-2xl rounded-3 mx-auto max-w-80ch flex flex-col items-center pt-0 pb-8 mb-16 h-entry overflow-hidden">
    {#if metadata.image && metadata.image.src && metadata.image.src !== 'generic.png'}
        <div class="w-120% overflow-hidden">
            <IpxImage 
                css="w-full h-full"
                src={`babel/${metadata.image.src}`} 
                alt={metadata.image.alt}
                ipx={{
                    format: "webp",
                    width: 800,
                    height: 300,
                    quality: 80,
                    enlarge: true,
                }}
            />
        </div>
    {/if}

    <h1 class="mt-6 text-8 font-700 italic p-name text-pop-col-1"> {metadata.title} </h1>
    <h2 class="text-5 font-500 italic text-pop-col-2 p-summary -mt-1"> {metadata.description} </h2>

    <h3 class="mt-1">
        <span class="text-4 font-400 text-base-col-2">
            <span class="font-500 text-pop-col-1"> Created: </span>
            {format_date(metadata.createdAt)}
        </span>
        {#if metadata.updatedAt !== metadata.createdAt}
            //
            <span class="text-4 font-400 text-base-col-2">
                <span class="font-500 text-pop-col-1"> Updated: </span>
                {format_date(metadata.updatedAt)}
            </span>
        {/if}
    </h3>

    <h3 class="text-4 font-400">
        {#if metadata.credit}
            <p class="text-pop-col-1">
                Written by
                <span class="h-card p-author mincontent text-base-col-2 font-500">
                    {metadata.credit.writers.join(', ')}
                </span>
            </p>

            <p class="text-pop-col-1">
                Edited by
                <span class="h-card p-editor mincontent text-base-col-2 font-500">
                    {metadata.credit.editors.join(', ')}
                </span>
            </p>
        {:else}
            <p class="text-pop-col-1">
                By
                <a class="h-card p-author mincontent text-base-col-2 font-500" rel="author" href="https://enbyss.com">
                    <IpxImage 
                        css="icon u-photo w-5 inline" 
                        src="enbyss.png" 
                        alt="Me, heavily edited." 
                        ipx={{
                            width: 30,
                        }}
                    />
                    ENBYSS
                </a>
            </p>
        {/if}
        <span class="reading-time">
            ~{metadata.readingTime.text} 
        </span>
    </h3>

    <hr class="mx-auto my-5 bg-pop-col-1 border-none h-1 w-full"/>

    <div class="prose font-400 text-3.7 text-left e-content w-full">
        <svelte:component this={data.content}/>
    </div>
</article>

<style lang="scss">
    :root {
        --shiki-color-text:                 hsl(20, 0%, 90%);             /* Normal text */
        --shiki-color-background:           hsl(290 100% 10% / 80%);    /* Ignored because tailwind prose */
        --shiki-token-constant:             hsl(290, 100%, 70%);          /* Constants */
        --shiki-token-string:               hsl(20, 90%, 50%);            /* No idea what this is assigned to. */
        --shiki-token-comment:              hsl(290, 40%, 75%);           /* Comments */
        --shiki-token-keyword:              hsl(350, 100%, 80%);          /* Keywords */
        --shiki-token-parameter:            hsl(20, 100%, 100%);          /* Parameters */
        --shiki-token-function:             hsl(260, 100%, 80%);          /* Function */
        --shiki-token-string-expression:    hsl(190, 100%, 70%);          /* String expression */
        --shiki-token-punctuation:          hsl(20, 100%, 80%);           /* Punctuation */
        --shiki-token-link:                 hsl(20, 100%, 0%);            /* No idea what this is assigned to. */

        --un-prose-code: var(--text-base-col-2);
    }

    :global(.prose) {
        max-width: 80ch !important;
    }

    :global(.prose :is(h1, h2, h3, h4, h5, h6, b, strong)) {
        color: var(--pop-col-1);
    }

    :global(.prose :is(i, em)) {
        color: var(--saturated-col-1);
    }

    :global(.prose :is(code):not(:where(pre, pre *))) {
        background: var(--pop-col-3);
        color: var(--pop-col-1);
        padding: .1em .6em;
        border-radius: .4em;
    }

    .reading-time {
        font-size: .9em;
        font-style: italic;
        font-weight: 400;
    }

    :global(.prose :is(table)) {
        width: fit-content;
        margin: 0 auto;
        border-spacing: .8em 0em;
        border-collapse: separate;
    }

    :global(.prose table thead :is(th)) {
        background: var(--saturated-col-1);
        color: var(--saturated-col-3);
        border-radius: .5em;
    }
</style>