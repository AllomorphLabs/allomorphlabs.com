/** The places in path order, walking from one end of a path-shaped map. */
export function pathOrder(places, edges) {
  const nbrs = places.map((_, i) => edges.filter((e) => e.includes(i)).map((e) => (e[0] === i ? e[1] : e[0])))
  let cur = nbrs.findIndex((n) => n.length === 1)
  if (cur < 0) return places
  const order = []
  while (cur !== undefined) {
    order.push(cur)
    cur = nbrs[cur].find((n) => !order.includes(n))
  }
  return order.length === places.length ? order.map((i) => places[i]) : places
}
