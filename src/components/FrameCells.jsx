/**
 * A frame as the watcher sees it: a row of yes/no cells, in the frame's own shuffled order.
 * With `compare`, cells that differ from it are marked.
 */
export function FrameCells({ bits, compare, size = 'normal', label }) {
  return (
    <div className={`frame frame--${size}`} role="img" aria-label={label ?? `Frame: ${bits}`}>
      {[...bits].map((b, i) => {
        const diff = compare && compare[i] !== b
        // Cell position in the frame is its identity, so the index is the right key.
        const cls = `frame__cell${b === '1' ? ' frame__cell--on' : ''}${diff ? ' frame__cell--diff' : ''}`
        return <span key={i} className={cls} />
      })}
    </div>
  )
}
