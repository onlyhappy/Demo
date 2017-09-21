;(function () {
  function Pipe(options) {
    this.game = options.game
    // 固定的图片宽度
    this.width = 148
 
    this.type = Math.round(Math.random() * (2 - 1) + 1)

    // 切片高度
    this.height = Math.floor(Math.random() * (this.game.canvas.height / 2 - 100) + 100)

    // 所有的管子默认的 x 都是 canvas 画布的宽度，在右边等待移动入场
    this.x = this.game.canvas.width
    // this.x = 100
    this.y = 0
  }

  var methods = Pipe.prototype

  /* 管子自己更新自己 */
  methods.update = function () {
    this.x-=5
    var bird = this.game.bird
    if (bird.x + bird.width / 3 - 20 > this.x && bird.x < this.x + this.width) {
      if (this.type === 1) {
        // 如果小鸟的 y < 管子的y+管子的height则证明撞上了
        if (bird.y < this.y + this.height) {
          this.game.gameover()
        }
      } else if (this.type === 2) {
        // 如果小鸟的 y > 管子的 y 就表示装上了
        if (bird.y > this.y) {
          this.game.gameover()
        }
      }
    }
  }

  /* 管子自己渲染自己 */
  methods.render = function () {
    if (this.type === 1) {
      // 渲染 pipe1 口朝下的管子
      this.game.ctx.drawImage(this.game.images.pipe1, 0, 1664 - this.height, this.width, this.height, this.x, 0, this.width, this.height)
    } else if (this.type == 2) {
      // 渲染 pipe2
      this.y = this.game.canvas.height - this.height - 40
      this.game.ctx.drawImage(this.game.images.pipe2, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }
  }

  window.Pipe = Pipe
})()
