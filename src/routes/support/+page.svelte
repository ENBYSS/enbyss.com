<script lang="ts">
	import { browser } from "$app/environment";
	import Head from "$lib/head.svelte";
	import { stores } from "$lib/stores/site-data";
	import { fix_and_outro_and_destroy_block } from "svelte/internal";
	import type { PageData } from "./$types";
	import Metric from "./metric.svelte";

    export let data: PageData;

    let youtube = data.youtube;
    let patreon = data.patreon;
    let tips = data.tips;

    let youtube_cache = new Date().toString();
    let patreon_cache = new Date().toString();

    stores?.youtube.set(youtube);
    stores?.patreon.set(patreon);
    stores?.tip.set(tips);

    stores?.youtube.subscribe(y => {
        youtube = y;
        youtube_cache = new Date().toString();
    });
    stores?.patreon.subscribe(p => {
        patreon = p;
        patreon_cache = new Date().toString();
    });
    stores?.tip.subscribe(t => tips = t);

    $: if (youtube) {
        console.log(`Update to YOUTUBE detected at ${new Date()}`);
        if (browser) console.log(youtube);
    }

    $: if (patreon) {
        console.log(`Update to PATREON detected at ${new Date()}`);
        if (browser) console.log(patreon);
    }

    const currency_map = {
        USD: '$',
        EUR: '?',
    } as any;

    const formatDate = (date: string) => new Date(date).toLocaleDateString('en', {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
</script>

<Head
    title="Support"
    description="Multiple statistics, and thanks for all of my supporters."
    image="backgrounds/dark.webp"
/>

<div class="flex flex-col gap-8">
    <div class="flex flex-wrap w-screen justify-center gap-5">
        <Metric
            label="main"
            value={youtube.stats.main.subs}
            bgColor="var(--youtube)"
            goal="1000"
            link="/main"
            cache_date={youtube_cache}
        />
        <Metric
            label="patreon"
            value={`$${(patreon.members.reduce((a, b) => a + b.pledge_amount, 0) * .89)/100}`}
            bgColor="var(--patreon)"
            goal="$50.00"
            link="/patreon"
            cache_date={patreon_cache}
        />
    </div>

    <div class="box max-w-800px w-95% mx-auto px-5 text-center shadow-3xl flex flex-col gap-5 grow">
        <h1 class="text-7 text-contrast font-700">
            <a class="italic font-700" href="/patreon">Patrons</a> of the Void
        </h1>

        {#each [...patreon.tiers].sort((a, b) => b.attributes.amount_cents - a.attributes.amount_cents) as tier}
            <div>
                <h2 class="text-7 font-600 italic text-base-col-2"> {tier.attributes.title} </h2>
                {#each patreon.members.filter(m => m.pledge_amount === tier.attributes.amount_cents) as member}
                    <span class="cursor-default px-3 py-1 rounded-3 text-3.8 hover:bg-base-col-3 hover:hue-rotate-180 hover:invert">
                        {member.name}
                    </span>
                {/each}
            </div>
        {/each}
    </div>

    <div class="box max-w-800px w-95% mx-auto px-5 text-center shadow-3xl flex flex-col gap-5 grow">
        <h1 class="text-7 text-contrast font-700">
            Abyssal <a class="italic font-700" href="/tip">Sponsors</a>
        </h1>

        <div class="flex flex-wrap justify-center gap-8">
            {#each tips as tip}
                <div class="hover:hue-rotate-40 hover:scale-110 hover:cursor-default max-w-80 text-left">
                    <span class="font-700 text-5 text-pop-col-1"> {tip.from} </span>
                    <span class="font-600 text-3 italic text-base-col-2"> {currency_map[tip.currency]} </span>
                    <br />
                    <i class="text-3.6"> {tip.message} </i>
                    <br />
                    <span class="text-3 text-faded"> {formatDate(tip.when)} </span>
                </div>
            {/each}
        </div>
    </div>
</div>