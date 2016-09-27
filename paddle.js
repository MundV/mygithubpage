class paddle {
  constructor(options = {}) {
    this.START_POS = options.START_POS || [10 , 170]
    this.pos = this.START_POS
    this.fieldWidth = options.fieldWidth || 360
    this.size = options.size || [10, 70]

    //physics stuff here
    this.MAX_POWER = options.MAX_POWER || 60
    this.density = (typeof options.density !== 'undefined') ? options.density : 400
    this.height = (typeof options.height !== 'undefined') ? options.height : 0.1
    const area = (this.size[0] / 100) * this.height
    this.physics = new physics({
      mass: this.density * area * (this.size[1] / 100),
      drag: options.drag || 5,
      area: area,
      dragCo: 5,
      friction: true,
      frictionCo: 0.3
    })
  }
  move(direction) {
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
