'use strict';

// Declare app level module which depends on views, and components
angular.module('taskApp', [
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
])
.constant('url', {
   BASE: 'http://laravel5-ng.dev',
   BASE_API: 'http://laravel5-ng.dev/v1'
})

.config(function($stateProvider, $httpProvider, $urlRouterProvider, cfpLoadingBarProvider) {

    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;

    $httpProvider.interceptors.push('authInterceptor');

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

        .state('users', {
            url: '/users',
            templateUrl: 'partials/_users.html'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'partials/_home-login.html',
            controller: 'UserAuthController'
        })

        .state('register', {
            url: '/register',
            templateUrl: 'partials/_home-register.html',
            controller: 'UserAuthController'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
        });


});
