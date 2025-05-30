import { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import {expandIncludes} from './expandincludes'

const INPUT_DIR = path.resolve(__dirname, '../posts')
const OUTPUT_DIR = path.resolve(__dirname, '../')

// 共通の変換処理
function transpileAdocToMd(txtPath: string) {
  const fileName = path.basename(txtPath, '.adoc')
  const mdPath = path.join(OUTPUT_DIR, `${fileName}.md`)
  const content = fs.readFileSync(txtPath, 'utf-8')
  let mdContent = `${content}`

  mdContent = expandIncludes(mdContent,'./')
  mdContent = transInlineLatexMath(mdContent)
  mdContent = transDisplayLatexMath(mdContent)
  mdContent = transCodeSnippet(mdContent)
  fs.writeFileSync(mdPath, mdContent)
  console.log(`[adoc->md] transpiled ${fileName}.adoc to ${fileName}.md`)
}

function transSectionLevelDelimiter(input: string): string {
  // AsciiDocのセクションレベルをMarkdownの見出しに変換
  return input.replace(/^=+\s/gm, (match) => {
    // 行頭の"=" の数を数えて、その数だけ "#" に変換
    const equalCount = match.trim().length;
    return '#'.repeat(equalCount) + ' ';
  });
}

function transInlineLatexMath(input: string): string {
  return input.replace(/\\\((.+?)\\\)/g, (_, content: string) => {
    return ` $${content}$ `;
  });
}

function transDisplayLatexMath(input: string): string {
  return input.replace(/\\begin\{([\w*]+)\}[\s\S]*?\\end\{\1\}/g, (match) => {
    return `\n$$\n${match}\n$$`;
  });
}

function transCodeSnippet(input: string): string {
  return input.replace(
    /^\[source,\s*(\w+)(?:,\s*option="\{(.+?)\}")?\]\s*\n^\s*-{3,}\s*\n([\s\S]*?)^\s*-{3,}\s*$/gm,
    (_match, lang: string, option: string | undefined, code: string) => {
      const optionSuffix = option ? `{${option}}` : '';
      return `\`\`\`\`\`${lang}${optionSuffix}\n${code}\n\`\`\`\`\``;
    }
  );
}

function transpileAll() {
  //console.log(`[transpileAll] 実行開始: ${INPUT_DIR}`)

  if (!fs.existsSync(INPUT_DIR)) {
    //console.warn(`[transpileAll] 入力ディレクトリが存在しません: ${INPUT_DIR}`)
    return
  }

  const files = fs.readdirSync(INPUT_DIR)
  //console.log(`[transpileAll] 発見ファイル:`, files)

  if (files.length === 0) {
    //console.warn('[transpileAll] ファイルが存在しません')
  }

  for (const file of files) {
    if (file.endsWith('.adoc')) {
      //console.log(`[transpileAll] 変換中: ${file}`)
      transpileAdocToMd(path.join(INPUT_DIR, file))
    }
  }
}

export default function transAdocToMd(): Plugin {
  return {
    name: 'transpile-adoc-to-md-plugin',

    // ビルド時・開発サーバ起動時に実行
    buildStart() {
      transpileAll()
    },

    // 開発サーバが起動した直後に実行（devモード対応）
    configureServer(server) {
      transpileAll()
    },

    // ホットリロード用：.txtが変更されたら変換し、ページをフルリロード
    handleHotUpdate(ctx) {
      if (ctx.file.endsWith('.adoc')) {
        transpileAdocToMd(ctx.file)

        ctx.server.ws.send({
          type: 'full-reload'
        })

        return []
      }
    }
  }
}
