(function (_) {
    function Food(options) {
        options = options || {}
        this.game = options.game
        this.w = options.w || 20
        this.h = options.h || 20
        this.color = options.color || 'pink'
        this.element = document.createElement('div')

        this.init()// 数据初始化完毕，调用 init 将食物渲染到游戏场景中

        this.randomPosition()// 初始化的随机坐标
    }

    Food.prototype = {
        constructor: Food,

        init: function () {
            var div = this.element
            div.style.width = this.w + 'px'
            div.style.height = this.h + 'px'
            div.style.backgroundColor = this.color
            div.style.position = 'absolute'
            this.game.scene.appendChild(div)
        },

        randomPosition: function () {
            var randomX = _.random(0, (scene.offsetWidth / this.w - 1)) * this.w
            var randomY = _.random(0, (scene.offsetHeight / this.h - 1)) * this.h
            this.element.style.left = randomX + 'px'
            this.element.style.top = randomY + 'px'
        }
    }

    window.Food = Food
})(_)