export default class Controller {
  constructor (game, actions, bots) {
    this.game = game
    this.actions = actions
    this.bots = bots
    this.states = new Uint8Array(this.game.paddles.length * this.actions.length)
    this.controller = null
  }
  addControl (paddleId, actionId) {
    if(this.bots[paddleId]) return

    this.states[paddleId * this.actions.length + actionId] = true
    this.controller = null
  }
  removeControl (paddleId, actionId) {
    this.states[paddleId * this.actions.length + actionId] = false
    this.controller = null
  }
  activateKey(keycode) {
    const {paddleId, actionId} = this.lookup(keycode)
    if(paddleId === -1 || actionId === -1) return

    this.addControl(paddleId, actionId)
  }
  deactivateKey(keycode) {
    const {paddleId, actionId} = this.lookup(keycode)
    if(paddleId === -1 || actionId === -1) return

    this.removeControl(paddleId, actionId)
  }
  lookup(keycode) {
    for (let i = 0; i < this.game.paddles.length; i++) {
      for(const control of this.game.paddles[i].controls) {
        if(control.key == keycode) {
          return {paddleId: i, actionId: this.actions.indexOf(control.action)}
        }
      }
    }

    return {paddleId: -1, actionId: -1}
  }
  getController () {
    if(!this.controller) {
      this.controller = []

      for(let i = 0; i < this.states.length; i++) {
        if(!this.states[i]) continue

        this.controller.push({
          paddle: this.game.paddles[parseInt(i / this.actions.length)],
          action: this.actions[i % this.actions.length]
        })
        console.log(this.controller)
      }
    }
    const res = [...this.controller]

    //for bots
    for (let i = 0; i < this.bots.length; i++) {
      if(!this.bots[i]) continue

      res.push({
        paddle: this.game.paddles[i],
        action: this.bots[i](this.game, i)
      })
    }

    return res
  }
}