var app = angular.module('TaskMarketApp');

app.controller('DashboardController', function($scope, Dashboard, Auth) {

  $scope.taskRunner = [];
  $scope.taskPoster = [];

  var uid = Auth.user.uid;
  
  //get all of the task for the current user and then categorize them into different arrays based on type
  Dashboard.getTasksForUser(uid).then(function(tasks) {

    for(var i = 0; i < tasks.length; i++) {
      tasks[i].type? $scope.taskPoster.push(tasks[i]) : $scope.taskRunner.push(tasks[i]) 
    }

    $scope.numPoster = $scope.taskPoster.length;
    $scope.numRunner = $scope.taskRunner.length;
  });

});