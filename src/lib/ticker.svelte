<script lang="ts">
    export let reversed: boolean = false;
    export let repeat: number;
    export let ticker_duration: number;
</script>

<div class="text-lg overflow-hidden ticker">
    <div class={`w-100000px ${reversed ? 'float-right' : 'float-left'}`}>
        {#each [...Array(repeat).keys()] as idx (idx)}
            <div class={`py-2 ${reversed ? 'scroll-reverse' : 'scroll'}`} style={ `animation-duration: ${ticker_duration}s` }>
                <slot />
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    :global(.abyss) {
        .ticker {
            background: linear-gradient(90deg, var(--base-col-3), var(--saturated-col-2));
        }
    }

    .scroll {
        animation-name: scrolling;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        float: left;
    }

    .scroll-reverse {
        animation-name: scrolling-reverse;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        float: right;
    }

    @keyframes scrolling {
        0% { transform:translateX(0); }
        100% { transform:translateX(-100%); }
    }

    @keyframes scrolling-reverse {
        0% { transform:translateX(0); }
        100% { transform:translateX(100%); }
    }
</style>