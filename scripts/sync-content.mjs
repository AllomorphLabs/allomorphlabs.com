// Copy the research documents into the site, and index the experiment log.
//
//   npm run sync                         # from ../unsupervised-grounding
//   npm run sync -- path/to/research-repo
//
// The research repo is the source of truth: never edit src/content/*.md by hand.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const repo = resolve(process.argv[2] ?? '../unsupervised-grounding')
const out = resolve('src/content')
mkdirSync(out, { recursive: true })

const files = { 'proposal.md': 'docs/proposal.md', 'research-log.md': 'docs/alignment-attempts.md' }
for (const [dest, src] of Object.entries(files)) {
  writeFileSync(join(out, dest), readFileSync(join(repo, src), 'utf8').replace(/\r\n/g, '\n'))
}

// Entries are bold numbered paragraphs ("**12. Title.**") under "### Session ..." headings.
const log = readFileSync(join(out, 'research-log.md'), 'utf8')
const entries = []
let session = ''
for (const line of log.split('\n')) {
  const s = line.match(/^### (.+)$/)
  if (s) session = s[1].trim()
  const e = line.match(/^\*\*(\d+)\. (.+?)\*\*(.*)$/)
  if (e) entries.push({ n: Number(e[1]), title: e[2].replace(/\.$/, ''), session })
}
writeFileSync(join(out, 'log-index.json'), JSON.stringify(entries, null, 1) + '\n')
console.log(`synced ${Object.keys(files).length} documents from ${repo}; ${entries.length} log entries`)
