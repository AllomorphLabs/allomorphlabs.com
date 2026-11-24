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
    description: 'Can an AI that has only ever read words be connected to the world they describe? Project 01: the question, the method, real pilot results and what comes next.' },
  { file: 'research/unsupervised-grounding/proposal/index.html', page: 'proposal', path: '/research/unsupervised-grounding/proposal/',
    title: 'Proposal: predicting the limits of unsupervised grounding · Allomorph',
    description: 'The full research proposal for Project 01, revised after the pilot.' },
  { file: 'research/unsupervised-grounding/log/index.html', page: 'log', path: '/research/unsupervised-grounding/log/',
    title: 'Research log: unsupervised grounding · Allomorph',
    description: 'Every experiment in Project 01, in order, failures included: why we ran it, how, what happened and what it means.' },
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
