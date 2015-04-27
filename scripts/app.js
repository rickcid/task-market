//'use strict';

var app = angular.module('TaskMarketApp', ['ngAnimate', 'ngResource', 'ngRoute', 'firebase']);
  
app.constant('FURL', 'https://task-market.firebaseIO.com');
  
app.config(function($routeProvider) {
  $routeProvider      
    .when('/', {
      templateUrl: 'views/main.html'        
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AuthController'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'AuthController'
    })
    .when('/post', {
      templateUrl: 'views/post.html',
      controller: 'TaskController'
    })
    .when('/edit/:taskId', {
      templateUrl: 'views/edit.html',
      controller: 'TaskController'
    })
    .when('/browse', {
      templateUrl: 'views/browse.html',
      controller: 'TaskController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
