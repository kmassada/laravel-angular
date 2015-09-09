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


## PROJECT

We've created a [full CRUD Laravel App](https://github.com/kmassada/laravel-angular/tree/basic-laravel)

now we focus on changing the resources to act like an api.

add an api prefix to our controller

```
Route::group(['prefix' => 'api'], function(){
  Route::resource('tasks', 'TaskController');
});
```

for routes being redirected we change the response from redirect to displaying success

```
return response()->json(array('success' => true));
```

and for views, we return json objects

```
return response()->json($tasks);
```

make sure your handlers return JSON for 404 or catch * all messages,

```
return response()->Json([
    'message' => 'Record not found',
], 404);
```

make laravel look elsewhere for views.

```
// config/view.php
...
realpath(base_path('public/views')),
...
```

### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
