export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer__inner">
        <span className="brand__name brand__name--small">allomorph</span>
        <span className="mono muted small">
          allomorphlabs.com · <a href="https://github.com/allomorphlabs">github.com/allomorphlabs</a> · © {new Date().getFullYear()} Allomorph
        </span>
      </div>
    </footer>
  )
}
