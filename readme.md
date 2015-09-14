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

We've built the [angular app ](https://github.com/kmassada/laravel-angular/tree/laravel-angular-1.0)where we can leverage laravel for crud operations. As discussed

Our [Laravel App](https://github.com/kmassada/laravel-angular/tree/laravel-angular-1.1) is now capable of creating a task, with tags, and priorities.

The [Full App](https://github.com/kmassada/laravel-angular/tree/laravel-angular-1.2) is now capable of submitting a task, that contain a list of tags, and one priority.

in this revision we accomplish few tasks

- we use the same form for edit and create in our angular controller

we first create 2 new Factory prototypes in our service handler `taskService.js` hence, one for creating a single task, the other one for updating a task:

```JS
// get single tasks
show : function(id) {
    return $http.get('/api/tasks/' + id);
},
// update a task (pass in task data)
    update : function(taskData) {
        // console.log($.param(taskData));
        return $http({
            method: 'PUT',
            url: '/api/tasks/' + taskData.id,
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
            data: $.param(taskData)
        });
    },

```

the value `$scope.currentTask` gets set when the user clicks on edit, we use angular's `ng-click` to perform a Task.show collect a single element, and pass it's values to the form.

```html
<a href="#/tasks" ng-click="editTask(task.id)" class="text-muted">Edit</a></p>
```

we then modify the `createTask` function to `addOrEditTask` where we check for  `$scope.currentTask` and either update or create
we also secretly handle the item id we received from `$scope.currentTask` during the GET

```JS
if ($scope.currentTask) {
        $scope.taskData.id=$scope.currentTask.id;
        Task.update($scope.taskData)
        ....
```
- we also included ui-bootstrap-tpls which is angular's bootstrap class.

this was an attempt to make the page more esthetic. failed miserably :-p

### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
