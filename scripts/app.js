//'use strict';

var app = angular.module('TaskMarketApp', ['ngAnimate', 'ngResource', 'ngRoute', 'firebase', 'toaster', 'angularMoment']);
  
app.constant('FURL', 'https://task-market.firebaseIO.com');
  
app.config(function($routeProvider) {
  $routeProvider      
    /*.when('/', {
      templateUrl: 'views/main.html',
      controller: 'BrowseController'       
    })*/
    .when('/', {
      templateUrl: 'views/browse.html',
      controller: 'BrowseController'       
    })
    .when('/browse/:taskId', {
      templateUrl: 'views/browse.html',
      controller: 'BrowseController'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AuthController'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
