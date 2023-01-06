<script lang="ts">
	import Title from "$lib/title.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    const category_path = (category: string) => category === "all" ? '/babel' : `/babel/room/${category}`;
</script>

<div class="flex flex-col items-center gap-2">
    <Title>
        <h1> Babel </h1>
    </Title>

    <div class="flex rounded-2 overflow-hidden">
        {#each data.categories as category}
            <a href={category_path(category)} class="category-btn" class:active={data.active_category === category}> {category} </a>
        {/each}
    </div>

    <slot></slot>
</div>

<style lang="scss">
    .category-btn {
        padding: 1em 2em;
        background: var(--base-col-1);
        color: var(--base-col-3);
        cursor: pointer;
        font-size: .9em;
        text-decoration: none;

        &.active {
            background: var(--base-col-3);
            color: var(--base-col-1);
            cursor: default;
        }

        &:not(.active):hover {
            padding: 1em 3em;
            background: var(--saturated-col-1);
            color: var(--saturated-col-3);
        }
    }
</style>