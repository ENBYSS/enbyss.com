<script lang="ts">
    export let label: string
    export let value: string
    export let goal: string
    export let bgColor: string
    export let link: string
    export let cache_date: string | undefined

    let cssProps = [
        `--label-bg: ${bgColor}`,
    ].join(';\n');

    const formatted_date = (() => {
        if (!cache_date) return;
        return new Date(cache_date).toLocaleDateString('en', {
            month: "short",
            day: "numeric",
            hour12: false,
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        })
    })();
</script>

<a href={link} style={cssProps} class="metric w-96 h-30 text-center flex rounded-r-md shadow-2xl relative gap-4">
    <div class="text-xl metric-label text-left pt-4">
        {label}
    </div>

    <div class="flex flex-col grow justify-end items-start pb-2">
        <div class="text-5xl text-base-col-1 -mb-2">
            {value}
        </div>
        <div class="text-2xl font-600 text-base-col-2 italic">
            Goal: <span class="text-saturated-col-1 font-500"> {goal} </span>
        </div>
    </div>

    {#if formatted_date}
        <div class="absolute top-1 right-5 box block mx-auto bg-pop-col-1 text-pop-col-3 text-center shadow-lg px-2 py-1 text-3 rounded-md my-3">
            <i> {formatted_date} </i>
        </div>
    {/if}
</a>

<style lang="scss">
    .metric-label {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        transform: rotate(180deg);
        color: white;
        background: var(--label-bg);
    }

    .metric {
        text-decoration: none !important;
    }
</style>