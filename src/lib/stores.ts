import { browser } from "$app/environment";
import { writable } from "svelte/store";
import Cookies from "js-cookie";

const default_theme = "abyss";
const initial_value = browser ? Cookies.get("__enbyss_theme") : default_theme;

export const theme = writable(initial_value);
theme.subscribe(val => {
    if (browser) {
        Cookies.set("__enbyss_theme", val, {
            expires: 365,
            path: "/",
        })
    }
});