<script lang="ts">
    import type { Tool } from "./+layout";
    import autoAnimate from "@formkit/auto-animate";


    export let tools: Tool[];
</script>

<ul class="tool-list" use:autoAnimate>
    {#each tools as group (group.link)}
        <div>
            <h2 class="group-name"> {group.name} </h2>
        </div>
        {#each group.items as tool (tool.link)}
            <a href={tool.link} class="tool-container">
                <div class="tool-info">
                    <p class="name"> {tool.name} </p>
                    <p class="description"> {tool.description} </p>
                </div>
                <div class={`tool-status ${tool.status}`}>
                    {tool.status}
                </div>
            </a>
        {/each}
    {/each}
</ul>

<style lang="scss">
    .tool-list {
        display: flex;
        flex-direction: column;
        gap: .5em;
    }
    .group-name {
        background: var(--base-col-1);
        color: var(--base-col-3);
        padding: .8em;
    }
    .tool-container {
        background: var(--base-col-3);
        text-decoration: none;
        position: relative;
        padding: 1em 1em;
        border-radius: .5em;
        overflow: hidden;

        .tool-info {
            .name {
                color: var(--saturated-col-1);
                font-weight: 600;
                font-size: 1.5em;
            }
            .description {
                color: var(--pop-col-1);
                font-weight: 500;
            }
        }

        .tool-status {
            position: absolute;
            top: .3em;
            right: .3em;
            font-family: "IBM Plex Mono";
            font-weight: 700;
        }
    }
</style>