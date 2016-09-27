class game {
  constructor(options = {}) {
    this.FIELD_SIZE = options.FIELD_SIZE || [720, 360]
    this.players = options.players || [
      {
        name: 'player1',
        keys: [[87, 'up'], [83, 'down']],
        goal: 'right',
        points: 0,
        controllsBall: false,
        paddle: new paddle()
      }, {
        name: 'player2',
        keys: [[38, 'up'], [40, 'down']],
        goal: 'left',
        points: 0,
        controllsBall: false,
        paddle: new paddle({START_POS: [700, 170]})
      }
    ]
    this.ballOptions = options.ball || {}
    this.ball = new ball(this.ballOptions)

    this.reflectEnergy = (typeof options.reflectEnergy !== 'undefined') ? options.reflectEnergy: 1
    this.multiplier = options.multiplier || 3
    this.bgColor = (typeof options.bgColor !== 'undefined') ? options.bgColor: 51
    console.log(this.bgColor, this.FIELD_SIZE);
    //graphics stuff
    createCanvas(this.FIELD_SIZE[0], this.FIELD_SIZE[1])
    background(this.bgColor)

    this.paused = false
  }
  controlPaddle() {
    this.players.map( (player) => {
      for(const key of player.keys) {
        if (keyIsDown(key[0])) {
          player.paddle.move(key[1])
          if(player.controllsBall)
            this.ball.moveY(key[1])
        }
      }
      return player
    })
  }
  bounce() {
    this.players.map((player) => {
      const paddle = player.paddle
      const paddleX = {
        min: Math.round(paddle.pos[0]),
        max: Math.round(paddle.pos[0] + paddle.size[0])
      }
      const paddleY = {
        min: Math.round(paddle.pos[1]),
        max: Math.round(paddle.pos[1] + paddle.size[1])
      }
      if(paddleX.min <= Math.round(this.ball.pos[0]) && Math.round(this.ball.pos[0]) <= paddleX.max &&
         paddleY.min <= Math.round(this.ball.pos[1]) && Math.round(this.ball.pos[1]) <= paddleY.max) {
           this.ball.xDirection = (this.ball.xDirection == 'left' ? 'right' : 'left')
           this.ball.physicsX.energy += this.multiplier * paddle.physics.energy + this.reflectEnergy
           this.resetBallControl();
           player.controllsBall = true
      }
      return player
    })
  }
  goalCheck() {
    if(this.ball.pos[0] < 0 || this.ball.pos[0] > this.FIELD_SIZE[0]) {
      this.players.map((player) => {
        if (player.goal == this.ball.xDirection)
          player.points ++
        return player
      })
      this.resetBallControl()
      this.ballOptions.xDirection = (this.ball.xDirection == 'left' ? 'left' : 'right')
      console.log(this.ballOptions);
      this.ball = new ball(this.ballOptions)

      //temp code
      const one = select("#one")
      const two = select("#two")
      one.html(this.players[0].points)
      two.html(this.players[1].points)
    }
  }
  resetBallControl() {
    this.players.map((player) => {
     player.controllsBall = false
     return player
    })
  }
  render() {
    background(this.bgColor)
    this.players.map((player) => {
      player.paddle.show()
      return player
    })
    this.ball.show()
  }
}
