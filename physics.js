class physics {
  constructor(energy = 0, mass = 10, airDensity = 1.293, area = 5, dragCo = 1, framerate = 60, friction = false, frictionCo = 1) {
    this.energy = energy
    this.mass = mass
    this.airDensity = airDensity
    this.area = area
    this.dragCo = dragCo
    this.t = 1 / framerate

    this.friciton = friction
    this.frictionCo = frictionCo
    this.power = 0

    this.powerDirection = ''
    this.objectDirection = ''
  }
  calcEnergy() {
    if(this.power > 0) {
      if(this.objectDirection == '') {
        this.objectDirection == this.powerDirection
      }
      if(this.powerDirection == this.objectDirection) {
        this.energy += this.power * this.t
      } else {
        this.energy -= this.power * this.t
      }
    }
    if(this.energy < 0) {
      this.energy = Math.abs(this.energy)
      if(this.objectDirection == 'up') {
        this.objectDirection = 'down'
      } else {
        this.objectDirection = 'up'
      }
    }

    this.power = 0;
    let resistance = 0.5 * this.airDensity * this.energyToVelocity(this.energy, this.mass) * this.dragCo
    if (this.friction)
      resistance += this.mass * 9.81 * this.frictionCo

    this.energy -= resistance * this.t
  }
  energyToVelocity(energy, mass) {
    return Math.sqrt(2 * (Math.abs(energy) / mass) )
  }
}
