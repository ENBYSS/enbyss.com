import { redirects } from '$lib/redirects';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from "./$types";

export const load = (({ params }) => {
    throw redirect(300, (redirects as any)[params.to])
}) satisfies PageLoad;