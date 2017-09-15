;(function () {
  function Game() {
    this.scene = document.querySelector('.scene')
    this.hero = new Hero({
      game: this
    }),
    this.bulletList = [],
    this.enemyList = []
    this.timer = null
    this.bindEvents()
  }

  var methods = Game.prototype

  methods.bindEvents = function () {
    document.onkeydown = (function (e) {
      this.hero.setDirections(e)
      this.hero.shoot(e)
    }).bind(this)

    document.onkeyup = (function (e) {
      this.hero.setDirections(e)
    }).bind(this)
  }

  methods.run = function () {
    this.timer = window.setInterval(function () {
      this.mainLoop()
    }.bind(this), 1000 / 50)
  }

  var start = new Date()
  var bulletInterval = 200

  methods.mainLoop = function () {
    if (new Date() - start >= bulletInterval) {
      this.bulletList.push(new Bullet({
        game: this
      }))
      start = new Date()
    }

    this.hero.move()
    
    this.bulletList.forEach(function (item, index) {
      item.move()
    })
  }

  window.Game = Game
})()
