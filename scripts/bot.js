function simpleBot(paddle, ball) {
  if (paddle.pos[1] < ball.pos[1]) {
    return 'down'
  } else if(paddle.pos[1] > ball.pos[1]) {
    return 'up'
  } else {
    return ''
  }
}
modules.exports = simpleBot
