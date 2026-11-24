# allomorphlabs.com

The Allomorph landing page: a static React site built with Vite and deployed to GitHub Pages at <https://allomorphlabs.com>.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

- `npm run build`: production build into `dist/`
- `npm run preview`: serve the production build locally
- `npm run lint`: run oxlint

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. In the repository's **Settings → Pages**, **Source** must be set to **GitHub Actions**, and the custom domain is `allomorphlabs.com`.

## Pages

| URL | Page | Source |
|---|---|---|
| `/` | Home | `src/pages/Home.jsx` |
| `/research/unsupervised-grounding/` | Project 01: question, method, real pilot results, what's next | `src/pages/Project.jsx` |
| `/research/unsupervised-grounding/proposal/` | The proposal, rendered from Markdown | `src/pages/Proposal.jsx` |
| `/research/unsupervised-grounding/log/` | The research log, rendered from Markdown | `src/pages/Log.jsx` |
| `/about/` | About the lab | `src/pages/About.jsx` |

Each page has its own HTML shell (title, description, canonical URL), written by `npm run pages` from `scripts/make-pages.mjs`. To add a page, add it there and to `src/main.jsx`.

## Content from the research repo

The site never invents its numbers. Everything about Project 01 comes from the [`unsupervised-grounding`](https://github.com/allomorphlabs/unsupervised-grounding) repo, expected next to this one:

- **Documents:** `npm run sync` copies `docs/proposal.md` and `docs/alignment-attempts.md` into `src/content/` and indexes the log's entries. Don't edit `src/content/` by hand.
- **Pilot data:** from the research repo, `uv run python scripts/export_site_data.py ../allomorphlabs.com/src/data` writes `results.json` (every pair's results and controls, and the restart variance) and `sample.json` (real held-out sentences from pair 2, decoded, beside the truth).
- **Word version of the proposal:** `public/proposals/` holds the .docx. Rebuild it whenever `docs/proposal.md` changes.

## Where things live

| Path | What it is |
|---|---|
| `index.html`, `research/`, `about/` | Page shells (generated; see above) |
| `public/favicon.svg` | Split-circle mark used as the favicon |
| `public/proposals/` | Research proposals as Word documents |
| `src/index.css` | Base styles: colour tokens, type, buttons, hero, cards, the twins demo |
| `src/site.css` | Styles for the multi-page site: figures, explorer, charts, documents |
| `src/main.jsx` | Loads the page named in `<body data-page>` |
| `src/site/` | Layout (nav and footer), links, Markdown rendering, formatting helpers |
| `src/pages/` | One file per page |
| `src/components/Explorer.jsx` | Real pilot sentences, step by step, decoded beside the truth |
| `src/components/Charts.jsx` | Results and variance charts |
| `src/components/WorldMap.jsx` | A world state drawn as the pilot world's map |
| `src/components/TwinsDemo.jsx` | The illustrative Zib and Mov demo |
| `src/content/`, `src/data/` | Synced documents and exported pilot data |

## Still to decide

- A contact address. The site links to GitHub only.
- Projects 02 and 03 are shown as "To be announced".
