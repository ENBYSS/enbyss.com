import { sveltekit } from '@sveltejs/kit/vite';
import { extractorSvelte, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss';
import UnoCss from "unocss/vite";

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		UnoCss({
			extractors: [extractorSvelte],
			presets: [
				presetUno(),
				presetAttributify(),
				presetTypography(),
				presetIcons({
					autoInstall: true,
					extraProperties: {
						"display": "inline-block",
						"vertical-align": "middle",
					}
				}),
			],
			rules: [
				[/^bg-([a-z]+)-col-(\d+)$/, ([, type, d]) => ({ background: `var(--${type}-col-${d})`})],
				[/^text-([a-z]+)-col-(\d+)$/, ([, type, d]) => ({ color: `var(--${type}-col-${d})`})],
			],
			shortcuts: [
				{
					"box": "bg-base-col-3 text-base-col-1 rounded-2 mx-auto text-center p-5",
					"btn": ""
				},
			],
		}),
		sveltekit(),
	]
};

export default config;
