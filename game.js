class game {
  constructor(options = {}) {
    this.FIELD_SIZE = options.FIELD_SIZE || [720, 360]
    this.paddles = options.paddles || [
      new paddle({name: 'p1'}),
      new paddle({
        name: 'p2',
        keys: [[38, 'up'], [40, 'down']],
        goal: 'left',
        START_POS: [this.FIELD_SIZE[0] - 20, this.FIELD_SIZE[1] / 2 - 10]
      })
    ]
    this.ballOptions = options.ball || {}
    this.ball = new ball(this.ballOptions)

    this.reflectEnergy = (typeof options.reflectEnergy !== 'undefined') ? options.reflectEnergy: 1
    this.multiplier = options.multiplier || 3
    this.bgColor = (typeof options.bgColor !== 'undefined') ? options.bgColor: 51
    //graphics stuff
    createCanvas(this.FIELD_SIZE[0], this.FIELD_SIZE[1])
    background(this.bgColor)

    this.paused = false
  }
  controlPaddle() {
    this.paddles.map( (paddle) => {
      for(const key of paddle.keys) {
        if (keyIsDown(key[0])) {
          paddle.move(key[1])
          if(paddle.controllsBall)
            this.ball.moveY(key[1])
        }
      }
      return paddle
    })
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

      //temp code
      const one = select("#one")
      const two = select("#two")
      one.html(this.paddles[0].points)
      two.html(this.paddles[1].points)
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
