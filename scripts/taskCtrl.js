'use strict';

app.controller('TaskController', function($scope, FURL, $firebase, $location, $routeParams){//$routeParams gets the id from url

  var ref = new Firebase(FURL);//initializes connection to firebase & returns ref var
  var fbTasks = $firebase(ref.child('tasks')).$asArray();//creates a node named task to firebase & returns an array
  var taskId = $routeParams.taskId;

  if (taskId) { //checks if a taskId is provided in url, if so it gets the task from taskId
    $scope.selectedTask = getTask(taskId);
  }

  //This is a private function, not in scope, used to get the task from taskId
  function getTask(taskId) {
    return $firebase(ref.child('tasks').child(taskId)).$asObject();
  }

  $scope.updateTask = function(task) {
    $scope.selectedTask.$save(task);//$save() updates the task object
    $location.path('/browse');//redirects to browse view once update is processed
  }

  $scope.tasks = fbTasks;//creates an array of all tasks created on firebase

  $scope.postTask = function(task) {
    fbTasks.$add(task);//adds the local data to the array on firebase
    $location.path('/browse');
  }
});