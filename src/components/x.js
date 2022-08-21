// class Game {
//     constructor (options = {}) {
//       this.fieldSize = options.fieldSize || [640, 360]
//       this.paddleSettings = options.paddles || [
//         {name: 'player Left'},
//         {
//           name: 'player Right',
//           controls: [{key: 38, action: 'up'}, {key: 40, action: 'down'}],
//           goal: 'left',
//           startPos: [this.fieldSize[0] - 20, this.fieldSize[1] / 2 - 10]
//         }
//       ]
//       this.paddles = this.paddleSettings.map(opt => new Paddle(opt))
//       this.ballOptions = options.ball || {}
//       this.ball = new Ball(this.ballOptions)
  
//       this.reflectEnergy = (typeof options.reflectEnergy !== 'undefined') ? options.reflectEnergy : 1
//       this.multiplier = options.multiplier || 3
//       this.goal = options.goal || 5
  
//       this.paused = false
//       this.ended = false
//       this.winner = []
//     }
  
//     sendControls (controller) {
//       controller.forEach((control) => {
//         this._controlPaddle(control.paddle, control.action)
//         this._controlBall(control.paddle, control.action)
//       })
//     }
  
//     _controlPaddle (paddle, direction) {
//       paddle.move(direction)
//     }
  
//     _controlBall (paddle, direction) {
//       if (paddle.controlsBall) this.ball.moveY(direction)
//     }
  
//     bounce () {
//       for (let paddle of this.paddles) {
//         const paddleX = {
//           min: paddle.pos[0],
//           max: paddle.pos[0] + paddle.size[0]
//         }
//         const paddleY = {
//           min: paddle.pos[1],
//           max: paddle.pos[1] + paddle.size[1]
//         }
        
//         // Does the ball touch the paddle?
//         if (paddleX.min <= this.ball.pos[0] && this.ball.pos[0] <= paddleX.max &&
//           paddleY.min <= this.ball.pos[1] + this.ball.size / 2 &&
//           this.ball.pos[1] - this.ball.size / 2 <= paddleY.max) {
//           this.ball.xDirection = (this.ball.xDirection === 'left' ? 'right' : 'left')
//           this.ball.addEnergyX(this.multiplier * paddle.physics.energy + this.reflectEnergy)
    
//           for (const paddle of this.paddles) {
//             paddle.controlsBall = false
//           }
    
//           paddle.controlsBall = true
//         }
//       }
//     }
  
//     goalCheck () {
//       if (this.ball.pos[0] < 0 || this.ball.pos[0] > this.fieldSize[0]) {
//         for (const paddle of this.paddles) {
//           if (paddle.goal === this.ball.xDirection) paddle.points ++
    
//           if (paddle.points >= this.goal) {
//             this.ended = true
//             this.winner.push(paddle.name)
//           }
   
//           paddle.controlsBall = false
//         }
//         this.ball.reset()
//       }
//     }
  
//     calcPos () {
//       for (const paddle of this.paddles) {
//         paddle.calcPos()
//       }
//       this.ball.calcPos()
//     }
  
//     update (controller = []) {
//       if (!this.paused && !this.ended) {
//         this.sendControls(controller)
//         this.calcPos()
//         this.bounce()
//         this.goalCheck()
//       }
//     }
//   }class Ball {
//     constructor (options = {}) {
//       this.startPos = options.pos || [360, 180]
//       this.pos = options.pos || [360, 180]
//       this.energyX = options.energyX || 200
//       this.energyY = options.energyY || 0
//       this.size = options.size || 10
//       this.fieldWidth = options.fieldWidth || 360
//       this.xDirection = options.xDirection || 'left'
//       this.maxPower = options.maxPower || 28
  
//       this.physicsX = new Physics({
//         energy: this.energyX,
//         mass: options.mass || 20,
//         airDensity: options.airDensity || 0,
//         area: options.area || Math.pow(Math.PI, 2) * this.size / 200
//       })
  
//       this.physicsY = new Physics({
//         energy: this.energyY,
//         mass: options.mass || 20,
//         airDensity: options.airDensity || 0,
//         area: options.area || Math.pow(Math.PI, 2) * this.size / 200,
//         dragCo: 0
//       })
//     }
  
//     moveY (direction) {
//       this.physicsY.power = this.maxPower
//       this.physicsY.powerDirection = (direction === 'up') ? 'down' : (direction === 'down') ? 'up' : '';
//     }
  
//     calcPosX () {
//       this.physicsX.calcEnergy()
//       const energy = this.physicsX.energyToVelocity(this.physicsX.energy, this.physicsX.mass)
  
//       if (this.xDirection === 'left') {
//         this.pos[0] -= energy;
//       } else if (this.xDirection === 'right'){
//         this.pos[0] += energy
//       }
//     }
  
//     calcPosY () {
//       this.physicsY.calcEnergy()
//       const energy = this.physicsY.energyToVelocity(this.physicsY.energy, this.physicsY.mass)
  
//       if (this.pos[1] + this.size < 0) {
//         this.pos[1] = this.fieldWidth
//       } else if (this.pos[1] > this.fieldWidth) {
//         this.pos[1] = 0 - this.size
//       }
  
//       if (this.physicsY.objectDirection === 'down') {
//          this.pos[1] += energy
//       } else if (this.physicsY.objectDirection == 'up') {
//         this.pos[1] -= energy
//       }
//     }
  
//     reset () {
//       this.xDirection = (this.xDirection === 'left') ? 'left' : 'right'
//       this.pos[0] = this.startPos[0]
//       this.pos[1] = this.startPos[1]
//       this.physicsX.energy = this.energyX
//       this.physicsY.energy = this.energyY
//     }
  
//     addEnergyX (amount) {
//       this.physicsX.energy += amount
//     }
  
//     calcPos () {
//       this.calcPosX()
//       this.calcPosY()
//     }
//   }class Paddle {
//     constructor (options = {}) {
//       this.startPos = options.startPos || [10, 170]
//       this.pos = this.startPos
//       this.fieldWidth = options.fieldWidth || 360
//       this.size = options.size || [10, 70]
  
//       // player stuff
//       this.name = (typeof options.name !== 'undefined') ? options.name : Math.random()
//       this.controls = options.controls || [{key: 87, action: 'up'}, {key: 83, action: 'down'}]
//       this.points = options.points || 0
//       this.controlsBall = options.controlsBall || false
//       this.goal = options.goal || 'right'
  
//       // physics stuff here
//       this.maxPower = options.maxPower || 60
//       this.density = (typeof options.density !== 'undefined') ? options.density : 400
//       this.height = (typeof options.height !== 'undefined') ? options.height : 0.1
//       const area = (this.size[0] / 100) * this.height
//       this.physics = new Physics({
//         mass: this.density * area * (this.size[1] / 100),
//         drag: options.drag || 5,
//         area: area,
//         dragCo: 5,
//         friction: true,
//         frictionCo: 0.3
//       })
//     }
  
//     move (direction) {
//       this.physics.power = this.maxPower
//       this.physics.powerDirection = direction
//     }
  
//     calcPos () {
//       this.physics.calcEnergy()
//       if (this.physics.objectDirection === 'up') {
//         this.pos[1] -= this.physics.energyToVelocity(this.physics.energy, this.physics.mass)
//       } else if (this.physics.objectDirection === 'down') {
//         this.pos[1] += this.physics.energyToVelocity(this.physics.energy, this.physics.mass)
//       }
  
//       if (this.pos[1] + this.size[1] < 0) {
//         this.pos[1] = this.fieldWidth
//       } else if (this.pos[1] > this.fieldWidth) {
//         this.pos[1] = 0 - this.size[1]
//       }
//     }
//   }class Physics {
//     constructor (options = {}) {
//       this.energy = (typeof options.energy !== 'undefined') ? options.energy : 0
//       this.mass = (typeof options.mass !== 'undefined') ? options.mass : 10
//       this.airDensity = (typeof options.airDensity !== 'undefined') ? options.airDensity : 1.293
//       this.area = options.area || 5
//       this.dragCo = options.dragCo || 1
//       this.t = 1 / 120
//       this.friction = (typeof options.friction !== 'undefined') ? options.friction : false
//       this.frictionCo = options.frictionCo || 0.0001
//       this.power = 0
  
//       this.powerDirection = ''
//       this.objectDirection = ''
//     }
  
//     calcEnergy () {
//       if (this.power > 0) {
//         if (this.objectDirection === '') this.objectDirection === this.powerDirection 
   
//         if (this.powerDirection === this.objectDirection) {
//           this.energy += this.power * this.t
//         } else if(this.powerDirection !== '') {
//           this.energy -= this.power * this.t
//         }
//       }
   
//       if (this.energy < 0) {
//         this.energy = Math.abs(this.energy)
//         this.objectDirection = (this.objectDirection === 'up' ? 'down' : 'up')
//       }
  
//       this.power = 0
//       let resistance = 0.5 * this.airDensity * this.energyToVelocity(this.energy, this.mass) * this.dragCo
//       if (this.friction) resistance += this.mass * 9.81 * this.frictionCo
//       this.energy -= resistance * this.t
//       this.energy = ~~(this.energy * 1000) / 1000
//     }
  
//     energyToVelocity (energy, mass) {
//       return Math.sqrt(2 * (Math.abs(energy) / mass))
//     }
//   }function simpleBot () {
//   let direction = ''

//   return (g, p) => {
//     if (g.paddles[p].controlsBall) {
//       if (direction !== '' && g.ball.pos[1] > 10) {
//         if (g.ball.pos[1] < g.fieldSize[1] - 10) return direction
//         if (direction === 'up') return 'down'
//         return 'up'
//       }
//       if (Math.random() > 0.5) {
//         direction = 'down'
//         return direction
//       }
//       direction = 'up'
//       return direction
//     }
//     direction = ''
//     const a = g.ball.pos[1]
//     const b = g.paddles[p].pos[1] + g.paddles[p].size[1] / 2
//     const d = a - b
//     if (d < 0) {
//       if (tpDistance(a, b, g.fieldSize[1]) < -1 * d && g.paddles[1].controlsBall) {
//         return 'down'
//       }
//       return 'up'
//     }
//     if (tpDistance(b, a, g.fieldSize[1]) < d && g.paddles[1].controlsBall) {
//       return 'up'
//     }
//     return 'down'
//   }
// }(gameWorker (ev) {

//         function getController () {
//             const actionList = []
//             for (let i = 0; i < self.controller.length; i++) {
//                 if(!self.controller[i]) continue

//                 action = i % 2 ? 'up' : 'down'
//                 actionList.push({
//                     paddle: self.game.paddle[parseInt(i / 2)],
//                     action
//                 })
//             }

//             for (let i = 0; i < self.bots.length; i++) {
//                 if(!self.bots[i]) continue
//                 actionList.push({
//                     paddle: self.game.paddles[i],
//                     action: self.bots[i](self.game, i)
//                 })
//             }
//             return actionList
//         }

//         function updateGame() {
//             // console.log(self)
//             self.game.update(getController())
//             console.log(self.game.ball.pos[0], self.game.ball.pos[1])

//             self.positions[0] = self.game.ball.pos[0]
//             self.positions[1] = self.game.ball.pos[1]
//             for (let i = 0; i < self.game.paddles.length; i++) {
//                 // console.log(12)
//                 self.positions[2 + i * 2] = self.game.paddles[i].pos[0]
//                 self.positions[2 + i * 2 + 1] = self.game.paddles[i].pos[1]
//             }
//         }

//         self.onmessage = e => {
//             console.log("init")
//             console.log(e)
//             if (e.data.type == "init") {
//                 const options = e.data.options
//                 self.game = eval("new Game(options)")
//                 self.bots = options.paddles.map(options => options.bot ? eval("bot()") : false)
//                 self.positions = e.data.positions

//                 self.controller = new Uint8Array(e.data.sharedController)
//                 self.interval = setInterval(updateGame, 1 / 120)
//             } else if (e.data.type == "pause") {
//                 clearInterval(self.interval)
//             } else if (e.data.type == "unpause") {
//                 setInterval(updateGame, 1 / 120)
//             }
//         }
//     })()