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

## Where things live

| Path | What it is |
|---|---|
| `index.html` | Page shell: title, meta tags, fonts, favicon |
| `public/favicon.svg` | Split-circle mark used as the favicon |
| `public/proposals/` | Research proposals, linked from each project section |
| `src/index.css` | All styling; colour tokens are at the top |
| `src/App.jsx` | Page order |
| `src/components/` | One file per section |
| `src/components/TwinsDemo.jsx` | The interactive Zib and Mov demo |
| `src/components/twinsScript.js` | The demo's timeline and invented-language vocabulary |
| `src/components/GridWorld.jsx` | The watcher's grid "video" |
| `src/components/shared.jsx` | Logo, labels and the GitHub URL |

## Placeholders still to fill in

- `[YOUR EMAIL]` in `src/components/OpenCode.jsx`
- `[RUN COMMAND]` in the terminal block in `src/components/OpenCode.jsx`
- `[NEXT PROBLEM]` and `[FUTURE PROBLEM]` in `src/components/Roadmap.jsx`
