<script lang="ts">
    export let src: string
    export let alt: string
    export let css: string = ""
    export let ipx: {
        width?: number
        height?: number
        resize?: string
        fit?: "cover" | "contain" | "fill" | "inside" | "outside"
        position?: "top" | "right top" | "right" | "right bottom" | "bottom" | "left bottom" | "left" | "left top"
        trim?: number
        format?: "jpg" | "jpeg" | "png" | "webp" | "avif" | "gif" | "heif"
        quality?: number
        rotate?: number
        enlarge?: boolean
        flip?: boolean 
        flop?: boolean
        sharpen?: number
        median?: number
        gamma?: number
        negate?: boolean
        normalize?: boolean
        threshold?: number
        tint?: number
        grayscale?: boolean
        animated?: boolean
    } = {};

    const ipx_params = (() => {
        const entries = Object.entries(ipx);

        if (entries.length === 0) return '_';

        return entries.map(param => {
            if (param[1] === true) {
                return param[0];
            }
            return `${param[0]}_${param[1]}`
        }).join(',')
    })();
</script>

<img src={`https://enbyss.com/_ipx/${ipx_params}/${src}`} {alt} class={`${css}`}/>