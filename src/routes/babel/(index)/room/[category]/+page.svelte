<script lang="ts">
	import { page } from "$app/stores";
	import PostList from "../../post-list.svelte";
import type { PageData } from "./$types";

    export let data: PageData;

    $: appropriate = data.posts.filter(p => p.meta.category === $page.params.category)
</script>

<PostList posts={appropriate} />