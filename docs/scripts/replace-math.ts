import type { Plugin } from 'vite'

// --- transform like: \( ... \) → $...$
function transformInlineMath(code: string): string {
  return code.replace(/\\\((.+?)\\\)/g, (_, match: string) => {
    return ` $${match}$ `;
  });
}

// --- transform like: \begin{...}...\end{...} → \n$$\n\begin{...}...\end{...}\n$$\n
function transformDisplayMath(code: string): string {
  return code.replace(/\\begin\{([\w*]+)\}[\s\S]*?\\end\{\1\}/g, (match: string) => {
    return `\n$$\n${match}\n$$`;
  });
}

// --- exporting the plugin
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
