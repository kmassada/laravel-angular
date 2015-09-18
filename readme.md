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

[Our Full Laravel/Angular CRUD App](https://github.com/kmassada/laravel-angular/tree/laravel-angular-1.3) is now capable of creating and editing a Task (Model), with schema variables that have a one to many and many to many structure

We now want to open for consideration, the user to our app.

#### prepare laravel for authentication

- create migration and tables for user,
- establish the relationship between user and task, `User::tasks -- hasMany()`, `Task::user -- belongsTo()`
- edit `create_task_migration` to include `user_id`
- create helper `Task::scopeOwn($query)` so user we can search quickly for user's tasks
- set a `TaskRequest::authorize()` so user can only see, edit or delete his / her tasks
- create helper `User::setPasswordAttribute` so that user's password gets hashed on save. just in case I forget to
- create `UserRequest` so we can validate a User signin request at all times

#### JWT.

the background is quite simple, imagine you authenticate a user vs your api, to verify he/she is a user,
password comes in perhaps encrypted, you verify user, now what? you redirect the user back to a resource?
How do you keep the auth procedure secure? How do you track user. Regardless of what solution you come with,

we talking CORS, JWT, Cookies or Session.

this is an excellent guide that put me in the right direction: [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)

here's our workflow

![Work Flow](https://dl.dropboxusercontent.com/u/1567633/github/Screenshot_2015-09-18_16.21.27.png)

for laravel we do the following

- Unlock Cross Origin Requests Using CORS
Before any request is even made to our api, we need cors to not worry about cross domain Requests

- User JWT for authenticating
we will use JWT for login and logout, it will also specify validity duration of token
we will use JWT to create the Token, retrun it to the view, and fetch the token, verify validity, serve Requests

[tymondesigns/jwt-auth](https://github.com/tymondesigns/jwt-auth)
[barryvdh/laravel-cors](https://github.com/barryvdh/laravel-cors)

- prepare packages jwt-auth and cors
follow both guides for jwt-auth from their git pages closely,
the secret to publish their config for both is to `php artisan vendor:publish --provider="PROVIDER?PATH"`
also if you get errors about resources not found, make sure you using `use JWTAuth;` or whatever package is named.
In .env I also create a variable called JWT_SECRET, that's a salt for JWT, same as one specified in the `config/jwt.php`
however I will change it, as soon as I upload this.  
also add error handlers like required to return JSON on invalid requests

- create routes, and controllers for login, logout
we create routes. Notice `jwt.auth` middleware, our tasks are not available unless you authenticate using jwt.
also note `signin` and `register` go hand in hand to the same controller. Everything under `v1/api` route

```php
Route::group(['prefix' => 'v1/api', 'middleware' => 'cors'], function(){
  Route::group(['middleware' => 'jwt.auth'], function(){
    Route::resource('tasks', 'TaskController');
    Route::get('/user',  ['uses' => 'UserAuthController@getAuthenticatedUser', 'as' => 'user.get.auth']);
  });
  Route::post('/register',  ['uses' => 'UserAuthController@register', 'as' => 'user.register']);
  Route::post('/signin',  ['uses' => 'UserAuthController@signin', 'as' => 'user.signin']);
});
```

#### Angular Side

- create login/register page
- set routes to go to login/register
- write service to request authentication
- once authenticated, we use Interceptors to bind bearer in the headers
- in the login/register controller, use authenticator service to submit api requests 


### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

### Credits LongList

- AUTH
[tymondesigns/jwt-auth](https://github.com/tymondesigns/jwt-auth)
[barryvdh/laravel-cors](https://github.com/barryvdh/laravel-cors)
[Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
[AUTH0 starter NodeJS/Angular AUTH app](https://github.com/auth0/angular-token-auth)
[Cookie free auth with jwt](http://www.toptal.com/web/cookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs)
[JWT Debugger](http://jwt.io)

- DEV HELPERS
[fzaninotto/Faker](https://github.com/fzaninotto/Faker)
[laracasts/Laravel-5-Generators-Extended](https://github.com/laracasts/Laravel-5-Generators-Extended)

- LARAVEL RESOURCES

- ANGULAR RESOURCES
[Interceptors in angularjs](http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/)
