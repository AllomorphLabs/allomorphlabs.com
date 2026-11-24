import { useState } from 'react'
import results from '../data/results.json'
import { mean, pct, sd } from '../site/format.js'

// Chart colours, checked for colour-blind separation on the dark panel (dataviz validator).
const SERIES = [
  { key: 'method', label: 'The method', note: 'both trained models', color: 'var(--chart-1)' },
  { key: 'counts', label: 'Lookup table', note: 'counted frame changes in place of the frame model', color: 'var(--chart-2)' },
  { key: 'baseline', label: 'Co-occurrence', note: 'no trained models at all', color: 'var(--chart-3)' },
]
const ROLE = { development: 'Development', tuning: 'Tuning', confirmation: 'Confirmation, untouched' }

function Legend({ items }) {
  return (
    <div className="legend-row">
      {items.map((s) => (
        <span key={s.key} className="legend-item">
          <i style={{ background: s.color }} />
          <span>
            <span className="ink">{s.label}</span> <span className="muted">· {s.note}</span>
          </span>
        </span>
      ))}
    </div>
  )
}

/** Share of held-out sentences decoded exactly right, per pair, for the method and its controls. */
export function ResultsChart() {
  const [hover, setHover] = useState(null)
  return (
    <figure className="chart">
      <figcaption className="chart__title">
        Held-out sentences decoded to exactly the right world state, up to the twin swap
      </figcaption>
      <Legend items={SERIES} />
      <div className="bars" onMouseLeave={() => setHover(null)}>
        {results.map((r) => (
          <div key={r.pair} className="bars__group">
            <div className="bars__label">
              <span className="ink">Pair {r.pair}</span>
              <span className="small muted">{ROLE[r.role]}</span>
            </div>
            <div className="bars__rows">
              {SERIES.map((s) => {
                const v = r[s.key]
                const id = `${r.pair}-${s.key}`
                return (
                  <div
                    key={s.key}
                    className={hover && hover !== id ? 'bars__row bars__row--dim' : 'bars__row'}
                    onMouseEnter={() => setHover(id)}
                    onFocus={() => setHover(id)}
                    tabIndex={0}
                    aria-label={`Pair ${r.pair}, ${s.label}: ${pct(v)}`}
                  >
                    <div className="bars__track">
                      <div className="bars__fill" style={{ width: `max(${100 * v}%, 3px)`, background: s.color }} />
                    </div>
                    <span className="bars__value mono">{pct(v)}</span>
                    {hover === id && (
                      <div className="tooltip" role="tooltip">
                        <strong>{s.label}</strong> on pair {r.pair}: {pct(v)} of {r.sentences.toLocaleString('en-GB')} held-out
                        sentences. Chance: {pct(r.chance, 2)}.
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        <div className="bars__axis" aria-hidden="true">
          {[0, 25, 50, 75, 100].map((t) => (
            <span key={t} style={{ left: `${t}%` }}>{t}%</span>
          ))}
        </div>
      </div>
      <details className="chart__table">
        <summary>Show as a table</summary>
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Pair</th>
              {SERIES.map((s) => <th key={s.key} scope="col">{s.label}</th>)}
              <th scope="col">Chance</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.pair}>
                <th scope="row">{r.pair} ({ROLE[r.role].toLowerCase()})</th>
                {SERIES.map((s) => <td key={s.key}>{pct(r[s.key])}</td>)}
                <td>{pct(r.chance, 2)}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">Mean</th>
              {SERIES.map((s) => <td key={s.key}>{pct(mean(results.map((r) => r[s.key])))}</td>)}
              <td />
            </tr>
          </tbody>
        </table>
      </details>
    </figure>
  )
}

/** Restarts within each pair against the spread between pairs. */
export function VarianceChart() {
  const [hover, setHover] = useState(null)
  const within = Math.sqrt(mean(results.map((r) => sd(r.restarts) ** 2)))
  const between = sd(results.map((r) => mean(r.restarts)))
  return (
    <figure className="chart">
      <figcaption className="chart__title">The method, restarted three times on each pair</figcaption>
      <div className="dots" onMouseLeave={() => setHover(null)}>
        {results.map((r) => {
          const m = mean(r.restarts)
          return (
            <div key={r.pair} className="dots__row">
              <div className="bars__label">
                <span className="ink">Pair {r.pair}</span>
                <span className="small muted">mean {pct(m)}</span>
              </div>
              <div className="dots__track">
                <span className="dots__mean" style={{ left: `${100 * m}%` }} aria-hidden="true" />
                {r.restarts.map((v, k) => {
                  const id = `${r.pair}-${k}`
                  return (
                    <span
                      // Restart k is restart seed k: the index is its identity.
                      key={k}
                      className="dots__dot"
                      style={{ left: `${100 * v}%` }}
                      tabIndex={0}
                      aria-label={`Pair ${r.pair}, restart ${k}: ${pct(v)}`}
                      onMouseEnter={() => setHover(id)}
                      onFocus={() => setHover(id)}
                    >
                      {hover === id && (
                        <span className="tooltip" role="tooltip">Restart seed {k}: {pct(v)}</span>
                      )}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
        <div className="bars__axis" aria-hidden="true">
          {[0, 25, 50, 75, 100].map((t) => (
            <span key={t} style={{ left: `${t}%` }}>{t}%</span>
          ))}
        </div>
      </div>
      <div className="chart__stats">
        <div><span className="stat__value stat__value--small">{(100 * within).toFixed(1)}</span><span className="small muted"> points: typical spread between restarts of one pair</span></div>
        <div><span className="stat__value stat__value--small">{(100 * between).toFixed(1)}</span><span className="small muted"> points: spread between pairs</span></div>
      </div>
    </figure>
  )
}
