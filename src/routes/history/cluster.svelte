<script lang="ts">
	import type { Video } from "./+page";

    interface StreamGroup {
        id: string
        name: string
        type: "series" | "single"
        link: string
        status: "in_progress" | "complete" | "hiatus" | "suspended" | "perpetual"
        reason: string
        started: string
        ended: string
        tags: string[]
    }

    const status_style = {
        "in_progress" : "hue-rotate-240",
        "complete" : "hue-rotate-60",
        "hiatus" : "hue-rotate-120",
        "suspended" : "saturation-0",
        "perpetual" : "hue-rotate-180",
    };

    const type_style = {
        "single" : "hue-rotate-150",
        "series" : "hue-rotate-300",
    };

    const edit_style = {
        "edited" : "hue-rotate-30",
        "unedited" : "hue-rotate-330",
    };

    export let item: StreamGroup;
    export let edited: "edited" | "unedited";
    export let videos: Video[];

    let opened: boolean = false;
</script>

<div class="box flex flex-col w-full gap-3">
    <!-- Name -->
    <div class="flex gap-4 items-center justify-center">
        <a href={item.link} class="font-600 text-base-col-2 text-6">
            {item.name}
        </a>
    </div>

    <!-- Info -->
    <div class="flex gap-4 items-center justify-center">
        <div class={`cursor-pointer hover:scale-110 px-3 py-1 font-500 bg-pop-col-3 rounded-2 text-pop-col-1 text-3 ${type_style[item.type]}`}>
            {item.type}
        </div>
        <div class={`cursor-pointer hover:scale-110 px-3 py-1 font-500 bg-pop-col-3 rounded-2 text-pop-col-1 text-3 ${status_style[item.status]}`}>
            {item.status}
        </div>
        <div class={`cursor-pointer hover:scale-110 px-3 py-1 font-500 bg-pop-col-3 rounded-2 text-pop-col-1 text-3 ${edit_style[edited]}`}>
            {edited}
        </div>
    </div>

    <!-- Reason -->
    {#if item.reason}
        <div class="flex gap-4 items-center justify-center">
            <div class="text-3.2 text-center">
                {item.reason}
            </div>
        </div>
    {/if}

    <!-- Dates -->
    <div class="flex gap-4 text-3.5 items-center justify-center">
        <span class="text-base-col-2">
            { new Date(item.started).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric"}) }
        </span>
        {#if item.ended}
            <span class="text-pop-col-1">
                ~
            </span>
            <span class="text-base-col-2">
                { new Date(item.ended).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric"}) }
            </span>
        {/if}
    </div>

    <!-- Tags -->
    {#if item.tags.length > 0}
        <div class="flex justify-center gap-2">
            {#each item.tags as tag}
                <span class="px-2 py-1 rounded-2 text-3 bg-pop-col-1 text-pop-col-3">
                    { tag }
                </span>
            {/each}
        </div>
    {/if}

    <!-- Videos -->
    {#if edited === "edited"}
        <button on:click={() => opened = !opened} class="btn">
            { opened ? 'Hide videos' : 'Show videos' }
        </button>
    {/if}

    {#if edited === "edited" && opened}
        <table class="text-left">
            <thead>
                <tr>
                    <th> Title/Link </th>
                    <th> Length </th>
                    <th> When </th>
                </tr>
            </thead>
            <tbody>
                {#each [...videos].sort((a, b) => new Date(a.when) > new Date(b.when) ? 1 : -1) as video}
                    <tr class="text-3.1">
                        <td><a href={video.link} class="text-base-col-2">
                            {video.name.slice(0, 40) + (video.name.length > 40 ? '...' : '')}
                        </a></td>
                        <td>
                            {video.timestamp}
                        </td>
                        <td>
                            {new Date(video.when).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "2-digit"})}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</div>