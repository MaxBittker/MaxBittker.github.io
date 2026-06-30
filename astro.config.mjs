import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import rehypeFigureCaptions from "./src/utils/rehype-figure-captions.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://maxbittker.com",
  integrations: [react()],
  // Gatsby emitted pages without trailing slashes; keep that behavior.
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "solarized-light",
      wrap: true,
    },
    smartypants: true,
    rehypePlugins: [rehypeFigureCaptions],
  },
});
