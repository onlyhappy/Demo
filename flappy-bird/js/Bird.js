;
(function () {
  function Bird(options) {
    this.img = options.img
    this.width = options.width
    this.height = options.height
    this.x = options.x
    this.y = options.y
    this.game = options.game

    // 小鸟飞精灵图状态
    this.frameStat = 0

    // 小鸟飞行的帧动画间隔时间
    this.flyTime = new Date

    // flyStat 飞行状态，0 表示下，1 表示上
    this.flyStat = 0
    this.downY = 0

    // 旋转角度
    this.rotate = 0

    // 下落的速度
    this.downSpeed = 0

    this.init()
  }

  var methods = Bird.prototype
  methods.init = function () {
    this.game.canvas.onmousedown = (function () {
      // 鼠标点击游戏区域画布时，由下落变为上升
      this.downY = 0
      this.flyStat = 1
      this.rotate = - 25
    }).bind(this)
  }

  methods.update = function () {
    if (new Date() - this.flyTime >= 200) {
      this.frameStat++
      this.frameStat === 3 && (this.frameStat = 0)
      this.flyTime = new Date()
    }
    if (this.flyStat === 0) {
      this.downSpeed += 0.4
      this.rotate += 2
    } else if (this.flyStat === 1) {
      this.downY++
      this.downSpeed = -10 + this.downY
      if (this.downSpeed >= 0) {
        this.flyStat = 0
      }
    }
    this.y += this.downSpeed

    if (this.y >= this.game.canvas.height - 100) {
      this.game.gameover()
    }
  }

  methods.render = function () {
    this.game.ctx.save()
    this.game.ctx.translate(this.x, this.y)
    this.game.ctx.rotate(Math.PI / 180 * this.rotate)
    this.game.ctx.drawImage(this.img, this.width / 3 * this.frameStat, 0, this.width / 3, this.height, -24, -24, this.width / 3, this.height)
    this.game.ctx.restore()
  }

  window.Bird = Bird
})()
