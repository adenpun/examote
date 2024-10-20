// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter:
    process.env.ADAPTER === "netlify"
      ? netlify()
      : node({
          mode: "standalone",
        }),
});
