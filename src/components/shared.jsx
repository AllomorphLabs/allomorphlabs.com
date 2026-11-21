export const GITHUB_URL = 'https://github.com/allomorphlabs'

/** Small uppercase monospace label used above headings. */
export function Eyebrow({ children, tone = 'muted' }) {
  return <div className={`eyebrow eyebrow--${tone}`}>{children}</div>
}

/** The split-circle mark: solid half and pixel half. */
export function LogoMark({ size = 30, label = 'Allomorph logo' }) {
  const cells = [
    [53, 12], [53, 29], [70, 29], [53, 46], [70, 46], [53, 63], [70, 63],
  ]
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={label}>
      <path d="M50 10 A40 40 0 0 0 50 90 Z" fill="var(--ink)" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="13" height="13" rx="2" fill="var(--amber)" />
      ))}
      <rect x="53" y="80" width="13" height="8" rx="2" fill="var(--amber)" />
    </svg>
  )
}

/** Tiny version of the mark used as a card icon. */
export function MiniMark() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 4 A16 16 0 0 0 20 36 Z" fill="var(--ink)" />
      <rect x="22" y="8" width="6" height="6" rx="1" fill="var(--amber)" />
      <rect x="22" y="17" width="6" height="6" rx="1" fill="var(--amber)" />
      <rect x="30" y="17" width="6" height="6" rx="1" fill="var(--amber)" />
      <rect x="22" y="26" width="6" height="6" rx="1" fill="var(--amber)" />
    </svg>
  )
}
