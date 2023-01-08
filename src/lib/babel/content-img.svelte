<script lang="ts">
    export let src: string;
    export let alt: string;
    export let caption: string;
</script>

<div class="image-wrapper">
    <img src={`https://files.enbyss.com/images/babel/assets/${src}`} {alt} />
    <p> {caption} </p>
</div>

<style lang="scss">
    .image-wrapper {
        background: var(--pop-col-3);
        padding: 2em 3.4em .5em 3.4em;
        margin: 0 -50px;

        img {
            display: block;
            margin: 0 auto;
            border-radius: 1em;
        }

        p {
            text-align: center;
            color: var(--pop-col-1);
        }
    }
</style>