class ball {
  constructor (options = {}) {
    this.pos        = options.startPos   || [360 , 180]
    this.size       = options.size       || 10
    this.fieldWidth = options.fieldWidth || 360
    this.xDirection = options.xDirection || 'left'
    this.MAX_POWER  = options.MAX_POWER  || 28
    this.energyX    = options.energyX    || 0
    this.energyY    = options.energyY    || 0

    this.physicsX = new physics({
      energy: this.energyX,
      mass: options.mass || 20,
      airDensity: options.airDensity || 0,
      area: options.area || Math.pow(Math.PI, 2) * this.size / 200,
      dragCo: 0.47
    })

    this.physicsY = new physics({
      energy: this.energyY,
      mass: options.mass || 20,
      airDensity: options.airDensity || 1.293,
      area: options.area || Math.pow(Math.PI, 2) * this.size / 200,
      dragCo: 0.47
    })
  }
  moveY(direction){
    this.physicsY.power = this.MAX_POWER
    if(direction == 'up') {
      direction = 'down'
    } else {
      direction = 'up'
    }
    this.physicsY.powerDirection = direction
  }
  calcPosX() {
    this.physicsX.calcEnergy()
    if(this.xDirection == 'left') {
      this.pos[0] -= this.physicsX.energyToVelocity(this.physicsX.energy, this.physicsX.mass)
    } else {
      this.pos[0] += this.physicsX.energyToVelocity(this.physicsX.energy, this.physicsX.mass)
    }
  }
  calcPosY() {
    this.physicsY.calcEnergy()
    if(this.pos[1] + this.size < 0) {
      this.pos[1] = this.fieldWidth
    } else if(this.pos[1] > this.fieldWidth) {
      this.pos[1] = 0 - this.size
    }
    if(this.physicsY.objectDirection == 'up') {
      this.pos[1] -= this.physicsY.energyToVelocity(this.physicsY.energy, this.physicsY.mass)
    } else if(this.physicsY.objectDirection == 'down') {
      this.pos[1] += this.physicsY.energyToVelocity(this.physicsY.energy, this.physicsY.mass)
    }
  }
  show() {
    //physicsX
    this.physicsX.power = 80
    this.calcPosX()

    //physicsY
    this.calcPosY()
    ellipse(this.pos[0], this.pos[1], this.size, this.size)
  }
}
