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

        <div class="flex flex-wrap gap-3">
            {#each valid_filters.status as status (status)}
                <button class={`btn px-4 ${currentStatus === status ? '!invert-100' : ''}`} on:click={() => currentStatus = status}> 
                    {status}
                </button>
            {/each}
        </div>

        <Title>
            <h2> Type Filters </h2>
        </Title>

        <div class="flex flex-wrap gap-3">
            {#each valid_filters.type as type (type)}
                <button class={`btn px-4 ${currentType === type ? '!invert-100' : ''}`} on:click={() => currentType = type}> 
                    {type}
                </button>
            {/each}
        </div>

        <Title>
            <h2> Edit Filters </h2>
        </Title>

        <div class="flex flex-wrap gap-3">
            {#each valid_filters.edit as edit (edit)}
                <button class={`btn px-4 ${currentEdit === edit ? '!invert-100' : ''}`} on:click={() => currentEdit = edit}> 
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