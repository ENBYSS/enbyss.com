<script lang="ts">
    import OptionBar from "./option-bar.svelte";
	import { theme } from "./stores";
</script>

<OptionBar
    options={["abyss", "nebula", "the-star", "nightlife", "citrivoid"]}
    initial="abyss"
    bind:picked={$theme}
/>