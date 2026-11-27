import { HeroMark } from '../components/HeroMark.jsx'
import NameMeaning from '../components/NameMeaning.jsx'
import { FrameCells } from '../components/FrameCells.jsx'
import entries from '../content/log-index.json'
import results from '../data/results.json'
import { EMAIL, GITHUB_URL, IDEA_CIRCUITS, IDEA_LANGUAGE, LOG, PROJECT, PROPOSAL, REPO_URL, logEntry } from '../site/links.js'
import { pct } from '../site/format.js'

const confirm = results.find((r) => r.role === 'confirmation')
const mean = (k) => results.reduce((s, r) => s + r[k], 0) / results.length

const PRINCIPLES = [
  {
    title: 'Build the world you test in',
    body: 'Real data rarely tells you the right answer, so we design small worlds where every fact is known.',
    example: 'We built a tiny world: two agents who behave exactly alike, three objects and four places. We know every fact about it at every moment.',
  },
  {
    title: 'Predict before you measure',
    body: 'We work out what must happen, and publish the prediction and the test before running it.',
    example: 'Before running anything, we wrote down the one mix-up the world makes unavoidable: telling the two identical agents apart.',
  },
  {
    title: 'Map the limits, not just the wins',
    body: 'A good result says what works. A better one says what can never work, and why.',
    example: 'We check whether the AI’s mistakes are only the ones the world itself allows. So far, it mostly confuses things the world rarely tells apart.',
  },
  {
    title: 'Show the working',
    body: 'Every experiment goes in a public log as it happens, including the ones that fail.',
    example: null,  // filled with the live count of log entries
  },
]

function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
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
          <p className="hero__links">
            <a className="btn" href={PROJECT}>See the current project</a>
            <a className="text-link" href={LOG}>Read the research log</a>
          </p>
        </div>
        <div className="hero__art">
          <HeroMark />
        </div>
      </div>
    </section>
  )
}

const EXAMPLE = { words: ['bikop', 'tevuv', '-ev', 'kipon', '-az'], english: 'Bikop takes the stone' }

function Featured() {
  return (
    <section className="section section--ruled">
      <div className="container stack-40">
        <div className="section-head section-head--wide">
          <h2 className="h2 h2--lg">
            Can an AI decode a language using only what another AI has seen?
          </h2>
          <p className="lede">
            One AI reads sentences in an invented language. Another watches silent recordings of
            the same small world. We decode the first using the second, with no dictionary, and say
            in advance which mix-ups must remain: a coin toss where two things are interchangeable,
            occasional where they’re nearly alike, and none anywhere else.
          </p>
          <p className="source-note">
            From our current project,{' '}
            <a href={PROJECT}>Predicting the Limits of Unsupervised Grounding</a>
          </p>
        </div>

        <div className="feature">
          <figure className="feature__figure">
            <div className="feature__row">
              <p className="fig-label">What the reader sees</p>
              <p className="mono feature__words">{EXAMPLE.words.join(' ')}</p>
              <p className="small muted">“{EXAMPLE.english}”, in a language built to share nothing with English</p>
            </div>
            <svg className="feature__arrow" width="14" height="36" viewBox="0 0 14 36" aria-hidden="true">
              <path d="M7 0 V30 M1 24 L7 32 L13 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" />
            </svg>
            <div className="feature__row">
              <p className="fig-label">What the method decodes it into, in the watcher’s format</p>
              <FrameCells bits={SAMPLE_FRAME} size="small" label="A frame: 45 yes/no cells" />
              <p className="small muted">A frame of 45 yes/no facts, in shuffled order, with no labels</p>
            </div>
            <figcaption className="small muted">Real pilot data, from a pair the method had never seen.</figcaption>
          </figure>

          <div className="feature__text">
            <p>
              On a pair it had never seen, the method decoded{' '}
              <strong className="figure-num">{pct(confirm.method)}</strong> of new sentences exactly
              right, with every fact correct.
            </p>
            <p>
              With the two AIs taken out, word and frame counts alone get{' '}
              <strong className="figure-num">{pct(mean('baseline'))}</strong>. Guessing gets{' '}
              {pct(confirm.chance, 2)}.
            </p>
            <p className="hero__links">
              <a className="btn" href={PROJECT}>Explore the project</a>
              <a className="text-link" href={PROPOSAL}>Read the proposal</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// The frame the method decoded for EXAMPLE: sample.json, episode 769, sentence 6 (index 6).
// Copied here so the home page needn't load the whole sample.
const SAMPLE_FRAME = '000101010000100000000000000100000001000000000'

function Principles() {
  return (
    <section className="section section--ruled">
      <div className="container stack-40">
        <div className="section-head">
          <h2 className="h2">How we turn a debate into an experiment.</h2>
          <p className="lede lede--small">
            Four habits, and what each one meant in our first project.
          </p>
        </div>
        <ol className="process">
          {PRINCIPLES.map((p) => (
            <li key={p.title} className="process__step">
              <span className="process__node" aria-hidden="true" />
              <h3 className="process__title">{p.title}</h3>
              <p className="process__body">{p.body}</p>
              <p className="process__example">
                <span className="process__in">In Project 01: </span>
                {p.example ??
                  `Every experiment is written up in the public log: ${entries.length} so far, including the ones that failed.`}
              </p>
            </li>
          ))}
        </ol>
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
          <h2 className="h2">The research log</h2>
          <p className="lede lede--small">
            Why each experiment was run, how, what happened and what it means, in plain language.{' '}
            {entries.length} experiments so far: the breakthroughs and the dead ends, all kept, none
            rewritten afterwards.
          </p>
          <p>
            <a className="text-link" href={LOG}>Read the full log</a>
          </p>
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

// The project's five phases (proposal, work plan); NOW is the phase under way.
const PHASES = ['Pilot', 'Literature check', 'Worlds and pre-registration', 'Train and align', 'Sweeps and write-up']
const NOW = 2

function Roadmap() {
  return (
    <section className="section section--ruled">
      <div className="container stack-40">
        <h2 className="h2">One project under way, and two on the horizon.</h2>
        <div className="ideas">
          <a href={PROJECT} className="idea idea--now">
            <span className="idea__title">Predicting the limits of unsupervised grounding</span>
            <span className="idea__text">
              Can two AIs that never share data come to agree about the world, and can we say in
              advance where they can’t?
            </span>
            <span className="idea__status idea__status--now">
              Under way · phase {NOW + 1} of {PHASES.length}, {PHASES[NOW].toLowerCase()}
            </span>
          </a>
          <a href={IDEA_CIRCUITS} className="idea">
            <span className="idea__title">Can interpretability find a circuit we planted?</span>
            <span className="idea__text">
              Hide a known algorithm inside a network, and see if the tools find it.
            </span>
            <span className="idea__status">An idea, not started</span>
          </a>
          <a href={IDEA_LANGUAGE} className="idea">
            <span className="idea__title">Can we read a language nobody designed?</span>
            <span className="idea__text">
              Decode a language invented by AIs, with no designer to ask.
            </span>
            <span className="idea__status">An idea, not started</span>
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
          <h2 className="h2">Every world, model and prediction, in the open.</h2>
          <p className="lede lede--small">
            The simulators, models, training code and predictions are all public. Every run records
            its settings, random seeds and code version, so anyone can rerun it and check our claims.
          </p>
          <p className="hero__links">
            <a className="btn" href={REPO_URL}>Browse the code</a>
            <a className="text-link" href={`mailto:${EMAIL}`}>Get in touch</a>
          </p>
        </div>
        <pre className="codeblock">
          <code>
            git clone {GITHUB_URL.replace('https://', '')}/unsupervised-grounding{'\n'}
            uv sync && uv run pytest{'\n'}
            {'\n'}
            <span className="muted"># make pilot corpus pairs: two independent data streams each</span>{'\n'}
            uv run python -m grounding.data.make configs/pilot.yaml --pairs 0-9{'\n'}
            {'\n'}
            <span className="muted"># train each stream's model, from scratch</span>{'\n'}
            uv run python -m grounding.models.train runs/pilot/pair-000 --stream lang --out runs/pilot/pair-000/models/lang-ps{'\n'}
            uv run python -m grounding.models.train runs/pilot/pair-000 --stream obs --out runs/pilot/pair-000/models/obs-joint{'\n'}
            {'\n'}
            <span className="muted"># align them with no paired data, then score</span>{'\n'}
            uv run python -m grounding.align.decipher runs/pilot/pair-000{'\n'}
            uv run python -m grounding.analysis.score runs/pilot/pair-000 --kind decipher
          </code>
        </pre>
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
