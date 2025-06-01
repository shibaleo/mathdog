import type { Plugin } from 'vite'

// --- インライン数式変換: \( ... \) → $...$
function transformInlineMath(code: string): string {
  return code.replace(/\\\((.+?)\\\)/g, (_, match: string) => {
    return ` $${match}$ `;
  });
}

// --- ディスプレイ数式変換: \begin{...}...\end{...} → \n$$\n...\n$$\n
function transformDisplayMath(code: string): string {
  return code.replace(/\\begin\{([\w*]+)\}[\s\S]*?\\end\{\1\}/g, (match) => {
    return `\n$$\n${match}\n$$`;
  });
}

// --- プラグイン本体
export function replaceMath(): Plugin {
  return {
    name: 'replace-math',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('.md')) {
        let result = code
        result = transformInlineMath(result)
        result = transformDisplayMath(result)
        return {
          code: result,
          map: null
        }
      }
    }
  }
}
