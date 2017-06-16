'use strict'
let curr

function setup() {
  curr = new game()
}

function draw() {
  if(!curr.paused) {
    curr.update()
  }
}
