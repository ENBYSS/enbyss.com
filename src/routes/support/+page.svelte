<script lang="ts">
	import { fix_and_outro_and_destroy_block } from "svelte/internal";
	import type { PageData } from "./$types";
	import Metric from "./metric.svelte";

    export let data: PageData;

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

<div class="flex flex-col gap-8">
    <div class="flex flex-wrap w-screen justify-center gap-5">
        <Metric
            label="main"
            value={data.youtube.stats.main.subs}
            bgColor="var(--youtube)"
            goal="1000"
            link="/main"
            cache_date={new Date().toString()}
        />
        <Metric
            label="patreon"
            value={`$${(data.patreon.members.reduce((a, b) => a + b.pledge_amount, 0) * .89)/100}`}
            bgColor="var(--patreon)"
            goal="$50.00"
            link="/patreon"
            cache_date={new Date().toString()}
        />
    </div>

    <div class="box max-w-800px w-95% mx-auto px-5 text-center shadow-3xl flex flex-col gap-5 grow">
        <h1 class="text-7 text-contrast font-700">
            <a class="italic font-700" href="/patreon">Patrons</a> of the Void
        </h1>

        {#each [...data.patreon.tiers].sort((a, b) => a.attributes.amount_cents ? -1 : 1) as tier}
            <div>
                <h2 class="text-7 font-600 italic text-base-col-2"> {tier.attributes.title} </h2>
                {#each data.patreon.members.filter(m => m.pledge_amount === tier.attributes.amount_cents) as member}
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
            {#each data.tips as tip}
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