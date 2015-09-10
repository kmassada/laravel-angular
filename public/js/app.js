'use strict';

// Declare app level module which depends on views, and components
angular.module('taskApp', [
  // 'ngRoute',
  'taskCtrl',
  'taskService',
])
// .config(['$routeProvider', function($routeProvider) {
// $routeProvider.when('/home', {
//     templateUrl: 'partials/home/index.html',
//     controller: 'HomeController'
//     })
//     .otherwise({redirectTo: '/home'});
// }]);
