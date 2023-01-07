<script lang="ts">
	import Head from "$lib/head.svelte";
	import LinkBar from "$lib/link-bar.svelte";
	import ThemeBar from "$lib/theme-bar.svelte";
	import PageLink from "./page-link.svelte";

    const stream = undefined;
</script>

<Head
    title="Abyss"
    description="Welcome to the Abyss."
    image="backgrounds/dark.webp"
/>

<div class="flex flex-col gap-3 items-center relative">
    <div class="display-none">
        <a rel="me" href="https://hellsite.site/@enbyss">Mastodon</a>
        <a rel="me" href="mailto:echo@enbyss.com">echo@enbyss.com</a>
  
        <link rel="webmention" href="https://webmention.io/www.enbyss.com/webmention" />
        <link rel="pingback" href="https://webmention.io/www.enbyss.com/xmlrpc" />
    </div>

    {#if stream}
        <div class="box w-90% max-w-500px">
            <h1 class="text-6xl font-700 hover:tracking-1">
                <a href="/live" class="font-600"> Live! </a>
            </h1>
            <h2 class="text-xl font-500 italic">
                { stream.name }
            </h2>

            <div>
                <div class="relative overflow-hidden max-w-full pb-[56.25%]">
                    <iframe 
                        class="absolute top-0 left-0 w-full h-full" 
                        src={`https://www.youtube-nocookie.com/embed/${stream.id}`} 
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    />
                </div>
            </div>
        </div>
    {:else}
        <div class="box mx-0">
            <a class="italic text-5xl hover:tracking-1 font-700 text-contrast opacity-70 hover:opacity-100" href="/live">
                Not live.
            </a>
        </div>
    {/if}

    <div class="box mx-auto p-0 rounded-3 flex text-3xl overflow-hidden w-25rem">
        <LinkBar />
    </div>

    <ThemeBar/>

    <div class="box mx-auto max-w-700px flex flex-col gap-7">
        <div>
            <h1 class="text-contrast tracking-2 uppercase"> Pages </h1>
        </div>

        <PageLink href="/schedules" title="Schedules">
            Wanna know when I'm doing things? This page will show all upcoming things that I've remembered to put in - 
            including <i>streams</i> and <i>videos</i>. In the future I might add more things, but that probably doesn't
            make sense does it...
        </PageLink>

        <PageLink href="/tools" title="Tools">
            Well I've created a site - so evidently programming is my realm. As you all know, lots of problems exist out there -
            so why not use this skill to make solutions of <i>varying</i> quality? Behold - my tools!
        </PageLink>

        <PageLink href="/babel" title="Babel">
            I tend to write a lot - reviews, announcements, articles - the sorts. If you've ever seen me in motion, you know
            that I talk for <i>way too long</i> - so why not create a space for all my thoughts? Enter Babel, and see all the garbage
            I thought to immortalize.
        </PageLink>

        <PageLink href="/support" title="Support">
            Some people think that what I do is cool <i>(for some reason)</i> - so I decided to craft a page in celebration.
            Wanna see a bunch of my metrics - like subscribers and patrons? This is the place for you! Here's the place where I
            commemorate everyone who supports me <div class="i-ph:smiley-fill"/>
        </PageLink>

        <PageLink href="/history" title="History">
            I've done a lot of streams, and you might wanna know whether I've done a certain game! Well, check out the <b>History</b>
            to know more! Also comes with information about where series are at - like if they're <i>suspended</i> or not. In the future
            I want to include videos as well :)
        </PageLink>

        <PageLink href="/fortune" title="Fortune">
            Lots of suggestions and potential streams come by my head, and if you'd like to see my current stance on a game/idea, come
            over here! If something isn't mentioned it's likely because I haven't given it much thought, or I don't know about it.
        </PageLink>
    </div>
</div>