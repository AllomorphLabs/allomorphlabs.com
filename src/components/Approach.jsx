import { Eyebrow, MiniMark } from './shared.jsx'

const PRINCIPLES = [
  {
    num: '01',
    title: 'Build the world you test in',
    body: 'Real data rarely tells you the right answer. We design synthetic settings where every ground truth is known, so every result can be checked.',
  },
  {
    num: '02',
    title: 'Predict before you measure',
    body: 'We work out what must happen from first principles, write it down in advance, and then test whether the experiment agrees.',
  },
  {
    num: '03',
    title: 'Map the limits, not just the wins',
    body: 'A good result says what works. A better one also says what can never work, however clever the system, and why.',
  },
]

export default function Approach() {
  return (
    <section id="approach" className="section">
      <div className="container stack-48">
        <div className="section-head">
          <Eyebrow tone="ice">Approach</Eyebrow>
          <h2 className="h2 h2--xl">We turn big open questions into experiments with a checkable answer.</h2>
        </div>
        <div className="card-row">
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
