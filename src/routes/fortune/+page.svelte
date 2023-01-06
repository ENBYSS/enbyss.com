<script lang="ts">
	import Title from "$lib/title.svelte";
    import type { PageData } from "./$types";
	import Item from "./item.svelte";
    import autoAnimate from "@formkit/auto-animate";

    export let data: PageData;

    const interests = [
        "none",
        "minimal",
        "some",
        "a lot",
        "overwhelming"
    ];

    const status = [
        "ready",
        "unfinished",
        "demo",
        "upcoming",
    ]

    const filter = {
        interest: {
            allowed: [ "all" ].concat(interests),
            current: "all",
        },
        status: {
            allowed: [ "all" ].concat(status),
            current: "all",
        }
    }

    let fortunes = data.fortune;

    $: if (filter) {
        fortunes = data.fortune
            .filter(item => filter.interest.current === "all" || item.interest === filter.interest.current)
            .filter(item => filter.status.current === "all" || item.status === filter.status.current);
    }

    $: sorted = [...fortunes].sort((a, b) => {
        const interests = {
            "none": 1,
            "minimal": 2,
            "some": 3,
            "a lot": 4,
            "overwhelming": 5,
        }

        const status = {
            "ready": 100,
            "unfinished": 50,
            "demo": 25,
            "upcoming": 1,
        }

        const score = (item: typeof a) => interests[item.interest] * status[item.status];
        return score(a) > score(b) ? -1 : 1;
    });
</script>

<div class="flex flex-col gap-3">
    <Title>
        <h1> Fortune </h1>
    </Title>

    <p class="box px-8 max-w-700px font-300 text-3.5">
        A look into what I'm considering next, and what I <strong>am not.</strong>
    </p>

    <div class="flex flex-col gap-3 items-center px-8">
        <Title>
            <h2> Interest Filters </h2>
        </Title>

        <div class="option-container">
            {#each filter.interest.allowed as interest (interest)}
                <button class:active={filter.interest.current === interest} class="option-btn" on:click={() => filter.interest.current = interest}> 
                    {interest}
                </button>
            {/each}
        </div>

        <Title>
            <h2> Status Filters </h2>
        </Title>

        <div class="option-container">
            {#each filter.status.allowed as stat (stat)}
                <button class:active={filter.status.current === stat} class="option-btn" on:click={() => filter.status.current = stat}> 
                    {stat}
                </button>
            {/each}
        </div>
    </div>

    <ul class="flex flex-col gap-5" use:autoAnimate>
        {#each sorted as item (item.name)}
            <li class="grow">
                <Item {item}/>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    ul {
        padding: 0;
    }
    li {
        list-style: none;
    }

    .option-container {
        display: flex;
        flex-wrap: 1;
        border-radius: .5em;
        overflow: hidden;
    }

    .option-btn {
        padding: .6em 1em;
        background: var(--base-col-1);
        color: var(--base-col-3);
        cursor: pointer;

        &.active {
            background: var(--base-col-3);
            color: var(--base-col-1);
            cursor: default;
        }

        &:hover:not(.active) {
            background: var(--saturated-col-1);
            color: var(--saturated-col-3);
            padding: .6em 1.5em;
        }
    }
</style>