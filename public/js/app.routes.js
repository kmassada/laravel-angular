angular.module('taskApp')
.config(routes);

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

function routes($stateProvider, $urlRouterProvider) {

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
            controller: 'TaskController',
            controllerAs: 'taskCtrl',
            templateUrl: 'partials/_tasks.html',
        })

        .state('tasks.edit', {
            url: '/tasks/:id/edit',
            controller: 'TaskController',
            controllerAs: 'taskCtrl',
            templateUrl: 'partials/_tasks-edit.html',
        })

        .state('register', {
            url: '/register',
            templateUrl: 'partials/_home-register.html',
            controller: 'UserAuthController',
            controllerAs: 'userCtrl',
            data: { isPublic: true },
        });
}
