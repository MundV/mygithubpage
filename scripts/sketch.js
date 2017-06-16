'use strict'
let curr = {paused: true}

function setup() {
  select('#startGame').mouseClicked(() => {
    hideUI()
    curr = new game()
  })
}

function draw() {
  if(curr.ended) {
    fullscreen(false)
    showUI()
    theWinnerIs(curr.winner)
    curr = {paused: true}
  }
  if(!curr.paused) {
    curr.update()
  }
}
function showUI() {
  select('#startScreen').style('display', 'flex')
  select('canvas').style('display', 'none')
}
function theWinnerIs(winner) {
  select('h1').html(`The winner is ${winner}`)
}
function hideUI() {
  select('#startScreen').style('display', 'none')
  select('canvas').style('display', 'block')
}
