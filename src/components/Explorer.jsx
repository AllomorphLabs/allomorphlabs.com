import { useEffect, useMemo, useState } from 'react'
import sample from '../data/sample.json'
import results from '../data/results.json'
import { pct } from '../site/format.js'
import { Eyebrow } from './shared.jsx'
import { FrameCells } from './FrameCells.jsx'
import { pathOrder } from '../site/world.js'
import { WorldMap } from './WorldMap.jsx'

const STEP_MS = 1800
const cap = (w) => w[0].toUpperCase() + w.slice(1)
const PLACES = pathOrder(sample.world.places, sample.world.edges)
const [WORD_A, WORD_B] = [sample.agents.A, sample.agents.B]

// The matching the method chose, for the twins: did it pair each word with its true figure,
// or the other one? Read off the scored result (which labelling of the truth it agrees with).
const scored = results.find((r) => r.pair === sample.pair)
const SWAPPED = Object.entries(scored.by_symmetry).find(([k]) => k !== 'identity')[1] > scored.by_symmetry.identity
const other = (f) => (f === 'figure 1' ? 'figure 2' : 'figure 1')
// Word -> the figure the method matched it with.
const MATCHED = Object.fromEntries(
  Object.entries(sample.figures).map(([w, f]) => [w, SWAPPED ? other(f) : f]),
)
const WORD_OF_FIGURE = Object.fromEntries(Object.entries(MATCHED).map(([w, f]) => [f, w]))

// Right up to the twin symmetry, as the scoring counts it (the proposal's "modulo the symmetry group").
const right = (s) => s.exact || s.swapped

/** The facts the decoded state got wrong, read through the method's own matching. */
function mistakes(s) {
  const out = []
  for (const w of [WORD_A, WORD_B]) {
    const d = s.decoded.agents[MATCHED[w]]
    const t = s.truth.agents[cap(w)]
    if (d.place !== t.place) out.push(`where ${cap(w)} is`)
    if (d.hungry !== t.hungry) out.push(`whether ${cap(w)} is hungry`)
  }
  for (const [o, t] of Object.entries(s.truth.objects)) {
    const d = s.decoded.objects[o]
    const dWhere = d.state === 'held' ? cap(WORD_OF_FIGURE[d.where]) : d.where
    if (d.state !== t.state || dWhere !== t.where) out.push(`the ${o}`)
  }
  return out
}

const KIND = {
  intro: 'Opening: sets the scene',
  event: 'Something happens',
  effect: 'A consequence',
  recap: 'Recap of an earlier step',
}

export default function Explorer() {
  const [ep, setEp] = useState(0)
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(false)
  const episode = sample.episodes[ep]
  const sents = episode.sentences
  const s = sents[Math.min(i, sents.length - 1)]

  useEffect(() => {
    if (!playing) return undefined
    const id = setInterval(() => setI((k) => (k + 1) % sents.length), STEP_MS)
    return () => clearInterval(id)
  }, [playing, sents.length])

  const accuracy = useMemo(
    () => sample.episodes.map((e) => e.sentences.filter(right).length / e.sentences.length),
    [],
  )
  const wrong = mistakes(s)
  // Truth drawn in the language's names; decoded in figures, coloured by the word each was matched with.
  const toneTruth = { [cap(WORD_A)]: 'a', [cap(WORD_B)]: 'b' }
  const toneDecoded = { [MATCHED[WORD_A]]: 'a', [MATCHED[WORD_B]]: 'b' }

  return (
    <div className="explorer">
      <div className="explorer__tabs" role="tablist" aria-label="Episodes">
        {sample.episodes.map((e, k) => (
          <button
            key={e.episode}
            type="button"
            role="tab"
            aria-selected={k === ep}
            className={k === ep ? 'ep-tab ep-tab--active' : 'ep-tab'}
            onClick={() => {
              setEp(k)
              setI(0)
            }}
          >
            <span className="mono">Episode {e.episode}</span>
            <span className="ep-tab__score">{pct(accuracy[k], 0)} right</span>
          </button>
        ))}
      </div>

      {accuracy[ep] < 0.1 && (
        <p className="explorer__warn small">
          This episode is one where decoding never locked on: almost every sentence is read wrong. It’s shown
          because episodes are taken in a fixed order, not picked for looking good. Across all held-out
          sentences, {pct(scored.method)} are decoded right.
        </p>
      )}

      <div className="explorer__body">
        <ol className="sent-list" aria-label="Sentences in this episode">
          {sents.map((x, k) => (
            // Sentences are positions in a fixed episode, so the index is a stable key.
            <li key={k}>
              <button
                type="button"
                className={k === i ? 'sent sent--active' : 'sent'}
                onClick={() => {
                  setI(k)
                  setPlaying(false)
                }}
              >
                <span className={right(x) ? 'dot dot--good' : 'dot dot--bad'} aria-label={right(x) ? 'decoded right' : 'decoded wrong'} />
                <span className="mono sent__words">{x.words.join(' ')}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="explorer__detail">
          <div className="explorer__controls">
            <Eyebrow tone="amber">Sentence {i + 1} of {sents.length} · {KIND[s.kind]}</Eyebrow>
            <div className="button-row">
              <button type="button" className="btn btn--ghost btn--small" onClick={() => setI((k) => Math.max(0, k - 1))} disabled={i === 0}>
                ← Previous
              </button>
              <button type="button" className="btn btn--small" onClick={() => setPlaying((p) => !p)}>
                {playing ? 'Pause' : 'Play'}
              </button>
              <button type="button" className="btn btn--ghost btn--small" onClick={() => setI((k) => Math.min(sents.length - 1, k + 1))} disabled={i === sents.length - 1}>
                Next →
              </button>
            </div>
          </div>

          <div className="interlinear" aria-label={`${s.words.join(' ')}: ${s.english}`}>
            {s.words.map((w, k) => (
              <span key={k} className="interlinear__word">
                <span className="mono interlinear__form">{w}</span>
                <span className="interlinear__gloss">{s.gloss[k]}</span>
              </span>
            ))}
          </div>
          <p className="interlinear__english">“{s.english}”</p>

          <div className={right(s) ? 'verdict-chip verdict-chip--good' : 'verdict-chip verdict-chip--bad'} aria-live="polite">
            <strong>{right(s) ? '✓ Decoded right' : '✕ Decoded wrong'}</strong>
            <span>
              {right(s)
                ? SWAPPED
                  ? 'Every fact matches, with the twins swapped: the predicted confusion.'
                  : 'Every fact matches.'
                : `Wrong about ${wrong.length ? wrong.join(', ') : 'part of the state'}.`}
            </span>
          </div>

          <div className="world-pair">
            <WorldMap
              state={s.decoded}
              places={PLACES}
              tone={toneDecoded}
              title={<><Eyebrow tone="ice">Decoded from the text alone</Eyebrow><span className="small muted">in the watcher’s terms: figures, not names</span></>}
            />
            <WorldMap
              state={s.truth}
              places={PLACES}
              tone={toneTruth}
              title={<><Eyebrow>What was really true</Eyebrow><span className="small muted">from the simulator’s hidden record</span></>}
            />
          </div>

          <div className="frame-compare">
            <div className="frame-compare__row">
              <span className="small muted">Decoded frame</span>
              <FrameCells bits={s.frame} compare={s.true_frame} label="Decoded frame, 45 yes/no cells" />
            </div>
            <div className="frame-compare__row">
              <span className="small muted">True frame</span>
              <FrameCells bits={s.true_frame} label="True frame, 45 yes/no cells" />
            </div>
            <p className="small muted">
              The same state as the watcher’s 45 yes/no cells. Outlined cells differ from the truth. Under the twin
              swap, the twins’ cells differ even when the reading is right.
            </p>
          </div>
        </div>
      </div>

      <p className="explorer__note small muted">
        The method matched <span className="mono">{WORD_A}</span> with {MATCHED[WORD_A]} and{' '}
        <span className="mono">{WORD_B}</span> with {MATCHED[WORD_B]}. In truth,{' '}
        <span className="mono">{WORD_A}</span> is {sample.figures[WORD_A]}. The twins behave identically, so no method
        can tell them apart: this swap is the one confusion the design predicts. Same-coloured agents in the two
        maps are the ones the method matched. {sample.rule}
      </p>
    </div>
  )
}
