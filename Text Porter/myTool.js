// 为了便于获取DOM（document文档中）元素 我们封装了一个$函数 一方面 为了操作获取方便
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

function next(ele) {
			 var next = ele.nextElementSibling || ele.nextSibling;
			 
			 if (next && next.nodeType == 1) {
			 	return next;
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