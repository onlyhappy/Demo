//封装一个$方法
function $(selector,content){
			var fristChar=selector.charAt(0);
			var content=content||document;
			if(fristChar==="#"){
				return document.getElementById(selector.slice(1));
			}else if(fristChar==="."){
				var arr=[];
				var AllElements=content.getElementsByTagName("*");
				for(var i=0;i<AllElements.length;i++){
					var className=AllElements[i].className;
					var classArr=className.split(" ");
					for(var j=0;j<classArr.length;j++){
						if(selector.slice(1)===classArr[j]){
							arr.push(AllElements[i]);
							break;
						}
					};
				};
				return arr;
			}else{
				return content.getElementsByTagName(selector);
			}
		}






function move(obj,attr,speed,target,fn) {
			// 为了方便控制同一个定时器  谁运动 就给谁添加一个自定义属性 然后在自定义属性下面 挂载一个定时器
	
			/*var timer = null;*/
			// 用定时器之前 先清除定时器 把原来的定时器干掉 从新开新的定时器
			clearInterval(obj.timer);
			// 开启一个定时器
			
			// 利用getStyle函数  获取你要变化的样式属性的初始值
				// 获取完 之后 100px  ===> 100
				var iCur = parseFloat(getStyle(obj,attr));
				// 自动处理速度的正 负 值
				speed = iCur > target ? -Math.abs(speed) : Math.abs(speed);
				
			obj.timer = setInterval(function(){
				
				iCur += speed;
				
				// 某些情况下 速度并不能正好到达目标点 所以控制一下
				if (iCur >= target&&speed>0 || iCur <= target&&speed<0) {
					iCur = target; // 
					// 这里清除定时器 说明运动完毕了
					clearInterval(obj.timer);
					obj.timer = null;
					obj.style[attr] = iCur + "px";
					// 看看传入的回调函数是否存在 并且 严格判断传入的是不是函数
					if(fn&&typeof fn == "function") {
						fn();
					}
				} else {
					obj.style[attr] = iCur + "px";
				}
				
			},10);	
		}
		
		
		// 这是一个获取样式的兼容性函数  (所有的兼容性函数的处理方式 基本是利用浏览器的能力 进行检测)
		function getStyle(obj,attr) {
			if (obj.currentStyle) {
				return obj.currentStyle[attr];
			} else {
				return getComputedStyle(obj)[attr];
			}
		}