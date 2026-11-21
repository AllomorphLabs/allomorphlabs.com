import { Eyebrow } from './shared.jsx'

// Pixel cells for the right half of the hero mark, computed once.
const CX = 200
const CY = 200
const R = 120
const CELL = 15
const PIXELS = []
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 16; j++) {
    const x = CX + 3 + i * CELL
    const y = CY - R + j * CELL
    const mx = x + CELL / 2
    const my = y + CELL / 2
    if ((mx - CX) ** 2 + (my - CY) ** 2 <= R ** 2) {
      PIXELS.push({ x, y: y + 1.5, delay: (PIXELS.length % 7) * 0.8 })
    }
  }
}

function HeroMark() {
  return (
    <svg viewBox="0 0 400 400" className="hero-mark" aria-hidden="true">
      <circle className="orbit orbit--a" cx="200" cy="200" r="178" fill="none" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="2 10" />
      <circle className="orbit orbit--b" cx="200" cy="200" r="150" fill="none" stroke="var(--ice)" strokeOpacity="0.35" strokeDasharray="60 14 6 14" />
      <g className="orbit orbit--a"><circle cx="200" cy="22" r="5" fill="var(--ice)" /></g>
      <g className="orbit orbit--b"><rect x="345" y="195" width="10" height="10" rx="2" fill="var(--amber)" /></g>
      <path d={`M${CX} ${CY - R} A${R} ${R} 0 0 0 ${CX} ${CY + R} Z`} fill="var(--ink)" />
      {PIXELS.map((p) => (
        <rect
          key={`${p.x}-${p.y}`}
          className="px"
          style={{ animationDelay: `${p.delay}s` }}
          x={p.x}
          y={p.y}
          width="12"
          height="12"
          rx="2"
          fill="var(--amber)"
        />
      ))}
      <line className="scan" x1="200" y1="72" x2="330" y2="72" stroke="var(--ice)" strokeWidth="1.5" strokeOpacity="0.8" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__kicker">
            <span className="pulse-dot" />
            <Eyebrow>Independent research · Computer science</Eyebrow>
          </div>
          <h1 className="hero__title">
            Same structure.
            <br />
            <span className="accent">Different forms.</span>
          </h1>
          <p className="hero__lede">
            Allomorph is an independent research organisation working on hard, open problems in
            computer science, in machine learning and beyond. We build small, controlled worlds
            where we already know the right answer, then find out exactly what an algorithm can
            learn, and where it hits a hard limit.
          </p>
          <div className="button-row">
            <a className="btn" href="#project">Read the first proposal</a>
            <a className="btn btn--ghost" href="#approach">How we work</a>
          </div>
        </div>
        <div className="hero__art">
          <div className="hero__glow" aria-hidden="true" />
          <HeroMark />
        </div>
      </div>
    </section>
  )
}
