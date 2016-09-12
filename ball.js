class ball {
  constructor(xDirection = 'left', energy = 0, startPos = [360 , 180], size = 10, fieldWidth = 360, MAX_POWER = 28) {
    this.pos = startPos
    this.size = size
    this.fieldWidth = fieldWidth
    this.xDirection = xDirection
    this.MAX_POWER = MAX_POWER
    this.physicsX = new physics(
      energy,
      20,
      0,
      Math.PI * size / 200,
      0.47
    )
    this.physicsY = new physics(
      energy,
      20,
      1.293,
      Math.PI * size / 200,
      0.47
    )
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
