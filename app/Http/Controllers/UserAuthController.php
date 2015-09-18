<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Hash;
use App\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Requests;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;

class UserAuthController extends Controller
{
    protected $auth;

    public function __construct(JWTAuth $auth)
    {
      $this->auth = $auth;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
     function restricted() {
         $token = JWTAuth::getToken();
         $user = JWTAuth::toUser($token);

         return response()->json([
             'data' => [
                 'email' => $user->email,
                 'registered_at' => $user->created_at->toDateTimeString()
             ]
         ]);
     }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
     function signin(Request $request) {
        {
           // grab credentials from the request
           $credentials = $request->only('email', 'password');
          //  $credentials['password']=Hash::make($credentials['password']);
           try {
               // attempt to verify the credentials and create a token for the user
               if (! $token = $this->auth->attempt($credentials)) {
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
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
     function register(UserRequest $request) {

        // $credentials = $request->only('name','email', 'password');

        try {
            $user = User::create($request->all());
        } catch (Exception $e) {
            return response()->json(['error' => 'User already exists.'], HttpResponse::HTTP_CONFLICT);
        }

        $token = $this->auth->fromUser($user);

        return response()->json(compact('token'));
     }

     private function getAuthenticatedUser()
      {
          try {

              if (! $user = JWTAuth::parseToken()->authenticate()) {
                  return response()->json(['user_not_found'], 404);
              }

          } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

              return response()->json(['token_expired'], $e->getStatusCode());

          } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

              return response()->json(['token_invalid'], $e->getStatusCode());

          } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

              return response()->json(['token_absent'], $e->getStatusCode());

          }

          // the token is valid and we have found the user via the sub claim
          return response()->json(compact('user'));
      }
}
