import { defineConfig } from "vitepress";
import { replaceMath } from "../scripts/replace-math";
import path from 'path'
import { generateSidebar } from "../scripts/generate-sidebar";

const srcDir = path.resolve(__dirname, '..', 'src')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "shibaleo",
  description: "shibaleo's website",
  srcDir: "src",
  vite: {
    plugins: [replaceMath()],
    resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../components'),
    },
  },
  },
  lastUpdated: true,
  markdown: {
    math: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: "https://github.com/shibaleo/website/edit/main/docs/src/:path",
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

    sidebar: generateSidebar('', srcDir),

    socialLinks: [
      { icon: "github", link: "https://github.com/shibaleo/website" },
    ],
  },
});
