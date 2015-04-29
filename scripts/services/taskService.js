var app = angular.module('TaskMarketApp');

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
      //returns tasks with the new firebase added task object 
      return tasks.$add(task)
        .then(function(newTask) {

        // Create User-Tasks lookup record for POSTER
        var obj = {
          taskId: newTask.key(),
          type: true,
          title: task.title
        };

        $firebase(ref.child('user_tasks').child(task.poster)).$push(obj);
        return newTask;
      });
    },

    createUserTasks: function(taskId) {
      Task.getTask(taskId)
        .$asObject()
        .$loaded()
        .then(function(task) {
          
          // Create User-Tasks lookup record for RUNNER
          var obj = {
            taskId: taskId,
            type: false,
            title: task.title
          };

          return $firebase(ref.child('user_tasks').child(task.runner)).$push(obj);  
        }); 
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
    },

    completeTask: function(taskId) {
      var t = this.getTask(taskId);
      return t.$update({status: "completed"});
    },

    //checks if current user is a runner for a specific task/favor
    isAssignee: function(task) {
      return (user && user.provider && user.uid === task.runner); 
    },

    //checks whether a task is completed
    isCompleted: function(task) {
      return task.status === "completed";
    }

  };

  return Task;

});
