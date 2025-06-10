import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface SidebarItem {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

/**
 * frontmatter の title を取得する（なければ undefined）
 */
function getFrontmatterTitle(filePath: string): string | undefined {
  const content = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(content)
  return data?.title
}

/**
 * タイトルを決定（fallbackName は frontmatter に title がない場合に使用）
 */
function determineText(filePath: string, fallbackName: string): string {
  return getFrontmatterTitle(filePath) ?? fallbackName
}

/**
 * 指定ディレクトリ以下の .md ファイル・ディレクトリを再帰的に処理
 * @param currentDir 現在処理中の絶対パス
 * @param srcDir src フォルダの絶対パス（link のルート起点）
 */
function buildSidebarTree(currentDir: string, srcDir: string): SidebarItem[] {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true })

  const mdItems: SidebarItem[] = []
  const dirItems: SidebarItem[] = []

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name)

    if (entry.isDirectory()) {
      if (entry.name === 'About' ||
          entry.name === 'assets' ||
          entry.name === 'public' ||
          entry.name === 'Drafts') continue

      const indexPath = path.join(fullPath, 'index.md')
      const fallback = entry.name
      const text = fs.existsSync(indexPath)
        ? determineText(indexPath, fallback)
        : fallback

      const subItems = buildSidebarTree(fullPath, srcDir)

      const relativeDirPath = path.relative(srcDir, fullPath).replace(/\\/g, '/')
      let dirLink: string | undefined
      if (entry.name === 'posts') {
        dirLink = '/' + relativeDirPath + '/'
      }

      dirItems.push({
        text,
        link: dirLink? dirLink : undefined,
        collapsed: false,
        items: subItems
      })
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md' && entry.name !== 'about.md') {
      const relativePath = path.relative(srcDir, fullPath).replace(/\\/g, '/')
      const link = '/' + relativePath.replace(/\.md$/, '')
      const fallback = path.basename(fullPath, '.md')
      const text = determineText(fullPath, fallback)

      mdItems.push({ text, link })
    }
  }

  return [...mdItems, ...dirItems]
}

/**
 * サイドバーを生成する
 * @param dir srcDir からの相対パス（例: 'posts'）
 * @param srcDir src フォルダの絶対パス（例: path.resolve(__dirname, '..')）
 */
export function generateSidebar(dir: string, srcDir: string): SidebarItem[] {
  const targetDir = path.resolve(srcDir, dir)
  if (!fs.existsSync(targetDir)) return []
  return buildSidebarTree(targetDir, srcDir)
}
