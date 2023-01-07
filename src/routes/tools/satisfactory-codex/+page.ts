import type { PageLoad } from "./$types";

export const load = (({ url }) => {
    return {
        query: url.searchParams.get("q") ?? "",
    }
}) satisfies PageLoad