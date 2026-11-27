import Explorer from '../components/Explorer.jsx'
import { FrameCells } from '../components/FrameCells.jsx'
import { ResultsChart, VarianceChart } from '../components/Charts.jsx'
import TwinsDemo from '../components/TwinsDemo.jsx'
import ModelDiagrams from '../components/ModelDiagrams.jsx'
import GridClip from '../components/GridClip.jsx'
import { WorldMap } from '../components/WorldMap.jsx'
import { pathOrder } from '../site/world.js'
import { Eyebrow } from '../components/shared.jsx'
import entries from '../content/log-index.json'
import results from '../data/results.json'
import sample from '../data/sample.json'
import { LIT_REVIEW, LOG, PROPOSAL, PROPOSAL_DOCX, REPO_URL, logEntry } from '../site/links.js'
import { mean, pct } from '../site/format.js'

const confirm = results.find((r) => r.role === 'confirmation')
const avg = (k) => mean(results.map((r) => r[k]))
const PLACES = pathOrder(sample.world.places, sample.world.edges)
// Real examples, taken in order from the first episode that decodes well (see Explorer for all).
const EX = sample.episodes[1].sentences
const EX_EVENTS = EX.filter((s) => s.kind === 'event').slice(0, 4)
const cap = (w) => w[0].toUpperCase() + w.slice(1)
const TWIN_TONES = { [cap(sample.agents.A)]: 'a', [cap(sample.agents.B)]: 'b' }

const PHASES = [
  { n: 1, title: 'Pilot', body: 'A tiny world, state-vector frames. Gate: beat the co-occurrence control, and measure variance.', status: 'done' },
  { n: 2, title: 'Literature and novelty check', body: 'Gate: the design is confirmed as novel, or adjusted. It was adjusted: see below.', status: 'done' },
  { n: 3, title: 'World, streams and pre-registration', body: 'First, grid-video frames run through the whole method (see below). Then switchable symmetries and near-symmetries, every control, and the predictions published before the main runs.', status: 'now' },
  { n: 4, title: 'Train and align', body: 'The method frozen on the cipher control and checked on a calibration world, then the main conditions, at least 10 independent pairs each.', status: 'later' },
  { n: 5, title: 'Sweeps and write-up', body: 'Break symmetries one at a time; vary how far the two worlds differ. Publish everything, nulls included.', status: 'later' },
]

const HYPOTHESES = [
  {
    id: 'H1',
    claim: 'The language model holds the world’s state',
    status: 'Promising',
    tone: 'warn',
    note: 'On the first pilot pair, small probes read the agents’ places and hunger, the stone and the apple from its sentence summaries about 97% of the time. The formal test comes in phase 4, against grammar-only and scrambled-world controls. It adds a check that probes can’t fool: states that differ should lead the model to different continuations.',
  },
  {
    id: 'H2',
    claim: 'The two models can be aligned with no paired data',
    status: 'Pilot gate met',
    tone: 'good',
    note: `${pct(avg('method'))} of held-out sentences right on average, against ${pct(avg('baseline'))} for the co-occurrence control. The scrambled-world control isn’t built yet. With nothing hand-written and no hints, the search now finds the true reading from lists of facts: 68% of frames exactly right on a pair used to develop the method, and 63% on a fresh pair, run once with the method frozen. On grid video the true reading is among the finalists (43% exact), but the final choice still swaps two object words.`,
  },
  {
    id: 'H3',
    claim: 'The remaining errors follow the world’s symmetries, and near-symmetries are confused in proportion to how nearly they hold',
    status: 'Not yet tested',
    tone: 'muted',
    note: 'For two models of the same data, this limit was proven in 2026. Ours share a world but no data, so the proof doesn’t cover them, and nobody has predicted how often near-symmetries are confused. First measurements, not yet evidence: the two twin matchings tie, as predicted, and on grid video the method’s confusions follow how nearly each relabelling holds, on one pair so far (see grid video, below).',
  },
  {
    id: 'H4',
    claim: 'Alignment degrades gracefully as the two worlds differ',
    status: 'Not yet tested',
    tone: 'muted',
    note: 'Phase 5 sweeps how much the described and observed worlds overlap, including worlds where each describes things the other lacks, a case the theory of unsupervised translation leaves open.',
  },
]

const LESSONS = [
  {
    entries: [1, 9],
    title: 'Matching the two models’ insides directly failed',
    body: 'The first method we tried lined up the two models’ internal representations so that their overall shapes match. It stayed at chance, even on the easiest test: two frame streams that differ only in the order of their cells. A single snapshot doesn’t show which places are next to which, so many wrong matchings look as good as the right one.',
  },
  {
    entries: [10, 20],
    title: 'How the world changes is what identifies it',
    body: 'Judging a candidate matching by how plausible it makes the other stream’s story, step by step, picks out the truth. But a flexible mapping can game that judge by inventing plausible stories that ignore their input.',
  },
  {
    entries: [21, 40],
    title: 'Decipherment: read the text as a code for hidden frames',
    body: 'So we turned it around. The language is treated as a code for a hidden sequence of frames, as code-breakers read an unknown script. The fit has to explain every word, so it can’t ignore its input. On the first pair this found the true matching with no truth used.',
  },
  {
    entries: [42, 47],
    title: 'A second pair exposed a hidden assumption',
    body: 'On pair 1, objects fell to chance. The first pair’s language model happened to store object positions in a simple form, and pair 1’s didn’t. The fix was a word model in which each sentence states one fact. It was chosen by a rule written down before seeing the outcome.',
  },
  {
    entries: [48, 51],
    title: 'Frozen, then confirmed on a pair it had never seen',
    body: `With the method frozen, a fresh pair was trained and run once: ${pct(confirm.method)} of held-out sentences right, with the predicted twin swap. On that pair, raw word counts alone would have picked the wrong matching.`,
  },
  {
    entries: [52, 54],
    title: 'Both models earn their place, and pairs differ more than restarts',
    body: 'Without the language model’s summaries, alignment falls to chance. Replacing the frame model with a lookup table costs 3 to 11 points on every pair. Restarts barely move the result; differences between pairs are far larger, which is why each pair counts as one sample.',
  },
]

function ProjectHero() {
  return (
    <section className="hero hero--page">
      <div className="container stack-40">
        <div className="section-head section-head--wide">
          <div className="tag-row">
            <Eyebrow tone="amber">Project 01</Eyebrow>
            <span className="pill pill--live"><span className="pulse-dot pulse-dot--small" />Phase 3 under way · Nov 2026</span>
          </div>
          <h1 className="hero__title hero__title--page">Predicting the limits of unsupervised grounding</h1>
          <p className="hero__lede">
            When an AI decodes a language with no dictionary, some mistakes are unavoidable. We
            predict exactly which ones before the experiment runs, and then check.
          </p>
          <div className="button-row">
            <a className="btn" href="#decoded">See real results</a>
            <a className="btn btn--ghost" href={PROPOSAL}>Read the proposal</a>
            <a className="btn btn--ghost" href={LOG}>Research log</a>
          </div>
        </div>
        <ol className="phase-strip" aria-label="Project phases">
          {PHASES.map((p) => (
            <li key={p.n} className={`phase-strip__item phase-strip__item--${p.status}`}>
              <span className="mono">{p.n}</span> {p.title}
              {p.status === 'done' && <span className="sr-only"> (complete)</span>}
              {p.status === 'next' && <span className="sr-only"> (next)</span>}
              {p.status === 'now' && <span className="sr-only"> (under way)</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Question() {
  return (
    <section className="section">
      <div className="container two-col">
        <div className="stack-24">
          <Eyebrow tone="ice">The puzzle</Eyebrow>
          <h2 className="h2">Can you learn what words mean just from how they’re arranged?</h2>
        </div>
        <div className="prose prose--lead">
          <p>
            Language models learn by reading enormous amounts of text and guessing the next word. They
            never see, hear or touch anything, yet they often behave as if they understand. Some argue
            that’s impossible in principle: meaning is the link between words and the world, and text
            alone doesn’t contain it. Others argue that the pattern of relations between words carries
            the meaning.
          </p>
          <p>
            With real language we can’t settle it, because we never have the full answer key. So we
            build a world small enough to know every fact about it, and test the question there.
          </p>
          <p>
            Even in the best case, structure can’t pin down everything. Two things that behave
            identically can’t be told apart by behaviour alone. Because we build the world, we can list
            every such tie in advance, and predict the exact mistakes any method must make.
          </p>
        </div>
      </div>
    </section>
  )
}

function Fig({ n, title, children, caption }) {
  return (
    <figure className="fig">
      <div className="fig__head">
        <span className="fig__n mono">Fig. {n}</span>
        <span className="fig__title">{title}</span>
      </div>
      <div className="fig__body">{children}</div>
      {caption && <figcaption className="fig__caption">{caption}</figcaption>}
    </figure>
  )
}

function HowItWorks() {
  const start = EX[0].truth
  return (
    <section id="method" className="section section--ruled">
      <div className="container stack-48">
        <div className="section-head section-head--wide">
          <Eyebrow tone="ice">How it works</Eyebrow>
          <h2 className="h2 h2--lg">One small world. Two AIs that never meet. A match we can check.</h2>
        </div>

        <div className="fig-grid">
          <Fig
            n={1}
            title="The world"
            caption="Two agents, three objects and four places on a path. Agents walk to neighbouring places, pick things up (shown as +stone beside the agent holding it) and drop them. The glass breaks when dropped. Agents get hungry and eat, at the bush or by eating the apple. The two agents follow identical rules: they’re the twins. This is a real starting state from the pilot."
          >
            <WorldMap state={start} places={PLACES} tone={TWIN_TONES} />
          </Fig>

          <Fig
            n={2}
            title="Two streams, from separate runs of the world"
            caption="Left: what the reader learns from, real sentences from the pilot language with glosses added for you. The words were generated at random and checked to be far from English. Right: what the watcher learns from, frames of 45 yes/no facts in a shuffled order, with no labels. The two streams come from different runs of the world, with random lengths, so nothing lines up between them. These frames encode the same moments as the sentences, for illustration only. Lists of facts were the pilot’s format; the main study shows the watcher grid video instead (below), and keeps lists of facts as an easier comparison."
          >
            <div className="streams">
              <div className="stream stream--lang">
                <Eyebrow tone="amber">The reader’s stream</Eyebrow>
                {EX_EVENTS.map((s, k) => (
                  <div key={k} className="stream__line">
                    <span className="mono">{s.words.join(' ')}</span>
                    <span className="small muted">{s.english}</span>
                  </div>
                ))}
              </div>
              <div className="stream stream--obs">
                <Eyebrow tone="ice">The watcher’s stream</Eyebrow>
                {EX_EVENTS.map((s, k) => (
                  <FrameCells key={k} bits={s.true_frame} size="small" />
                ))}
              </div>
            </div>
          </Fig>

          <Fig
            n={3}
            title="Two models, each trained only on its own stream"
            caption="Both are small transformers trained from scratch, with no pretrained weights and no shared data. The reader predicts the next word, and also compresses each sentence into a 64-number summary that must predict what comes next. The watcher predicts the whole next frame. The next section opens both up."
          >
            <div className="models">
              <div className="model model--lang">
                <Eyebrow tone="amber">Language model</Eyebrow>
                <p>Reads the invented language. Learns to predict the next word.</p>
                <p className="small muted">Never sees a frame.</p>
              </div>
              <div className="model__gap" aria-hidden="true">no shared data</div>
              <div className="model model--obs">
                <Eyebrow tone="ice">Frame model</Eyebrow>
                <p>Watches frames. Learns to predict the next frame.</p>
                <p className="small muted">Never sees a word.</p>
              </div>
            </div>
          </Fig>

          <Fig
            n={4}
            title="Decipherment: read the text as a code for hidden frames"
            caption="The frame model proposes how the world could unfold. The sentences, and the language model’s summary of each, weigh up those proposals. The fit then learns how each kind of fact is put into words. A matching says which word is which agent, object and place. Each candidate matching is fitted, and the one that best explains sentences held back from the fit is kept. No labels, no dictionary and no paired examples are used."
          >
            <ol className="cycle">
              <li><span className="cycle__n">1</span><span><strong>Propose.</strong> The frame model suggests possible histories of frames.</span></li>
              <li><span className="cycle__n">2</span><span><strong>Weigh.</strong> Each history is scored by how well it explains the words and the language model’s summaries.</span></li>
              <li><span className="cycle__n">3</span><span><strong>Learn.</strong> Refit how each kind of fact is expressed, and repeat.</span></li>
              <li><span className="cycle__n">4</span><span><strong>Choose.</strong> Of the candidate matchings, keep the one that best explains held-back sentences.</span></li>
            </ol>
          </Fig>
        </div>

        <div className="callout">
          <Eyebrow tone="amber">Then check against the truth</Eyebrow>
          <p>
            Only after all that do we open the simulator’s hidden record. For each held-out sentence: is the state it
            was decoded to exactly the true one, every fact? Mistakes should appear only where the world has a tie,
            like the twins, or a near-tie, and nowhere else.
          </p>
        </div>
      </div>
    </section>
  )
}

function Decoded() {
  return (
    <section id="decoded" className="section section--tinted">
      <div className="container stack-40">
        <div className="section-head section-head--wide">
          <Eyebrow tone="amber">Real pilot data</Eyebrow>
          <h2 className="h2 h2--lg">Real sentences, decoded with no dictionary.</h2>
          <p className="lede">
            Held-out episodes from pair {sample.pair}, the pair the method had never seen before it was frozen. In this
            language the twins are <span className="mono ink">{sample.agents.A}</span> and{' '}
            <span className="mono ink">{sample.agents.B}</span>. Step through any episode to see what the method read
            from each sentence, beside what was really true.
          </p>
        </div>
        <Explorer />
      </div>
    </section>
  )
}

function Results() {
  return (
    <section id="results" className="section">
      <div className="container stack-48">
        <div className="section-head section-head--wide">
          <Eyebrow tone="ice">Results</Eyebrow>
          <h2 className="h2 h2--lg">The pilot’s gate is met.</h2>
          <p className="lede">
            Three independent pairs, each with its own world runs and its own two trained models. The method was
            developed on pair 0, adjusted after pair 1 (so pair 1 counts as tuning), then frozen and run once on pair
            2.
          </p>
        </div>
        <div className="results-grid">
          <ResultsChart />
          <div className="takeaways">
            <div className="takeaway-item">
              <span className="stat__value stat__value--small">{pct(confirm.method)}</span>
              <p>on the untouched pair, against {pct(confirm.chance, 2)} by chance.</p>
            </div>
            <div className="takeaway-item">
              <span className="stat__value stat__value--small">{pct(avg('baseline'))}</span>
              <p>
                for the same method with no trained models, on word and frame counts alone. The trained models do the
                work.
              </p>
            </div>
            <div className="takeaway-item">
              <span className="stat__value stat__value--small">+{(100 * (avg('method') - avg('counts'))).toFixed(1)}</span>
              <p>
                points, on average, from the trained frame model over a lookup table of seen changes. That gain is real
                but small, because this world is small enough to see almost every situation. Richer worlds will test
                it properly.
              </p>
            </div>
          </div>
        </div>
        <div className="results-grid">
          <VarianceChart />
          <div className="prose">
            <h3 className="h3">Where the variation comes from</h3>
            <p>
              Restarting the method on the same pair moves the result by a few points. Different pairs differ far more.
              So the independent pair, not the restart, is the unit that counts, as the proposal assumes. These figures
              set how many pairs the main experiment needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Lessons() {
  return (
    <section id="learned" className="section section--ruled">
      <div className="container stack-48">
        <div className="section-head section-head--wide">
          <Eyebrow tone="ice">What we learned</Eyebrow>
          <h2 className="h2 h2--lg">Most of the pilot failed first. Here’s what each failure taught us.</h2>
          <p className="lede">
            {entries.length} experiments, each logged as it happened. The method in the proposal changed because of them,
            openly, before anything was pre-registered.
          </p>
        </div>
        <ol className="timeline">
          {LESSONS.map((l) => (
            <li key={l.title} className="timeline__item">
              <a className="timeline__entries mono" href={logEntry(l.entries[0])}>
                Entries {l.entries[0]}–{l.entries[1]}
              </a>
              <h3 className="timeline__title">{l.title}</h3>
              <p className="timeline__body">{l.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Hypotheses() {
  return (
    <section id="hypotheses" className="section section--tinted">
      <div className="container stack-40">
        <div className="section-head section-head--wide">
          <Eyebrow tone="ice">Where each claim stands</Eyebrow>
          <h2 className="h2">Four hypotheses. One tested so far.</h2>
          <p className="lede lede--small">
            H3 is the main contribution: that the errors follow the world’s symmetries exactly, and near-symmetries in
            proportion to how nearly they hold. H2 has to hold before H3 can be tested.
          </p>
        </div>
        <div className="hyp-grid">
          {HYPOTHESES.map((h) => (
            <article key={h.id} className="hyp">
              <div className="hyp__top">
                <span className="hyp__id mono">{h.id}</span>
                <span className={`status status--${h.tone}`}>{h.status}</span>
              </div>
              <h3 className="hyp__claim">{h.claim}</h3>
              <p className="hyp__note">{h.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function GridVideo() {
  return (
    <section id="grid-video" className="section">
      <div className="container stack-48">
        <div className="section-head section-head--wide">
          <Eyebrow tone="amber">Phase 3 · under way</Eyebrow>
          <h2 className="h2 h2--lg">The full search: the truth found, and the confusions H3 predicts.</h2>
          <p className="lede">
            The proposal’s main condition shows the watcher pictures, not lists of facts. With nothing hand-written and
            no hints, the full search now finds the true reading from lists of facts, and gets the places and hunger
            right on grid video. What it still confuses are things the world itself barely tells apart.
          </p>
        </div>
        <div className="grid-video">
          <div className="stack-24">
            <GridClip />
            <p className="fig__caption">
              What the watcher sees: six real consecutive frames from a held-out episode of grid pair 0, 240 yes/no
              values each. Each place is a patch of cells, and where in its patch a thing sits is random. A carried
              object shares its carrier’s cell. Names, colours, place labels and captions are added for you; the
              frame model sees only cells. This pair’s language names the twins Mudud and Dezod.
            </p>
          </div>
          <div className="takeaways">
            <div className="takeaway-item">
              <span className="status status--good">Works</span>
              <p>
                <strong className="ink">The truth, found with no hints.</strong> From lists of facts, the search
                chose the true reading and gets 68% of frames exactly right, against 60% for the pilot’s hand-written
                method. That pair helped develop the method, so it doesn’t count as confirmation. On a fresh pair,
                run once with the method frozen, it chose the truth again: 63% exactly right.
              </p>
            </div>
            <div className="takeaway-item">
              <span className="status status--good">Works</span>
              <p>
                <strong className="ink">Nothing hand-written.</strong> The frames’ structure (places, things,
                appearances, carrying) and the kinds of words are found from each stream alone, for grid video and now
                for lists of facts too, and every order of the twins is searched.
              </p>
            </div>
            <div className="takeaway-item">
              <span className="status status--good">Works</span>
              <p>
                <strong className="ink">Hunger, learned with no pairing.</strong> Fitted from its own guesses, the
                method never learned to read hunger: “no effect” was a trap it couldn’t climb out of. A new step
                restarts facts that have no effect along the patterns left unexplained, and keeps a restart only if it
                fits better. Both twins’ hunger is now read 94–97% of the time.
              </p>
            </div>
            <div className="takeaway-item">
              <span className="status status--good">Better</span>
              <p>
                <strong className="ink">The truth among the finalists.</strong> Found by the search itself, the true
                reading gets 43% of frames exactly right, up from about 15–20% a week ago, and the places 97%. A
                search now takes 4 hours instead of 8.
              </p>
            </div>
            <div className="takeaway-item">
              <span className="status status--warn">Not yet</span>
              <p>
                <strong className="ink">The final choice.</strong> The search picked a reading with the stone and
                apple words swapped. Once that swap is allowed for, it gets 32% of frames exactly right. Every reading
                with the places wrong scored lowest.
              </p>
            </div>
            <div className="takeaway-item">
              <span className="status status--warn">First signs</span>
              <p>
                <strong className="ink">Confusions that follow the world.</strong> The places lie on a path that
                reads the same both ways, except that the twins eat at the bush, and the method chose the mirror
                image. So we made a version of the world in which the twins also prefer two of the places, which
                breaks the mirror at every move. There the mirror lost. On grid video, what is still confused
                (stone with apple, glass with apple) are the swaps the world breaks least: on 3–5% of steps, against
                25% or more for those it rejected. From lists of facts, every wrong reading of the places lost, and by
                more the more often the world breaks it. That is the graded pattern H3 predicts, so far on pairs used
                to develop the method.
              </p>
            </div>
            <a className="small" href={logEntry(56)}>
              Every step, in the research log (entries 56 onwards) →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Next() {
  return (
    <section id="next" className="section">
      <div className="container stack-48">
        <div className="section-head section-head--wide">
          <Eyebrow tone="ice">What’s next</Eyebrow>
          <h2 className="h2 h2--lg">Five gated phases. The first two are done.</h2>
          <p className="lede">No phase starts until the one before it passes its gate.</p>
        </div>
        <ol className="phases">
          {PHASES.map((p) => (
            <li key={p.n} className={`phase phase--${p.status}`}>
              <span className="phase__n mono">{p.n}</span>
              <div>
                <div className="phase__title">
                  {p.title}
                  {p.status === 'done' && <span className="status status--good">Complete</span>}
                  {p.status === 'next' && <span className="status status--warn">Next</span>}
                  {p.status === 'now' && <span className="status status--warn">Under way</span>}
                </div>
                <p className="phase__body">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="callout">
          <Eyebrow tone="ice">What the literature check found</Eyebrow>
          <p>
            Two 2026 papers establish the principle behind H3 in simpler settings.{' '}
            <a href="https://arxiv.org/abs/2611.11460">Syrota et al.</a> prove that aligning two models of the same
            data, with no pairs, works exactly when the data breaks every symmetry.{' '}
            <a href="https://arxiv.org/abs/2608.27651">Xu &amp; Kanan</a> show the same limit in experiments. Neither
            covers two modalities that share a world but no data, symmetries that come from how a world changes, or
            near-symmetries. So the design is still new, but H3 now tests whether a proven limit carries over, and adds
            a graded prediction the proof doesn’t make. The <a href={LIT_REVIEW}>literature review</a> lists all 33
            sources, and the <a href={`${PROPOSAL}#how-this-proposal-came-to-be`}>proposal</a> lists every change.
          </p>
        </div>
        <div className="callout">
          <Eyebrow tone="amber">Open issues carried forward</Eyebrow>
          <ul className="plain-list">
            <li>On grid video the search’s final choice swaps object words that the world barely tells apart (entry 85). Whether noise or a bias settles such near-ties needs more pairs.</li>
            <li>Confirmed on one fresh pair from lists of facts (entry 87); a second fresh pair, and grid video on a fresh pair, are running.</li>
            <li>The pairs used to develop the method can’t confirm it. Once it is frozen, it runs once on fresh pairs, as the pilot’s did.</li>
            <li>Still to build in this phase: the cipher control, the calibration world, the scrambled world, the grammar-only control and the symmetry-free world.</li>
            <li>A richer world, to give the trained frame model room to show what it adds.</li>
            <li>Done: every order of the twins is searched; both observation formats sort their units into kinds from their own statistics; hunger is learned on grid video without marking who acted; a search runs twice as fast with exactly the same results (entries 58-85).</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Documents() {
  const DOCS = [
    { href: PROPOSAL, title: 'The proposal', body: 'The design of record. The second version, rewritten after the pilot and the literature check.', tag: 'Read online' },
    { href: PROPOSAL_DOCX, title: 'The proposal, as a Word document', body: 'Same content, for printing or sharing.', tag: '.docx' },
    { href: LOG, title: 'The research log', body: 'Every experiment in order, with why, how, result and meaning.', tag: `${entries.length} entries` },
    { href: LIT_REVIEW, title: 'The literature review', body: 'Every source checked for novelty, how much of each was read, and what it changed.', tag: '33 sources' },
    { href: REPO_URL, title: 'The code', body: 'Simulator, renderers, models, alignment and scoring. Every run is reproducible from its record.', tag: 'GitHub' },
  ]
  return (
    <section className="section section--ruled">
      <div className="container stack-40">
        <div className="section-head">
          <Eyebrow tone="ice">Go deeper</Eyebrow>
          <h2 className="h2">Everything behind this page.</h2>
        </div>
        <div className="doc-grid">
          {DOCS.map((d) => (
            <a key={d.href} href={d.href} className="card card--link doc-card">
              <span className="pill">{d.tag}</span>
              <h3 className="card__title">{d.title}</h3>
              <p className="card__body">{d.body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Project() {
  return (
    <>
      <ProjectHero />
      <Question />
      <TwinsDemo />
      <HowItWorks />
      <ModelDiagrams />
      <Decoded />
      <Results />
      <Lessons />
      <Hypotheses />
      <GridVideo />
      <Next />
      <Documents />
    </>
  )
}
