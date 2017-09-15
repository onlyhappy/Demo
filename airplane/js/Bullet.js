;(function () {
  function Bullet(options) {
    this.game = options.game
    this.element = document.createElement('div')
    this.speed = 10
    this.init()
  }

  Bullet.prototype.init = function () {
    var element = this.element
    element.classList.add('bullet')
    var heroEl = this.game.hero.element
    element.style.left = heroEl.offsetLeft + heroEl.offsetWidth / 2 - element.offsetWidth / 2 + 'px'
    element.style.top = heroEl.offsetTop + 'px'
    this.game.scene.appendChild(element)
  }

  Bullet.prototype.move = function () {
    this.element.style.top = this.element.offsetTop - this.speed + 'px'
    if (this.element.offsetTop <= 0) {
      this.game.scene.removeChild(this.element)
      var deleteIndex = this.game.bulletList.findIndex(function (item) {
        return item === this
      }.bind(this))
      this.game.bulletList.splice(deleteIndex, 1)
    }
  }

  window.Bullet = Bullet
})()
