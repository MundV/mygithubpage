'use strict'
let curr = {paused: true}
let app;

function setup() {
  app = new Vue({
    el: '#app',
    data: {
      gameIsRunning: false,
      message: 'Glitchping by Mund',
      options: {
        paddles: [
          {
          loading: 'waiting...'
          }
        ]
      },
      paddles: []
    },
    watch: {
      gameIsRunning: function (val) {
        if(val) {
          curr = new game()
        } else {
          fullscreen(false)
          this.message = `${curr.winner} won!🎉`
          curr = {paused: true}
        }
      },
      options: function (val) {
        this.paddles = this.setPaddleOptions(val.paddles)
      },
      paddles: function (val) {
        console.log('why');
      }
    },
    methods: {
      getOptionsFromURL: function(url) {
        fetch(url).then((res) => {
          return res.json()
        }).then((options) => {
          this.options = options
        }).catch((err) => {
          console.log(err)
        })
      },
      getOptions() {
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
        for (const paddle of paddles) {
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
    created: function() {
      this.getOptionsFromURL('/options/default.json')
    }
  })
}

function draw() {
  if(curr.ended) {
    app.gameIsRunning = false
  }
  if(!curr.paused) {
    curr.update()
  }
}
