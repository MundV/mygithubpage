class game {
  constructor(options = {}) {
    this.FIELD_SIZE = options.FIELD_SIZE || [640, 360]
    this.paddles = options.paddles || [
      new paddle({name: 'p1'}),
      new paddle({
        name: 'p2',
        keys: [[38, 'up'], [40, 'down']],
        goal: 'left',
        START_POS: [this.FIELD_SIZE[0] - 20, this.FIELD_SIZE[1] / 2 - 10]
      })
    ]
    this.touchControls = options.touchControls || [
      {x: 0, xMax: this.FIELD_SIZE[0] / 2, y: 0, yMax: this.FIELD_SIZE[1] / 2, player: 0, move: 'up'},
      {x: 0, xMax: this.FIELD_SIZE[0] / 2, y: this.FIELD_SIZE[1] / 2, yMax: this.FIELD_SIZE[1], player: 0, move: 'down'},
      {x: this.FIELD_SIZE[0] / 2, xMax: this.FIELD_SIZE[0], y: 0, yMax: this.FIELD_SIZE[1] / 2, player: 1, move: 'up'},
      {x: this.FIELD_SIZE[0] / 2, xMax: this.FIELD_SIZE[0], y: this.FIELD_SIZE[1] / 2, yMax: this.FIELD_SIZE[1], player: 1, move:'down'}
    ]
    this.ballOptions = options.ball || {}
    this.ball = new ball(this.ballOptions)

    this.reflectEnergy = (typeof options.reflectEnergy !== 'undefined') ? options.reflectEnergy: 1
    this.multiplier = options.multiplier || 3
    this.bgColor = (typeof options.bgColor !== 'undefined') ? options.bgColor: 51
    this._createCanvas()

    this.paused = true;
  }
  _createCanvas() {
    const canvas = createCanvas(this.FIELD_SIZE[0], this.FIELD_SIZE[1])
    const button = select("button")
    background(this.bgColor)
    canvas.mouseClicked(() => {
      this._fullscreen()
    })
    button.mouseClicked(() => {
      this._fullscreen()
      select("#play").style("display", "none")
    })
  }
  _fullscreen() {
    this.paused = false;
    if(!fullscreen()) {
      fullscreen(true)
    }
  }
  controlPaddle() {
    this.paddles.map( (paddle) => {
      for(const key of paddle.keys) {
        if (keyIsDown(key[0])) {
          paddle.move(key[1])
          this._controlBall(paddle, key[1])
        }
      }
      return paddle
    })
    for(const touch of touches) {
      for(const control of this.touchControls) {
        if(control.x <= touch.x && control.xMax >= touch.x && control.y <= touch.y && control.yMax >= touch.y) {
          const paddle = this.paddles[control.player]
          paddle.move(control.move)
          this._controlBall(paddle, control.move)
        }
      }
    }
  }
  _controlBall(paddle, direction) {
    if(paddle.controllsBall)
      this.ball.moveY(direction)
  }
  bounce() {
    this.paddles.map((paddle) => {
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
           this.ball.physicsX.energy += this.multiplier * paddle.physics.energy + this.reflectEnergy
           this.resetBallControl();
           paddle.controllsBall = true
      }
      return paddle
    })
  }
  goalCheck() {
    if(this.ball.pos[0] < 0 || this.ball.pos[0] > this.FIELD_SIZE[0]) {
      this.paddles.map((paddle) => {
        if (paddle.goal == this.ball.xDirection)
          paddle.points ++
        return paddle
      })
      this.resetBallControl()
      this.ballOptions.xDirection = (this.ball.xDirection == 'left' ? 'left' : 'right')
      this.ball = new ball(this.ballOptions)
    }
  }
  resetBallControl() {
    this.paddles.map((paddle) => {
     paddle.controllsBall = false
     return paddle
    })
  }
  render() {
    background(this.bgColor)
    this.paddles.map((paddle) => {
      paddle.show()
      return paddle
    })
    this.ball.show()
  }
}
