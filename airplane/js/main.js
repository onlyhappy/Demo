var hero = new Hero()

document.onkeydown = function (e) {
  hero.setDirections(e)
}

document.onkeyup = function (e) {
  hero.setDirections(e)
}

window.setInterval(function () {
  hero.move()
}, 1000 / 50)
