(function (Food, Snake) {
    // 管理整个游戏的运行,包括游戏的参与成员，负责控制游戏的开始停止等功能

    function Game(interval) {
        this.scene = document.getElementById('scene')
        this.snake = new Snake({
            game: this
        })
        this.food = new Food({
            game: this
        })
        this.timer = null
        this.interval = interval || 1000
        this.init()
    }

    Game.prototype = {
        constructor: Game,
        init: function () {
            var self = this

            document.onkeydown = function (e) {
                self.snake.setDirection(e.keyCode)
            }
        },
        start: function () {
            var self = this
            // 开启定时器，让蛇 move
            self.timer = window.setInterval(function () {
                self.snake.move(self.food)
            }, self.interval)
        },
        stop: function () {
            window.clearInterval(this.timer)
        }
    }

    // 将挂载的行为，放到最后，放前面也可以，放到后面是为了保持代码风格统一
    window.Game = Game
})(Food, Snake)

