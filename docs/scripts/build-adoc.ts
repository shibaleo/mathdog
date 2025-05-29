import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import asciidoctor from '@asciidoctor/core'
import matter from 'gray-matter'
import { replaceMathWithSVG } from './mathjax'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const adoc = asciidoctor()
const inputDir = path.resolve(__dirname, '../posts')
const outputDir = path.resolve(__dirname, '../')

type CodeBlock = {
  lang: string
  options?: string
  code: string
}

function extractAndReplaceSourceBlocks(adocText: string): { replaced: string, blocks: CodeBlock[] } {
  const blocks: CodeBlock[] = []

  const replaced = adocText.replace(
    /^\[source, *([a-zA-Z0-9]+)(?:, *options? *= *["{]([^"\]}]*)["}])?\]\n----\n([\s\S]*?)\n----/gm,
    (_, lang, options, code) => {
      blocks.push({
        lang,
        options,
        code: code.trim()
      })
      return `\\\\\\\\\\\na\\\\\\\\\\\n`
    }
  )

  return { replaced, blocks }
}

async function convertAll() {
  await fs.mkdir(outputDir, { recursive: true })
  const files = await fs.readdir(inputDir)

  for (const file of files) {
    if (!file.endsWith('.adoc')) continue

    const baseName = file.replace(/\.adoc$/, '')
    const inputPath = path.join(inputDir, file)
    const outputPath = path.join(outputDir, `${baseName}.md`)

    const rawAdoc = await fs.readFile(inputPath, 'utf-8')
    const { content: adocBody, data: frontmatterData } = matter(rawAdoc)

    // 1〜2. ソースコードブロックを抽出して\\\\a\\\\に置換
    const { replaced, blocks } = extractAndReplaceSourceBlocks(adocBody)

    // 3. AsciiDoc → HTML
    const html = adoc.convert(replaced, {
      safe: 'unsafe',
      backend: 'html5',
      attributes: {
        'sectnums': true
      }
    }) as string

    // 4. 数式をSVGへ
    const htmlWithSVG = replaceMathWithSVG(html)

    // 5. <p>\\a\\</p> を探して、Markdownコードブロックに差し替え
    const segments = htmlWithSVG.split(/<p>\\\\\\\\\\\na\\\\\\\\\\\n<\/p>/)
    let combined = ''
    for (let i = 0; i < segments.length; i++) {
      combined += segments[i]
      if (i < blocks.length) {
        const block = blocks[i]
        const opt = block.options ? `{${block.options}}` : ''
        combined += `\n\`\`\`${block.lang}${opt}\n${block.code}\n\`\`\`\n`
      }
    }

    const frontmatter = {
      title: frontmatterData.title || baseName,
      ...frontmatterData,
    }

    const md = matter.stringify(`<div class="adoc-content">\n${combined}\n</div>`, frontmatter)

    await fs.writeFile(outputPath, md, 'utf-8')
    console.log(`Converted ${file} → ${path.relative(process.cwd(), outputPath)}`)
  }
}

convertAll().catch(e => {
  console.error(e)
  process.exit(1)
})
