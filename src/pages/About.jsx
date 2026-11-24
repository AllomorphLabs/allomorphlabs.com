import NameMeaning from '../components/NameMeaning.jsx'
import { Eyebrow } from '../components/shared.jsx'
import { EMAIL, GITHUB_URL, LOG, PROJECT, PROPOSAL } from '../site/links.js'

const COMMITMENTS = [
  {
    title: 'Predictions come first',
    body: 'Before a main experiment runs, its predictions, thresholds and tests are fixed and published. Analysis code never looks at main results before then.',
  },
  {
    title: 'Methods are frozen before they’re tested',
    body: 'A method is tuned on practice data set aside for that purpose, then frozen. A result only counts if the frozen method produced it on data it had never seen.',
  },
  {
    title: 'Nothing is borrowed',
    body: 'In Project 01, every model is trained from scratch on its own data. No pretrained weights, no shared vocabulary, and an invented language checked automatically to share nothing with English.',
  },
  {
    title: 'Everything is reported',
    body: 'Every control, every failed attempt and every null result. The research log is kept as the work happens, and entries are never rewritten afterwards.',
  },
  {
    title: 'Every run can be rerun',
    body: 'Each run records its settings, random seeds and code version, and can be reproduced from those alone.',
  },
  {
    title: 'Changes are made in the open',
    body: 'When the evidence changes the plan, the proposal is revised visibly, with the reasons, before anything is pre-registered.',
  },
]

export default function About() {
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <div className="section-head section-head--wide">
            <Eyebrow tone="amber">About</Eyebrow>
            <h1 className="hero__title hero__title--page">An independent lab for questions with checkable answers.</h1>
            <p className="hero__lede">
              Allomorph works on hard, open problems in computer science, starting with machine learning. We pick
              questions that are usually argued about in the abstract, and build small, fully known worlds in which
              they can be tested.
            </p>
          </div>
        </div>
      </section>

      <NameMeaning />

      <section className="section">
        <div className="container two-col">
          <div className="stack-24">
            <Eyebrow tone="ice">Why small worlds</Eyebrow>
            <h2 className="h2">Real data rarely tells you the right answer.</h2>
          </div>
          <div className="prose prose--lead">
            <p>
              When a system trained on real text or images seems to understand something, it’s hard to say how much it
              really knows. Nobody has the full answer key. In a world we build ourselves, we know every fact, every
              rule and every way two things can be confused.
            </p>
            <p>
              That turns open-ended questions into measurements. We can predict, before running anything, which
              mistakes any method must make and which it never should, and then check. Small worlds can’t settle
              everything about real systems. They can show exactly what is possible in principle, and where the hard
              limits lie.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--ruled">
        <div className="container two-col">
          <div className="stack-24">
            <Eyebrow tone="ice">Who</Eyebrow>
            <h2 className="h2">Shane Armstrong</h2>
          </div>
          <div className="prose prose--lead">
            <p>
              Allomorph was founded by Shane Armstrong, a software engineer and technical leader with fifteen years of
              building systems people rely on, from start-ups to platforms that move billions of pounds. Allomorph is
              the place for questions that are usually only argued about, to test them instead.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container stack-40">
          <div className="section-head">
            <Eyebrow tone="ice">How we hold ourselves to it</Eyebrow>
            <h2 className="h2">Six commitments.</h2>
          </div>
          <div className="commit-grid">
            {COMMITMENTS.map((c, k) => (
              <article key={c.title} className="commit">
                <span className="mono accent">{String(k + 1).padStart(2, '0')}</span>
                <h3 className="card__title">{c.title}</h3>
                <p className="card__body">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ruled">
        <div className="container split">
          <div className="split__copy">
            <Eyebrow tone="ice">Follow the work</Eyebrow>
            <h2 className="h2">The best way to know what we’re doing is to read it.</h2>
            <p className="lede lede--small">
              Start with the project overview, read the proposal for the full design, or follow the research log to see
              each experiment as it happened.
            </p>
            <div className="button-row">
              <a className="btn" href={PROJECT}>Project 01</a>
              <a className="btn btn--ghost" href={PROPOSAL}>Proposal</a>
              <a className="btn btn--ghost" href={LOG}>Research log</a>
              <a className="btn btn--ghost" href={GITHUB_URL}>GitHub</a>
            </div>
            <p className="small muted">
              Questions, collaboration or funding: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
