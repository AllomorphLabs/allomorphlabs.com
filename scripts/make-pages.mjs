// Write each page's HTML shell. Run once when adding a page: npm run pages
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const SITE = 'https://allomorphlabs.com'
const UPDATED = '2026-11-27' // last content change, for the sitemap
const ORG = { '@type': 'Organization', name: 'Allomorph', url: SITE, logo: `${SITE}/favicon.svg` }
const PROJECT_LD = {
  '@type': 'ResearchProject',
  name: 'Predicting the Limits of Unsupervised Grounding',
  url: `${SITE}/research/unsupervised-grounding/`,
  description: 'Can an AI decode a language using only what another AI has seen, and can we predict in advance which mistakes must remain?',
  parentOrganization: ORG,
}
const PAGES = [
  { file: 'index.html', page: 'home', path: '/',
    title: 'Allomorph: exact answers to elusive questions',
    description: 'An independent research lab. We build small worlds where every answer is known, predict which mistakes an AI can’t avoid, and test whether we were right.',
    ld: [{ ...ORG, description: 'An independent research lab working on hard, open problems in computer science.' },
      { '@type': 'WebSite', name: 'Allomorph', url: SITE }] },
  { file: 'research/unsupervised-grounding/index.html', page: 'project', path: '/research/unsupervised-grounding/',
    title: 'Predicting the limits of unsupervised grounding · Allomorph',
    description: 'Can an AI decode a language using only what another AI has seen? Our first project: the question, the method, results so far and what comes next.',
    ld: [PROJECT_LD] },
  { file: 'research/unsupervised-grounding/proposal/index.html', page: 'proposal', path: '/research/unsupervised-grounding/proposal/',
    title: 'Proposal: the limits of unsupervised grounding · Allomorph',
    description: 'The research proposal for Predicting the Limits of Unsupervised Grounding: hypotheses, method, controls and plan, rewritten after the pilot.',
    ld: [{ '@type': 'ScholarlyArticle', headline: 'Predicting the Limits of Unsupervised Grounding',
      url: `${SITE}/research/unsupervised-grounding/proposal/`, inLanguage: 'en-GB', publisher: ORG,
      about: PROJECT_LD.name }] },
  { file: 'research/unsupervised-grounding/log/index.html', page: 'log', path: '/research/unsupervised-grounding/log/',
    title: 'Research log: unsupervised grounding · Allomorph',
    description: 'Every experiment in the project, in order: why we ran it, how, what happened and what it means. Breakthroughs and dead ends, none rewritten afterwards.',
    ld: [{ '@type': 'Blog', name: 'Research log: unsupervised grounding',
      url: `${SITE}/research/unsupervised-grounding/log/`, publisher: ORG, about: PROJECT_LD.name }] },
  { file: 'research/ideas/planted-circuits/index.html', page: 'idea-circuits', path: '/research/ideas/planted-circuits/',
    title: 'Idea: can interpretability find a planted circuit? · Allomorph',
    description: 'An idea for a future Allomorph problem, not yet a project: plant known algorithms in neural networks and test whether interpretability tools recover them.' },
  { file: 'research/ideas/undesigned-language/index.html', page: 'idea-language', path: '/research/ideas/undesigned-language/',
    title: 'Idea: can we read a language nobody designed? · Allomorph',
    description: 'An idea for a future Allomorph problem, not yet a project: decipher a language that AI agents invent for themselves.' },
  { file: 'about/index.html', page: 'about', path: '/about/',
    title: 'About · Allomorph',
    description: 'What Allomorph is, why it’s called that, how we work, and who runs it.',
    ld: [{ '@type': 'AboutPage', name: 'About Allomorph', url: `${SITE}/about/`, about: ORG }] },
]

// Structured data for search engines (schema.org JSON-LD); '<' escaped so it can't close the tag.
function ldScript(p) {
  if (!p.ld) return ''
  const graph = { '@context': 'https://schema.org', '@graph': p.ld }
  return `    <script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>\n`
}

for (const p of PAGES) {
  mkdirSync(dirname(p.file), { recursive: true })
  writeFileSync(p.file, `<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${p.title}</title>
    <meta name="description" content="${p.description}" />
    <meta name="theme-color" content="#070A14" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href="${SITE}${p.path}" />

    <meta name="robots" content="index, follow" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Allomorph" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:url" content="${SITE}${p.path}" />
    <meta property="og:title" content="${p.title}" />
    <meta property="og:description" content="${p.description}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${p.title}" />
    <meta name="twitter:description" content="${p.description}" />
${ldScript(p)}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
    />
  </head>
  <body data-page="${p.page}">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`)
}
writeFileSync('scripts/pages.json', JSON.stringify(PAGES.map((p) => p.file), null, 1) + '\n')

// How search engines find every page.
mkdirSync('public', { recursive: true })
writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${UPDATED}</lastmod></url>`).join('\n')}
</urlset>
`)
writeFileSync('public/robots.txt', `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`)
console.log(`wrote ${PAGES.length} pages`)
