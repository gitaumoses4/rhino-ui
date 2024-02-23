import {resolve} from "path";

const codesandbox = require("remark-codesandbox");

function remarkPlugin() {
  /**
   * Many thanks to: https://github.com/kasper573/yas/blob/dcf62f7637f7a85f9ce1598851bc26d938314df5/packages/remark-html-to-jsx/index.js
   * @param args
   */
  async function transform(...args) {
    // Async import since these packages are all in ESM
    const { visit, SKIP } = await import("unist-util-visit");
    const { mdxFromMarkdown } = await import("mdast-util-mdx");
    const { fromMarkdown } = await import("mdast-util-from-markdown");
    const { mdxjs } = await import("micromark-extension-mdxjs");

    // This is a horror show, but it's the only way I could get the raw HTML into MDX.
    const [ast] = args;
    visit(ast, "html", (node) => {
      const escapedHtml = JSON.stringify(node.value);
      const jsx = `<div dangerouslySetInnerHTML={{__html: ${escapedHtml} }}/>`;
      const rawHtmlNode = fromMarkdown(jsx, {
        extensions: [mdxjs()],
        mdastExtensions: [mdxFromMarkdown()],
      }).children[0];

      Object.assign(node, rawHtmlNode);

      return SKIP;
    });
  }

  return transform;
}

/**
 * We need to transform any raw html from (https://github.com/kevin940726/remark-codesandbox/blob/a389235a45db8ab38b487a4bd2670263d390a79b/packages/remark-codesandbox/src/index.js#L187) to mdx so that it can be rendered in the docs.
 * Therefore we need to add a remark plugin to the mdx compiler.
 *
 */
export const plugins = [
  [
    codesandbox,
    {
      mode: "iframe",
      customTemplates: {
        "rhinolabs-components": {
          extends: `file:${resolve(__dirname, "./template")}`,
          entry: "src/App.js",
        },
      },
    },
  ],
  remarkPlugin
]


