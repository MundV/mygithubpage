const range = [
  [640, 0],
  [362, -57],
  [108, 0],
  [777, 0],
  [362, -57],
  [100, -0.2],
  [362, -57],
  [100, -0.2]
]

export default function aiBot () {
  return (g, p) => {
    if (g.paused) return ''
    const _s = []
    const b = g.ball
    const p1 = g.paddles[0]
    const p2 = g.paddles[1]

    _s.push(b.pos[0])
    _s.push(b.pos[1])
    _s.push(b.physicsY.energy)
    _s.push(b.physicsX.energy)
    _s.push(p1.pos[1])
    _s.push(p1.energy)
    _s.push(p2.pos[1])
    _s.push(p2.energy)
    _s.push((p1.controlsBall) ? 1 : 0)
    _s.push((p2.controlsBall) ? 1 : 0)

    const input = _s.map((val, i) => normalize(val, ...range[i])).map((val) => {
      if (isNaN(val)) {
        return 0
      } else {
        return val
      }
    })

    const prediction = predict(input)[0]

    // if (Math.round(prediction[0])){
    console.log(prediction)
    if (prediction < 0.35) {
      return 'up'
    } else {
      return 'down'
    }
  }
}

function normalize (val, max, min) {
  return (val - min) / (max - min)
}
