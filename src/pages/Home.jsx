import { HeroMark } from '../components/HeroMark.jsx'
import NameMeaning from '../components/NameMeaning.jsx'
import { Eyebrow, MiniMark } from '../components/shared.jsx'
import { FrameCells } from '../components/FrameCells.jsx'
import entries from '../content/log-index.json'
import results from '../data/results.json'
import { EMAIL, GITHUB_URL, IDEA_CIRCUITS, IDEA_LANGUAGE, LOG, PROJECT, PROPOSAL, REPO_URL, logEntry } from '../site/links.js'
import { pct } from '../site/format.js'

const confirm = results.find((r) => r.role === 'confirmation')
const mean = (k) => results.reduce((s, r) => s + r[k], 0) / results.length

const PRINCIPLES = [
  {
    num: '01',
    title: 'Build the world you test in',
    body: 'Real data rarely tells you the right answer. We design small, synthetic worlds where every fact is known, so every result can be checked against the truth.',
  },
  {
    num: '02',
    title: 'Predict before you measure',
    body: 'We work out what must happen, publish that prediction and how we’ll test it, and only then run the experiment.',
  },
  {
    num: '03',
    title: 'Map the limits, not just the wins',
    body: 'A good result says what works. A better one also says what can never work, however clever the system, and why.',
  },
  {
    num: '04',
    title: 'Show the working',
    body: 'Every experiment goes in a public log as it happens, including the ones that fail. Code, data and predictions are open.',
  },
]

function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__kicker">
            <span className="pulse-dot" />
            <Eyebrow>Independent research · Computer science</Eyebrow>
          </div>
          <h1 className="hero__title">
            Exact answers
            <br />
            <span className="accent">to elusive questions.</span>
          </h1>
          <p className="hero__lede">
            Allomorph is an independent research lab. We build small worlds where every answer is
            known, predict in advance which mistakes an AI can’t avoid, and test whether we were
            right.
          </p>
          <div className="button-row">
            <a className="btn" href={PROJECT}>See Project 01</a>
            <a className="btn btn--ghost" href={LOG}>Read the research log</a>
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

const EXAMPLE = { words: ['bikop', 'tevuv', '-ev', 'kipon', '-az'], english: 'Bikop takes the stone' }

function Featured() {
  return (
    <section className="section section--tinted">
      <div className="container stack-40">
        <div className="section-head section-head--wide">
          <div className="tag-row">
            <Eyebrow tone="amber">Project 01</Eyebrow>
            <span className="pill pill--live"><span className="pulse-dot pulse-dot--small" />Phase 3 under way</span>
          </div>
          <h2 className="h2 h2--lg">
            Can an AI decode a language using only what another AI has seen?
          </h2>
          <p className="lede">
            One AI reads sentences in an invented language. Another watches silent recordings of
            the same small world. We decode the first using the second, with no dictionary, and say
            in advance which mix-ups must remain: a coin toss where two things are interchangeable,
            occasional where they’re nearly alike, and none anywhere else.
          </p>
        </div>

        <div className="feature">
          <figure className="feature__figure">
            <div className="feature__row">
              <Eyebrow tone="amber">The reader sees</Eyebrow>
              <p className="mono feature__words">{EXAMPLE.words.join(' ')}</p>
              <p className="small muted">“{EXAMPLE.english}”, in a language built to share nothing with English</p>
            </div>
            <svg className="feature__arrow" width="14" height="36" viewBox="0 0 14 36" aria-hidden="true">
              <path d="M7 0 V30 M1 24 L7 32 L13 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" />
            </svg>
            <div className="feature__row">
              <Eyebrow tone="ice">Decoded into a frame, in the watcher’s format</Eyebrow>
              <FrameCells bits={SAMPLE_FRAME} size="small" label="A frame: 45 yes/no cells" />
              <p className="small muted">A frame of 45 yes/no facts, in shuffled order, with no labels</p>
            </div>
            <figcaption className="small muted">Real pilot data, from a pair the method had never seen.</figcaption>
          </figure>

          <div className="feature__stats">
            <Stat value={pct(confirm.method)} label="of new sentences decoded exactly right, every fact correct, on a pair the method had never seen" />
            <Stat value={pct(mean('baseline'))} label="with the two AIs taken out, using word and frame counts alone" />
            <Stat value={pct(confirm.chance, 2)} label="by chance" />
            <div className="button-row">
              <a className="btn" href={PROJECT}>Explore the project</a>
              <a className="btn btn--ghost" href={PROPOSAL}>Read the proposal</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// The frame the method decoded for EXAMPLE: sample.json, episode 769, sentence 6 (index 6).
// Copied here so the home page needn't load the whole sample.
const SAMPLE_FRAME = '000101010000100000000000000100000001000000000'

function Stat({ value, label }) {
  return (
    <div className="stat">
      <div className="stat__value">{value}</div>
      <div className="stat__label">{label}</div>
    </div>
  )
}

function Principles() {
  return (
    <section className="section">
      <div className="container stack-48">
        <div className="section-head">
          <Eyebrow tone="ice">How we work</Eyebrow>
          <h2 className="h2 h2--xl">How we turn a debate into an experiment.</h2>
        </div>
        <div className="card-row card-row--4">
          {PRINCIPLES.map((p) => (
            <article key={p.num} className="card">
              <div className="card__top">
                <Eyebrow tone="amber">{p.num}</Eyebrow>
                <MiniMark />
              </div>
              <h3 className="card__title">{p.title}</h3>
              <p className="card__body">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Latest() {
  const latest = entries.slice(-5).reverse()
  return (
    <section className="section section--ruled">
      <div className="container split split--top">
        <div className="split__copy">
          <Eyebrow tone="ice">Working in the open</Eyebrow>
          <h2 className="h2">Every experiment, as it happens.</h2>
          <p className="lede lede--small">
            Why each experiment was run, how, what happened and what it means, in plain language.
            {entries.length} experiments so far: the breakthroughs and the dead ends, all kept, none
            rewritten afterwards.
          </p>
          <div className="button-row">
            <a className="btn btn--ghost" href={LOG}>Read the full log</a>
          </div>
        </div>
        <ol className="log-list">
          {latest.map((e) => (
            <li key={e.n}>
              <a href={logEntry(e.n)} className="log-list__item">
                <span className="log-list__n mono">{String(e.n).padStart(2, '0')}</span>
                <span className="log-list__title">{e.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Roadmap() {
  return (
    <section className="section section--tinted">
      <div className="container stack-40">
        <div className="section-head">
          <Eyebrow tone="ice">What we’re working on</Eyebrow>
          <h2 className="h2">One project under way, and two on the horizon.</h2>
        </div>
        <div className="roadmap">
          <a href={PROJECT} className="card card--dark card--active card--link">
            <Eyebrow tone="amber">01 · Active</Eyebrow>
            <div className="roadmap__title">Predicting the limits of unsupervised grounding</div>
            <span className="roadmap__link">Pilot and literature check complete. Now: grid video and the pre-registration →</span>
          </a>
          <a href={IDEA_CIRCUITS} className="card card--dark card--dashed card--link">
            <Eyebrow>Idea · not started</Eyebrow>
            <div className="roadmap__title roadmap__title--muted">Can interpretability find a circuit we planted?</div>
            <span className="small muted">Hide a known algorithm inside a network, and see if the tools find it →</span>
          </a>
          <a href={IDEA_LANGUAGE} className="card card--dark card--dashed card--link">
            <Eyebrow>Idea · not started</Eyebrow>
            <div className="roadmap__title roadmap__title--muted">Can we read a language nobody designed?</div>
            <span className="small muted">Decode a language invented by AIs, with no designer to ask →</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function OpenCode() {
  return (
    <section className="section section--ruled">
      <div className="container split">
        <div className="split__copy">
          <Eyebrow tone="ice">Open by default</Eyebrow>
          <h2 className="h2">Every world, model and prediction, in the open.</h2>
          <p className="lede lede--small">
            The simulators, models, training code and predictions are all public. Every run records
            its settings, random seeds and code version, so anyone can rerun it and check our claims.
          </p>
          <div className="button-row">
            <a className="btn" href={REPO_URL}>Browse the code</a>
            <a className="btn btn--ghost" href={`mailto:${EMAIL}`}>Get in touch</a>
          </div>
        </div>
        <div className="terminal">
          <div className="terminal__bar">
            <span className="terminal__dot" />
            <span className="terminal__dot" />
            <span className="terminal__dot" />
            <span className="terminal__title">terminal</span>
          </div>
          <pre className="terminal__body">
            <code>
              <span className="accent">$</span> git clone {GITHUB_URL.replace('https://', '')}/unsupervised-grounding{'\n'}
              <span className="accent">$</span> uv sync && uv run pytest{'\n'}
              <span className="muted"># make pilot corpus pairs: two independent data streams each</span>{'\n'}
              <span className="accent">$</span> uv run python -m grounding.data.make configs/pilot.yaml --pairs 0-9{'\n'}
              <span className="muted"># train each stream's model, from scratch</span>{'\n'}
              <span className="accent">$</span> uv run python -m grounding.models.train runs/pilot/pair-000 --stream lang --out runs/pilot/pair-000/models/lang-ps{'\n'}
              <span className="accent">$</span> uv run python -m grounding.models.train runs/pilot/pair-000 --stream obs --out runs/pilot/pair-000/models/obs-joint{'\n'}
              <span className="muted"># align them with no paired data, then score</span>{'\n'}
              <span className="accent">$</span> uv run python -m grounding.align.decipher runs/pilot/pair-000{'\n'}
              <span className="accent">$</span> uv run python -m grounding.analysis.score runs/pilot/pair-000 --kind decipher
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <NameMeaning />
      <Featured />
      <Principles />
      <Latest />
      <Roadmap />
      <OpenCode />
    </>
  )
}
