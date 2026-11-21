import { useEffect, useState } from 'react'
import { Eyebrow, GITHUB_URL } from './shared.jsx'
import GridWorld from './GridWorld.jsx'
import { buildSteps } from './twinsScript.js'

const STEP_MS = 2200
const PROPOSAL_URL = '/proposals/predicting-the-limits-of-unsupervised-grounding.docx'
const REPO_URL = `${GITHUB_URL}/unsupervised-grounding`

const HOW_IT_WORKS = [
  { n: '1', title: 'One AI only reads', body: 'It learns from sentences about the world, written in a made-up language.' },
  { n: '2', title: 'Another AI only watches', body: 'It learns from silent recordings of the same world. It never sees a word.' },
  { n: '3', title: 'We match them up, with no dictionary', body: 'Which name in the text belongs to which figure in the video? The only clue is how each one behaves.' },
]

function MatchBar({ label, value, width, tone }) {
  return (
    <div className="match">
      <div className="match__row">
        <span>{label}</span>
        <span className="mono">{value}</span>
      </div>
      <div className="match__track">
        <div className={`match__fill match__fill--${tone}`} style={{ width }} />
      </div>
    </div>
  )
}

export default function TwinsDemo() {
  const [habit, setHabit] = useState(false)
  const [tick, setTick] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return undefined
    const id = setInterval(() => setTick((t) => t + 1), STEP_MS)
    return () => clearInterval(id)
  }, [playing])

  const steps = buildSteps(habit)
  const current = tick % steps.length
  const step = steps[current]

  const toggleHabit = () => {
    setHabit((h) => !h)
    // Jump straight to the evening split so the change is visible at once.
    setTick(habit ? 0 : 2)
  }

  return (
    <section id="project" className="section section--tinted">
      <div className="container stack-44">
        <div className="section-head section-head--wide">
          <div className="tag-row">
            <Eyebrow tone="amber">Project 01</Eyebrow>
            <span className="pill">Proposal · Nov 2026</span>
          </div>
          <h2 className="h2 h2--lg">Can an AI that has only ever read words understand the world they describe?</h2>
          <p className="lede">
            Language models learn from text alone. They never see, hear or touch anything, yet they
            often seem to understand. We test how far that understanding can really go, inside a tiny
            world we built ourselves, where we know every right answer.
          </p>
          <div className="button-row">
            <a
              className="btn btn--ghost btn--small"
              href={PROPOSAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the proposal (Word document, opens in a new tab)"
            >
              Read the proposal (.docx)
            </a>
            <a className="btn btn--ghost btn--small" href={REPO_URL}>
              View the code on GitHub
            </a>
          </div>
        </div>

        <div className="how-grid">
          {HOW_IT_WORKS.map((s) => (
            <div key={s.n} className="how">
              <div className="how__num">{s.n}</div>
              <div className="how__text">
                <div className="how__title">{s.title}</div>
                <div className="how__body">{s.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="catch">
          <p>
            <strong className="accent">The catch.</strong> Zib and Mov are perfect twins. Each lives
            in an identical hut, and every day they go to the river together, eat at the berry bush
            together and go home at the same moment, standing in the very same spots. Nothing tells
            them apart. Try it: give Zib one evening habit that Mov doesn’t have.
          </p>
          <div className="button-row">
            <button type="button" className="btn" onClick={toggleHabit}>
              {habit ? 'Reset' : 'Give Zib an evening habit'}
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--icon"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause the animation' : 'Play the animation'}
            >
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2 L14 8 L4 14 Z" fill="currentColor" /></svg>
              )}
            </button>
          </div>
        </div>

        <div className="demo">
          {/* Reader */}
          <div className="panel">
            <div className="panel__head">
              <Eyebrow tone="ice">What the reader sees</Eyebrow>
              <span className="panel__aside">repeats every day</span>
            </div>
            <ol className="lines">
              {steps.flatMap((s, i) =>
                s.lines.map((l) => (
                  <li key={`${s.time}-${l.who}-${l.rest}`} className={i === current ? 'line line--active' : 'line'}>
                    <span className="line__time">{s.time}</span>
                    <span className="line__text">
                      <span className="mono line__words"><span className="accent">{l.who}</span> {l.rest}</span>
                      <span className="line__gloss">“{l.english}”</span>
                    </span>
                  </li>
                )),
              )}
            </ol>
            <p className="panel__note">
              Knows the characters only as the words “zib” and “mov”. English translations are shown for you.
            </p>
          </div>

          {/* Match */}
          <div className="panel panel--raised panel--centre">
            <Eyebrow tone="amber">Best possible match</Eyebrow>
            <MatchBar label="Zib is figure 1" value={habit ? 'Only fit' : '50%'} width={habit ? '100%' : '50%'} tone="amber" />
            <MatchBar label="Zib is figure 2" value={habit ? 'Ruled out' : '50%'} width={habit ? '2%' : '50%'} tone="ice" />
            <p className="verdict" aria-live="polite">
              {habit
                ? 'Now one twin makes an extra evening trip to the river on their own: Zib in the text, figure 1 in the video. Only one answer fits, so the match gets it right.'
                : 'Zib and Mov do everything together, in the same place at the same time, so “Zib is figure 1” and “Zib is figure 2” fit the evidence equally well. It is a coin toss, and no AI, however clever, can do better.'}
            </p>
          </div>

          {/* Watcher */}
          <div className="panel">
            <Eyebrow tone="ice">What the watcher sees</Eyebrow>
            <div className="chips">
              <span className="chip">Every day · {step.time}</span>
              {step.unique && <span className="chip chip--amber">Only figure 1 ever does this</span>}
            </div>
            <GridWorld step={step} />
            <div className="legend">
              <span><i className="key key--figure" />figures 1 and 2</span>
              <span><i className="key key--hut" />huts</span>
              <span><i className="key key--bush" />berry bush</span>
              <span><i className="key key--river" />river</span>
            </div>
            <p className="panel__note">
              No names, no words: just two figures, each leaving their own hut and coming back. Shown
              in sync here so you can follow along; the two AIs actually learn from separate
              recordings and never see each other’s data.
            </p>
          </div>
        </div>

        <div className="takeaway">
          <div className="takeaway__label"><Eyebrow tone="ice">Why it matters</Eyebrow></div>
          <p>
            Any AI that learns from patterns alone hits this wall, however powerful it is. Because we
            built the world, we can list every tie like Zib and Mov in advance. That lets us predict
            exactly which mix-ups must happen, and check that they disappear the moment a tie is
            broken. The result is a precise answer to{' '}
            <span className="ink">how much meaning a text-only AI can be shown to hold</span>, and a
            map of what it can never pin down.
          </p>
        </div>
      </div>
    </section>
  )
}
