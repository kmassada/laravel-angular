'use strict';

// Declare app level module which depends on views, and components
angular.module('taskApp', [
  'ui.router',
  'angular-loading-bar',
  'ngMessages',
])
.constant('url', {
   BASE: 'http://laravel5-ng.dev',
   BASE_API: 'http://laravel5-ng.dev/v1'
})
.run(function ($rootScope, $state, User){
     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        // if already authenticated...
        var isAuthenticated = User.isAuthenticated();
        // any public action is allowed
        var isPublicAction = angular.isObject(toState.data) && toState.data.isPublic === true;

        if (isPublicAction || isAuthenticated) {
            console.log("checking public routes/auth routes");
          return;
        }
        // stop state change
        console.log("stop route");
        event.preventDefault();
        // async load user
        User
           .getAuthObject()
           .then(function (user) {
              var isAuthenticated = user.isAuthenticated === true;
              if (isAuthenticated) {
                console.log("fukeri");
                // let's continue, use is allowed
                console.log(user.data);
                $rootScope.user=user.data;
                $state.go(toState, toParams);
                return;
              }
              // log on / sign in...
              $state.go("login");
          });
  });
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
            templateUrl: 'partials/_home.html',
            data: { isPublic: true },
        })

        // nested list with custom controller
        .state('home.credits', {
            url: '/credits',
            templateUrl: 'partials/_home-credits.html',
            data: { isPublic: true },
        })

        .state('tasks', {
            url: '/tasks',
            templateUrl: 'partials/_tasks.html',
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
            controller: 'UserAuthController',
            data: { isPublic: true },
        })
        .state('logout', {
            url: '/logout',
            controller: 'UserAuthController',
            onEnter: function($scope){
                console.log("logout");
                $scope.logout;
            }
        })

        .state('register', {
            url: '/register',
            templateUrl: 'partials/_home-register.html',
            controller: 'UserAuthController',
            data: { isPublic: true },
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
        });


});
