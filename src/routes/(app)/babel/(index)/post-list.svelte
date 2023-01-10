<script lang="ts">
	import IpxImage from "$lib/ipx-image.svelte";
    import autoAnimate from "@formkit/auto-animate";
	import type { Post } from "./+layout";

    const get_img = (path: string) => `https://files.enbyss.com/images/babel/${path}`;
    const format_date = (date: string) => new Date(date).toLocaleDateString('en', {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    export let posts: Post[];
</script>

<ul class="post-list" use:autoAnimate>
    {#each posts as post (post.path)}
    <li>
        <a href={post.path} class="post-container grow">
            {#if post.meta.image && post.meta.image.src && post.meta.image.alt}
                <div class="post-image">
                    <IpxImage 
                        src={get_img(post.meta.image.src)} 
                        alt={post.meta.image.alt}
                        ipx={{
                            resize: "150x150",
                            fit: "cover",
                        }}
                    />
                    <p class="post-category"> {post.meta.category} </p>
                </div>
            {/if}
            <div class="post-info">
                <h2 class="title"> {post.meta.title} </h2>
                <h3 class="description"> {post.meta.description} </h3>
                <div class="dates">
                    <p> 
                        <span class="label">Created:</span>
                        <span class="date">{format_date(post.meta.createdAt)}</span>
                    </p>
                    {#if post.meta.updatedAt && post.meta.createdAt !== post.meta.updatedAt}
                        <p> 
                            <span class="label">Updated:</span>
                            <span class="date">{format_date(post.meta.updatedAt)}</span>
                        </p>
                    {/if}
                </div>
                <p class="post-length"> {post.meta.readingTime.text} </p>
            </div>
        </a>
    </li>
    {/each}
</ul>

<style lang="scss">
    ul {
        padding: 0;
    }
    li {
        list-style: none;
    }
    .post-list {
        display: flex;
        flex-direction: column;
        gap: 1em;
        max-width: 800px;
    }

    .post-container {
        position: relative;
        display: flex;
        justify-content: flex-start;
        flex-grow: 1;
        gap: 1em;
        padding: 0;
        border-radius: .5em;
        overflow: hidden;
        background: var(--base-col-3);

        text-decoration: none;
    }

    .post-image {
        position: relative;

        :global(img) {
            height: 100%;
            max-width: 120px;
            object-fit: cover;
        }

        .post-category {
            position: absolute;
            bottom: 0;
            left: 0;
            background: var(--saturated-col-1);
            color: var(--saturated-col-3);
            padding: .3em .6em;
            border-top-right-radius: .8em;
            font-size: .8em;
        }
    }

    .post-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1em 1em 1em 0em;

        .title {
            color: var(--saturated-col-1);
            font-weight: 700;
        }

        .description {
            color: var(--saturated-col-2);
            font-weight: 500;
            font-size: 1em;
            font-style: italic;
        }

        .dates {
            margin-top: auto;

            .label {
                font-weight: 600;
                color: var(--base-col-2);
            }

            .date {
                font-style: italic;
                font-size: .9em;
            }
        }

        .post-length {
            position: absolute;
            bottom: .8em;
            right: .8em;
            font-size: .9em;
            color: var(--pop-col-1);
        }
    }
</style>