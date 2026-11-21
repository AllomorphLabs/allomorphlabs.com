import { Eyebrow } from './shared.jsx'

export default function Roadmap() {
  return (
    <section className="section section--tinted">
      <div className="container stack-40">
        <div className="section-head">
          <Eyebrow tone="ice">Beyond ML</Eyebrow>
          <h2 className="h2">The first problem is about language models. The next ones won’t all be.</h2>
        </div>
        <div className="roadmap">
          <article className="card card--dark card--active">
            <Eyebrow tone="amber">01 · Active</Eyebrow>
            <div className="roadmap__title">Limits of unsupervised grounding</div>
            <a href="#project" className="roadmap__link">See the demo →</a>
          </article>
          <article className="card card--dark card--dashed">
            <Eyebrow>02 · Next</Eyebrow>
            <div className="roadmap__title roadmap__title--muted">[NEXT PROBLEM]</div>
          </article>
          <article className="card card--dark card--dashed">
            <Eyebrow>03 · Later</Eyebrow>
            <div className="roadmap__title roadmap__title--muted">[FUTURE PROBLEM]</div>
          </article>
        </div>
      </div>
    </section>
  )
}
