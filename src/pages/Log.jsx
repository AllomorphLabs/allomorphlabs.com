import entries from '../content/log-index.json'
import log from '../content/research-log.md?raw'
import DocPage from '../site/DocPage.jsx'
import { PROJECT, PROPOSAL } from '../site/links.js'
import { render, slug } from '../site/Markdown.jsx'

const { html, toc } = render(log.replace(/^# .+\n+/, ''), { entryIds: true })

// Contents: the top sections, with each session's entries listed under "Experiments".
const sessions = [...new Set(entries.map((e) => e.session))]
const contents = toc.map((t) =>
  t.id === 'experiments'
    ? {
        ...t,
        children: sessions.map((s) => {
          const es = entries.filter((e) => e.session === s)
          const span = es.length > 1 ? `${es[0].n}–${es.at(-1).n}` : `${es[0].n}`
          return { id: slug(s), label: `${s} (${span})` }
        }),
      }
    : t,
)

export default function Log() {
  return (
    <DocPage
      eyebrow="Project 01 · Research log"
      title="Every experiment, in order"
      intro={
        <p>
          Each entry says why the experiment was run, how, what happened and what it means. Entries are never
          rewritten after the fact, including the ones that failed; titles are sometimes reworded so each reads clearly on its own. Only “Where we are now” is kept up to date. This
          log is the record of the work; the <a href={PROPOSAL}>proposal</a> is the design it serves.
        </p>
      }
      actions={
        <>
          <a className="btn btn--ghost btn--small" href={PROJECT}>Project overview</a>
          <a className="btn btn--ghost btn--small" href="#experiments">Jump to the experiments</a>
        </>
      }
      toc={contents}
      html={html}
      aside={
        <div className="toc-entries">
          <div className="eyebrow eyebrow--muted">All {entries.length} entries</div>
          <div className="toc-entries__grid">
            {entries.map((e) => (
              <a key={e.n} href={`#entry-${e.n}`} className="toc-entry mono" title={e.title}>
                {e.n}
              </a>
            ))}
          </div>
        </div>
      }
    />
  )
}
