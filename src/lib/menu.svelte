<script lang="ts">
    import { fly } from "svelte/transition";
	import { clickOutside } from "./directives/click_outside";
    export let groups: {
        name: string
        items: {
            label: string
            handler: () => any
        }[]
    }[]
    export let label: string;
    export let max_height: string = "9999px";

    let open = false;
    const toggle = () => open = !open;
</script>

<div class="w-full m-0 p-0" use:clickOutside on:click_outside={() => open = false}>
    <button class={`btn w-full !rounded-0 !py-2.5 ${open ? 'open-btn' : ''}`} on:click={toggle}>
        { label }
    </button>

    {#if open}
        <div transition:fly={{ y: -10, duration: 100 }} style={`max-height: ${max_height}`} class="z-99 box absolute mt-2 left-0 p-0 w-full origin-top-right items rounded-md bg-base-col-3 shadow-lg outline-white ring-opacity focus:outline-none overflow-auto">
            {#each groups as group (group.name)}
                <div class="flex flex-col gap-2 p-3">
                    <p class="text-sm italic font-bold"> { group.name } </p>
                    {#each group.items as item (item.label)}
                        <div>
                            <button on:click={item.handler} class="cursor-pointer hover:scale-105 menu-btn group">
                                { item.label }
                            </button>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .items > :not([hidden]) ~ :not([hidden]) {
        --tw-divide-y-reverse: 0;
        border-top-width: calc(2px * calc(1 - var(--tw-divide-y-reverse)));
        border-bottom-width: calc(2px * var(--tw-divide-y-reverse));
        --tw-divide-opacity: 1;
        border-color: var(--saturated-col-2);
    }

    .btn {
        &.open-btn {
            filter: hue-rotate(60deg);
        }
    }

    .menu-btn {
        background: var(--saturated-col-3);
        color: var(--saturated-col-1);
        padding: .5em 1.2em;
        border-radius: .5em;
    }
</style>