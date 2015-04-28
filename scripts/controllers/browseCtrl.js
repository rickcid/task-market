var app = angular.module('TaskMarketApp');
//'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Task, Auth, Comment) {

  //searchTask is for the search tool we search, which is the task list
  $scope.searchTask = '';   
  //this tasks variable is assigned all of the Task in firebase
  $scope.tasks = Task.all;
  //this signedIn is actually a function, similar to signedIn = function() { return Auth.signedIn();}
  $scope.signedIn = Auth.signedIn;
  //in the html will display image on right
  $scope.listMode = true;

  //obtains the current user from the Auth service and assigns it to scope.user
  $scope.user = Auth.user;

  if($routeParams.taskId) {
    //get task from firebase by using its id
    var task = Task.getTask($routeParams.taskId).$asObject();
    //update list to false because currently in detail mode in view
    $scope.listMode = false;
    //private function that will pass a task object into it
    setSelectedTask(task);  
  } 
    
  function setSelectedTask(task) {
    //gets the selected task and assigns it to scope var selectedTask, it will be used in view to display task details
    $scope.selectedTask = task;
    
    // We check isTaskCreator only if user signedIn 
    // so we don't have to check every time normal guests open the task
    if($scope.signedIn()) {
      // Check if the current login user is the creator of selected task
      $scope.isTaskCreator = Task.isCreator;
      
      // Check if the selectedTask is open
      $scope.isOpen = Task.isOpen;      
    }

    //obtain a list of comments for the selected task
    $scope.comments = Comment.comments(task.$id);

  };

  // --------------- TASK --------------- 

  $scope.cancelTask = function(taskId) {
    //added .then to asssure notification is presented only when process is complete
    Task.cancelTask(taskId).then(function() {
      toaster.pop('success', "This task is cancelled successfully.");
    });
  };

  $scope.addComment = function() {
    //creates a new comment object, w/ properties
    var comment = {
      //obtains data from content scope that we bind in the frontend form 'browse.html' w/ ng-model="content"
      content: $scope.content,
      //obtains name and gravatar from $scope.user that we extracted from Auth.user above in ~line 16
      name: $scope.user.profile.name,
      gravatar: $scope.user.profile.gravatar
    };

    //add comment to Comment
    Comment.addComment($scope.selectedTask.$id, comment).then(function() {
      //empty's the input form
      $scope.content = '';
    });
  };

});