<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Hash;
use App\User;
use Socialize;
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
      * [logout description]
      * @param  Request $request [description]
      * @return [type]           [description]
      */
     public function logout(Request $request)
     {
         \Auth::logout();
     }

     /**
      * [logout description]
      * @param  Request $request [description]
      * @return [type]           [description]
      */
     public function getAuthenticatedUser()
     {
         $user=$this->auth->parseToken()->toUser();
         return response()->json(compact('user'));
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

     public function redirectToProvider()
      {
          return Socialize::with('facebook')->redirect();
      }

      /**
      * Obtain the user information from Facebook.
      *
      * @return Response
      */
     public function handleProviderCallback()
     {
         try {
             $user = Socialite::driver('facebook')->user();
         } catch (Exception $e) {
             return redirect('auth/facebook');
         }

         $authUser = $this->findOrCreateUser($user);

         $credentials=[
           'email' => $authUser->email,
           'password' => $authUser->password,
         ];

         try {
             // attempt to verify the credentials and create a token for the user
             if (!$token = $this->auth->attempt($credentials)) {
                 return response()->json(['error' => 'invalid_credentials'], 401);
             }
         } catch (JWTException $e) {
             // something went wrong whilst attempting to encode the token
             return response()->json(['error' => 'could_not_create_token'], 500);
         }

         return response()->json(compact('token'));
     }

     /**
      * Return user if exists; create and return if doesn't
      *
      * @param $facebookUser
      * @return User
      */
     private function findOrCreateUser($facebookUser)
     {
         $authUser = User::where('facebook_id', $facebookUser->id)->first();

         if ($authUser){
             return $authUser;
         }

         return User::create([
             'name' => $facebookUser->name,
             'email' => $facebookUser->email,
             'facebook_id' => $facebookUser->id,
             'avatar' => $facebookUser->avatar
         ]);
      }

}
