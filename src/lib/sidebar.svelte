<script lang="ts">
	import { clickOutside } from "./directives/click_outside";
    import LinkBar from "./link-bar.svelte";
	import Menu from "./menu.svelte";
import Ticker from "./ticker.svelte";

    let collapsed = true;
    const i_prefix = "i-material-symbols"

    const links = {
        "tools": "/tools",
        "babel": "/babel",
        "schedules": "/schedules",
        "support": "/support",
        "history": "/history",
        "fortune": "/fortune",
    }
</script>

<button on:click={() => collapsed = !collapsed} class="cursor-pointer opacity-90 rounded-0 fixed bottom-0 left-50% w-25rem -translate-x-50% max-w-80% z-100 rounded-t-6 overflow-hidden border-none outline-none p-0">
    <Ticker ticker_duration={40} repeat={2} reversed={collapsed}>
        {#each [...Array(40).keys()] as idx (idx)}
            {#if collapsed}
                <div class="opacity-80 mx-5 transform scale-150 i-material-symbols:keyboard-double-arrow-right-rounded" />
            {:else}
                <div class="opacity-80 mx-5 transform scale-150 i-material-symbols:keyboard-double-arrow-left-rounded" />
            {/if}
        {/each}
    </Ticker>
</button>

<nav use:clickOutside on:click_outside={() => collapsed = true} class={`fixed absolute top-0 w-[25rem] max-w-full h-full z-99 sidebar bg-base-col-3 ${collapsed ? 'brightness-150 -left-[25rem]' : '-left-0'}`}>

    <a on:click={() => collapsed = !collapsed} href="/" class="sidebar-link pointer w-full not-b h-20 flex justify-center items-center bg-base-col-3 hover:brightness-150 focus:brightness-150">
        <div class="text-4xl italic font-600 z-10">
            <div class="i-fa6-solid:house"/>
        </div>
    </a>

    {#each Object.entries(links) as [name, href] (name)}
        <a on:click={() => collapsed = !collapsed} {href} class={`w-full h-20 flex justify-center items-center bg-base-col-3 ${name}-link hover:brightness-150 focus:brightness-150`}>
            <div class={`pl-8 w-full text-left text-4xl italic font-600 capitalize z-10`}>
                {name}
            </div>
        </a>
    {/each}

    <div class="box rounded-0 p-0 text-3xl overflow-hidden">
        <LinkBar />
    </div>

    <div class="z-20 w-full flex flex-col items-center gap-2">
        <Menu
            label="Themes"
            groups={[
                {
                    name: "Themes",
                    items: [
                        {
                            label: 'abyss',
                            handler: () => console.log("Picked theme."),
                        }
                    ]
                }
            ]}
            max_height="300px"
        />
    </div>
</nav>

<style lang="scss">
    $links: tools, babel, schedules, support, history, fortune;

    @for $i from 1 through length($links) {
        $link: nth($links, $i);

        .#{$link}-link {
            filter: hue-rotate(#{$i * 40}deg);

            &:hover {
                filter: hue-rotate(#{$i * 40 + 180}deg) invert(1);
            }
        }
    }
</style>