var keep = -1;  //  点击位置保存容器
$("img").each(function (index, item) {
    $(item).on({
        "mouseover": function () {
            getFn(index);
        },
        "mouseout": function () {
            $("img").attr("src", "images/star-default.jpg");
        },
        "click": function () {
            keep = index;
        }
    });
});

$(".pingfen").on({
    "mouseenter": function () {
        $("img").attr("src", "images/star-default.jpg");
    },
    "mouseleave": function () {
        $("img").attr("src", "images/star-default.jpg");
        getFn(keep);
    }
});

//   星星显示函数封装  两个一下显示灰色，两个以上高亮显示
function getFn(obj) {
    if (obj < 2) {
        for (var i = 0; i <= obj; i++) {
            $("img").eq(i).attr("src", "images/star-bad.jpg");
        }
    } else {
        for (var i = 0; i <= obj; i++) {
            $("img").eq(i).attr("src", "images/star-good.jpg");
        }
    }
}