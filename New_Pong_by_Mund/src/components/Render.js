/* globals screen*/
import * as PIXI from 'pixi.js'
import Game from 'gp_engine'
import fullscreen from 'fullscreen'

export default class Render {
  constructor (options = {}, stop = () => {}, pause = () => {}) {
    this.game = new Game(options)
    this.stop = stop
    this.pause = pause

    this.firstRender = true
    this.multiplier = this.findSaveMultiplier(...this.game.fieldSize, screen.availWidth, screen.availHeight)
    this.renderer = new PIXI.autoDetectRenderer({
      width: screen.availWidth,
      height: screen.availHeight,
      backgroundColor: 0x333333
    })

    this.touches = []
    this.keys = []
    this.actions = ['up', 'down']

    this.graphics = new PIXI.Graphics()
    this.textContainer = new PIXI.Container()
    this.stage = new PIXI.Container()
    this.touchAreas = new PIXI.Container()
    this.touchAreas.interactive = true
    this.addTouchAreas()

    this.target = document.getElementById('canvas')
    while (this.target.firstChild) {
      this.target.removeChild(this.target.firstChild)
    }
    this.fs = fullscreen(this.target)

    window.addEventListener('resize', () => {
      this.multiplier = this.findSaveMultiplier(...this.game.fieldSize, screen.availWidth, screen.availHeight)
      this.addTouchAreas()
      this.renderer.resize(screen.availWidth, screen.availHeight)
    })
    window.onkeyup = (e) => { this.keys[e.keyCode] = false }
    window.onkeydown = (e) => { this.keys[e.keyCode] = true }
  }
  addTouchAreas () {
    const conversion = {
      0: 0,
      1: 10,
      10: 1,
      11: 11
    }
    this.touchAreas.removeChildren()
    for (let i = 0; i < this.game.paddles.length; i++) {
      for (let j = 0; j < this.actions.length; j++) {
        const state = parseInt('' + i + j)
        const area = new PIXI.Graphics()
        const standard = this.mp(this.game.fieldSize[0] / 2, this.game.fieldSize[1] / 2)
        area.hitArea = new PIXI.Rectangle(
          i * standard[0],
          j * standard[1],
          i * standard[0] + standard[0],
          j * standard[1] + standard[1])
        area.interactive = true
        this.touchAreas.addChild(area)
        area.on('touchstart', () => {
          if (screen.availWidth > screen.availHeight) {
            this.touches[state] = true
          } else {
            this.touches[conversion[state]] = true
          }
        })
        area.on('touchend', () => {
          if (screen.availWidth > screen.availHeight) {
            this.touches[state] = false
          } else {
            this.touches[conversion[state]] = false
          }
        })
        area.on('touchendoutside', () => {
          if (screen.availWidth > screen.availHeight) {
            this.touches[state] = false
          } else {
            this.touches[conversion[state]] = false
          }
        })
      }
    }
  }
  findSaveMultiplier (xS, yS, xT, yT) {
    if (screen.availWidth > screen.availHeight) {
      return {
        x: xT / xS,
        y: yT / yS
      }
    } else {
      return {
        x: yT / xS,
        y: xT / yS
      }
    }
  }
  mp (x, y = 0, mp = this.multiplier) {
    if (screen.availWidth > screen.availHeight) {
      return [x * mp.x, y * mp.y]
    } else {
      return [y * mp.y, x * mp.x]
    }
  }
  start () {
    if (fullscreen.available()) {
      this.fs.request()
    }
    this.fs.on('release', () => {
      this.game.paused = true
      this.pause()
    })
    this.target.appendChild(this.renderer.view)
    this.renderer.render(this.stage)
    const gameLoop = () => {
      if (!this.game.ended) {
        const controller = []
        for (const paddle of this.game.paddles) {
          for (const control of paddle.controls) {
            if (this.keys[control.key.toString()]) {
              controller.push({paddle, action: control.action})
            }
          }
        }
        for (let i = 0; i < this.game.paddles.length; i++) {
          for (let j = 0; j < this.actions.length; j++) {
            const state = parseInt('' + i + j)
            if (this.touches[state]) {
              controller.push({paddle: this.game.paddles[i], action: this.actions[j]})
            }
          }
        }
        this.game.update(controller)

        this.graphics.clear()

        for (let i = 0; i < this.game.paddles.length; i++) {
          const paddle = this.game.paddles[i]
          const textPos = this.mp(paddle.pos[0], paddle.pos[1] + 100)
          let scoreText

          if (this.firstRender) {
            scoreText = new PIXI.Text(paddle.points, {
              fontFamily: 'sarpanch',
              fontSize: this.multiplier.x * 10,
              fill: 0xffffff,
              stroke: 0xff0000
            })
            this.textContainer.addChild(scoreText)
          } else {
            scoreText = this.textContainer.getChildAt(i)
            scoreText.text = paddle.points
          }

          scoreText.x = textPos[0]
          scoreText.y = textPos[1]
        }
        this.firstRender = false

        for (const paddle of this.game.paddles) {
          this.graphics.lineStyle(this.multiplier.x, 0xff0000)
          this.graphics.beginFill(0xffffff)
          this.graphics.drawRect(...this.mp(...paddle.pos), ...this.mp(...paddle.size))
        }

        this.graphics.lineStyle(this.multiplier.x, 0xff0000)
        this.graphics.beginFill(0xffffff)
        this.graphics.drawCircle(
          ...this.mp(...this.game.ball.pos),
          (this.game.ball.size / 2) * this.multiplier.x
        )
        this.graphics.endFill()

        this.stage.addChild(this.graphics)
        this.stage.addChild(this.textContainer)
        this.stage.addChild(this.touchAreas)

        // Loop this function at 60 frames per second
        window.requestAnimationFrame(gameLoop)

        // Render the stage to see the animation
        this.renderer.render(this.stage)
      } else {
        fs.release()
        fs.dispose()
        this.stage.destroy()
        this.stop()
      }
    }
    gameLoop()
  }
  unpause () {
    this.fs.request()
    this.game.paused = false
  }
}
