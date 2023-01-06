<script lang="ts">
    export let options: string[];
    export let initial: string;
    export let picked: string = initial;
</script>

<div class="flex rounded-2 overflow-hidden">
    {#each options as option}
        <button on:click={() => picked = option} class="option-btn" class:active={picked === option}>
            {option}
        </button>
    {/each}
</div>

<style lang="scss">
    .option-btn {
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