//'use strict';

var app = angular.module('TaskMarketApp', ['ngAnimate', 'ngResource', 'ngRoute', 'firebase', 'toaster', 'angularMoment']);
  
app.constant('FURL', 'https://task-market.firebaseIO.com')
  .run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the login page
      if (error === "AUTH_REQUIRED") {
        $location.path("/login");
      }
    });
  });  
  
app.config(function($routeProvider) {
  $routeProvider      
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'BrowseController'       
    })
    .when('/browse', {
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
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardController',
      resolve: {
        currentAuth: function(Auth) {
          return Auth.requireAuth();
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    });
});
