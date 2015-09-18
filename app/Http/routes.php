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
  Route::resource('tasks', 'TaskController');
  Route::post('/register',  ['uses' => 'UserAuthController@register', 'as' => 'user.register']);
  Route::post('/signin',  ['uses' => 'UserAuthController@signin', 'as' => 'user.signin']);
});
Route::post('/user',  ['uses' => 'UserAuthController@getAuthenticatedUser', 'as' => 'user.get.auth']);
Route::get('/restricted', ['before' => 'jwt.auth',  'uses' => 'UserAuthController@location', 'as' => 'home.location']);

// Route::group(['domain' => 'api.jwt.dev', 'prefix' => 'v1'], function () {
//    Route::get('/restricted', function () {
//        try {
//            App\JWTAuth::parseToken()->toUser();
//        } catch (Exception $e) {
//            return response()->json(['error' => $e->getMessage()], HttpResponse::HTTP_UNAUTHORIZED);
//        }
//
//        return ['data' => 'This has come from a dedicated API subdomain with restricted access.'];
//    });
// });
