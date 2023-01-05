import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from "mdsvex";
import remarkMath from 'remark-math';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import shiki from "shiki";

const escape_svelty = (str) => 
	str
		.replace(
			/[{}`]/g,
			(c) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c])
		)
		.replace(/\\([trn])/g, '&#92;$1');

async function highlighter(code, lang) {
	const highlighter = await shiki.getHighlighter({ theme: "css-variables" });
	return escape_svelty(highlighter.codeToHtml(code, {
		lang: lang || "text",
	}));
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md', '.svx'],
			remarkPlugins: [
				remarkMath,
			],
			rehypePlugins: [
				rehypeSlug,
				rehypeAutolinkHeadings,
				rehypeKatex,
			],
			highlight: {
				highlighter: highlighter,
			}
		})
	],

	extensions: ['.svelte', '.md', '.svx'],

	kit: {
		adapter: adapter()
	},
};

export default config;
