'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'appControllers',
]).
config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/home', {
    templateUrl: 'partials/home/index.html',
    controller: 'HomeController'
    })
    .otherwise({redirectTo: '/home'});
}]);
