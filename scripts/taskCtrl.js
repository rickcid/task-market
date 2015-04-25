'use strict';

app.controller('TaskController', function($scope, FURL, $firebase, $location){

  var ref = new Firebase(FURL);//initializes connection to firebase & returns ref var
  var fbTasks = $firebase(ref.child('tasks')).$asArray();//creates a node named task to firebase & returns an array

  $scope.tasks = fbTasks;//creates an array of all tasks created on firebase

  $scope.postTask = function(task) {
    fbTasks.$add(task);//adds the local data to the array on firebase
    $location.path('/browse');
  }
});