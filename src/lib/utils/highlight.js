// @ts-nocheck

// Base copied from this PR to enhance the highlighting.
// Updated to use SHIKI instead.
// https://github.com/gitpod-io/website/pull/2322/files#diff-6e9351a07f4dffb4f596be4085692107db6aa508c4fbd3a97243c42548a87c35
import { escapeSvelte } from "mdsvex";
import shiki from "shiki";

const langMap = {
  sh: "bash",
  Dockerfile: "dockerfile",
  YAML: "yaml",
};

/**
 *
 * @param {string} code the code that gets parsed
 * @param {string} lang the language the code is written in
 * @param {string} meta meta information for the code fence
 * @returns {string}
 */
export async function highlighter(code, lang, meta) {
  let title = null;
  const _lang = langMap[lang] || lang || "text";

  if (meta) {
    title = meta.match(/title="?(.*?)"/)?.[1];
  }

  const shiki_hl = await shiki.getHighlighter({ theme: "css-variables" });

  const highlighted = escapeSvelte(shiki_hl.codeToHtml(code, { lang }));

  return `<CodeFence code={\`${highlighted}\`} 
  raw_code={${JSON.stringify(code)}}
  lang={"${_lang}"}
  ${title ? `title={"${title}"}` : ""}
  />`;
}
