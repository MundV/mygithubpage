'use strict'
const KCAL1 = [[87, 'up'], [83, 'down']]
const KCAL2 = [[38, 'up'], [40, 'down']]

var controllsBall = 0

var pad1,
    pad2,
    b
var lastDirection = 'left'

function setup() {
  pad1 = new paddle()
  pad2 = new paddle([700, 180])
  b = new ball()

  createCanvas(720, 360)
  background(10)
}

function draw() {
  background(51)
  //pad1.move('down')
  for(const KA of KCAL1) {
    if(keyIsDown(KA[0])) {
      pad1.move(KA[1])
      if(controllsBall == 1) {
        b.moveY(KA[1])
      }
    }
  }
  for(const KA of KCAL2) {
    if(keyIsDown(KA[0])) {
      pad2.move(KA[1])
      if(controllsBall == 2) {
        b.moveY(KA[1])
      }
    }
  }

  if(Math.round(b.pos[0]) >= Math.round(pad1.START_POS[0]) && Math.round(b.pos[0]) <= Math.round(pad1.START_POS[0]) + 10) {
    if(Math.round(b.pos[1]) >= Math.round(pad1.pos[1]) && Math.round(b.pos[1]) <= Math.round(pad1.pos[1]) + Math.round(pad1.size[1])) {
      b.xDirection = 'right'
      controllsBall = 1
    }
  }
  if(Math.round(b.pos[0]) >= Math.round(pad2.START_POS[0]) && Math.round(b.pos[0]) <= Math.round(pad2.START_POS[0]) + 10) {
    if(Math.round(b.pos[1]) >= Math.round(pad2.pos[1]) && Math.round(b.pos[1]) <= Math.round(pad2.pos[1]) + Math.round(pad2.size[1])) {
      b.xDirection = 'left'
      controllsBall = 2
    }
  }
  if(b.pos[0] < 0 || b.pos[0] > 720) {
    if(controllsBall == 1) {
      b = new ball({
        xDirection: 'right'
      })
      lastDirection = 'right'
    } else if(controllsBall == 2){
      b = new ball({
        xDirection: 'left'
      })
      lastDirection = 'left'
    } else {
      b = new ball(lastDirection)
    }
    controllsBall = 0
  }
  pad1.show()
  pad2.show()
  b.show()
}
