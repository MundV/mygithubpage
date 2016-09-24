class game {
  constructor(options = {}) {
    this.fieldSize = options.fieldSize || [720, 360]
    this.players = options.players || [
      {
        name: 'player1',
        keys: [[87, 'up'], [83, 'down']],
        points: 0,
        controllsBall: false
      }, {
        name: 'player2',
        keys: [38, 'up'], [40, 'down'],
        points: 0,
        controllsBall: false
      }
    ]
    this.reflectEnergy = (typeof options.reflectEnergy !== 'undefined') ? options.reflectEnergy: 1
    this.multiplier = options.multiplier || 1
    this.paused = false
  }
  startGame() {

  }
  run() {
    if(this.paused)
      return

  }
  checkKeyDown() {

  }
  bounce() {

  }
  isScored() {

  }
  render() {

  }
}
