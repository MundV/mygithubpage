class flipper {
  constructor(START_POS = [10 , 180], size = [10, 55], fieldWidth = 360, MAX_POWER = 40, drag = 5, density = 400, height = 0.1) {
    this.START_POS = START_POS
    this.size = size
    this.pos = START_POS
    this.fieldWidth = fieldWidth

    //physics stuff here
    this.MAX_POWER = MAX_POWER
    const area = (size[0] / 100) * height
    this.physics = new physics(
      0, //starting amount of energy
      density * area * (size[1] / 100),
      drag,
      area,
      1.15, 60, true
    )
  }
  move(direction) {
/*    if (direction == 'up') {
      this.pos[1] -= 3
    } else {
      this.pos[1] += 3
    }*/
    this.physics.power = this.MAX_POWER
    this.physics.powerDirection = direction
  }
  calcPos() {
    this.physics.calcEnergy()
    if(this.physics.objectDirection == 'up') {
          this.pos[1] -= this.physics.energyToVelocity(this.physics.energy, this.physics.mass)
        } else if(this.physics.objectDirection == 'down') {
          this.pos[1] += this.physics.energyToVelocity(this.physics.energy, this.physics.mass)
    }

    if(this.pos[1] + this.size[1] < 0) {
      this.pos[1] = this.fieldWidth
    } else if(this.pos[1] > this.fieldWidth) {
      this.pos[1] = 0 - this.size[1]
    }
  }
  show() {
    this.calcPos()
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1])
  }
}
