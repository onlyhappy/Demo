// 为了便于获取DOM（document文档中）元素 我们封装了一个$函数 一方面 为了操作获取方便
		// 为了理解之后jquery做准备  另外classname有兼容性问题 我们利用解决一下
		
		/*
		 *   "#div"     ".div"  "div"
		 * 
		 * */
		function $(selector,parent) {
			// 做了一个父级参数的一个默认处理
			// 如果parent没有接受实参 值为undefined （false） 将document赋给parent
			//  如果要是parent收到参数  肯定是true   parent = parent
			parent = parent || document;
			
			// 将传入的选择器的字符串 选择其中第一个字符 进行判断 #  .  普通字符
			var firstChar = selector.charAt(0);
			
			if (firstChar == "#") {
				// 如果你的第一个字符 是#  说明我们需要返回通过id方式获取元素
				return document.getElementById(selector.substring(1));//"#div" ===>"div"
			} else if (firstChar == ".") {
				// 建立一个空数组 用来存储 所有带你要找的类的标签元素
				var arr = [];
				
				// 需要手动封装 IE678
				//return document.getElementsByClassName(selector.slice(1)); // ".div"
				
				// 稍微复杂一点
				// 从整个文档下获取所有的标签元素 
				var allEles = parent.getElementsByTagName("*");
				// 循环所有的标签元素 看看每一个标签元素的身上 的class 字符串类型  （class里面是有一个或者多个类 也可能没有类）
				for(var i = 0; i < allEles.length; i++) {
					//"abc aa box"   "aa"  "" 
					// 将class名整个字符串 通过空格转成数组
					var arrClassNames = allEles[i].className.split(" ");
					// 循环数组 ["abc", "aa", "box"]
					for(var j = 0; j < arrClassNames.length; j++) {
						if (arrClassNames[j] == selector.slice(1)) {
							// 如果在整个类的数组里面 找到了你想要的 存起来 当前带这个类的标签元素
							
							arr.push(allEles[i]);
							// 如果找到了 则不用在这个标签身上 往后循环看了
							break;
							
						}
					}
				}
				
				// 最终 的一定是所有的带aa类的标签元素  数组形式
				return arr;
			} else {
				// 返回 标签名获取元素
				return parent.getElementsByTagName(selector);
			}
			
			
			
		}
// DOM节点的函数封装		
function last(ele) {
          var lastEle = ele.lastElementChild || ele.lastChild;
          if (lastEle && lastEle.nodeType == 1) {
            return lastEle
          } else {
            return null;
          }
		}
function next(ele) {
			 var next = ele.nextElementSibling || ele.nextSibling;
			 
			 if (next && next.nodeType == 1) {
			 	return next;
			 } else {
			 	return null;
			 }
		}
function prev(ele) {
          var prevEle = ele.previousElementSibling || ele.previousSibling;
          if (prevEle && prevEle.nodeType == 1) {
            return prevEle;
          } else {
            return null;
          }
        }
function first(ele) {
			// 这里标准浏览器 和非标准做兼容
			var first = ele.firstElementChild || ele.firstChild;
		
			// 如果first 只 获取了 空白文本节点  那么这个时候 会报错  所以我们要排除文本节点
			// 如果干脆获取不到任何节点  这个时候也会报错
			// 如果这个获取的节点 存在 并且类型为1
			if (first && first.nodeType == 1) {
				return first;
			} else {
				// 否则返回一个空对象 说明没有获取到正确的元素节点
				return null;
			}
		}

// 事件绑定的兼容性函数
function bind(obj,evType,evFn) {
  if (obj.addEventListener) {
    obj.addEventListener(evType,evFn,false);
  } else if (obj.attachEvent) { 
    obj.attachEvent("on"+evType,evFn);
  } else {
    obj["on"+evType] = evFn;
  }
}
// 事件解绑的兼容性函数
function unbind(obj,evType,evFn) {
  if (obj.removeEventListener) {
    obj.removeEventListener(evType,evFn,false);
  } else if (obj.detachEvent) {
    obj.detachEvent("on" + evType,evFn);
  } else {
    obj["on"+evType] = null;
  }
}


//=============================================
		// 封装一个实现运动物体   上下 左右    速度我可以控制  目标点  匀速运动的函数
		function move(obj,attr,speed,target,t,fn) {	
			//将timer 作为 当前运动物体的自定义属性存在  为了保证这个定时器只属于obj运动的唯一的定时器
			// 后续将定时器存入 obj的自定义属性 timer身上
			clearInterval(obj.timer);
		 // 通过getStyle函数去获取样式表中的样式 当初的样式
		     var current = parseFloat(getStyle(obj,attr));
		     // 在内部通过自动判断正负 
		     speed = current> target ? -speed : speed;
			// 开启一个定时器
			obj.timer = setInterval(function(){
			    //current = current + speed;
			    current += speed;
			     // 如果当前的值 大于等于 目标点
			     // 如果当前值大于等于目标点 并且速度是正  说明目标点 大于初始位置  往前走
			    if (current >= target&&speed > 0 || current <= target &&speed<0) {
			     	// 则让当前值等于目标点
			     	current = target;
			    }
			     // 让div 的left 值 赋值为当前的 值
				 obj.style[attr] = current +"px";
				// 如果当前的值为目标点了，清除定时器 并且设定时器为空对象
				 if(current == target) {
				 	clearInterval(obj.timer);
				 	obj.timer = null;
				 	
				 	// 这里 一定是已经当前运动物体运动完了
				 	// 这里面的事情一定是物体运动完了之后做的 但是你要做的事情 可能很多 或者每次不一样
				 	// 把复杂的功能实现 放到核心函数的外面去 作为参数传进来 保证代码的可复用性
				 	/*if(fn){
				 		fn();
				 	}*/
				 	fn&&fn();
				 }				
			},t&&30);		
		}
		
		// 这是一个获取样式的兼容性函数
		function getStyle(obj,attr) {
			return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
		}
		