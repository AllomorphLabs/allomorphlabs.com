import { Eyebrow } from '../components/shared.jsx'
import { EMAIL, PROJECT } from '../site/links.js'

// Ideas for future problems: deliberately short. Nothing here is scoped, proposed or checked
// against the literature yet, and the pages say so.
const IDEAS = {
  'idea-circuits': {
    title: 'Can interpretability find a circuit we planted?',
    lede: 'Researchers claim to find the algorithms running inside neural networks. Nobody can check those claims against an answer key.',
    body: [
      'We’d compile known algorithms, such as sorting, counting or bracket matching, directly into network weights, and hide them inside otherwise ordinary trained networks. Then we’d test whether today’s interpretability methods recover them.',
      'Many different weight settings compute exactly the same function, so some details of a circuit can’t be identified even in principle. As in Project 01, we’d work out in advance which ones, and check that the tools fail there and only there.',
    ],
    prior: [
      {
        text: 'Lindner et al. (2023), Tracr: Compiled Transformers as a Laboratory for Interpretability',
        href: 'https://arxiv.org/abs/2301.05062',
        note: 'already compiles programs into transformer weights for this purpose. What we might add is the predicted limit.',
      },
    ],
  },
  'idea-language': {
    title: 'Can we read a language nobody designed?',
    lede: 'In Project 01 we invented the language. Here, nobody does.',
    body: [
      'Agents invent their own language by learning to coordinate in a shared world. A third model, which never saw the game, tries to decipher it from the messages alone.',
      'Because we know what the agents could see and needed to say, we can predict which meanings their code leaves ambiguous. It’s the closest rehearsal we can build for translating a communication system that was never meant to be understood, such as whale song.',
    ],
    prior: [
      {
        text: 'Lazaridou & Baroni (2020), Emergent Multi-Agent Communication in the Deep Learning Era',
        href: 'https://arxiv.org/abs/2006.02419',
        note: 'a survey of how such languages emerge.',
      },
    ],
  },
}

export default function Idea() {
  const idea = IDEAS[document.body.dataset.page]
  return (
    <>
      <section className="hero hero--page">
        <div className="container">
          <div className="section-head section-head--wide">
            <div className="tag-row">
              <Eyebrow>Future problem</Eyebrow>
              <span className="pill">Idea only · not started</span>
            </div>
            <h1 className="hero__title hero__title--page">{idea.title}</h1>
            <p className="hero__lede">{idea.lede}</p>
          </div>
        </div>
      </section>
      <section className="section section--doc">
        <div className="container">
          <div className="idea">
            <div className="prose prose--lead">
              {idea.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="callout callout--muted">
              <Eyebrow>What this is</Eyebrow>
              <p>
                An idea, not a project. It hasn’t been scoped, proposed or checked against the literature, and it may
                change completely or be dropped. Compare <a href={PROJECT}>Project 01</a>, which has a full proposal, a
                finished pilot and a public research log.
              </p>
            </div>
            <div className="idea__prior">
              <Eyebrow tone="ice">Prior work to read first</Eyebrow>
              <ul className="plain-list">
                {idea.prior.map((r) => (
                  <li key={r.href}>
                    <a href={r.href}>{r.text}</a>: {r.note}
                  </li>
                ))}
              </ul>
            </div>
            <p className="small muted">
              Interested, or know of work we should read? <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
