let noRender = false
if(typeof window === 'undefined') {
  paddle = require('./paddle.js')
  ball = require('./ball.js')
  noRender = true
}

class game {
  constructor(options = {}) {
    this.fieldSize = options.fieldSize || [640, 360]
    this.paddleSettings = options.paddles || [
      {name: 'player Left'},
      {
        name: 'player Right',
        controls: [{key: 38, action: 'up'}, {key: 40, action: 'down'}],
        goal: 'left',
        startPos: [this.fieldSize[0] - 20, this.fieldSize[1] / 2 - 10]
      }
    ]
    this.paddles = this.paddleSettings.map(opt => new paddle(opt))
    this.ballOptions = options.ball || {}
    this.ball = new ball(this.ballOptions)

    this.reflectEnergy = (typeof options.reflectEnergy !== 'undefined') ? options.reflectEnergy: 1
    this.multiplier = options.multiplier || 3
    this.bgColor = (typeof options.bgColor !== 'undefined') ? options.bgColor: 51
    this._createCanvas()
    this.goal = options.goal || 5

    this.paused = false
    this.ended = false
    this.winner = []
  }
  _getTouchControls() {
    return [
        {x: 0, xMax: screen.width / 2, y: 0, yMax: screen.height / 2, landscape:{player: 0, action: 'up'}, portrait: {player: 0, action: 'down'}},
        {x: 0, xMax: screen.width / 2, y: screen.height / 2, yMax: screen.height, landscape: {player: 0, action: 'down'}, portrait: {player: 1, action:'down' }},
        {x: screen.width / 2, xMax: screen.width, y: 0, yMax: screen.height / 2, landscape: {player: 1, action: 'up'}, portrait: {player: 0, action:'up' }},
        {x: screen.width / 2, xMax: screen.width, y: screen.height / 2, yMax: screen.height, landscape: {player: 1, action:'down'}, portrait: {player: 1, action: 'up'}}
      ]
  }
  _orientation() {
    if(window.matchMedia("(orientation: landscape)").matches) {
      return 'landscape'
    } else {
      return 'portrait'
    }
  }
  _createCanvas() {
    if(noRender)
      return;
    const canvas = createCanvas(this.fieldSize[0], this.fieldSize[1])
    document.getElementById('canvas').appendChild(document.getElementsByTagName('canvas')[0])
    this._fullscreen()
    background(this.bgColor)
    canvas.mouseClicked(() => {
      this._fullscreen()
    })
  }
  _fullscreen() {
    if(!fullscreen()) {
      fullscreen(true)
    }
  }
  sendControls() {
    if(noRender)
      return;
    // inside the controller there will be a paddle and an action
    const controller = []
    this.paddles.map((paddle) => {
      for(const control of paddle.controls) {
        if (keyIsDown(control.key)) {
          controller.push({paddle, action: control.action})
        }
      }
      return paddle
    })
    for(const touch of touches) {
      const touchControls = this._getTouchControls()
      for(const control of touchControls) {
        if(control.x <= touch.x && control.xMax >= touch.x && control.y <= touch.y && control.yMax >= touch.y) {
          const orientation = this._orientation()
          const paddle = this.paddles[control[orientation].player]
          const action = control[orientation].action
          controller.push({paddle, action})
        }
      }
    }
    controller.forEach((control) => {
      this._controlPaddle(control.paddle, control.action)
      this._controlBall(control.paddle, control.action)
    })
  }
  _controlPaddle(paddle, direction) {
    paddle.move(direction)
  }
  _controlBall(paddle, direction) {
    if(paddle.controlsBall)
      this.ball.moveY(direction)
  }
  bounce() {
    for (let paddle of this.paddles) {
      const paddleX = {
        min: paddle.pos[0],
        max: paddle.pos[0] + paddle.size[0]
      }
      const paddleY = {
        min: paddle.pos[1],
        max: paddle.pos[1] + paddle.size[1]
      }
      if(paddleX.min <= this.ball.pos[0] && this.ball.pos[0] <= paddleX.max &&
         paddleY.min <= this.ball.pos[1] + this.ball.size / 2 && this.ball.pos[1] - this.ball.size / 2 <= paddleY.max) {
           this.ball.xDirection = (this.ball.xDirection == 'left' ? 'right' : 'left')
           this.ball.addEnergyX(this.multiplier * paddle.physics.energy + this.reflectEnergy)
           for (const paddle of this.paddles) {
             paddle.controlsBall = false
           }
           paddle.controlsBall = true
      }
    }
  }
  goalCheck() {
    if(this.ball.pos[0] < 0 || this.ball.pos[0] > this.fieldSize[0]) {
      for (const paddle of this.paddles) {
        if (paddle.goal == this.ball.xDirection)
          paddle.points ++
        if(paddle.points >= this.goal) {
          this.ended = true
          this.winner.push(paddle.name)
        }
        paddle.controlsBall = false
      }
      this.ball.reset()
    }
  }
  render() {
    if(!noRender) {
      fill(255)
      strokeWeight(0.5)
      background(this.bgColor)
      textFont('Sarpanch');
      textSize(10);
    }

    for (const paddle of this.paddles) {
      paddle.show()
    }
    this.ball.show()
  }
  update() {
    this.sendControls()
    this.bounce()
    this.goalCheck()
    this.render()
  }
}

if(noRender) {
  module.exports = game
}
