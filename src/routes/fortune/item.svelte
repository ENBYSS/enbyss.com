<script lang="ts">
	import type { Considered } from "./+page";

    export let item: Considered;

    const interest_style = {
        "none": "hue-rotate-30",
        "minimal": "hue-rotate-60",
        "some": "hue-rotate-90",
        "a lot": "hue-rotate-120",
        "overwhelming": "hue-rotate-150"
    }

    const status_style = {
        "ready": "hue-rotate-300",
        "unfinished": "hue-rotate-270",
        "demo": "hue-rotate-240",
        "upcoming": "hue-rotate-210",
    }
</script>

<div class="box max-w-700px text-left flex flex-col gap-1">
    <p class="text-5 font-600"> {item.name} </p>
    <div class="flex items-center gap-3 mb-2 text-3.2">
        <p class={`bg-pop-col-1 text-pop-col-3 px-3 py-1 rounded-2 ${interest_style[item.interest]}`}>
            interest:{item.interest}
        </p>
        <p class={`bg-pop-col-1 text-pop-col-3 px-3 py-1 rounded-2 ${status_style[item.status]}`}>
            status:{item.status}
        </p>
    </div>
    <p class="text-3.5"> {item.thoughts} </p>
    {#if item.planned_release}
        <p class="font-500 italic"> When?: {item.planned_release} </p>
    {/if}
</div>

