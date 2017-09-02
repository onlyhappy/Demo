
$.fn.waterfall = function () {
    // this 指当前调用的DOM
    // 布局容器
    var container = $(this);
    // 布局容器的宽度
    var cWidth = container.width();
    // 列数
    var columns = 4;
    // 每一列的宽度
    var width = cWidth / 4;
    // 所有的布局元素
    var items = container.children();
    // 实时记录每一列的高度
    var h = [];

    // 设置布局容器为相对定位
    container.css('position', 'relative');

    items.each(function (key, val) {

        $(val).css({
            width: width,
            position: 'absolute'
        });

        // 每一个布局元素的高度
        height = $(val).height();

        // 第一行(根据列数据判断)
        if(key < columns) {
            h.push(height);
            $(val).css({
                left: key * width,
                top: 0
            })
        } else {
            var min_val = h[0];
            var min_key = 0;
            for(var i=0; i<h.length; i++) {
                if(h[i] < min_val) {
                    min_val = h[i];
                    min_key = i;
                }
            }

            $(val).css({
                left: min_key * width,
                top: min_val
            });

            h[min_key] += height;
        }

        // 计算最大列的高度
        var max_val = h[0];
        for(var j=0; j<h.length; j++) {
            if(h[j] > max_val) {
                max_val = h[j];
            }
        }

        // 将最高列的高度设置给布局容器
        container.height(max_val);
    })

}