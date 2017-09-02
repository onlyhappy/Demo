<?php
    // 通过 PHP 取一些数据

    // JSON 字符串
    $data = file_get_contents('./data.json');

    // 将JSON字符串转成PHP的数组
    $data = json_decode($data);

    // 分页一般会设好每页显示的条数

    // 假定每页 10 条
    // 默认第1页
    $items = array_slice($data, 0, 10);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>瀑布流布局</title>
    <style>
        .wrapper {
            width: 1200px;
            margin: 0 auto;
        }

        img {
            width: 100%;
        }

        .item {
            padding: 10px;
            box-sizing: border-box;
        }

        .loading {
            text-align: center;
            font-size: 28px;
            line-height: 40px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="wrapper">
    	<div class="items">
            <?php foreach($items as $key => $val) { ?>
            <div class="item">
                <img src="<?php echo $val->path ?>" alt="">      
                <p><?php echo $val->text ?></p>
            </div>
            <?php } ?>
    	</div>
        <div class="loading">正在加载...</div>
    </div>
    <script type="text/template" id="item">
        {{each items}}
        <div class="item">
            <img src="{{$value.path}}" alt="">
            <p>{{$value.text}}</p>
        </div>
        {{/each}}
    </script>
    <script src="./js/jquery.min.js"></script>
    <script src="./jquery.waterfall.js"></script>
    <script src="./js/template-web.js"></script>
    <script>
        // 调用瀑布流插件
        $('.items').waterfall();

        var win = $(window);
        var items = $('.items');
        var loading = $('.loading');
        var offset, html, locked = false;

        $(window).on('scroll', function () {
            offset = items.height() + items.offset().top - win.height() - win.scrollTop();

            // 当页面数据即将显示完时请求新数据
            if(offset <= 200 && !locked) {
                locked = true;

                // 请求数据
                $.ajax({
                    url: './data.php',
                    type: 'post',

                    data: {page: loading.attr('data-page') || 2},
                    success: function (info) {
                      // 将服务端返回的下一页页码存起
                        loading.attr('data-page', info.page);

                        // 调用模板引擎
                        html = template('item', info);

                        // 将拼凑的html添加到页面中
                        items.append(html);

                        // 调用瀑布流插件
                        items.waterfall();

                        locked = false;
                    }
                });
            }
        });
    </script>
</body>
</html>