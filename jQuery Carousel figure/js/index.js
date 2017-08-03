// JavaScript Document
$(document).ready(function() {

	var len = 475/1100;
	//获取大盒子的宽度
	var banner_width = $(".banner").width();
	var banner_height = banner_width * len;
	$(".banner").height(banner_height);
	//兼容移动端
	window.onresize = function(){
		banner_width = $(".banner").width();
		banner_height = banner_width * len;
		$(".banner").height(banner_height);
	}
	// 上面的是 响应式布局思想 先不考虑

	var i = 0,next;
	var ul_lis = $(".banner_ul li");//获取li对象
	var ol_lis = $(".banner_ol li");//获取所有的数字
	function autoPlay_R(){
		//保证不会多余循环
		if(i>= ul_lis.length){ i = 0;}

		// 加上next的原因是让ol先变化 不加的话
		next = i +1;//下一张  1 2 3--0
		if(next >= ul_lis.length){ next = 0;}

		ol_lis.removeClass();//清除样式

		// 给下一张ol li加上now的属性
		ol_lis.eq(next).addClass("now");		

		ul_lis.removeClass();//清除样式

		ul_lis.eq(i).addClass("active");
		//给当前图片加上活跃效果
		
		ul_lis.eq(next).addClass("next").css('left',banner_width);

		//下一张图片的位置在现在的图片的右侧		
		ul_lis.eq(i).animate({left:-banner_width});
		//设置当前图片向左移动到左侧1个图片宽度的单位的动画
		ul_lis.eq(next).animate({left:0});
		//设置下一张图片移动到当前位置的动画
		i++;//0 1 2 3 --0
	}
	//var timer1 = setInterval(autoPlay_R,1000);                  自动轮播
	//var formal,sth=ul_lis.length;
	//往左运动的函数
	function autoPlay_L(){
		//作业  方向相反
		if(sth <= 0){sth= ul_lis.length;}
		formal=sth-1;
		if(formal <= -1){formal= ul_lis.length;}
		ol_lis.removeClass();//清除样式
		ol_lis.eq(formal).addClass("now");
		ul_lis.removeClass();//清除样式
		ul_lis.eq(sth).addClass("active");
		ul_lis.eq(formal).addClass("next").css('left',-banner_width);
		ul_lis.eq(sth).animate({left:banner_width});
		ul_lis.eq(formal).animate({left:0});
		sth--;
	}
	//点击数字按钮切换图片
	//鼠标移入停止，鼠标移出继续
	$(".banner").hover(function(){
		//鼠标移入
		clearInterval(timer1);
	},function(){
		//鼠标移出
		//timer1 = setInterval(autoPlay_R,1000);          图片轮播
	});	
	//点击右按钮切换
	$("#nextBtn").click(function(){
		autoPlay_R();
	});	
	//点击左按钮切换
	$("#preBtn").click(function(){
		autoPlay_L();
	})
	//.click(function(){
	//	numclick();
	//});ol_lis
});