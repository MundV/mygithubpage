/* globals screen */
import * as PIXI from 'pixi.js'
import Game from 'gp_engine'
import fullscreen from 'fullscreen'
import bot from './bots/index.js'
import idbKeyval from 'idb-keyval'

export default class Render {
  constructor (options = {}, stop = () => {}, pause = () => {}) {
    this.game = new Game(options)
    this.options = options
    this.stop = stop
    this.pause = pause
    this.reRender = false
    this.testData = []
    this.bot = []
    for (let i = 0; i < options.paddles.length; i++) {
      if (options.paddles[i].bot) {
        this.bot[i] = bot(options.paddles[i].botType)
      }
    }

    this.multiplier = this.findSaveMultiplier(...this.game.fieldSize, screen.availWidth, screen.availHeight)
    this.renderer = new PIXI.autoDetectRenderer({
      width: screen.availWidth,
      height: screen.availHeight,
      backgroundColor: 0x333333
    })

    this.touches = {}
    this.keys = []
    this.actions = ['up', 'down']

    this.touchAreas = new PIXI.Container()
    this.touchAreas.interactive = true
    this.addTouchAreas()

    this.target = document.getElementById('canvas')
    while (this.target.firstChild) {
      this.target.removeChild(this.target.firstChild)
    }
    this.fs = fullscreen(this.target)

    this.resize = this.resize.bind(this)
    this.activateKey = this.activateKey.bind(this)
    this.deactivateKey = this.deactivateKey.bind(this)
    this.addEventListeners()
  }
  addEventListeners () {
    window.addEventListener('resize', this.resize)
    window.addEventListener('keyup', this.deactivateKey)
    window.addEventListener('keydown', this.activateKey)
  }
  removeEventListeners () {
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('keyup', this.deactivateKey)
    window.removeEventListener('keydown', this.activateKey)
  }
  resize () {
    this.multiplier = this.findSaveMultiplier(...this.game.fieldSize, screen.availWidth, screen.availHeight)
    this.addTouchAreas()
    this.firstRender()
    this.renderer.resize(screen.availWidth, screen.availHeight)
  }
  activateKey (e) {
    this.keys[e.keyCode] = true
  }
  deactivateKey (e) {
    this.keys[e.keyCode] = false
  }
  addTouchAreas () {
    const conversion = {
      '00': '00',
      '01': '10',
      '10': '01',
      '11': '11'
    }
    this.touchAreas.removeChildren()
    for (let i = 0; i < this.game.paddles.length; i++) {
      for (let j = 0; j < this.actions.length; j++) {
        const state = '' + i + j
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
    if (screen.availWidth > screen.availHeight) return [x * mp.x, y * mp.y]
    return [y * mp.y, x * mp.x]
  }
  createController () {
    const controller = []
    // controller for keyboard
    for (const paddle of this.game.paddles) {
      if (!paddle.bot) {
        for (const control of paddle.controls) {
          if (this.keys[control.key.toString()]) {
            controller.push({paddle, action: control.action})
          }
        }
      }
    }
    // controller for touch
    for (let i = 0; i < this.game.paddles.length; i++) {
      if (this.options.paddles[i].bot) {
        controller.push({paddle: this.game.paddles[i], action: this.bot[i](this.game, i)})
      } else {
        for (let j = 0; j < this.actions.length; j++) {
          const state = '' + i + j
          if (this.touches[state]) {
            controller.push({paddle: this.game.paddles[i], action: this.actions[j]})
          }
        }
      }
    }
    this.controller = controller
  }
  firstRender () {
    if (this.reRender) {
      this.paddles.destroy()
      this.ball.destroy()
      this.textContainer.destroy()
      this.stage.destroy()
    }
    this.reRender = true

    this.paddles = new PIXI.Container()
    this.ball = new PIXI.Graphics()
    this.textContainer = new PIXI.Container()
    this.stage = new PIXI.Container()
    this.renderer.render(this.stage)

    for (let i = 0; i < this.game.paddles.length; i++) {
      const paddle = this.game.paddles[i]

      // draw the text
      const scoreText = new PIXI.Text('', {
        fontFamily: 'sarpanch',
        fontSize: this.multiplier.x * 10,
        fill: 0xffffff,
        stroke: 0xff0000
      })
      const textPos = this.mp(paddle.pos[0], paddle.pos[1] + 100)
      scoreText.x = textPos[0]
      scoreText.y = textPos[1]
      this.textContainer.addChild(scoreText)

      // draw the paddles
      const paddleRender = new PIXI.Graphics()
      paddleRender.lineStyle(this.multiplier.x, 0xff0000)
      paddleRender.beginFill(0xffffff)
      paddleRender.drawRect(0, 0, ...this.mp(...paddle.size))
      const correctedPaddlePos = this.mp(...paddle.pos)
      paddleRender.x = correctedPaddlePos[0]
      paddleRender.y = correctedPaddlePos[1]
      paddleRender.endFill()
      this.paddles.addChild(paddleRender)
    }

    // draw the ball
    const correctedBallPos = this.mp(...this.game.ball.pos)
    this.ball.lineStyle(this.multiplier.x, 0xff0000)
    this.ball.beginFill(0xffffff)
    this.ball.drawCircle(0, 0, (this.game.ball.size / 2) * this.multiplier.x)
    this.ball.x = correctedBallPos[0]
    this.ball.y = correctedBallPos[1]
    this.ball.endFill()

    this.stage.addChild(this.ball)
    this.stage.addChild(this.paddles)
    this.stage.addChild(this.textContainer)
    this.stage.addChild(this.touchAreas)
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
    this.firstRender()
    const gameLoop = () => {
      if (!this.game.ended) {
        this.createController()

        this.game.update(this.controller)

        for (let i = 0; i < this.game.paddles.length; i++) {
          const paddle = this.game.paddles[i]
          const scoreText = this.textContainer.getChildAt(i)
          const textPos = this.mp(paddle.pos[0], paddle.pos[1] + 100)
          scoreText.text = paddle.points || ''
          scoreText.x = textPos[0]
          scoreText.y = textPos[1]

          const paddleRender = this.paddles.getChildAt(i)
          const correctedPaddlePos = this.mp(...paddle.pos)
          paddleRender.x = correctedPaddlePos[0]
          paddleRender.y = correctedPaddlePos[1]
        }
        const correctedBallPos = this.mp(...this.game.ball.pos)
        this.ball.x = correctedBallPos[0]
        this.ball.y = correctedBallPos[1]

        // Loop this function at 60 frames per second
        window.requestAnimationFrame(gameLoop)

        // Render the stage to see the animation
        this.renderer.render(this.stage)
      } else {
        // idbKeyval.set(
        //   new Date().getTime(),
        //   this.testData
        // )
        this.removeEventListeners()
        this.fs.release()
        this.fs.dispose()
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
