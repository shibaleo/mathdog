import { defineConfig } from "vitepress";
import { replaceMath } from "../scripts/replace-math";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "shibaleo",
  description: "shibaleo's website",
  srcDir: 'src',
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
      { text: "Posts", link: "/posts" },
      { text: "Tags", link: "/tags" },
      { text: "About", link: "/about" },
    ],

    sidebar: [
      {
        text: "Home",
        items: [
          { text: "Tu Manifolds", link: "/Tu-manifolds",
            items: [
              { text: "Problem 1.1", link: "/Tu-manifolds/problems/1.1" },]
          },
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/shibaleo/website" },
    ],
  },
});
