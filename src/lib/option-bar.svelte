<script lang="ts">
    export let options: string[];
    export let initial: string;
    export let picked: string = initial;
</script>

<div class="option-btn-container">
    {#each options as option}
        <button on:click={() => picked = option} class="option-btn" class:active={picked === option}>
            {option}
        </button>
    {/each}
</div>

<style lang="scss">
    .option-btn-container {
        display: flex;
        border-radius: .5em;
        overflow: hidden;
    }

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

    @media (max-width: 600px) {
        .option-btn-container {
            gap: .5em;
            flex-wrap: wrap;
            justify-content: center;
        }

        .option-btn {
            padding: .5em 1em;
            border-radius: .4em;

            &:not(.active):hover {
                padding: .5em 1em;
                background: var(--saturated-col-1);
                color: var(--saturated-col-3);
            }
        }
    }
</style>