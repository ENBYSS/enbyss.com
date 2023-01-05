<script lang="ts">
	import Title from "$lib/title.svelte";
import type { PageData } from "./$types";
	import Item from "./item.svelte";

    export let data: PageData;

    const interestMap = {
        none: "hue-rotate"
    }

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

    const interest_map = interests.reduce((a, b, i) => {
        a[b] = `hue-rotate-${i*30}`;
        return a;
    }, {} as {[key: string]: string});

    const status_map = status.reduce((a, b, i) => {
        a[b] = `hue-rotate-${i*30 + 150}`;
        return a;
    }, {} as {[key: string]: string});

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

        <div class="flex flex-wrap gap-3">
            {#each filter.interest.allowed as interest (interest)}
                <button class={`btn px-4 ${filter.interest.current === interest ? '!invert-100' : ''}`} on:click={() => filter.interest.current = interest}> 
                    {interest}
                </button>
            {/each}
        </div>

        <Title>
            <h2> Status Filters </h2>
        </Title>

        <div class="flex flex-wrap gap-3">
            {#each filter.status.allowed as stat (stat)}
                <button class={`btn px-4 ${filter.status.current === stat ? '!invert-100' : ''}`} on:click={() => filter.status.current = stat}> 
                    {stat}
                </button>
            {/each}
        </div>
    </div>

    <div class="flex flex-col gap-5">
        {#each sorted as item}
            <div class="grow">
                <Item {item}/>
            </div>
        {/each}
    </div>
</div>