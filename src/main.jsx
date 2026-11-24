import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './site.css'
import Layout from './site/Layout.jsx'

// Each HTML shell names its page in <body data-page>; only that page's code is loaded.
const PAGES = {
  home: () => import('./pages/Home.jsx'),
  project: () => import('./pages/Project.jsx'),
  proposal: () => import('./pages/Proposal.jsx'),
  log: () => import('./pages/Log.jsx'),
  about: () => import('./pages/About.jsx'),
  'idea-circuits': () => import('./pages/Idea.jsx'),
  'idea-language': () => import('./pages/Idea.jsx'),
}

const name = document.body.dataset.page
const { default: Page } = await (PAGES[name] ?? PAGES.home)()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout page={name}>
      <Page />
    </Layout>
  </StrictMode>,
)

// Pages render after load, so jump to a #fragment once the content exists.
if (location.hash) {
  requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView())
}
