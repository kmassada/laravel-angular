<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index','hello');
});

Route::group(['prefix' => 'v1/api', 'middleware' => 'cors'], function(){
  Route::group(['middleware' => 'jwt.auth'], function(){
    Route::resource('tasks', 'TaskController');
    Route::get('/user',  ['uses' => 'UserAuthController@getAuthenticatedUser', 'as' => 'user.get.auth']);
  });
  Route::post('/register',  ['uses' => 'UserAuthController@register', 'as' => 'user.register']);
  Route::post('/signin',  ['uses' => 'UserAuthController@signin', 'as' => 'user.signin']);
});
