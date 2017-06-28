//from game.js setting default
// this.bgColor = (typeof options.bgColor !== 'undefined') ? options.bgColor: 51

//from ball.js
// stroke('red');
// ellipse(this.pos[0], this.pos[1], this.size, this.size)
//}


//clearing up the canvas from game.js
//   fill(255)
//   strokeWeight(0.5)
//   background(this.bgColor)
//   textFont('Sarpanch');
//   textSize(10);



//from game.js does the input handeling and canvas creation
// _getTouchControls() {
//   return [
//       {x: 0, xMax: screen.width / 2, y: 0, yMax: screen.height / 2, landscape:{player: 0, action: 'up'}, portrait: {player: 0, action: 'down'}},
//       {x: 0, xMax: screen.width / 2, y: screen.height / 2, yMax: screen.height, landscape: {player: 0, action: 'down'}, portrait: {player: 1, action:'down' }},
//       {x: screen.width / 2, xMax: screen.width, y: 0, yMax: screen.height / 2, landscape: {player: 1, action: 'up'}, portrait: {player: 0, action:'up' }},
//       {x: screen.width / 2, xMax: screen.width, y: screen.height / 2, yMax: screen.height, landscape: {player: 1, action:'down'}, portrait: {player: 1, action: 'up'}}
//     ]
// }
// _orientation() {
//   if(window.matchMedia("(orientation: landscape)").matches) {
//     return 'landscape'
//   } else {
//     return 'portrait'
//   }
// }
// _createCanvas() {
//   const canvas = createCanvas(this.fieldSize[0], this.fieldSize[1])
//   document.getElementById('canvas').appendChild(document.getElementsByTagName('canvas')[0])
//   this._fullscreen()
//   background(this.bgColor)
//   canvas.mouseClicked(() => {
//     this._fullscreen()
//   })
// }
// _fullscreen() {
//   if(!fullscreen()) {
//     fullscreen(true)
//   }
// }
// sendControls() {
//   // inside the controller there will be a paddle and an action
//   const controller = []
//   this.paddles.map((paddle) => {
//     for(const control of paddle.controls) {
//       if (keyIsDown(control.key)) {
//         controller.push({paddle, action: control.action})
//       }
//     }
//     return paddle
//   })
//   for(const touch of touches) {
//     const touchControls = this._getTouchControls()
//     for(const control of touchControls) {
//       if(control.x <= touch.x && control.xMax >= touch.x && control.y <= touch.y && control.yMax >= touch.y) {
//         const orientation = this._orientation()
//         const paddle = this.paddles[control[orientation].player]
//         const action = control[orientation].action
//         controller.push({paddle, action})
//       }
//     }
//   }
//   controller.forEach((control) => {
//     this._controlPaddle(control.paddle, control.action)
//     this._controlBall(control.paddle, control.action)
//   })
// }

// from paddle.js
// show() {
//   fill(255)
//   rect(this.pos[0], this.pos[1], this.size[0], this.size[1])
//   fill(255)
//   text(this.points, this.pos[0] + this.size[0] / 5, this.pos[1] + this.size[1] / 0.8)
// }
