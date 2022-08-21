export default class Ball {
    constructor (options = {}) {
      this.startPos = options.pos || [360, 180]
      this.pos = options.pos || [360, 180]
      this.energyX = options.energyX || 60000
      this.energyY = options.energyY || 0
      this.size = options.size || 10
      this.fieldWidth = options.fieldWidth || 360
      this.xDirection = options.xDirection || 'left'
      this.maxPower = options.maxPower || 28000
  
      this.physicsX = new Physics({
        energy: this.energyX,
        mass: options.mass || 2,
        airDensity: options.airDensity || 0,
        area: options.area || Math.pow(Math.PI, 2) * this.size / 200
      })
  
      this.physicsY = new Physics({
        energy: this.energyY,
        mass: options.mass || 20,
        airDensity: options.airDensity || 0,
        area: options.area || Math.pow(Math.PI, 2) * this.size / 200,
        dragCo: 0
      })
    }
  
    moveY (direction) {
      this.physicsY.power = this.maxPower
      this.physicsY.powerDirection = (direction === 'up') ? 'down' : (direction === 'down') ? 'up' : '';
    }
  
    calcPosX (diff_t) {
      this.physicsX.calcEnergy(diff_t)
      const energy = this.physicsX.energyToVelocity(this.physicsX.energy, this.physicsX.mass)
  
      if (this.xDirection === 'left') {
        this.pos[0] -= energy * diff_t
      } else if (this.xDirection === 'right'){
        this.pos[0] += energy * diff_t;
      }
    }
  
    calcPosY (diff_t) {
      this.physicsY.calcEnergy(diff_t)
      const energy = this.physicsY.energyToVelocity(this.physicsY.energy, this.physicsY.mass)
  
      if (this.pos[1] + this.size < 0) {
        this.pos[1] = this.fieldWidth
      } else if (this.pos[1] > this.fieldWidth) {
        this.pos[1] = 0 - this.size
      }
  
      if (this.physicsY.objectDirection === 'down') {
         this.pos[1] += energy * diff_t
      } else if (this.physicsY.objectDirection == 'up') {
        this.pos[1] -= energy * diff_t
      }
    }
  
    reset () {
      this.xDirection = (this.xDirection === 'left') ? 'left' : 'right'
      this.pos[0] = this.startPos[0]
      this.pos[1] = this.startPos[1]
      this.physicsX.energy = this.energyX
      this.physicsY.energy = this.energyY
    }
  
    addEnergyX (amount) {
      this.physicsX.energy += amount
    }
  
    calcPos (diff_t) {
      this.calcPosX(diff_t)
      this.calcPosY(diff_t)
    }
  }