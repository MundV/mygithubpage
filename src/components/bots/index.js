import aiBot from './aiBot/index.js'
import dnaBot from './dnaBot/index.js'

export default function bot (botType) {
  if (botType === 'simple') return simpleBot()
  if (botType === 'ai') return aiBot()
  if (botType === 'dna') return dnaBot()
}

function simpleBot () {
  let direction = ''

  return (g, p) => {
    if (g.paddles[p].controlsBall) {
      if (direction !== '' && g.ball.pos[1] > 10) {
        if (g.ball.pos[1] < g.fieldSize[1] - 10) return direction
        if (direction === 'up') return 'down'
        return 'up'
      }
      if (Math.random() > 0.5) {
        direction = 'down'
        return direction
      }
      direction = 'up'
      return direction
    }
    direction = ''
    const a = g.ball.pos[1]
    const b = g.paddles[p].pos[1] + g.paddles[p].size[1] / 2
    const d = a - b
    if (d < 0) {
      if (tpDistance(a, b, g.fieldSize[1]) < -1 * d && g.paddles[1].controlsBall) {
        return 'down'
      }
      return 'up'
    }
    if (tpDistance(b, a, g.fieldSize[1]) < d && g.paddles[1].controlsBall) {
      return 'up'
    }
    return 'down'
  }
}

function tpDistance (a, b, h) {
  return a + (h - b)
}
