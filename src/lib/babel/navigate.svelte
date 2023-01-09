<script lang="ts">
    export let prev: { link: string, name: string, disabled?: boolean } | undefined;
    export let next: { link: string, name: string, disabled?: boolean } | undefined;
</script>

<div class="link-container">
    {#if prev}
        <div class="link prev" class:disabled={prev.disabled}>
            <a href={prev.link}>
                <div class="icon i-mdi:chevron-left"/>
                {prev.name} 
            </a>
        </div>
    {/if}
    {#if next}
        <div class="link next" class:disabled={next.disabled}>
            <a href={next.link}> 
                {next.name} 
                <div class="icon i-mdi:chevron-right"/>
            </a>
        </div>
    {/if}
</div>

<style lang="scss">
    .link-container {
        display: block;

        .link {
            display: flex;
            align-items: center;

            &.disabled {
                user-select: none;
                cursor: default;
                filter: saturate(0);
                pointer-events: none;
            }
        }

        .prev {
            float: left;
        }

        .next {
            float: right;
        }

        .icon {
            transform: scale(1.5);
        }

        a {
            text-decoration: none;
        }
    }
</style>