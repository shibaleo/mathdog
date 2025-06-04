import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Markdownからタイトルを取得する
 * frontmatterのtitle優先、なければファイル名（拡張子なし）
 */
function extractTitle(filePath: string): string {
  const content = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(content)
  return data?.title ?? path.basename(filePath, '.md')
}

/**
 * サイドバーの1項目を生成する
 * @param filePath ファイルの絶対パス
 * @param srcDir srcフォルダの絶対パス
 */
function generateSidebarItem(filePath: string, srcDir: string): { text: string; link: string } {
  const title = extractTitle(filePath)
  const isIndex = path.basename(filePath) === 'index.md'

  // srcDirからの相対パスを算出
  const relativeToSrc = path.relative(srcDir, filePath).replace(/\\/g, '/')

  let link: string
  if (isIndex) {
    const parentDir = path.dirname(relativeToSrc)
    link = '/' + (parentDir === '.' ? '' : parentDir + '/')
  } else {
    link = '/' + relativeToSrc.replace(/\.md$/, '')
  }

  return { text: title, link }
}

/**
 * 再帰的にsidebar配列を生成する
 * @param dir srcフォルダ以下の相対パス（例: '' または 'posts'）
 * @param srcDir srcフォルダの絶対パス
 */
export function generateSidebar(dir: string, srcDir: string): any[] {
  const fullDir = path.resolve(srcDir, dir)
  if (!fs.existsSync(fullDir)) return []

  const entries = fs.readdirSync(fullDir, { withFileTypes: true })

  // index.mdを除外するフィルタを追加
  const items = entries
    .filter(e => e.isFile() && e.name.endsWith('.md') && e.name !== 'index.md')
    .map(e => generateSidebarItem(path.join(fullDir, e.name), srcDir))

  const dirs = entries
    .filter(e => e.isDirectory()
      && e.name !== 'assets' // assetsフォルダは除外
      && e.name !== 'about' // aboutフォルダは除外
      )
    .map(e => {
      const subdir = path.join(dir, e.name)
      return {
        text: e.name,
        link: '/' + subdir.replace(/\\/g, '/') + '/',  // 見出しにリンク付けてる場合
        collapsed: false,
        items: generateSidebar(subdir, srcDir)
      }
    })

  return [...items, ...dirs]
}