'use strict'
let curr = {paused: true}
let options = {}

function setup() {
  $('.startGame').on('click', () => {
    hideUI()
    curr = new game()
  })
  $('.keyInput').on('keyup', (e) => {
    $(e.target).val(e.key)
    //$(`.keyValue[name='${e.target.name}']`).val(e.which)
  })
  readTable($('#generalPlayer'))
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
function readTable(table) {
  const dataNames = {}
  const names = table.find('th')
  names.each((i, el) => {
    const data = $(el).data()
    if(data.varname == null) {
      data.varname = data.name
    }
    if(data.store == null) {
      data.store = 'normal'
    }
    dataNames[data.name] = {
      varName: data.varName,
      store: data.store
    }
  })
  console.log(dataNames);
}


function showUI() {
  $('.screen').show()
  $('canvas').hide()
}
function theWinnerIs(winner) {
  $('#startScreen h1').text(`The winner is ${winner}`)
}
function hideUI() {
  $('.screen').hide()
  $('canvas').show()
}
