<script lang="ts">
    import type { PageData } from "./$types";
    import Title from "$lib/title.svelte";
	import Cluster from "./cluster.svelte";
    import autoAnimate from "@formkit/auto-animate";
	import OptionBar from "$lib/option-bar.svelte";
	import Head from "$lib/head.svelte";

    export let data: PageData;

    const valid_filters = {
        status: [ "all", "in_progress", "complete", "hiatus", "suspended", "perpetual" ],
        type: [ "all", "single", "series" ],
        edit: [ "all", "edited", "unedited" ],
    }

    let currentStatus = "all"
    let currentType = "all"
    let currentEdit = "all"

    let filteredHistory = data.history.map(item => ({ ...item, edited: (item.videos.length > 0 ? 'edited' : 'unedited') as "edited" | "unedited"}));

    $: if(currentStatus || currentType || currentEdit) {
        filteredHistory = data.history
            .filter(item => currentStatus === "all" || item.status === currentStatus)
            .filter(item => currentType === "all" || item.type === currentType)
            .map(item => ({
                ...item,
                edited: (item.videos.length > 0 ? 'edited' : 'unedited') as "edited" | "unedited",
            }))
            .filter(item => currentEdit === "all" || item.edited === currentEdit);
    }
</script>

<Head
    title="History"
    description="A historical look at all previous streams."
    image="metadata/history.png"
/>

<div class="flex flex-col items-center gap-3">
    <Title>
        <h1> History </h1>
    </Title>

    <div class="flex flex-col gap-3 items-center px-8">
        <Title>
            <h2> Status Filters </h2>
        </Title>

        <OptionBar
            options={valid_filters.status}
            initial="all"
            bind:picked={currentStatus}
        />

        <Title>
            <h2> Type Filters </h2>
        </Title>

        <OptionBar
            options={valid_filters.type}
            initial="all"
            bind:picked={currentType}
        />

        <Title>
            <h2> Edit Filters </h2>
        </Title>

        <OptionBar
            options={valid_filters.edit}
            initial="all"
            bind:picked={currentEdit}
        />

        <Title>
            <h3> {filteredHistory.length} entries </h3>
        </Title>
    </div>

    <ul class="cluster-container" use:autoAnimate>
        {#each filteredHistory as entry (entry.id)}
            <Cluster
                item={entry}
                edited={entry.edited}
                videos={entry.videos}
            />
        {/each}
    </ul>
</div>

<style lang="scss">
    .cluster-container {
        display: flex;
        flex-direction: column;
        gap: 1em;
        flex: 1 1 0px;
        max-width: 800px;
        padding: 0;
    }
</style>