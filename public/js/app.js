'use strict';

// Declare app level module which depends on views, and components
angular.module('taskApp', [
  // 'ngRoute',
  'taskCtrl',
  'taskService',
  'ui.router',
  'ui.bootstrap',
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

        .state('tasks.edit', {
            url: '/tasks/:id/edit',
            templateUrl: 'partials/_tasks-edit.html'
        })

        .state('tasks.view', {
            url: '/tasks/:id',
            templateUrl: 'partials/_tasks-view.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
        });

});
