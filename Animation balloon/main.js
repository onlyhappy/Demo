function Ball(options) {
  this.r = options.r || 20
  this.color = options.color || 'pink'
  this.x = options.x || 100
  this.y = options.y || 100
  this.game = options.game
  this.speed = options.speed || 1
  this.element = document.createElement('div')
  // directionX 和 directionY 随机就可以生成不同的坐标，让小球朝着不同的方向去动
  this.directionX = Math.random() * 10 - 5
  this.directionY = Math.random() * 10 - 5
  this.init()
}

// init 方法的作用就是根据实例对象的成员创建 div 然后添加到 body 上
Ball.prototype.init = function () {
  var div = this.element
  div.style.width = this.r * 2 + 'px'
  div.style.height = this.r * 2 + 'px'
  div.style.borderRadius = this.r + 'px'
  div.style.backgroundColor = this.color
  div.style.position = 'absolute'
  div.style.left = this.x + 'px'
  div.style.top = this.y + 'px'
  document.body.appendChild(div)
}

// 让小球移动
Ball.prototype.move = function () {
  this.x += this.directionX
  this.y += this.directionY
  this.r -= 1
  var div = this.element
  if (this.r <= 0) {
    document.body.removeChild(div)
    // 先找到 this 在数组中的索引，再根据索引删除一个
    var index = this.game.ballList.indexOf(this)
    this.game.ballList.splice(index, 1)
  }
}

Ball.prototype.render = function () {
  var div = this.element
  div.style.left = this.x + 'px'
  div.style.top = this.y + 'px'
  div.style.width = this.r * 2 + 'px'
  div.style.height = this.r * 2 + 'px'
  div.style.borderRadius = this.r + 'px'
}
