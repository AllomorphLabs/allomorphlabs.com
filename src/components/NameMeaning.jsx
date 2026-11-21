import { Eyebrow } from './shared.jsx'

export default function NameMeaning() {
  return (
    <section className="band">
      <div className="container band__inner">
        <div className="word">
          <span className="word__text">
            allo<span className="word__dot">·</span><span className="accent">morph</span>
          </span>
          <span className="word__ipa">/ˈæləˌmɔːf/</span>
        </div>
        <div className="word__def">
          <Eyebrow>noun · linguistics</Eyebrow>
          <p>
            One of several surface forms of the same underlying unit. From Greek <em>allos</em>,
            other, and <em>morphē</em>, form. Our work keeps returning to that idea: two very
            different descriptions of one hidden structure, and how much of it each can recover.
          </p>
        </div>
      </div>
    </section>
  )
}
