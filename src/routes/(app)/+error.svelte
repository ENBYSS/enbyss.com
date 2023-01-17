<script lang="ts">
	import { page } from "$app/stores";


    let link = "";
    page.subscribe(p => link = p.url.pathname);

    type FoundVoid = {
        kind: "void"
    }
    type FoundMigrated = {
        kind: "migrated",
        new_link: string
    }
    type FoundInactive = {
        kind: "inactive",
        reason: string
    }
    type FoundKind = 
        | FoundVoid
        | FoundMigrated
        | FoundInactive

    let foundkind: FoundKind = {
        kind: "void"
    };
    $: if (link) {
        const no_longer_active = [
            {
                link: '/tools/twitch/channel-points-icon-gen',
                reason: 'not implemented yet'
            },
            {
                link: '/tools/misc/extralife',
                reason: 'not implemented yet - still trying to resolve the issue with Extralife',
            },
        ];

        const inactive = no_longer_active.find(entry => entry.link === link);
        if (inactive) {
            foundkind = {
                kind: "inactive",
                reason: inactive.reason,
            }
        }
        else {
            const new_link = link
                .replace("/babel/articles/series", "/babel")
                .replace("/babel/articles", "/babel")
                .replace("/tools/twitch/stream-marker-edl", "/tools/marker-converter")
                .replace("/tools/satisfactory/codex", "/tools/satisfactory-codex")
                .replace(/\/tools\/[a-z]+\/(.*)+/, "/tools/$1");

            if (new_link === link) {
                foundkind = {
                    kind: "void",
                }
            } else {
                foundkind = {
                    kind: "migrated",
                    new_link,
                }
            }
        }
    }
</script>

{#if $page.status === 404}
    <div class="error-container">
        <h1 class="error-code"> 404 </h1>
        <h2 class="error-message"> Page Has Been Consumed </h2>
        {#if foundkind.kind === "migrated"}
            <p class="error-help">
                The following link may be the new location for what you're trying to find.
            </p>
            <a class="link-404" href={foundkind.new_link}>{foundkind.new_link}</a>
        {:else if foundkind.kind === "inactive"}
            <p class="error-help">
                This link represents a page <i>deactivated</i> for the following reason:
            </p>
            <p class="inactive-reason">
                {foundkind.reason}
            </p>
        {:else if foundkind.kind === "void"}
            <p class="error-help">
                This link has never existed. Go back.
            </p>
        {/if}
    </div>
{/if}

<style lang="scss">
.error-container {
    margin: 0 auto;
    text-align: center;

    .error-code {
        font-size: 8em;
        color: var(--saturated-col-1);
    }
    .error-message {
        font-size: 2.5em;
        background: var(--saturated-col-1);
        color: var(--saturated-col-3);
        padding: .3em 0;
        margin-bottom: .4em;
    }
    .error-help {
        font-size: 1.5em;
        color: var(--pop-col-1);
    }
}
</style>