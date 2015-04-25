'use strict';

var app = angular.module('TaskMarketApp', ['ngAnimate', 'ngResource', 'ngRoute', 'firebase']);
  
app.constant('FURL', 'https://task-market.firebaseIO.com');
  
app.config(function($routeProvider) {
  $routeProvider      
    .when('/', {
      templateUrl: 'views/main.html'        
    })
    .when('/post', {
      templateUrl: 'views/post.html',
      controller: 'TaskController'
    })
    .when('/edit', {
      templateUrl: 'views/edit.html'
    })
    .when('/browse', {
      templateUrl: 'views/browse.html',
      controller: 'TaskController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
