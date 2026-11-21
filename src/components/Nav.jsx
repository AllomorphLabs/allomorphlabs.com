import { GITHUB_URL, LogoMark } from './shared.jsx'

export default function Nav() {
  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Main">
        <a href="#top" className="brand">
          <LogoMark />
          <span className="brand__name">allomorph</span>
        </a>
        <div className="nav__links">
          <a className="nav__link" href="#approach">Approach</a>
          <a className="nav__link" href="#project">Research</a>
          <a className="nav__link" href="#method">Method</a>
          <a className="nav__link" href="#code">Code</a>
          <a className="btn btn--small" href={GITHUB_URL}>View on GitHub</a>
        </div>
      </nav>
    </header>
  )
}
