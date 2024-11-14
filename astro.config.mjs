// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";

import cli from "command-line-args";

const a = cli([{ name: "adapter", type: String, defaultValue: "node" }], {
  partial: true,
});

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter:
    a.adapter === "netlify"
      ? netlify()
      : node({
          mode: "standalone",
        }),
});
