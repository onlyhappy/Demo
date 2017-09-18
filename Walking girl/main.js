;
(function () {
  function Girl(id) {
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext('2d')
    this.imgSrc = './rabbit.png'
    this.timer = null
    this.img = null
    this.originPoint = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    }
    this.stat = 1
    this.originDirection = {
      x: this.originPoint.x - 20,
      y: this.originPoint.y - 32,
    }
    this.frameIndex = 0
    this.directions = {
      left: false,
      up: false,
      right: false,
      down: false
    }
    this.init()
  }

  Girl.prototype.setStat = function (e) {
    switch (e.keyCode) {
      case 37:
        if (this.directions.left) {
          return
        }
        this.directions.left = true
        this.stat = 1
        this.frameIndex = 0
        break
      case 38:
        if (this.directions.up) {
          return
        }
        this.directions.up = true
        this.stat = 3
        this.frameIndex = 0
        break
      case 39:
        if (this.directions.right) {
          return
        }
        this.directions.right = true
        this.stat = 2
        this.frameIndex = 0
        break
      case 40:
        if (this.directions.down) {
          return
        }
        this.directions.down = true
        this.stat = 0
        this.frameIndex = 0
        break
    }
  }

  Girl.prototype.init = function () {
    // 加载图片资源，当得到图片资源之后，开始运动
    this.loadImg(function () {
      this.run()
    }.bind(this))

    document.onkeydown = (function (e) {
      this.setStat(e)
    }).bind(this)

    document.onkeyup = (function (e) {
      for (var key in this.directions) {
        this.directions[key] = false
      }
    }).bind(this)
  }

  Girl.prototype.loadImg = function (callback) {
    var img = new Image()
    img.src = this.imgSrc
    img.onload = (function () {
      this.img = img

      callback()
    }).bind(this)
  }

  // 开启定时器，每一帧都调用游戏的主循环函数
  Girl.prototype.run = function () {
    this.timer = window.setInterval(function () {
      this.mainLoop()
    }.bind(this), 100)
  }

  Girl.prototype.mainLoop = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    // 按键方向控制小女孩的运动方向
    for (var key in this.directions) {
      if (this.directions.left) {
        this.originDirection.x -= 1
      } else if (this.directions.up) {
        this.originDirection.y -= 1
      } else if (this.directions.right) {
        this.originDirection.x += 1
      } else if (this.directions.down) {
        this.originDirection.y += 1
      }
    }
    // 把小女孩绘制到画布中
    this.ctx.drawImage(this.img, this.frameIndex * 40, this.stat * 65, 40, 65, this.originDirection.x, this.originDirection.y, 40, 65)

    // 没有按键，frameIndex 保持不变
    for (var key in this.directions) {
      if (this.directions[key]) {
        this.frameIndex++
        this.frameIndex >= 3 && (this.frameIndex = 0)
        break
      }
    }
  }

  window.Girl = Girl
})()
