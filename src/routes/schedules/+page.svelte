<script lang="ts">
	import Title from "$lib/title.svelte";
	import type { PageData } from "./$types";
	import Entry from "./entry.svelte";


    export let data: PageData;
</script>

<div class="flex flex-col gap-3">
    <Title>
        <h1> Schedules </h1>
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

    <Title>
        <h2> Upcoming </h2>
    </Title>

    <!-- copy buttons -->

    {#each data.schedule as item (item.name + item.subtitle)}
        <div class="grow">
            <Entry
                time={Date.parse(item.when)}
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