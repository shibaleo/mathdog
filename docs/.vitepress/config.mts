import { defineConfig } from "vitepress";
import { replaceMath } from "../scripts/replace-math";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "shibaleo",
  description: "shibaleo's website",
  srcDir: "src",
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
      pattern: "https://github.com/shibaleo/website/edit/main/docs/:path",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025 shibaleo",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Posts", link: "/posts" },
      { text: "About", link: "/about" },
    ],

    sidebar: {
      "/": [],
      "/posts/": [
        {
          text: "Exapmles",
          link: "/posts/examples",
          items: [
            {
              text: "Markdown Examples",
              link: "posts/examples/markdown-examples",
            },
            {
              text: "Runtime API Examples",
              link: "posts/examples/api-examples",
            },
          ],
        },
        {
          text: "Tu Manifolds",
          link: "/posts/Tu-manifolds",
          items: [
            { text: "Problem 1.1", link: "posts/Tu-manifolds/problems/problems/1.1" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/shibaleo/website" },
    ],
  },
});
