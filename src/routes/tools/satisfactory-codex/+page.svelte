<script lang="ts">
	import Head from "$lib/head.svelte";
	import Title from "$lib/title.svelte";
	import autoAnimate from "@formkit/auto-animate";
	import type { PageData } from "./$types";
	import { group_recipes_by_output } from "./recipe-service";
	import Recipe from "./recipe.svelte";

    export let data: PageData;

    let groups = Object.entries(group_recipes_by_output()).map(entry => ({
        name: entry[0],
        recipes: entry[1],
    }));

    let visible_groups = groups;

    let query = data.query;

    $: if (query === "") {
        visible_groups = groups;
    }
    $: if (query) {
        visible_groups = groups.filter(group => query === "" || group.name.includes(query.toLowerCase()));
    }
</script>

<Head
    title={`Satisfactory Codex (${query === "" ? 'all' : query})`}
    description="Combine multiple groups of markers from separate videos into a single list."
    image="backgrounds/dark.webp"
/>

<div class="codex-container">
    <Title>
        <h2 class="title"> Satisfactory Codex </h2>
        <p class="version"> (v0.2.1) </p>
    </Title>

    <div class="query-container">
        <input class="item-query" type="text" bind:value={query} placeholder="enter item name here..." />
    </div>

    <ul class="recipe-list" use:autoAnimate>
        {#each visible_groups as item (item.name)}
            <li class="recipe-item">
                <Recipe {item}/>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    :global(li) {
        list-style: none;
    }
    :global(ul) {
        padding: 0;
    }
    .version {
        font-family: "IBM Plex Mono";
        font-weight: 700;
    }
    .query-container {
        margin-top: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item-query {
        width: 100%;
        padding: .7em 1.4em;
        font-family: "IBM Plex Mono";
        background: var(--base-col-1);
        color: var(--base-col-3);
        outline: none;
        border: none;
        border-radius: .8em;
    }
    .codex-container {
        max-width: 800px;
    }
    .recipe-list {
        width: 100%;
    }
    .recipe-item {
        background: var(--base-col-3);
        padding: 1em 1em;
        margin: 1em 0;
        width: 100%;
        border-radius: .8em;
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box;    /* Firefox, other Gecko */
        box-sizing: border-box;         /* Opera/IE 8+ */
    }
</style>