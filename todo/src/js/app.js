angular.module('todo',[])

	.directive('autoFocus',['$timeout',function($timeout){
		return {
			restrict:'A',
			link:function(scope,element,attributes){
				// 监听数据的变化
				scope.$watch('item.isEditing',function(newValue){
					// 如果isEditing的值是真
					if(newValue){
						$timeout(function(){
							element[0].focus();
						},0)
					}
				})
			}
		}
	}])

	.controller('todoCtrl',['$scope',function($scope){
		// 任务列表
		$scope.taskList = [];

		GetData();

		function GetData(){
			// 判断本地存储有没有这个数据
			if(localStorage.getItem('taskList')){

				// 将数据重新赋值给任务列表
				$scope.taskList = angular.fromJson(localStorage.getItem('taskList'));
			}
		}

		$scope.addTask = function(e){
			// 敲击回车键
			if(e.keyCode == 13){
				if($scope.task){
					// 将任务添加到任务列表中
					$scope.taskList.push({
						name:$scope.task,
						isCompleted:false,
						isEditing:false
					});
					// 清空文本框
					$scope.task = "";
				}
			}
		}

	    /* 删除任务 */
		$scope.deleteTask = function(index){

			$scope.taskList.splice(index,1);

		}
      
	    /* 更改任务	 */
		$scope.unCompletedTasksNum = function(){

			var num = 0;
			for(var i=0;i<$scope.taskList.length;i++){
				if(!$scope.taskList[i].isCompleted){
					num++;
				}
			}
			return num;
		}

        /* 筛选任务 */
		$scope.condition = "";

		$scope.isSelected = "All";

		$scope.filterTask = function(type){

			switch(type){
				case 'All' :
					$scope.condition = "";
					$scope.isSelected = "All";
					break;
				case 'Active' :
					$scope.condition = false;
					$scope.isSelected = "Active";
					break;
				case 'Completed' :
					$scope.condition = true;
					$scope.isSelected = "Completed";
					break;
			}

		}

		/* 清楚已完成任务 */
		$scope.clearCompletedTasks = function(){	
			var arr = $scope.taskList.filter(function(item){
				return !item.isCompleted;

			});
			$scope.taskList = arr;
		}
		
			/* 批量更改任务状态 */
		$scope.changeTaskStatus = function(){
			angular.forEach($scope.taskList,function(item,index){
				item.isCompleted = $scope.status;
			})
		}

		$scope.updateStatus = function(){
			// 循环任务列表
			for(var i=0;i<$scope.taskList.length;i++){
				if(!$scope.taskList[i].isCompleted){
					// 取消高亮
					$scope.status = false;
					// 阻止代码向下执行
					return;
				}

			}

			// 添加高亮
			$scope.status = true;

		}
        /* 更改任务名称 */
	
		$scope.modifyTaskName = function(task){
			$scope.taskList.forEach(function(item){
				item.isEditing = false;
			});
			task.isEditing = true;
		}

		// 离开焦点的时候
		$scope.cancelEditing = function(task){
			task.isEditing = false;
		}
		// $scope.$watch监听值
		$scope.$watch('taskList',function(){
			// 将数据存储在本地 taskList 本地存储的键名
			localStorage.setItem('taskList',angular.toJson($scope.taskList));
		},true);
	}])