## Laravel PHP Framework

[![Build Status](https://travis-ci.org/laravel/framework.svg)](https://travis-ci.org/laravel/framework)
[![Total Downloads](https://poser.pugx.org/laravel/framework/d/total.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/framework/v/stable.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Unstable Version](https://poser.pugx.org/laravel/framework/v/unstable.svg)](https://packagist.org/packages/laravel/framework)
[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)

## Angular Framework

## Official Laravel Documentation

Documentation for the framework can be found on the [Laravel website](http://laravel.com/docs).

## Official Angular Documentation

Documentation for the framework can be found on the [Angular website](https://angularjs.org).

## PROJECT

We've created a [full CRUD Laravel App](https://github.com/kmassada/laravel-angular/tree/basic-laravel)

We made Laravel an [API serving app ](https://github.com/kmassada/laravel-angular/tree/basic-laravel-api)

We imported angular resources into our [hybrid app ](https://github.com/kmassada/laravel-angular/tree/angular-init)

now we focus on creating basic angular tasks, like fetching data from laravel's endpoints

first we cleanup the project structure, changing from MVW to MVVM, each controller a module of it's own,
```JS
angular.module('taskApp', [
  // 'ngRoute',
  'taskCtrl',
  'taskService',
])
```

we remove all the routing references. as a starter we are treating this app like a single page, so we move ng-app and ng-controller references

```html
<body class="container" ng-app="taskApp" ng-controller="mainController"> <div class="col-md-8 col-md-offset-2">
```

having the controller only apply to the body, different from our hybrid app architecture, where partials dictated that.

we create service like functions to make calls to the api. note the use of `$.param` to transform the object into parameters that api understands

```JS
// save a task (pass in task data)
    save : function(taskData) {
        // console.log($.param(taskData));
        return $http({
            method: 'POST',
            url: '/api/tasks',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
            data: $.param(taskData)
        });
    },
```

then in our mainController we use similar tactics. we make functions with scope that we call call in our `index.html`, that leverage the service

```JS
$scope.deleteTask = function(id) {
      $scope.loading = true;

      // use the function we created in our service
      Task.destroy(id)
          .success(function(data) {
```

### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
