<script lang="ts">
	import Head from "$lib/head.svelte";
	import OptionBar from "$lib/option-bar.svelte";
    import type { PageData } from "./$types";
	import PostList from "./post-list.svelte";

    export let data: PageData;

    let active = "all";
    const sorted_posts = data.posts.sort((a, b) => Date.parse(b.meta.createdAt) - Date.parse(a.meta.createdAt))
    let posts = sorted_posts;

    $: if (active) {
        posts = sorted_posts.filter(p => active === "all" || p.meta.category === active);
    }
</script>

<Head
    title="Babel"
    description="Grand library of the Abyss - housing all of my writings."
    image="babel.png"
/>

<OptionBar
    options={data.categories}
    initial="all"
    bind:picked={active}
/>

<PostList {posts} />