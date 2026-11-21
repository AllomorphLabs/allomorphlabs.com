import { Eyebrow, GITHUB_URL } from './shared.jsx'

export default function OpenCode() {
  return (
    <section id="code" className="section section--ruled">
      <div className="container split">
        <div className="split__copy">
          <Eyebrow tone="ice">Open by default</Eyebrow>
          <h2 className="h2">Every world, model and prediction, in the open.</h2>
          <p className="lede lede--small">
            Simulators, training code and pre-registered predictions live under one organisation, so
            anyone can rerun the experiments and check the claims.
          </p>
          <div className="button-row">
            <a className="btn" href={GITHUB_URL}>Browse the code</a>
            <a className="btn btn--ghost" href="mailto:[YOUR EMAIL]">Get in touch</a>
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
              <span className="accent">$</span> git clone github.com/allomorphlabs/unsupervised-grounding{'\n'}
              <span className="accent">$</span> [RUN COMMAND]{'\n'}
              <span className="muted"># symmetry classes predicted in advance</span>{'\n'}
              <span className="muted"># errors expected only inside those classes</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
