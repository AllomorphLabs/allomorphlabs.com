import { useEffect, useState } from 'react'
import { Eyebrow } from '../components/shared.jsx'

/** Highlight the contents entry for the section being read. */
function useActive(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const seen = new Map()
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) seen.set(e.target.id, e.isIntersecting)
        const first = ids.find((id) => seen.get(id))
        if (first) setActive(first)
      },
      { rootMargin: '-80px 0px -60% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [ids])
  return active
}

/** A long research document: a header, a contents sidebar and the rendered text. */
export default function DocPage({ eyebrow, title, intro, actions, toc, tocTitle = 'Contents', html, aside }) {
  const ids = toc.map((t) => t.id)
  const active = useActive(ids)
  return (
    <>
      <section className="hero hero--page hero--doc">
        <div className="container">
          <div className="section-head section-head--wide">
            <Eyebrow tone="amber">{eyebrow}</Eyebrow>
            <h1 className="hero__title hero__title--page">{title}</h1>
            {intro && <div className="hero__lede">{intro}</div>}
            {actions && <div className="button-row">{actions}</div>}
          </div>
        </div>
      </section>
      <section className="section section--doc">
        <div className="container doc">
          <nav className="doc__toc" aria-label={tocTitle}>
            <div className="eyebrow eyebrow--muted">{tocTitle}</div>
            <ol>
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className={t.id === active ? 'toc-link toc-link--active' : 'toc-link'}>
                    {t.label ?? t.text}
                  </a>
                  {t.children && (
                    <ol>
                      {t.children.map((c) => (
                        <li key={c.id}>
                          <a href={`#${c.id}`} className="toc-link toc-link--sub">{c.label}</a>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
            {aside}
          </nav>
          {/* The HTML is rendered from our own research documents, bundled with the site (npm run sync). */}
          <article className="prose doc__body" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
    </>
  )
}
