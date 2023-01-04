<script lang="ts">
    export let href: string;
    export let title: string;
</script>

<div class="flex flex-col gap-0.5 text-left">
    <h2 class="underline">
        <a class="text-faded opacity-70 hover:opacity-100 font-600" {href}> {title} </a>
    </h2>
    <p class="text-3.5">
        <slot/>
    </p>
</div>