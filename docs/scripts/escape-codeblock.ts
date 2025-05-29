export function escapeCodeblock(input: string): string {
  //convert ASCIIDOC code blocks to Markdown format
  // This function converts ASCIIDOC code blocks to Markdown format
  return input.replace(
    /<pre class="highlight">\s*<code class="language-([a-zA-Z0-9]+)"[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/g,
    (_, lang: string, code: string) => {
      return `\n\`\`\`${lang}\n${code}\n\`\`\`\n`
    }
  )
}