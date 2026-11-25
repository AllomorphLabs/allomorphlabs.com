// Write each page's HTML shell. Run once when adding a page: npm run pages
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const SITE = 'https://allomorphlabs.com'
const PAGES = [
  { file: 'index.html', page: 'home', path: '/',
    title: 'Allomorph: hard problems in computer science',
    description: 'Allomorph is an independent research lab working on hard, open problems in computer science. We build small worlds where the right answer is known, predict what an algorithm must get wrong, and publish everything, failures included.' },
  { file: 'research/unsupervised-grounding/index.html', page: 'project', path: '/research/unsupervised-grounding/',
    title: 'Predicting the limits of unsupervised grounding · Allomorph',
    description: 'When an AI decodes a language with no dictionary, some mistakes are unavoidable. Project 01 predicts exactly which ones: the question, the method, real pilot results and what comes next.' },
  { file: 'research/unsupervised-grounding/proposal/index.html', page: 'proposal', path: '/research/unsupervised-grounding/proposal/',
    title: 'Proposal: predicting the limits of unsupervised grounding · Allomorph',
    description: 'The full research proposal for Project 01: the second version, rewritten after the pilot and the literature check.' },
  { file: 'research/unsupervised-grounding/log/index.html', page: 'log', path: '/research/unsupervised-grounding/log/',
    title: 'Research log: unsupervised grounding · Allomorph',
    description: 'Every experiment in Project 01, in order, failures included: why we ran it, how, what happened and what it means.' },
  { file: 'research/ideas/planted-circuits/index.html', page: 'idea-circuits', path: '/research/ideas/planted-circuits/',
    title: 'Idea: can interpretability find a circuit we planted? · Allomorph',
    description: 'An idea for a future Allomorph problem, not yet a project: plant known algorithms in neural networks and test whether interpretability tools recover them.' },
  { file: 'research/ideas/undesigned-language/index.html', page: 'idea-language', path: '/research/ideas/undesigned-language/',
    title: 'Idea: can we read a language nobody designed? · Allomorph',
    description: 'An idea for a future Allomorph problem, not yet a project: decipher a language that AI agents invent for themselves.' },
  { file: 'about/index.html', page: 'about', path: '/about/',
    title: 'About · Allomorph',
    description: 'What Allomorph is, why it is called that, and how we work.' },
]

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

    <meta property="og:type" content="website" />
    <meta property="og:url" content="${SITE}${p.path}" />
    <meta property="og:title" content="${p.title}" />
    <meta property="og:description" content="${p.description}" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
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
console.log(`wrote ${PAGES.length} pages`)
