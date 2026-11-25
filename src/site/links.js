export const GITHUB_URL = 'https://github.com/allomorphlabs'
export const EMAIL = 'shane@allomorphlabs.com'
export const REPO_URL = `${GITHUB_URL}/unsupervised-grounding`
export const PROJECT = '/research/unsupervised-grounding/'
export const PROPOSAL = `${PROJECT}proposal/`
export const LOG = `${PROJECT}log/`
export const ABOUT = '/about/'
export const IDEA_CIRCUITS = '/research/ideas/planted-circuits/'
export const IDEA_LANGUAGE = '/research/ideas/undesigned-language/'
export const LIT_REVIEW = `${REPO_URL}/blob/main/docs/literature-review.md`
export const PROPOSAL_DOCX = '/proposals/predicting-the-limits-of-unsupervised-grounding.docx'

/** A link to one entry of the research log. */
export const logEntry = (n) => `${LOG}#entry-${n}`

/** Where a relative link inside a research-repo document should point on the site. */
export function docLink(href) {
  if (/^(https?:|mailto:|#)/.test(href)) return href
  const [path, hash = ''] = href.split('#')
  const frag = hash ? `#${hash}` : ''
  const file = path.replace(/^(\.\/|docs\/)/, '')
  if (file === 'proposal.md') return `${PROPOSAL}${frag}`
  if (file === 'alignment-attempts.md') return `${LOG}${frag}`
  const inDocs = !path.startsWith('../') && !path.includes('/') && path.endsWith('.md')
  return `${REPO_URL}/blob/main/${inDocs ? 'docs/' : ''}${path.replace(/^\.\.\//, '')}${frag}`
}
