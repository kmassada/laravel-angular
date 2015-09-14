'use strict';

// Declare app level module which depends on views, and components
angular.module('taskApp', [
  // 'ngRoute',
  'taskCtrl',
  'taskService',
  'ui.router',
])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partials/_home.html'
        })

        // nested list with custom controller
        .state('home.credits', {
            url: '/credits',
            templateUrl: 'partials/_home-credits.html',
        })

        .state('tasks', {
            url: '/tasks',
            templateUrl: 'partials/_tasks.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
        });

});
// .config(['$routeProvider', function($routeProvider) {
// $routeProvider.when('/home', {
//     templateUrl: 'partials/home/index.html',
//     controller: 'HomeController'
//     })
//     .otherwise({redirectTo: '/home'});
// }]);
