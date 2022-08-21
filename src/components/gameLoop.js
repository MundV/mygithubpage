import Game from './game/game.js'
import Ball from './game/ball.js'
import Paddle from './game/paddle.js'
import Physics from './game/physics.js'
import bot from './bot.js'

export default class gameLoop {
    constructor (options, sharedController, bots) {
        this.interval = null
        const size = (1 + options.paddles.length) * 2
        // console.log(size)
        // console.log(options.paddles.length)	

        // Shared memory
        const sharedPositions = new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT * size)
        this.worker = createWorker(gameWorker, [Game, Ball, Paddle, Physics, bot])
        this.worker.postMessage({
            type: "init",
            options,
            positions: sharedPositions,
            sharedController,
            bots
        })
        this.positions = new Float64Array(sharedPositions)
    }
    getPaddlePos (index) {
        // console.log(this.positions)
        return [this.positions[2 + index * 2], this.positions[2 + index * 2 + 1]]
    }
    getBallPos () {
        return [this.positions[0], this.positions[1]]
    }
    pause () {
        this.worker.postMessage({type: "pause"})
    }
    unpause () {
        this.worker.postMessage({type: "unpause"})
    }
    stop () {
        this.worker.terminate()
    }
}

// Code excuted inside a worker
function gameWorker (ev) {

    function getController () {
        const actionList = []
        for (let i = 0; i < self.controller.length; i++) {
            if(!self.controller[i]) continue

            const action = i % 2 ? 'down' : 'up'
            actionList.push({
                paddle: self.game.paddles[parseInt(i / 2)],
                action
            })
        }

        for (let i = 0; i < self.bots.length; i++) {
            if(!self.bots[i]) continue
            actionList.push({
                paddle: self.game.paddles[i],
                action: self.bots[i](self.game, i)
            })
        }
        return actionList
    }

    function updateGame() {
        self.game.update(getController())
        self.positions[0] = self.game.ball.pos[0]
        self.positions[1] = self.game.ball.pos[1]
        for (let i = 0; i < self.game.paddles.length; i++) {
            self.positions[2 + i * 2] = self.game.paddles[i].pos[0]
            self.positions[2 + i * 2 + 1] = self.game.paddles[i].pos[1]
        }
        // console.log(self.positions)
    }

    let preciseIntervals = [], i = 0;
    function setPreciseInterval(callback, ms, ...args) {
        let previous = performance.now(), id = i++;
        (function exec() {
            preciseIntervals[id] = setTimeout(() => {
                previous += ms;
                callback(...args);
                exec();
            }, ms - (performance.now() - previous));
        })();
        return id;
    }
    function clearPreciseInterval(preciseIntervalId) {
        clearTimeout(preciseIntervals[preciseIntervalId]);
    }

    self.onmessage = e => {
        // console.log("init")
        // console.log(e)
        if (e.data.type == "init") {
            const options = e.data.options
            self.game = eval("new Game(options)")
            self.bots = options.paddles.map(options => options.bot ? eval("bot()") : false)
            console.log(e.data.positions)
            self.positions = new Float64Array(e.data.positions)

            self.controller = new Uint8Array(e.data.sharedController)
            self.interval = setPreciseInterval(updateGame, 5)
            // while (true)
        } else if (e.data.type == "pause") {
            clearPreciseInterval(self.interval)
        } else if (e.data.type == "unpause") {
            self.interval = setPreciseInterval(updateGame, 5)
        }
    }
}

function createWorker(fn, imports) {
    const importString = imports.map(x => x.toString()).join("")
    var blob = new Blob([importString + '('+fn.toString()+')()'], {type: 'text/javascript'})
    return new Worker(URL.createObjectURL(blob), {type: "module"})
}