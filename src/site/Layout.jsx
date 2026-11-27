import { useState } from 'react'
import { LogoMark } from '../components/shared.jsx'
import { ABOUT, EMAIL, GITHUB_URL, IDEA_CIRCUITS, IDEA_LANGUAGE, LOG, PROJECT, PROPOSAL } from './links.js'

const YEAR = new Date().getFullYear()

const NAV = [
  { href: PROJECT, label: 'Project 01', pages: ['project'] },
  { href: PROPOSAL, label: 'Proposal', pages: ['proposal'] },
  { href: LOG, label: 'Research log', pages: ['log'] },
  { href: ABOUT, label: 'About', pages: ['about'] },
]

function Nav({ page }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Main">
        <a href="/" className="brand">
          <LogoMark />
          <span className="brand__name">allomorph</span>
        </a>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path d={open ? 'M4 4 L16 16 M16 4 L4 16' : 'M3 6 H17 M3 10 H17 M3 14 H17'} stroke="currentColor" strokeWidth="1.6" fill="none" />
          </svg>
        </button>
        <div id="nav-links" className={open ? 'nav__links nav__links--open' : 'nav__links'}>
          {NAV.map((n) => (
            <a
              key={n.href}
              className={n.pages.includes(page) ? 'nav__link nav__link--active' : 'nav__link'}
              aria-current={n.pages.includes(page) ? 'page' : undefined}
              href={n.href}
            >
              {n.label}
            </a>
          ))}
          <a className="btn btn--small nav__github" href={GITHUB_URL}>GitHub</a>
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="brand__name brand__name--small">allomorph</span>
          <p className="muted small">Independent research on hard, open problems in computer science.</p>
        </div>
        <div className="footer__col">
          <div className="eyebrow eyebrow--muted">Research</div>
          <a href={PROJECT}>Project 01</a>
          <a href={PROPOSAL}>Proposal</a>
          <a href={LOG}>Research log</a>
          <a href={IDEA_CIRCUITS}>Idea: planted circuits</a>
          <a href={IDEA_LANGUAGE}>Idea: undesigned language</a>
        </div>
        <div className="footer__col">
          <div className="eyebrow eyebrow--muted">Lab</div>
          <a href={ABOUT}>About</a>
          <a href={GITHUB_URL}>GitHub</a>
          <a href={`mailto:${EMAIL}`}>Contact</a>
        </div>
        <div className="footer__legal mono muted small">© {YEAR} Allomorph · allomorphlabs.com</div>
      </div>
    </footer>
  )
}

export default function Layout({ page, children }) {
  return (
    <div className="page">
      <div className="grid-bg" aria-hidden="true" />
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav page={page} />
      <main id="main">{children}</main>
      <Footer />
    </div>
  )
}
