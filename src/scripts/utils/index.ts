import type { Item } from "@scripts/db/adapters/adapter";
import { JSDOM } from "jsdom";
import markdownIt, { type PluginSimple } from "markdown-it";
import { frontmatterPlugin } from "@mdit-vue/plugin-frontmatter";
import { z } from "zod";
import { experimental_AstroContainer } from "astro/container";
import DictionaryItem from "@components/DictionaryItem.astro";

const markdownItPlugin: PluginSimple = (md) => {
  md.inline.ruler.push("em-link", (state, _silent) => {
    if (state.src[state.pos] !== "[") return false;
    if (state.src[state.pos + 1] !== "[") return false;

    // `[[`
    const startToken = state.push("em-link-start", "a", 1);
    state.pos += 2;

    // link
    let link = "";
    while (state.pos < state.src.length && state.src[state.pos] !== ":") {
      link += state.src[state.pos];
      state.pos++;
    }

    startToken.attrSet("href", "/items/" + link);
    startToken.attrSet("title", link);
    state.env.relations ??= [];
    state.env.relations.push(link);

    // `:`
    state.pos++;

    const textToken = state.push("text", "", 0);
    // text
    while (state.pos < state.src.length && state.src[state.pos] !== "]") {
      textToken.content += state.src[state.pos];
      state.pos++;
    }

    textToken.content = textToken.content.trim();

    // `]]`
    state.push("em-link-end", "a", -1);
    state.pos += 2;

    return true;
  });
};

const mdEnvSchema = z.object({
  relations: z.array(z.string()).optional(),
  frontmatter: z
    .record(z.any())
    .and(
      z.object({
        title: z.string().optional(),
      }),
    )
    .optional(),
});

export async function itemToHtml(item: Item) {
  const md = markdownIt();
  md.use(frontmatterPlugin).use(markdownItPlugin);
  const env: z.infer<typeof mdEnvSchema> = {};
  const markdown = md.render(item.content, env);
  const dom = new JSDOM(markdown);
  const document = dom.window.document;
  switch (env.frontmatter?.type) {
    case "dictionary":
      const container = await experimental_AstroContainer.create();
      await (env.frontmatter.data.entries as Record<string, string>[])
        .map((entry) => async () => {
          document.body.innerHTML += await container.renderToString(
            DictionaryItem,
            { props: entry },
          );
        })
        .reduce((p, c) => p.then(() => c()), Promise.resolve());
      break;
  }
  return { html: document.body.innerHTML, env: mdEnvSchema.parse(env) };
}
