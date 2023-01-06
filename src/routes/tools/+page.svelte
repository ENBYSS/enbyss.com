<script lang="ts">
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

<OptionBar
    options={["all"].concat(data.tools.map(t => t.name.toLowerCase()))}
    initial={"all"}
    bind:picked={active}
/>

<ToolList tools={tools}/>