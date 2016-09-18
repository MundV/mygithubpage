class physics {
  constructor(options = {}) {
    this.energy = options.energy || 0
    this.mass = options.mass || 10
    this.airDensity = options.airDensity || 1.293
    this.area = options.area || 5
    this.dragCo = options.dragCo || 1
    this.t = 1 / (options.framerate || 60)

    this.friciton = options.friction || false
    this.frictionCo = options.frictionCo || 1
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
    console.log(this.energy);
  }
  energyToVelocity(energy, mass) {
    return Math.sqrt(2 * (Math.abs(energy) / mass) )
  }
}
