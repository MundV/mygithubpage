'use strict'
const KCAL1 = [[87, 'up'], [83, 'down']]
const KCAL2 = [[38, 'up'], [40, 'down']]

var controllsBall = 0

var flip1,
    flip2,
    b
var latetsDirection = 'down'

function setup() {
  flip1 = new flipper()
  flip2 = new flipper([700, 180])
  b = new ball()

  createCanvas(720, 360)
  background(10)
}

function draw() {
  background(51)
  //flip1.move('down')
  for(const KA of KCAL1) {
    if(keyIsDown(KA[0])) {
      flip1.move(KA[1])
      if(controllsBall == 1) {
        b.moveY(KA[1])
      }
    }
  }
  for(const KA of KCAL2) {
    if(keyIsDown(KA[0])) {
      flip2.move(KA[1])
      if(controllsBall == 2) {
        b.moveY(KA[1])
      }
    }
  }

  if(Math.round(b.pos[0]) >= Math.round(flip1.START_POS[0]) && Math.round(b.pos[0]) <= Math.round(flip1.START_POS[0]) + 10) {
    if(Math.round(b.pos[1]) >= Math.round(flip1.pos[1]) && Math.round(b.pos[1]) <= Math.round(flip1.pos[1]) + Math.round(flip1.size[1])) {
      b.xDirection = 'right'
      controllsBall = 1
    }
  }
  if(Math.round(b.pos[0]) >= Math.round(flip2.START_POS[0]) && Math.round(b.pos[0]) <= Math.round(flip2.START_POS[0]) + 10) {
    if(Math.round(b.pos[1]) >= Math.round(flip2.pos[1]) && Math.round(b.pos[1]) <= Math.round(flip2.pos[1]) + Math.round(flip2.size[1])) {
      b.xDirection = 'left'
      controllsBall = 2
    }
  }
  if(b.pos[0] < 0 || b.pos[0] > 720) {
    if(controllsBall == 1) {
      b = new ball('right')
      var latetsDirection = 'right'
    } else if(controllsBall == 2){
      b = new ball('left')
      var latetsDirection = 'left'
    } else {
      b = new ball(latetsDirection)
    }
    controllsBall = 0
  }
  flip1.show()
  flip2.show()
  b.show()
}
