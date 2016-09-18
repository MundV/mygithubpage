class paddle {
  constructor(START_POS = [10 , 180], options = {}) {
    this.START_POS = START_POS
    this.pos = START_POS
    this.fieldWidth = options.fieldWidth || 360
    this.size = options.size || [10, 55]

    //physics stuff here
    this.MAX_POWER = options.MAX_POWER || 40
    this.density = options.density || 400
    this.height = options.height || 0.1
    const area = (this.size[0] / 100) * this.height
    this.physics = new physics({
      energy: 0, //starting amount of energy
      mass: this.density * area * (this.size[1] / 100),
      drag: options.drag || 5,
      area: area,
      dragCo: 1.15,
      friciton: true
    })
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
