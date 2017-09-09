(function (_) {
    function Snake(options) {
        options = options || {}
        this.game = options.game
        this.w = options.w || 20
        this.h = options.h || 20
        this.direction = 'right'
        this.body = [{
            x: 1,
            y: 2,
            color: 'red',
            element: document.createElement('div')
        },
            {
                x: 2,
                y: 2,
                color: 'red',
                element: document.createElement('div')
            },
            {
                x: 3,
                y: 2,
                color: 'yellow',
                element: document.createElement('div')
            }
        ]

        // 数据初始化完毕，将蛇渲染到游戏场景中
        this.init()
    }

    Snake.prototype = {
        constructor: Snake,

        init: function () {
            var self = this
            self.body.forEach(function (item, index) {
                var div = item.element
                div.style.width = self.w + 'px'
                div.style.height = self.h + 'px'
                div.style.backgroundColor = item.color
                div.style.position = 'absolute'
                div.style.left = item.x * self.w + 'px'
                div.style.top = item.y * self.h + 'px'
                self.game.scene.appendChild(div)
            })
        },

        move: function () {

            var head = _.last(this.body)
            var self = this

            if (self.checkCollision()) {

                self.game.stop()

                return

            }

            for (var i = 0; i < this.body.length - 1; i++) {
                var next = this.body[i + 1]
                var curr = this.body[i]
                curr.x = next.x
                curr.y = next.y
            }

            // 根据方向处理蛇头的坐标
            switch (this.direction) {
                case 'left':
                    head.x -= 1
                    break
                case 'up':
                    head.y -= 1
                    break
                case 'right':
                    head.x += 1
                    break
                case 'down':
                    head.y += 1
                    break
                default:
                    break
            }

            // 蛇头改变，把 DOM 的定位根据坐标修改掉
            self.body.forEach(function (item) {
                item.element.style.left = item.x * self.w + 'px'
                item.element.style.top = item.y * self.h + 'px'
            })

            // 蛇move过以后，每 move 一次，就验证一下，蛇有没有吃到食物
            self.checkFood()
        },

        //碰壁检测的方法
        checkCollision: function () {
            var isCollision = false
            var head = _.last(this.body)
            if (this.direction === 'right' && (head.x + 1) * this.w >= 800) {
                isCollision = true
            } else if (this.direction === 'left' && (head.x - 1) < 0) {
                isCollision = true
            } else if (this.direction === 'up' && (head.y - 1) < 0) {
                isCollision = true
            } else if (this.direction === 'down' && (head.y + 1) * this.h >= 600) {
                isCollision = true
            }
            return isCollision
        },

        checkFood: function () {
            var self = this
            var food = self.game.food
            var head = _.last(self.body)
            if (head.x * self.w === food.element.offsetLeft && head.y * self.h === food.element.offsetTop) {
                // 吃到食物后，重新随机改变其坐标
                food.randomPosition()

                // 然后让蛇自己增加一节
                var lastNode = _.first(self.body)
                self.body.unshift({
                    x: lastNode.x,
                    y: lastNode.y,
                    color: 'blue',
                    element: document.createElement('div')
                })

                self.init()
            }
        },

        //控制方向
        setDirection: function (keyCode) {
            switch (keyCode) {
                case 37:
                    this.direction !== 'right' && (this.direction = 'left')
                    break
                case 38:
                    this.direction !== 'down' && (this.direction = 'up')
                    break
                case 39:
                    this.direction !== 'left' && (this.direction = 'right')
                    break
                case 40:
                    this.direction !== 'up' && (this.direction = 'down')
                    break
            }
        }
    }
    window.Snake = Snake
})(_)
