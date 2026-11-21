import { Fragment } from 'react'
import { Eyebrow } from './shared.jsx'

function Step({ label, title, body, accent = false }) {
  return (
    <div className={accent ? 'step step--accent' : 'step'}>
      <Eyebrow tone={accent ? 'amber' : 'ice'}>{label}</Eyebrow>
      <div className="step__title">{title}</div>
      <div className="step__body">{body}</div>
    </div>
  )
}

function Arrow() {
  return (
    <svg className="arrow" width="36" height="14" viewBox="0 0 36 14" aria-hidden="true">
      <path d="M0 7 H30 M24 1 L32 7 L24 13" fill="none" stroke="var(--muted)" strokeWidth="1.5" />
    </svg>
  )
}

const STAGES = [
  <Step key="1" label="Step 1" title="Build a small world" body="Characters move between places, pick things up, drop and break them. We know every fact about it." accent />,
  <div key="2" className="step-pair">
    <Step label="Step 2a" title="The reader" body="An AI trained only on descriptions of the world in an invented language." />
    <Step label="Step 2b" title="The watcher" body="An AI trained only on silent, video-like recordings of the world." />
  </div>,
  <Step key="3" label="Step 3" title="Match them up" body="Line up what each AI has learned, with no dictionary and no labelled examples." />,
  <Step key="4" label="Step 4" title="Check against the truth" body="Mistakes should appear only where we predicted ties, and vanish when a tie is broken." accent />,
]

export default function Method() {
  return (
    <section id="method" className="section section--ruled">
      <div className="container stack-40">
        <div className="section-head">
          <Eyebrow tone="ice">Method</Eyebrow>
          <h2 className="h2">One made-up world. Two AIs that never meet. A match we can check against the truth.</h2>
        </div>
        <div className="pipeline">
          {STAGES.map((stage, i) => (
            <Fragment key={stage.key}>
              {i > 0 && <Arrow />}
              {stage}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
