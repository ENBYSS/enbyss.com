<script lang="ts">
    export let title: string
    export let description: string
    export let image: string
</script>

<svelte:head>
    <title> {title} </title>
    <meta name="title" content={title}>
    <meta name="description" content={description}>

    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.enbyss.com">
    <meta property="og:site_name" content="https://www.enbyss.com">
    <meta property="og:title" content={title}>
    <meta property="og:description" content={description}>
    <meta property="og:image" content={`https://files.enbyss.com/images/${image}`}>

    <meta property="twitter:title" content={title}>
    <meta property="twitter:description" content={description}>
    <meta property="twitter:url" content="https://www.enbyss.com">
    <meta property="twitter:site_name" content="https://www.enbyss.com">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:site" content="@enbyss_">
    <meta property="twitter:creator" content="@enbyss_">
    <meta property="twitter:image" content={`https://files.enbyss.com/images/${image}`}>
    <slot></slot>
</svelte:head>