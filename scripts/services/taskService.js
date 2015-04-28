var app = angular.module('TaskMarketApp');
//'use strict';

app.factory('Task', function(FURL, $firebase, Auth) {

  var ref = new Firebase(FURL);
  var tasks = $firebase(ref.child('tasks')).$asArray();
  var user = Auth.user;

  var Task = {
    all: tasks,

    getTask: function(taskId) {
      return $firebase(ref.child('tasks').child(taskId)); //Goes through owned 'tasks' in an array and finds a 'task' w/ specified Id and returns it
    },

    createTask: function(task) {
      task.datetime = Firebase.ServerValue.TIMESTAMP; //Using firebase Timestamp value for date & time created and adding as a param to the task
      return tasks.$add(task); //returns tasks with the new firebase added task object 
    },

    editTask: function(task) {
      var t = this.getTask(task.$id); //using getTask(), we get a task object from firebase based on Id and assigns to 't'
      return t.$update({title: task.title, description: task.description, total: task.total}); //updates the task properties with the new ones
    },

    cancelTask: function(taskId) {
      var t = this.getTask(taskId);
      return t.$update({status: "cancelled"}); //update the task status from open to cancelled to cancel task
    },

    isCreator: function(task) { //checks if current user is the creator of a specific task
      return (user && user.provider && user.uid === task.poster);
    },

    isOpen: function(task) { //checks if a certain task is open or not
      return task.status === "open";
    }
  };

  return Task;

});
