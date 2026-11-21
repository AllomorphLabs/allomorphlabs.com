// The timeline shown in the Zib and Mov demo.
// Invented-language vocabulary (each word checked to be far from English):
//   teshi = go, vudo = river, gorvi = eat, pukat = berry bush,
//   tsifa = home, sorrun = and

const both = (time, rest, english, spot) => ({
  time,
  f1: spot,
  f2: spot,
  lines: [{ who: 'zib sorrun mov', rest, english: `Zib and Mov ${english}` }],
})

/** Returns the day's steps. With `habit`, Zib makes an extra evening river trip. */
export function buildSteps(habit) {
  const steps = [
    both('08:00', 'teshi vudo', 'go to the river', 'river'),
    both('12:00', 'gorvi pukat', 'eat at the berry bush', 'food'),
  ]
  if (habit) {
    steps.push({
      time: '18:00',
      unique: true,
      f1: 'river',
      f2: 'home',
      lines: [
        { who: 'mov', rest: 'teshi tsifa', english: 'Mov goes home' },
        { who: 'zib', rest: 'teshi vudo', english: 'Zib goes back to the river' },
      ],
    })
    steps.push({
      time: '20:00',
      f1: 'home',
      f2: 'home',
      lines: [{ who: 'zib', rest: 'teshi tsifa', english: 'Zib goes home' }],
    })
  } else {
    steps.push(both('18:00', 'teshi tsifa', 'go home', 'home'))
  }
  return steps
}

// Positions in the grid world's SVG coordinates (top-left of a figure).
const HOME = { 1: [20, 32], 2: [20, 104] }
const SPOTS = { river: [180, 65], food: [120, 65] }

/** Where figure `n` stands during `step`. Twins sharing a square sit slightly apart. */
export function figurePosition(step, n) {
  const mine = n === 1 ? step.f1 : step.f2
  const other = n === 1 ? step.f2 : step.f1
  if (mine === 'home') return HOME[n]
  const nudge = mine === other ? (n === 1 ? -5 : 5) : 0
  return [SPOTS[mine][0] + nudge, SPOTS[mine][1]]
}
