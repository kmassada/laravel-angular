'use strict';

// Declare app level module which depends on views, and components
angular.module('taskApp', [
  'ui.router',
  'angular-loading-bar',
  'ngMessages',
  'ui.bootstrap',
   'ui.bootstrap.modal',
])
.constant('url', {
   BASE: 'http://laravel5-ng.dev',
   BASE_API: 'http://laravel5-ng.dev/v1'
});
