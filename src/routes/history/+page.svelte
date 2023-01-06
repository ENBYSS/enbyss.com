<script lang="ts">
    import Title from "$lib/title.svelte";
import type { PageData } from "./$types";
	import Cluster from "./cluster.svelte";

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

<div class="flex flex-col items-center gap-3">
    <Title>
        <h1> History </h1>
    </Title>

    <div class="flex flex-col gap-3 items-center px-8">
        <Title>
            <h2> Status Filters </h2>
        </Title>

        <div class="option-container">
            {#each valid_filters.status as status (status)}
                <button class:active={currentStatus === status} class="option-btn" on:click={() => currentStatus = status}> 
                    {status}
                </button>
            {/each}
        </div>

        <Title>
            <h2> Type Filters </h2>
        </Title>

        <div class="option-container">
            {#each valid_filters.type as type (type)}
                <button class:active={currentType === type} class="option-btn" on:click={() => currentType = type}> 
                    {type}
                </button>
            {/each}
        </div>

        <Title>
            <h2> Edit Filters </h2>
        </Title>

        <div class="option-container">
            {#each valid_filters.edit as edit (edit)}
                <button class:active={currentEdit === edit} class="option-btn" on:click={() => currentEdit = edit}> 
                    {edit}
                </button>
            {/each}
        </div>

        <Title>
            <h3> {filteredHistory.length} entries </h3>
        </Title>
    </div>

    <div class="max-w-800px flex flex-col gap-4">
        {#each filteredHistory as entry (entry.id)}
            <Cluster
                item={entry}
                edited={entry.edited}
                videos={entry.videos}
            />
        {/each}
    </div>
</div>

<style lang="scss">
    .option-container {
        display: flex;
        flex-wrap: 1;
        border-radius: .5em;
        overflow: hidden;
    }

    .option-btn {
        padding: .6em 1em;
        background: var(--base-col-1);
        color: var(--base-col-3);
        cursor: pointer;

        &.active {
            background: var(--base-col-3);
            color: var(--base-col-1);
            cursor: default;
        }

        &:hover:not(.active) {
            background: var(--saturated-col-1);
            color: var(--saturated-col-3);
            padding: .6em 1.5em;
        }
    }
</style>