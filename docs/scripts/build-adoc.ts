import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import asciidoctor from '@asciidoctor/core'
import matter from 'gray-matter'
import { replaceMathWithSVG } from './mathjax'
import { escapeCodeblock } from './escape-codeblock'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const adoc = asciidoctor()
const inputDir = path.resolve(__dirname, '../posts')
const outputDir = path.resolve(__dirname, '../')

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

    const doc = adoc.load(adocBody, {
      safe: 'unsafe',
      backend: 'html5',
      attributes: {
        sectnums: true
      }
    });

    
    // 1. AsciiDoc を HTML に変換
    const html = adoc.convert(adocBody, {
      safe: 'unsafe',
      backend: 'html5',
      attributes:{
        'sectnums': true
      }
    }) as string

    // HTML中の数式をSVGに変換
    const htmlWithSVG = replaceMathWithSVG(html)
    //HTML中のコードブロックをmd記法に変換
    const htmlWithSVGandCodeBlock = escapeCodeblock(htmlWithSVG)

    const frontmatter = {
      title: frontmatterData.title || baseName,
      ...frontmatterData,
    }

    // タイトルを取得
    const title = doc.getDocumentTitle(); // => "ドキュメントタイトル"
    const md = matter.stringify(`\n<h1>${title}</h1>${htmlWithSVGandCodeBlock}\n`, frontmatter)

    // ファイルの先頭に空行やBOMが入らないよう注意
    await fs.writeFile(outputPath, md, 'utf-8')
    console.log(`Converted ${file} → ${path.relative(process.cwd(), outputPath)}`)
  }
}

convertAll().catch(e => {
  console.error(e)
  process.exit(1)
})