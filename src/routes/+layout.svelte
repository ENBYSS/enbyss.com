<script lang="ts">
	import Ticker from "$lib/ticker.svelte";
	import Sidebar from "$lib/sidebar.svelte";

    import "uno.css";
    import "../app.scss";
	import type { PageData } from "./$types";
	import { theme } from "$lib/stores";
	import IpxImage from "$lib/ipx-image.svelte";
	import { page } from "$app/stores";
	import { fly } from "svelte/transition";

    const theme_bgs = {
        "abyss": "dark.webp",
        "nebula": "light.webp",
        "the-star": "synthwave-bg.jpg",
        "nightlife": "synthwave-bg.jpg",
        "citrivoid": "orange.png",
    } as any;

    export let data: PageData;
</script>

<div class={$theme}>
    <Sidebar />
    
    <div class="fixed w-full h-10 top-0 left-0 z-30">
        <Ticker ticker_duration={30} repeat={2}>
            {#each data.messages as message}
                <span class="inline-block mx-40"> { message } </span>
            {/each}
        </Ticker>
    </div>

    <div class="h-15" id="_tickerbuffer"></div>

    <div id="background">
        <!-- <img src="https://enbyss.com/_ipx/w_400,q_70/https://files.enbyss.com/images/backgrounds/dark.webp" alt="background"/> -->
        <IpxImage src={`https://files.enbyss.com/images/backgrounds/${theme_bgs[$theme]}`} alt="background" ipx={{ width: 400, quality: 70 }} />
    </div>

    {#key data.pathname}
        <div in:fly={{ x: -10, duration: 200, delay: 200 }} out:fly={{ x: 5, duration: 200 }}>
            <slot />
        </div>
    {/key}
</div>

<div class="mb-30" />

<style lang="scss">
    #background {
        z-index: -1;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        
        :global(img) {
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -22;
        }
    }

    :global(h1, h2, h3, h4, p, a, figcaption, ul, li, table > *, input, textarea, div, button) {
        font-family: var(--main-font);
    }

    :global(div, p, span, a) {
        font-weight: 400;
        color: var(--base-col-1);
    }

    :global(a) {
        text-decoration: underline;
        &:link {
            color: var(--base-col-2);
        }
        &:visited {
            color: var(--saturated-col-1);
        }
    }

    :global(button) {
        border: none;
        outline: none;
    }

    :global(.btn) {
        border-radius: 1em;
        padding: .4em 1em;
        background: linear-gradient(90deg, var(--saturated-col-1), var(--saturated-col-2));
        filter: brightness(120%);
        color: var(--saturated-col-3);
        cursor: pointer;

        &:hover {
            filter: brightness(150%);
        }
    }

    .abyss {
        #background {
            filter: blur(15px) sepia(1.0) saturate(500%) hue-rotate(260deg) brightness(30%);
            transform: scale(1.1);
        }
    }

    .nebula {
        #background {
            filter: blur(15px) sepia(1.0) saturate(500%) hue-rotate(260deg) brightness(130%);
            transform: scale(1.1);
        }
    }

    .the-star {
        #background {
            filter: blur(30px) sepia(1.0) saturate(300%) hue-rotate(260deg) brightness(130%);
            transform: scale(1.1);
        }
    }

    .nightlife {
        #background {
            filter: blur(30px) sepia(1.0) saturate(500%) hue-rotate(260deg) brightness(30%);
            transform: scale(1.1);
        }
    }

    .citrivoid {
        #background {
            filter: blur(30px) sepia(1.0) saturate(500%) hue-rotate(-30deg) brightness(30%);
            transform: scale(1.1);
        }
    }
</style>