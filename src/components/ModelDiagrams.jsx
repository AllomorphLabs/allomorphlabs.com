import { Eyebrow } from './shared.jsx'
import { FrameCells } from './FrameCells.jsx'
import models from '../data/models.json'
import sample from '../data/sample.json'

// Architecture diagrams of pair 2's two trained models. Every size and parameter count comes
// from models.json, which the research repo exports from the saved weights.
const L = models.lang
const O = models.obs
const n = (x) => x.toLocaleString('en-GB')
const share = (part, total) => `${Math.round((100 * part) / total)}%`
const FRAME = sample.episodes[1].sentences[0].true_frame

function Layer({ name, what, shape, params, tone, tag, repeat, dashed, children }) {
  const cls = ['arch__layer', tone && `arch__layer--${tone}`, repeat && 'arch__layer--repeat', dashed && 'arch__layer--dashed']
  return (
    <li className={cls.filter(Boolean).join(' ')}>
      <div className="arch__layer-main">
        <div className="arch__layer-name">
          {name}
          {repeat && <span className="arch__times mono">× {repeat}</span>}
          {tag && <span className={`arch__tag arch__tag--${tone ?? 'muted'}`}>{tag}</span>}
        </div>
        <p className="arch__layer-what">{what}</p>
        {children}
      </div>
      <div className="arch__layer-nums mono">
        {shape && <span>{shape}</span>}
        {params != null && <span className="muted">{params ? `${n(params)} params` : 'no params'}</span>}
      </div>
    </li>
  )
}

function LanguageModel() {
  const p = L.parts
  return (
    <figure className="arch arch--lang">
      <header className="arch__head">
        <Eyebrow tone="amber">The language model</Eyebrow>
        <div className="arch__total">
          <span className="arch__total-n">{n(L.params)}</span> learned parameters
        </div>
      </header>
      <ol className="arch__stack">
        <Layer
          name="Input: the episode so far"
          what={`Up to ${L.context} tokens. The language has just ${L.vocab} distinct tokens: word stems, word endings such as -iz, a sentence end <.> and an episode start <ep>. These are the real first tokens of a held-out episode.`}
        >
          <div className="arch__tokens">
            {L.tokens.map((t, i) => (
              <span key={i} className="arch__token mono">{t}</span>
            ))}
          </div>
        </Layer>
        <Layer
          name="Embedding"
          what={`Each token becomes a list of ${L.width} numbers, plus a second list that says where it sits in the episode. All the model ever works with are these lists.`}
          shape={`token → ${L.width}`}
          params={p.embed}
        />
        <Layer
          name="Transformer block"
          what={`The same design repeated ${L.layers} times, each with its own weights. In every block, each position looks back at earlier tokens, then processes what it gathered. See “Inside one block” below.`}
          shape={`${L.heads} heads · ${L.width} wide`}
          params={p.blocks}
          repeat={L.layers}
        />
        <Layer name="Final normalisation" what="Rescales each list of numbers to a standard range." params={p.norm} />
      </ol>
      <div className="arch__fork">
        <p className="arch__fork-label">The same numbers feed two separate outputs:</p>
        <ol className="arch__stack">
          <Layer
            name="Next-token head"
            what={`Turns the ${L.width} numbers into a score for each of the ${L.vocab} tokens: how likely each is to come next. This is what the model is trained on.`}
            shape={`${L.width} → ${L.vocab}`}
            params={p.head}
          />
        </ol>
        <ol className="arch__stack">
          <Layer
            name="Sentence summary"
            what={`At the end of each sentence, the ${L.width} numbers are squeezed into ${L.summary}. Decipherment reads these summaries.`}
            shape={`${L.width} → ${L.summary}`}
            params={p.down}
            tone="amber"
            tag="Used by alignment"
          />
          <Layer
            name="Future decoder"
            what={`A small ${L.future_layers}-block network that must predict the next ${L.future} tokens from the summary alone. It exists only during training, to force the summary to hold the whole state of the world.`}
            shape={`${L.summary} → next ${L.future}`}
            params={p.future}
            dashed
            tag="Training only"
          />
        </ol>
      </div>
      <figcaption className="arch__caption">
        {share(p.blocks, L.params)} of the parameters are in the {L.layers} blocks, and {share(p.future, L.params)} in the
        future decoder, which is thrown away after training.
      </figcaption>
    </figure>
  )
}

function FrameModel() {
  const p = O.parts
  return (
    <figure className="arch arch--obs">
      <header className="arch__head">
        <Eyebrow tone="ice">The frame model</Eyebrow>
        <div className="arch__total">
          <span className="arch__total-n">{n(O.params)}</span> learned parameters
        </div>
      </header>
      <ol className="arch__stack">
        <Layer
          name="Input: the frames so far"
          what={`Up to ${O.context} frames. Each frame is ${O.frame} yes/no facts in a shuffled order, with no labels. The model isn’t told which facts belong together.`}
        >
          <div className="arch__frame">
            <FrameCells bits={FRAME} size="small" />
          </div>
        </Layer>
        <Layer
          name="Embedding"
          what={`Each frame’s ${O.frame} facts are mixed into a list of ${O.width} numbers, plus a list for its position in the episode.`}
          shape={`${O.frame} → ${O.width}`}
          params={p.embed}
        />
        <Layer
          name="Transformer block"
          what={`The same design as the language model’s, smaller and repeated ${O.layers} times. Each frame looks back at earlier frames, then processes what it gathered.`}
          shape={`${O.heads} heads · ${O.width} wide`}
          params={p.blocks}
          repeat={O.layers}
        />
        <Layer name="Final normalisation" what="Rescales each list of numbers to a standard range." params={p.norm} />
        <Layer
          name="Whole-frame head"
          what={`Predicts the next frame’s ${O.frame} facts one at a time, each given the history and the facts already decided. Multiplying those gives the probability of a whole frame, so it can score a proposed frame and sample realistic ones.`}
          shape={`${O.width} → ${O.frame} facts, via ${O.joint_hidden}`}
          params={p.head}
          tone="ice"
          tag="Used by alignment"
        />
      </ol>
      <figcaption className="arch__caption">
        Decipherment uses this model to propose how the world could unfold, and to score how likely each proposed
        history is.
      </figcaption>
    </figure>
  )
}

/** One transformer block, shared by both models, with a causal attention pattern. */
function Block() {
  const N = 7
  return (
    <figure className="arch arch--block">
      <header className="arch__head">
        <Eyebrow>Inside one block</Eyebrow>
        <div className="arch__total">The same in both models; only the sizes differ.</div>
      </header>
      <div className="block-flow">
        <ol className="block-flow__steps">
          <li className="block-step">
            <span className="block-step__name">Normalise</span>
          </li>
          <li className="block-step block-step--key">
            <span className="block-step__name">Attention</span>
            <span className="block-step__what">
              Each position gathers information from itself and earlier positions, never later ones. Several “heads” do
              this in parallel, each free to look for something different.
            </span>
          </li>
          <li className="block-step block-step--add">
            <span className="block-step__name">+ Add back the input</span>
          </li>
          <li className="block-step">
            <span className="block-step__name">Normalise</span>
          </li>
          <li className="block-step block-step--key">
            <span className="block-step__name">Feed-forward</span>
            <span className="block-step__what">
              Each position, on its own, is widened to four times its size, passed through a bend (GELU) and narrowed
              back. This is where most of the computation happens.
            </span>
          </li>
          <li className="block-step block-step--add">
            <span className="block-step__name">+ Add back the input</span>
          </li>
        </ol>
        <div className="block-attn">
          <div
            className="block-attn__grid"
            role="img"
            aria-label="Attention pattern: each position can look at itself and every earlier position, and none after it."
          >
            {Array.from({ length: N * N }, (_, k) => {
              const row = Math.floor(k / N)
              const col = k % N
              return <span key={k} className={col <= row ? 'on' : ''} />
            })}
          </div>
          <p className="small muted">
            Who can look at whom. Each row is a position; filled cells are the positions it can attend to. Because no
            position sees the future, the model has to predict it.
          </p>
        </div>
      </div>
      <div className="table-wrap">
        <table className="block-sizes">
          <thead>
            <tr>
              <th scope="col">Per block</th>
              <th scope="col">Language model</th>
              <th scope="col">Frame model</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Width of each position</th>
              <td className="mono">{L.width}</td>
              <td className="mono">{O.width}</td>
            </tr>
            <tr>
              <th scope="row">Attention heads</th>
              <td className="mono">{L.heads} × {L.width / L.heads}</td>
              <td className="mono">{O.heads} × {O.width / O.heads}</td>
            </tr>
            <tr>
              <th scope="row">Feed-forward</th>
              <td className="mono">{L.width} → {4 * L.width} → {L.width}</td>
              <td className="mono">{O.width} → {4 * O.width} → {O.width}</td>
            </tr>
            <tr>
              <th scope="row">Parameters</th>
              <td className="mono">{n(L.parts.block)}</td>
              <td className="mono">{n(O.parts.block)}</td>
            </tr>
            <tr>
              <th scope="row">Blocks</th>
              <td className="mono">{L.layers}</td>
              <td className="mono">{O.layers}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </figure>
  )
}

export default function ModelDiagrams() {
  return (
    <section id="models" className="section">
      <div className="container stack-48">
        <div className="section-head section-head--wide">
          <Eyebrow tone="ice">Inside the models</Eyebrow>
          <h2 className="h2 h2--lg">What’s actually inside each model.</h2>
          <p className="lede">
            Both are transformers, the same kind of network behind today’s large language models, but thousands of
            times smaller. Each reads its stream from the start of an episode and, at every step, predicts what comes
            next. These are pair {models.pair}’s real models, with the number of learned parameters in each part.
            Information flows from top to bottom.
          </p>
        </div>
        <div className="arch-pair">
          <LanguageModel />
          <FrameModel />
        </div>
        <Block />
      </div>
    </section>
  )
}
