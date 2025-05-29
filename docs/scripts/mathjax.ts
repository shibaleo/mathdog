// scripts/mathjax.mts
import { mathjax } from 'mathjax-full/js/mathjax.js'
import { TeX } from 'mathjax-full/js/input/tex.js'
import { SVG } from 'mathjax-full/js/output/svg.js' // ← SVGに戻す
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js'
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js'
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js'

const adaptor = liteAdaptor()
RegisterHTMLHandler(adaptor)

const tex = new TeX({ packages: AllPackages })

// ✅ SVGエンジンに戻す
const svg = new SVG({ fontCache: 'local' })

const doc = mathjax.document('', {
  InputJax: tex,
  OutputJax: svg,
})

// ✅ 1式をSVGに変換
export function renderMathToSVG(latex: string, display: boolean = false): string {
  const node = doc.convert(latex, { display })
  return adaptor.outerHTML(node)
}

// ✅ HTML内の数式を一括変換
export function replaceMathWithSVG(html: string): string {
  // \(...\)
  html = html.replace(/\\\((.+?)\\\)/gs, (_, math) => renderMathToSVG(math, false))
  // \[...\]
  html = html.replace(/\\\[(.+?)\\\]/gs, (_, math) => renderMathToSVG(math, true))
  // \begin{...}...\end{...}
  html = html.replace(/\\begin\{([^}]+)\}([\s\S]+?)\\end\{\1\}/g, (_, env, content) => {
    const latex = `\\begin{${env}}${content}\\end{${env}}`
    return renderMathToSVG(latex, true)
  })

  return html
}
