
(function () {
  var element = null
  var scene = document.querySelector('.scene')

  function Hero(options) {
    this.game = options.game
    this.element = element = document.createElement('div')
    this.width = 51
    this.height = 63
    this.speed = 10
    this.frames = [
        './img/hero1.png',
        './img/hero2.png'
      ]
      this.directions = []

    this.init()
  }

  var methods = Hero.prototype

  /**
   * 将飞机初始化渲染到游戏场景中
   */
  methods.init = function () {
    element.style.width = this.width + 'px'
    element.style.height = this.height + 'px'
    element.style.backgroundImage = 'url("' + this.frames[0] + '")'
    element.style.backgroundRepeat = 'round'
    element.style.position = 'absolute'
    element.style.bottom = 0
    element.style.left = scene.offsetWidth / 2 - this.width / 2 + 'px'
    scene.appendChild(element)
  }

  // 根据按下和抬起的键处理运动方向
  methods.setDirections = function (e) {
    switch (e.type) {
      case 'keydown':
        // 按下的时候，根据上下左右去记录到 directions 中
        switch (e.keyCode) {
          case 37:
            var index = this.directions.indexOf('ArrowRight')
            index !== -1 && this.directions.splice(index, 1)

            this.directions.indexOf(e.key) === -1 && this.directions.push(e.key)
            break
          case 38:
            // 上
            var index = this.directions.indexOf('ArrowDown')
            index !== -1 && this.directions.splice(index, 1)

            this.directions.indexOf(e.key) === -1 && this.directions.push(e.key)
            break
          case 39:
            // 右
            var index = this.directions.indexOf('ArrowLeft')
            index !== -1 && this.directions.splice(index, 1)
            this.directions.indexOf(e.key) === -1 && this.directions.push(e.key)
            break
          case 40:
            // 下
            var index = this.directions.indexOf('ArrowUp')
            index !== -1 && this.directions.splice(index, 1)

            this.directions.indexOf(e.key) === -1 && this.directions.push(e.key)
            break
        }
        break
      case 'keyup':
        // 当按键抬起的时候，从 directions 中找到
        // this.directions.
        console.log('你按了 ' + e.key + '抬起来的')
        var index = this.directions.indexOf(e.key)
        index !== -1 && this.directions.splice(index, 1)
        break
      default:
        break
    }
  }

  /**
   * 飞机的移动，游戏的每一帧都移动
   */
  methods.move = function () {
    if (this.directions.length === 0) {
      return
    }

    if (this.directions.length === 1) {
      switch (this.directions[0]) {
        case 'ArrowLeft':
          element.style.left = element.offsetLeft - this.speed + 'px'
          break
        case 'ArrowUp':
          element.style.top = element.offsetTop - this.speed + 'px'
          break
        case 'ArrowRight':
          element.style.left = element.offsetLeft + this.speed + 'px'
          break
        case 'ArrowDown':
          element.style.top = element.offsetTop + this.speed + 'px'
          break
        default:
          break
      }
    }

    if (this.directions.length === 2) {
      var directions = this.directions
      if (directions.indexOf('ArrowLeft') !== -1 && directions.indexOf('ArrowUp') !== -1) {

        element.style.left = element.offsetLeft - this.speed + 'px'
        element.style.top = element.offsetTop - this.speed + 'px'
      } else if (directions.indexOf('ArrowLeft') !== -1 && directions.indexOf('ArrowDown') !== -1) {

        element.style.left = element.offsetLeft - this.speed + 'px'
        element.style.top = element.offsetTop + this.speed + 'px'
      } else if (directions.indexOf('ArrowRight') !== -1 && directions.indexOf('ArrowUp') !== -1) {

        element.style.left = element.offsetLeft + this.speed + 'px'
        element.style.top = element.offsetTop - this.speed + 'px'
      } else if (directions.indexOf('ArrowRight') !== -1 && directions.indexOf('ArrowDown') !== -1) {

        element.style.left = element.offsetLeft + this.speed + 'px'
        element.style.top = element.offsetTop + this.speed + 'px'
      }
    }
  }

  /**
   * 发射子弹
   */
  methods.shoot = function (e) {
    if (e.keyCode !== 32) {
      return
    }

    this.game.bulletList.push(new Bullet({
      game: this.game
    }))
  }

  /**
   * 碰壁检测
   */
  methods.checkWall = function () {

  }

  /**
   * 碰撞敌机检测
   */
  methods.checkEnemy = function () {

  }


  window.Hero = Hero
})()
