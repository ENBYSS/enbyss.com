<script lang="ts">
	import Head from "$lib/head.svelte";
	import { stores } from "$lib/stores/site-data";
	import Title from "$lib/title.svelte";
	import type { PageData } from "./$types";
	import Entry from "./entry.svelte";


    export let data: PageData;

    let schedule = data.schedule;
    stores?.schedule.set(schedule);
    stores?.schedule.subscribe(s => {
        console.log("NEW EVENT");
        schedule = s;
    });

    $: sorted_schedule = schedule.map(s => ({ ...s, when: Date.parse(s.when) }));

    $: {
        const now = Date.now();
        const score = (when: number) => when > now ? when * 1 : 1e20 - when;
        sorted_schedule = sorted_schedule.sort((a, b) => score(a.when) - score(b.when));
    }
</script>

<Head
    title="Schedule"
    description="The When and Where of things in the Abyss"
    image="metadata/schedules.webp"
/>

<div class="flex flex-col gap-3 items-center">
    <Title>
        <h1> Schedule </h1>
    </Title>

    <!-- Use live logic -->
    {#if false}
        <Title>
            <h2> Current </h2>
        </Title>

        <div class="mx-auto max-w-800px flex flex-col bg-saturated-col-2 mb-5 p-4 pb-8 gap-x-4 z-10 rounded-2">
            <h1 class="text-center text-xl font-semibold text-base-col-2 mb-2">
                <!-- stream name -->
            </h1>
            <div class="w-90% mx-auto">
                <div class="relative overflow-hidden rounded-md h-0 pb-[56.25%]">
                    <iframe class="absolute top-0 left-0 w-full h-full max-w-full"
                    src={`https://www.youtube-nocookie.com/embed/${undefined /* stream ID */}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    {/if}

    <!-- copy buttons -->

    <div class="entry-list">
        {#each sorted_schedule as item (item.name + item.subtitle)}
            <div class="entry" class:expired={item.when < Date.now()}>
                <Entry
                    time={item.when}
                    name={item.name}
                    subtitle={item.subtitle}
                    description={item.description}
                    link={item.link}
                    type={item.type}
                    image={item.image}
                />
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .entry-list {
        max-width: 800px;
        display: flex;
        flex: 1 1 0px;
        flex-direction: column;
        gap: .5em;
    }

    .entry {
        &.expired {
            filter: saturate(.7);
            transform: scale(.95);
        }
    }
</style>