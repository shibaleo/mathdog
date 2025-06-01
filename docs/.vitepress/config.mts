import { defineConfig } from "vitepress";
import { replaceMath } from "../scripts/replace-math";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "website",
  description: "shibaleo's website",
  vite: {
    plugins: [replaceMath()],
  },
  lastUpdated: true,
  markdown: {
    math: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025 shibaleo",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
      { text: "API Examples", link: "/api-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
