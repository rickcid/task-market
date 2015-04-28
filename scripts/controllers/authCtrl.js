var app = angular.module('TaskMarketApp');
//'use strict';

app.controller('AuthController', function($scope, $location, Auth, toaster) {

  if (Auth.signedIn()) {
    $location.path('/');
  }

  $scope.register = function(user) {
    Auth.register(user).then(function() {//promise, once successfully registers, then console log
      toaster.pop('success', 'You have registered successfully.');
      //console.log("Register successfully!");
      $location.path('/dashboard');
    }, function(err) {
      toaster.pop('error', 'Oops, something went wrong!');
      //console.log("Error...");
    });
  };

  $scope.login = function(user) {
    Auth.login(user).then(function() {
      toaster.pop('success', 'You have logged in successfully.');
      //console.log("Logged in successfully!");
      $location.path('/dashboard');
    }, function(err) {
      toaster.pop('error', 'Oops, something went wrong!');
      //console.log("Error...");
    });
  };

  $scope.changePassword = function(user) {

    Auth.changePassword(user).then(function() {

      //This resets modal form
      $scope.user.email = '';
      $scope.user.oldPass = '';
      $scope.user.newPass = '';

      toaster.pop('success', "Password change was successfull.");
      //console.log("Password changed successfully!");
    }, function(err) {
      toaster.pop('error', 'Oops, something went wrong!');
      //console.log("Error...");
    });
  };

});