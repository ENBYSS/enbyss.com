<script lang="ts">
	import Title from "$lib/title.svelte";
    import type { PageData } from "./$types";
	import Item from "./item.svelte";
    import autoAnimate from "@formkit/auto-animate";
	import OptionBar from "$lib/option-bar.svelte";
	import Head from "$lib/head.svelte";
	import { stores } from "$lib/stores/site-data";

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
        "realized",
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
    stores?.considered.set(fortunes);
    stores?.considered.subscribe(c => fortunes = c);

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
            "realized": 0,
        }

        const score = (item: typeof a) => interests[item.interest] * status[item.status];
        return score(a) > score(b) ? -1 : 1;
    });
</script>

<Head
    title="Fortune"
    description="A look into what's being considered, including excitement."
    image="metadata/fortune.png"
/>

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

        <OptionBar
            options={filter.interest.allowed}
            initial="all"
            bind:picked={filter.interest.current}
        />

        <Title>
            <h2> Status Filters </h2>
        </Title>

        <OptionBar
            options={filter.status.allowed}
            initial="all"
            bind:picked={filter.status.current}
        />
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
</style>