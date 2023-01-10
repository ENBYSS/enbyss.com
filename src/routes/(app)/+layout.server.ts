import { theme } from "$lib/stores";
import type { LayoutServerLoad } from "./$types";


export const load = (async ({ cookies, url }) => {
    const res = await fetch(`https://api.enbyss.com/ticker/items`);
    let cookie_theme = cookies.get("__enbyss_theme");

    if (!cookie_theme) {
        cookies.set("__enbyss_theme", "abyss", {
            maxAge: 10e10,
            httpOnly: false,
            path: "/"
        });
        cookie_theme = "abyss";
    }

    theme.set(cookie_theme);

    return {
        theme: cookie_theme as string,
        messages: await res.json() as string[],
        pathname: url.pathname,
    }
}) satisfies LayoutServerLoad