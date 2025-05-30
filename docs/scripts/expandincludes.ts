import * as fs from 'fs';
import * as path from 'path';

/**
 * .adoc 形式の文字列中の include::...[] を実際のファイル内容に展開する
 * @param adocText .adoc ファイルの内容（文字列）
 * @param baseDir include の相対パスの基準ディレクトリ（元の .adoc ファイルの場所）
 * @returns 展開済みのテキスト
 */
export function expandIncludes(adocText: string, baseDir: string): string {
  const lines = adocText.split('\n');

  const expandedLines = lines.map(line => {
    const includeMatch = line.match(/^include::(.+?)\[\]$/);
    if (includeMatch) {
      const includePath = includeMatch[1];
      const resolvedPath = path.resolve(baseDir, includePath);

      if (!fs.existsSync(resolvedPath)) {
        console.warn(`警告: include先ファイルが存在しません: ${resolvedPath}`);
        return line; // 元の行を残す
      }

      const includedContent = fs.readFileSync(resolvedPath, 'utf-8');
      return includedContent;
    } else {
      return line;
    }
  });

  return expandedLines.join('\n');
}
