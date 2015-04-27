//'use strict';

var app = angular.module('TaskMarketApp', ['ngAnimate', 'ngResource', 'ngRoute', 'firebase', 'toaster']);
  
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
    .when('/browse', {
      templateUrl: 'views/browse.html',
      controller: 'TaskController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
