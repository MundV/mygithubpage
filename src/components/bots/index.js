export default function aiMove (game, player, botType) {
  if (botType === 'simple') return simpleBot(game, player)
}
function simpleBot (g, p) {
  if (g.paddles[p].controlsBall) {
    if(Math.random() > 0.5) {
      return 'down'
    } else {
      return 'up'
    }
  } else {
    const conversion = {
      true: 'up',
      false: 'down'
    }
    let baseLine = true
    const a = g.ball.pos[1]
    const b = g.paddles[p].pos[1] + g.paddles[p].size[1] / 2
    const d = a - b
    if(d < 0) {
      if (tpDistance(a, b, g.fieldSize[1]) < -1 * d) {
        return 'down'
      } else {
        return 'up'
      }
    } else {
      if (tpDistance(b, a, g.fieldSize[1]) < d) {
        return 'up'
      } else {
        return 'down'
      }
    }
  }
}
function tpDistance (a, b, h) {
  return a + (h - b)
}
