var app = angular.module('TaskMarketApp');

app.factory('Comment', function(FURL, $firebase) {

  //reference to Firebase
  var ref = new Firebase(FURL);

  //comment that will be returned 
  var Comment = {

    //used to get comments belonging to a Task
    comments: function(taskId) {
      //goes to root node, then 'comments', then 'taskId'. Function $asArray() returns it as an array of the comments. similar to [commentId1, commentId2, etc..]
      return $firebase(ref.child('comments').child(taskId)).$asArray();
    }, 

    //adds a comment to a Task
    addComment: function(taskId, comment) {
      //first gets an array of comments for a task, assigns it to task_comments var.
      var task_comments = this.comments(taskId);
      //obtains a timestamp and sets it to the datetime comment property.
      comment.datetime = Firebase.ServerValue.TIMESTAMP;

      //Checks to see if task_comments exist
      if (task_comments) {
        //$add function adds the new comment to the firebase array
        return task_comments.$add(comment);
      }
    }

  };

  return Comment;

});