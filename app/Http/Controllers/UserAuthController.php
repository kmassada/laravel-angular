<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Hash;
use App\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Requests\UserRequest;

class UserAuthController extends Controller
{
    protected $auth;

    /**
     * [__construct description].
     *
     * @param JWTAuth $auth [description]
     */
    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

     /**
      * [signin description].
      *
      * @param  Request $request [description]
      *
      * @return [type]           [description]
      */
     public function signin(Request $request)
     {
         {
           // grab credentials from the request
           $credentials = $request->only('email', 'password');
           try {
               // attempt to verify the credentials and create a token for the user
               if (!$token = $this->auth->attempt($credentials)) {
                   return response()->json(['error' => 'invalid_credentials'], 401);
               }
           } catch (JWTException $e) {
               // something went wrong whilst attempting to encode the token
               return response()->json(['error' => 'could_not_create_token'], 500);
           }

           // all good so return the token
           return response()->json(compact('token'));
        }
     }

     /**
      * [register description].
      *
      * @param  UserRequest $request [description]
      *
      * @return [type]               [description]
      */
     public function register(UserRequest $request)
     {

        try {
            $user = User::create($request->all());
        } catch (Exception $e) {
            return response()->json(['error' => 'User already exists.'], HttpResponse::HTTP_CONFLICT);
        }

         $token = $this->auth->fromUser($user);

         return response()->json(compact('token'));
     }
}
