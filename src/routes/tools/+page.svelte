<script lang="ts">
	import Head from "$lib/head.svelte";
    import OptionBar from "$lib/option-bar.svelte";
	import type { PageData } from "./$types";
	import ToolList from "./tool-list.svelte";

    export let data: PageData;
    let active: string;

    let tools = data.tools;

    $: if (active) {
        console.log(active);
        tools = data.tools.filter(t => active === "all" || t.name.toLowerCase() === active);
    }
</script>

<Head
    title="Tools"
    description="Things I've made to make other things easier."
    image="backgrounds/dark.webp"
/>

<div class="flex justify-center">
    <OptionBar
        options={["all"].concat(data.tools.map(t => t.name.toLowerCase()))}
        initial={"all"}
        bind:picked={active}
    />
</div>

<div class="mb-4"/>

<ToolList tools={tools}/>