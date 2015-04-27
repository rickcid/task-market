var app = angular.module('TaskMarketApp');
//'use strict';


app.controller('NavController', function($scope, $location, Auth, toaster) {

  $scope.currentUser = Auth.user;
  $scope.signedIn = Auth.signedIn;//Checks if user is signed in, uses method in 'Auth' service

  $scope.logout = function() {//This uses logout function from 'Auth'
    Auth.logout();
    toaster.pop('success', 'You have logged out successfully.');
    //console.log("Logged out!");
    $location.path('/');
  };



});