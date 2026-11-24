const W = 440
const H = 184
const LINE_Y = 86

/**
 * A world state drawn as the pilot world's map: places on a path, agents above their place,
 * objects below it (or with the agent holding them), and eaten objects set aside.
 *
 * `state` is { agents: {name: {place, hungry}}, objects: {name: {state, where}} },
 * as exported by the research repo's scripts/export_site_data.py.
 * `tone` picks which agents are drawn in which colour: { name: 'a' | 'b' }.
 */
// Figures are labelled "fig 1" to fit beside each other at one place.
const short = (name) => name.replace('figure ', 'fig ')

export function WorldMap({ state, places, title, tone = {}, caption }) {
  const step = W / places.length
  const x = (p) => step * (places.indexOf(p) + 0.5)
  const agents = Object.entries(state.agents)
  const objects = Object.entries(state.objects)
  const gone = objects.filter(([, o]) => o.state === 'gone')
  return (
    <figure className="world">
      {title && <figcaption className="world__title">{title}</figcaption>}
      <svg viewBox={`0 0 ${W} ${H}`} className="world__svg" role="img" aria-label={describe(state)}>
        <line x1={x(places[0])} x2={x(places.at(-1))} y1={LINE_Y} y2={LINE_Y} className="world__path" />
        {places.map((p) => (
          <g key={p}>
            <circle cx={x(p)} cy={LINE_Y} r="7" className="world__place" />
            <text x={x(p)} y={LINE_Y + 26} textAnchor="middle" className="world__label">{p}</text>
          </g>
        ))}
        {places.map((p) => {
          const here = agents.filter(([, a]) => a.place === p)
          return here.map(([name, a], k) => {
            const ax = x(p) + (k - (here.length - 1) / 2) * 52
            const held = objects.filter(([, o]) => o.state === 'held' && o.where === name)
            return (
              <g key={name} className={`world__agent world__agent--${tone[name] ?? 'a'}`}>
                <rect x={ax - 25} y={LINE_Y - 50} width="50" height="22" rx="5" />
                <text x={ax} y={LINE_Y - 35} textAnchor="middle" className="world__agent-name">{short(name)}</text>
                {a.hungry && (
                  <text x={ax} y={LINE_Y - 60} textAnchor="middle" className="world__hungry">hungry</text>
                )}
                {held.length > 0 && (
                  <text x={ax} y={LINE_Y - 14} textAnchor="middle" className="world__held">
                    {held.map(([o]) => `+${o}`).join(' ')}
                  </text>
                )}
              </g>
            )
          })
        })}
        {places.map((p) => {
          const here = objects.filter(([, o]) => (o.state === 'at' || o.state === 'broken') && o.where === p)
          return here.map(([o, s], k) => (
            <g key={o} className={s.state === 'broken' ? 'world__object world__object--broken' : 'world__object'}>
              <rect x={x(p) - 40} y={LINE_Y + 36 + k * 22} width="80" height="19" rx="9.5" />
              <text x={x(p)} y={LINE_Y + 50 + k * 22} textAnchor="middle">
                {s.state === 'broken' ? `${o}, broken` : o}
              </text>
            </g>
          ))
        })}
        {gone.length > 0 && (
          <text x={W - 6} y={H - 6} textAnchor="end" className="world__gone">
            eaten: {gone.map(([o]) => o).join(', ')}
          </text>
        )}
      </svg>
      {caption && <figcaption className="world__caption small muted">{caption}</figcaption>}
    </figure>
  )
}

function describe(state) {
  const a = Object.entries(state.agents).map(([n, s]) => `${n} at the ${s.place}${s.hungry ? ', hungry' : ''}`)
  const o = Object.entries(state.objects).map(([n, s]) =>
    s.state === 'held' ? `${n} held by ${s.where}` : s.state === 'gone' ? `${n} eaten` : `${n} ${s.state === 'broken' ? 'broken ' : ''}at the ${s.where}`,
  )
  return [...a, ...o].join('; ')
}
