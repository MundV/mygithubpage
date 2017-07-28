<template>
  <div id="app">
    <div id="startScreen" v-show="!gameIsRunning" class="screen">
      <h1>{{message}}</h1>
      <button @click="gameIsRunning = true" class="startGame button">Play 🕹️</button>
      <button v-scroll-to="'#settingScreen'" id="settingButton" class="button">Settings 🔎</button>
    </div>
    <div id="settingScreen" class="screen" v-show="!gameIsRunning">
      <h1>Settings 🔎</h1>
      <h2>Game Modes 🃏</h2>
      <form class="selecter" id="gameModes">
        <a>
          <input id="wall" type="radio" name="gamemode" value="wall" v-model="gameMode">
          <label class="button" for="wall">
            The Wall 🗻
          </label>
        </a>
        <a>
          <input type="radio" id="default" name="gamemode" value="default" v-model="gameMode" checked>
          <label class="button" for="default">
            Default 😃️
          </label>
        </a>
        <!-- <a>
          <input type="radio" id="speedy" name="gamemode" value="speedy">
          <label class="button" for="speedy">
            Speedy ⛷️
          </label>
        </a> -->
      </form>
      <h2>Advanced Settings 💻</h2>
      <div id="playerSettings" class="wrapper" v-if="paddles[0]">
        <table>
          <tr>
            <th v-for='(value, key) in paddles[0]'>
              {{key}}
            </th>
          </tr>
          <tr v-for="paddle in paddles">
            <td v-for='(value, key) in paddle'>
              <input class='button' type="text" v-model="paddle[key]">
            </td>
          </tr>
        </table>
        <button class="button" @click="addPlayer">Add player</button>
      </div>
    </div>
    <div class="paused" v-show="paused">
      <h1>The game is paused!</h1>
      <button type="button" class="button pauseButton" name="button" @click="paused = false">Unpause</button>
    </div>
    <div id="canvas" v-show="gameIsRunning"></div>
  </div>
</template>

<script>
// import Hello from './components/Hello'
import Render from './components/Render.js'

export default {
  name: 'app',
  data () {
    return {
      gameIsRunning: false,
      message: 'Glitchping by Mund',
      options: {
        paddles: [{
          loading: 'waiting...'
        }]
      },
      paddles: [],
      gameMode: 'default',
      render: '',
      paused: false
    }
  },
  watch: {
    gameIsRunning: function (val) {
      if (val) {
        this.render = new Render(this.getOptions(),
          () => {
            this.gameIsRunning = false
          },
          () => {
            this.paused = true
          }
        )
        this.render.start()
      } else {
        //fullscreen(false)
        const game = this.render.game
        if (game.winner.length > 1) {
          this.message = `${game.winner[0]} and others won!🎉`
        } else {
          this.message = `${game.winner[0]} won!🎉`
        }
      }
      return val
    },
    gameMode: function (mode) {
      this.getOptionsFromURL(`static/options/${mode}.json`)
    },
    options: function (options) {
      this.paddles = this.setPaddleOptions(options.paddles)
    },
    paused: function (pause) {
      if(!pause) {
        this.render.unpause()
      }
    }
  },
  methods: {
    addPlayer: function () {
      const paddle = {...this.paddles[0]}
      paddle.name = JSON.stringify(` Player ${this.paddles.length + 1}`)
      this.paddles.push(paddle)
    },
    getOptionsFromURL: function (url, fetch = window.fetch) {
      fetch(url).then((res) => {
        return res.json()
      }).then((options) => {
        this.options = options
      }).catch((err) => {
        console.log(err)
      })
    },
    getOptions () {
      return {
        paddles: this.getPaddleOptions()
      }
    },
    getPaddleOptions: function () {
      return this.computePaddleOptions(this.paddles, JSON.parse)
    },
    setPaddleOptions: function (paddles) {
      return this.computePaddleOptions(paddles, JSON.stringify)
    },
    computePaddleOptions: function (paddles, action) {
      const options = []
      const _paddles = paddles.map(paddle => ({...paddle}))
      for (const paddle of _paddles) {
        for (const option in paddle) {
          if (paddle.hasOwnProperty(option)) {
            paddle[option] = action(paddle[option])
          }
        }
        options.push(paddle)
      }
      return options
    }
  },
  created: function () {
    this.getOptionsFromURL('static/options/default.json')
    //this.render.start()
  }
}
</script>
<style>
body {
  padding: 0;
  margin: 0;
  text-align: center;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 200%;
}
canvas {
  display: none;
}
#canvas canvas {
  display: block;
}
.screen {
  overflow-x: hidden;
}
#startScreen {
  height: 100vh;
  z-index: 1;
  background-color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.pauseButton {
  margin: 10px auto;
}
.button {
  cursor: pointer;
  background-color: #dddddd;
  display: block;
  padding: 10px;
  width: 200px;
  border: 0;
  font-size: 0.8em;
  box-shadow: none;
  border-radius: 0px;
  color: #333333;
  font-family: 'VT323', monospace;
}
.button:hover {
  background-color: #ff0000;
  color: white;
}
label.button {
  cursor: pointer;
}
input[type='radio'] {
  opacity: 0;
  width: 0;
  height: 0;
  position: relative;
  top: 10px;
}
input[type='radio']:checked ~ label {
  background-color: #ff0000;
  color: white;
}
input[type='text']{
  cursor: auto;
}
input[type='number'] {
  cursor: auto;
}

#startScreen button:nth-child(2) {
  margin-bottom: 10px;
}
#startScreen h1 {
  margin-top: -0.25em;
  color: white;
  text-shadow: 2px 2px #ff0000;
}
#settingScreen {
  background-color: white;
  color: #333333;
  font-family: 'VT323', monospace;
}
#ratingScreen {
  color: #333333;
  background-color: #333333;
}
#ratingScreen:hover {
  background-color:white;
}
.selecter {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
table {
  width: 100vw;
  white-space: nowrap;
}
.wrapper {
  overflow-x: auto;
}
ul {
   list-style-type: none;
}
a {
  margin: 0;
  padding: 0;
  display: inherit;
}
@media screen and (orientation: portrait) {
  #canvas canvas {
    width: 100vw;
  }
}
</style>
