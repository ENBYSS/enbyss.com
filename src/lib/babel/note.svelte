<script lang="ts">

</script>

<div class="note">
    <span class="label">note:</span> <slot></slot>
</div>

<style lang="scss">
    .note {
        background: var(--saturated-col-3);
        padding: 2em 3.4em 1em 3.4em;
        margin: 0 -50px;

        .label {
            color: var(--saturated-col-1);
        }
    }
</style>