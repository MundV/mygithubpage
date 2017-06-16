const assert = require('assert')
describe('Glitchping', () => {
    const game = require('../scripts/game.js')
    describe('#goalCheck', () => {
        const testCase = {
            paddles: [
                {
                    name: 'testBot 1',
                    keys: [],
                    startPos: [10, 100]
                },
                {
                    name: 'testBot 2',
                    keys: [],
                    goal: 'left',
                    startPos: [620, 100]
                }
            ]
        }
        const goal = new game(testCase)
        for (let i = 0; i < 100; i++) {
            goal.controlPaddle()
            goal.bounce()
            goal.goalCheck()
            goal.render()
        }
        it('should add the score if the ball is in the goal', () => {
            assert.equal(goal.paddles[1].points, 1)
        })
    })
    describe('#bounce', () => {
        const testCase = {
             paddles: [
                {
                    name: 'testBot 1',
                    keys: [],
                    startPos: [10, 170]
                },
                {
                    name: 'testBot 2',
                    keys: [],
                    goal: 'left',
                    startPos: [620, 100]
                }
            ]
        }
        const bounce = new game(testCase)
        for (let i = 0; i < 100; i++) {
            bounce.controlPaddle()
            bounce.bounce()
            bounce.goalCheck()
            bounce.render()
        }
        it('should change the direction of the ball', () => {
            assert.equal(bounce.ball.xDirection, 'right') 
        })
        it('should change the player who controls the ball', () => {
            assert.ok(bounce.paddles[0].controllsBall)
        })
    })
})