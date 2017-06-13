'use strict'
let curr

function setup() {
  curr = new game()
}

function draw() {
  if(!curr.paused) {
    curr.controlPaddle()
    curr.bounce()
    curr.goalCheck()
    curr.render()
  }
}
