import grid from '../data/grid.json'

// A real run of grid-video frames (scripts/export_site_data.py, grid pair 0, held out). Names,
// colours, place labels and captions come from the hidden key, for the reader only: the frame
// model sees just 240 yes/no values per frame.
const GLYPH = { glass: 'g', stone: 's', apple: 'a' }

function Thing({ t }) {
  if (t.kind === 'agent') {
    const cls = `grid-thing grid-thing--agent grid-thing--a${t.agent}${t.hungry ? ' grid-thing--hungry' : ''}`
    return (
      <span className={cls} title={`${t.who}${t.hungry ? ' (hungry)' : ''}`}>
        {t.who[0]}
      </span>
    )
  }
  return (
    <span className={`grid-thing grid-thing--object${t.broken ? ' grid-thing--broken' : ''}`} title={t.who}>
      {GLYPH[t.who] ?? t.who[0]}
    </span>
  )
}

function Frame({ cells, caption, n }) {
  const byCell = Object.fromEntries(cells.map((c) => [c.cell, c.things]))
  const patchOf = {}
  grid.patches.forEach((p, i) => p.cells.forEach((c) => (patchOf[c] = i)))
  return (
    <li className="grid-clip__step">
      <div className="grid-clip__caption">
        <span className="mono muted">{n}</span> {caption}
      </div>
      <div
        className="grid-frame"
        style={{ gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))` }}
        role="img"
        aria-label={`Frame ${n}: ${caption}`}
      >
        {Array.from({ length: grid.rows * grid.cols }, (_, c) => (
          <span key={c} className={`grid-cell${patchOf[c] === undefined ? ' grid-cell--gap' : ''}`}>
            {(byCell[c] ?? []).map((t, k) => (
              <Thing key={k} t={t} />
            ))}
          </span>
        ))}
      </div>
    </li>
  )
}

export default function GridClip() {
  // Each agent's name by its index, so the legend's colours match the frames'.
  const names = []
  grid.frames.flat().flatMap((c) => c.things).filter((t) => t.kind === 'agent').forEach((t) => (names[t.agent] = t.who))
  return (
    <figure className="grid-clip">
      <div className="grid-clip__places" style={{ gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))` }}>
        {[...grid.patches]
          .sort((a, b) => a.cells[0] - b.cells[0])
          .map((p) => (
            <span key={p.place} style={{ gridColumn: `${(p.cells[0] % grid.cols) + 1} / span 3` }}>
              {p.place}
            </span>
          ))}
      </div>
      <ol className="grid-clip__steps">
        {grid.frames.map((cells, i) => (
          <Frame key={i} cells={cells} caption={grid.captions[i]} n={i} />
        ))}
      </ol>
      <div className="legend grid-clip__legend">
        <span>
          <span className="grid-thing grid-thing--agent grid-thing--a0">{names[0]?.[0]}</span> {names[0]}
        </span>
        <span>
          <span className="grid-thing grid-thing--agent grid-thing--a1">{names[1]?.[0]}</span> {names[1]}
        </span>
        <span>
          <span className="grid-thing grid-thing--object grid-thing--hungry">&nbsp;</span> hungry (outlined)
        </span>
        <span>
          <span className="grid-thing grid-thing--object">g</span> glass <span className="grid-thing grid-thing--object">s</span>{' '}
          stone <span className="grid-thing grid-thing--object">a</span> apple
        </span>
      </div>
    </figure>
  )
}
