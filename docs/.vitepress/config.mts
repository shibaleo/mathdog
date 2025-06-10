import { withMermaid } from 'vitepress-plugin-mermaid';
import { replaceMath } from "../scripts/replace-math";
import path from 'path'
import { generateSidebar } from "../scripts/generate-sidebar";
import footnote from 'markdown-it-footnote'

const srcDir = path.resolve(__dirname, '..', 'src')

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "MathDog",
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
    config: (md) => {
      md.use(footnote)
    }
  },
  themeConfig: {
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
  mermaid: { theme: 'forest' },
  mermaidPlugin: { class: 'mermaid' }
});
