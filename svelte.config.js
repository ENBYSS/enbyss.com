import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from "mdsvex";
import remarkMath from 'remark-math';
import remarkReadingTime from "remark-reading-time";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import rehypeKatex from 'rehype-katex';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import rehypeSlug from 'rehype-slug';
import shiki from "shiki";
import { mdsvexGlobalComponents } from "./src/lib/utils/mdsvex-global-components.js";
import { highlighter } from "./src/lib/utils/highlight.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvexGlobalComponents({
			dir: `$lib/babel`,
			list: [
				["Center", "center.svelte"],
				["ContentImg", "content-img.svelte"],
				["Navigate", "navigate.svelte"],
				["Note", "note.svelte"],
				["CodeFence", "code-fence.svelte"],
			],
			extensions: [".md", ".svx"],
		}),
		mdsvex({
			extensions: ['.md', '.svx'],
			remarkPlugins: [
				remarkMath,
				remarkReadingTime(),
			],
			rehypePlugins: [
				rehypeSlug,
				rehypeAutolinkHeadings,
				rehypeKatexSvelte,
			],
			highlight: {
				highlighter,
			}
		})
	],

	extensions: ['.svelte', '.md', '.svx'],

	kit: {
		adapter: adapter()
	},
};

export default config;
