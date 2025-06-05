import { generateSidebar } from '../../scripts/generate-sidebar'
import path from 'path'
// menu.data.ts のあるフォルダ（＝対象フォルダ）
const targetDir = __dirname

// srcDir を menu.data.ts の一つ上の "src" に設定
const srcDir = path.resolve(__dirname, '..')

// targetDir が srcDir から見て何のサブフォルダか取得
const relativeToSrc = path.relative(srcDir, targetDir).replace(/\\/g, '/')

const sidebar = generateSidebar(relativeToSrc, srcDir)

export default {
  load() {
    return {
      sidebars: generateSidebar(relativeToSrc, srcDir)
    }
  },
}