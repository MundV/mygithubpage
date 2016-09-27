'use strict'
var curr

function setup() {
  curr = new game()
}

function draw() {
  curr.controlPaddle()
  curr.bounce()
  curr.goalCheck()
  curr.render()
}
