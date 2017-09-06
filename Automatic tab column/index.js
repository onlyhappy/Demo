function Tab(options) {
    var btns = document.getElementById(options.id)
    this.btns = arrayify(btns.getElementsByTagName('button'))
    this.divs = arrayify(btns.getElementsByTagName('div'))
    this.timer = null
    this.start = 0
    this.options = options
    if (options.autoPlay) {
        this.autoPlay()
    }
}

Tab.prototype.init = function () {
    var self = this
    this.btns.forEach(function (item, index) {
        item.onclick = function () {
            self.btns.forEach(function (item, index) {
                item.classList.remove('active')
                self.divs[index].classList.add('hide')
            })
            this.classList.add('active')
            self.divs[index].classList.remove('hide')
        }
    })

    this.btns.forEach(function (item) {
        item.onmouseover = function () {
            self.stopAutoPlay()
        }
        item.onmouseout = function () {
            self.autoPlay()
        }
    })
}

Tab.prototype.autoPlay = function () {
    var self = this
    this.timer = window.setInterval(function () {
        self.start = self.start + 1 === self.btns.length ? 0 : self.start + 1
        self.btns.forEach(function (item, index) {
            item.classList.remove('active')
            self.divs[index].classList.add('hide')
        })
        self.btns[self.start].classList.add('active')
        self.divs[self.start].classList.remove('hide')
    }, this.options.interval || 1000)
}
// 停止自动播放
Tab.prototype.stopAutoPlay = function () {
    window.clearInterval(this.timer)
}

new Tab({
    id: 'tab1',
    autoPlay: true,
    interval: 1000
}).init()

new Tab({
    id: 'tab',
    autoPlay: true,
    interval: 2000
}).init()

function arrayify(obj) {
    var tmp = []
    for (var key in obj) {
        tmp[key] = obj[key]
    }
    return tmp
}