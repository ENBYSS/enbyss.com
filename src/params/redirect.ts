import { redirects } from "$lib/redirects";
import type { ParamMatcher } from "@sveltejs/kit"

export const match = ((param) => {
    return Object.keys(redirects).includes(param);
}) satisfies ParamMatcher;