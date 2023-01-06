<script lang="ts">
    import type { PageData } from "./$types";
	import PostList from "./post-list.svelte";

    export let data: PageData;
</script>

<PostList posts={data.posts} />