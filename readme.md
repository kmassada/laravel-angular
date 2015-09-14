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

We have to fix angular to support adding this

- eager loading
we eager load the JSon response and adapt view so that list can show tags, and priority

```php
$tasks=Task::with('priority','tags')->get();
```

- send more data [tag options, and priority options]

the login forms require options for Priority or tags, we send that in with list of tags

```php
$data['tasks']=Task::with('priority','tags')->get();
$data['priorities']=Priority::all();
$data['tags']=Tag::all();
```

```php
$data['tasks']=Task::with('priority','tags')->get();
$data['priorities']=Priority::all();
$data['tags']=Tag::all();
return response()->json($data);
```

- adapt form to contain selects

learned about angular `ng-model` to bind to a data, and `ng-repeat` for loops, and `ng-options` preferable for selects

```HTML
<select type="text" class="form-control input-lg" name="priority_id" ng-model="taskData.priority_id">
<option ng-repeat="option in taskPriorityOptions" value="{{ option.id }}">{{ option.name }}</option>
</select>
```

- test API

while troubleshooting, a form POST on a tool like postman,  we need to submit an array,
simulates `[3,4]`
```
Name=tag_list[]
Value=3
Name=tag_list[]
Value=4
```

### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
