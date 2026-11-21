import { figurePosition } from './twinsScript.js'

const COLS = 12
const ROWS = 7
const RIVER_COL = 10

const CELLS = []
for (let i = 0; i < COLS; i++) {
  for (let j = 0; j < ROWS; j++) {
    CELLS.push({ x: i * 20 + 1, y: j * 20 + 6, river: i === RIVER_COL })
  }
}

function Hut({ top }) {
  return (
    <g>
      <rect x="10" y={top + 18} width="40" height="36" rx="3" className="gw-hut" />
      <path d={`M5 ${top + 19} L30 ${top} L55 ${top + 19} Z`} className="gw-hut" strokeLinejoin="round" />
    </g>
  )
}

function Figure({ n, step }) {
  const [x, y] = figurePosition(step, n)
  return (
    <g className="gw-figure" style={{ transform: `translate(${x}px, ${y}px)` }}>
      <rect x="4" y="4" width="12" height="12" rx="3" fill="var(--amber)" />
      <text x="10" y="13" textAnchor="middle" className="gw-figure__label">{n}</text>
    </g>
  )
}

/** The silent "video" the watcher AI sees: two huts, a berry bush, a river and two figures. */
export default function GridWorld({ step }) {
  const eating = step.f1 === 'food' || step.f2 === 'food'
  return (
    <svg viewBox="0 0 240 150" className="grid-world" aria-hidden="true">
      {CELLS.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          x={c.x}
          y={c.y}
          width="18"
          height="18"
          rx="2"
          fill={c.river ? 'var(--ice)' : 'var(--line)'}
          fillOpacity={c.river ? 0.55 : 1}
        />
      ))}
      <Hut top={8} />
      <Hut top={80} />
      <g className="gw-bush" style={{ opacity: eating ? 0.55 : 1 }}>
        <circle cx="146" cy="73" r="6" fill="var(--muted)" />
        <circle cx="154" cy="73" r="6" fill="var(--muted)" />
        <circle cx="150" cy="80" r="6" fill="var(--muted)" />
        <circle cx="145" cy="71" r="1.8" fill="var(--amber)" />
        <circle cx="155" cy="75" r="1.8" fill="var(--amber)" />
        <circle cx="149" cy="82" r="1.8" fill="var(--amber)" />
      </g>
      <Figure n={1} step={step} />
      <Figure n={2} step={step} />
    </svg>
  )
}
