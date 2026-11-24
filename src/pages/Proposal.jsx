import proposal from '../content/proposal.md?raw'
import DocPage from '../site/DocPage.jsx'
import { LOG, PROJECT, PROPOSAL_DOCX } from '../site/links.js'
import { render } from '../site/Markdown.jsx'

// The title, byline and "also published as" note are shown in the page header instead.
const body = proposal.replace(/^# .+\n+/, '').replace(/^.+· Shane.*\n+/, '').replace(/^\*Also published as a Word document.+\*\n+/m, '')
const { html, toc } = render(body)
const byline = proposal.match(/^(.+· Shane.*)$/m)?.[1] ?? ''

export default function Proposal() {
  return (
    <DocPage
      eyebrow="Project 01 · Proposal"
      title="Predicting the Limits of Unsupervised Grounding"
      intro={<p className="mono small muted">{byline}</p>}
      actions={
        <>
          <a className="btn btn--small" href={PROPOSAL_DOCX}>Download (.docx)</a>
          <a className="btn btn--ghost btn--small" href={PROJECT}>Project overview</a>
          <a className="btn btn--ghost btn--small" href={LOG}>Research log</a>
        </>
      }
      toc={toc}
      html={html}
    />
  )
}
