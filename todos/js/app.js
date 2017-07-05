(function (angular) {
    'use strict';
  angular.module('hello',[])
  .controller('todosController',['$scope','$http',function ($scope,$http) {
     /* 1 获取数据并展示 */
     $scope.todos=[];
     $http.get('./data.json')
      .then(function(res){
         $scope.todos=res.data
     }) 
     /* 2.把获取的数据添加到魔板中 */
     $scope.newTodos=''
     $scope.add=function(){
      /* 判断，如果$scope.newTodos时空字符串，不允许添加 */
       if(!$scope.newTodos){
         alert('不能为空，不能偷懒哦！')
         return
       }
       console.log($scope.newTodos);
       $scope.todos.push({id:Math.random(),name:$scope.newTodos,completed:false})
       /* 清空newTodos，页面文本框内容也会被清除 */
       $scope.newTodos=''
     }
     /* 3.修改数据状态 */
       $scope.xxx = '-1'
       $scope.edit = function (id) {
         $scope.xxx = id
       }
   
       /* 失去焦点时，隐藏编辑框！ */
       $scope.hideInput = function () {
              $scope.xxx = '-1'
       }

        /* 4.删除数据 */
        $scope.delete = function (id) {
        /* 根据传入id,到todos数组中找与这个id相同的数据，并删除它 */
         for (var i = 0; i < $scope.todos.length; i++) {
             var item = $scope.todos[i]
             if(item.id == id){
                /* 从数据中删除数据！ */
                 $scope.todos.splice(i,1)
              }
           }
        }
       /* 5.计算并显示未完成的任务 */
       $scope.cunt=0;
       $scope.getcount=function(){
          $scope.count=0
          for(var i=0;i,$scope.todos.length;i++){
             var item=$scope.todos[i]
             if(!item.completed){$scope.count++}
          }
          return $scope.count
       }
       /* 6.切换显示不同状态的任务 */
            $scope.search = {}
        $scope.active = function () {
            $scope.search = {completed:false}
        }
        $scope.completed = function () {
            $scope.search = {completed:true}
        }
        $scope.all = function () {
            $scope.search = {}
        }
        $scope.all = function(){
            $scope.search={completed:true}
    }
        /* 7.清除已完成的任务 */
    $scope.clearComplted = function () {
       for (var i = $scope.todos.length - 1; i >= 0; i--) {
        var item  = $scope.todos[i]
        if(item.completed){
            $scope.todos.splice(i,1)
        }
       }
    }

     /* 8.控制清除按钮的显示与否 */
    $scope.isShow = function () {
        for (var i = 0; i < $scope.todos.length; i++) {
            var item = $scope.todos[i]
            if(item.completed){
                return true
            }
        }
        return false
    }
  }])
})(angular)