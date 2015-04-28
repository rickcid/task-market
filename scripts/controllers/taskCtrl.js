var app = angular.module('TaskMarketApp');
//'use strict';

app.controller('TaskController', function($scope, $location, toaster, Task, Auth) {

  $scope.createTask = function() {
    $scope.task.status = 'open';
    $scope.task.gravatar = Auth.user.profile.gravatar;
    $scope.task.name = Auth.user.profile.name;
    $scope.task.poster = Auth.user.uid;

    Task.createTask($scope.task).then(function(ref) {//createTask() returns a promise, the 'ref' param is data returned from firebase
      toaster.pop('success', 'Yay, your favor was created successfully!');
      $scope.task = {title: '', description: '', total: '', status: 'open', gravatar: '', name: '', poster: ''};
      $location.path('/browse/' + ref.key()); //using key() gives us task id of a task just created    
    });
  };

  $scope.editTask = function(task) {
    Task.editTask(task).then(function() {
      toaster.pop('success', 'Your favor was updated.');
    });
  };


});