import { Marked } from 'marked'
import { docLink } from './links.js'

/** GitHub-style heading ids, so links like #pilot-results-and-revisions keep working. */
export function slug(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;|&#\d+;/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s/g, '-')
}

/**
 * Render a research document. Returns its HTML and its contents (h2 headings).
 * Relative links into the research repo become links to the site's pages or to GitHub.
 * `entryIds` gives log entries ("**12. Title.**" paragraphs) anchors like #entry-12.
 */
export function render(md, { entryIds = false } = {}) {
  const toc = []
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens)
        const id = slug(html)
        if (depth === 2) toc.push({ id, text: html.replace(/<[^>]+>/g, '') })
        return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true">#</a>${html}</h${depth}>\n`
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens)
        const to = docLink(href)
        const ext = /^https?:/.test(to) && !to.startsWith('https://allomorphlabs.com')
        return `<a href="${to}"${title ? ` title="${title}"` : ''}${ext ? ' rel="noopener"' : ''}>${text}</a>`
      },
    },
  })
  // Wide tables scroll inside their own box instead of widening the page.
  let html = marked.parse(md).replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>')
  if (entryIds) {
    html = html.replace(/<p><strong>(\d+)\. /g, '<p id="entry-$1" class="entry"><strong><a class="anchor" href="#entry-$1" aria-hidden="true">#</a>$1. ')
  }
  return { html, toc }
}
