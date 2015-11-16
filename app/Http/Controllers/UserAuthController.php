<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Hash;
use App\User;
use Socialite;
use App\Account;
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

        $credentials = $request->only( 'name', 'email', 'password');
        $credentials[ 'password' ] = bcrypt( $credentials[ 'password' ] );

        try {
            $user = User::create($credentials);
        } catch (Exception $e) {
            return response()->json(['error' => 'User already exists.'], HttpResponse::HTTP_CONFLICT);
        }

        if ( isset( $request['provider'] ) && isset( $request['provider_id'] ) && isset( $request['provider_token'] ) ) {
            $user->accounts()->save( new Account( [
                'provider' => $request['provider'],
                'provider_id' => $request['provider_id'],
                'access_token' => $request['provider_token'],
            ] ) );
        }

        $token = $this->auth->fromUser($user);

         return response()->json(compact('token'));
     }

     public function redirectToProvider($provider)
      {
          return Socialite::with($provider)->redirect();
      }

      /**
      * Obtain the user information from Facebook.
      *
      * @return Response
      */
     public function handleProviderCallback($provider, Request $request) {
         // try to find the account who wants to login or register
         $social_user = Socialite::driver( $provider )->user();
         $social_account = Account::where( 'provider', $provider )->where( 'provider_id', $social_user->id )->first();
         // if the account exists, either answer with a redirect or return the access token
         // this decision is made when we are checking if the request is an AJAX request
         \Log::info($provider);
         \Log::info($social_user->id);


         if( $social_account )
         {
            \Log::info('social_account');
             $user = $social_account->user;
             if ( ! $request->ajax() )
             {
                 return redirect( env( 'FRONTED_URL' ) . '/#/register?token=' . $this->auth->fromUser( $user ), 302 );
             }
             return response( $this->auth->fromUser( $user ), 200 );
         }

         if ($social_user){
           $user_exists = User::where('email',$social_user->user['email'])->first();
           if($user_exists){
           if ( isset( $provider ) && isset( $social_user->id ) && isset( $social_user->token ) ) {
               $user_exists->accounts()->save( new Account( [
                   'provider' => $provider,
                   'provider_id' => $social_user->id,
                   'access_token' => $social_user->token,
               ] ) );
           }
               if ( ! $request->ajax() )
               {
                   return redirect( env( 'FRONTED_URL' ) . '/#/register?token=' . $this->auth->fromUser( $user_exists ), 302 );
               }
               return response( $this->auth->fromUser( $user_exists ), 200 );
            }
        }

         // the account does not exist yet.

         // redirect to frontend, if user is coming per link, adding contents for form fields
         if ( ! $request->ajax() )
         {
           \Log::info('no acccount');

             return redirect( env( 'FRONTED_URL' ) .
                 '/#/register?first_name=' . $social_user->user['first_name'] .
                 '&last_name=' . $social_user->user['last_name'] .
                 '&email=' . $social_user->user['email'] .
                 '&gender=' . ( ( 'male' === $social_user->user['gender'] ) ? 'm' : 'f' ) .
                 '&provider=' . $provider .
                 '&provider_id=' . $social_user->id .
                 '&provider_token=' . $social_user->token
                 , 302 );
         }
         // otherwise return the data as json
         return response( array(
             'first_name' => $social_user->user['first_name'],
             'last_name' => $social_user->user['last_name'],
             'email' => $social_user->user['email'],
             'gender' => ( ( 'male' === $social_user->user['gender'] ) ? 'm' : 'f' ),
             'provider' => $provider,
             'provider_id' =>  $social_user->id,
             'provider_token' => $social_user->token,
         ), 200 );
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
         if (isset($authUser)){
             return $authUser;
         }


         return User::create([
             'name' => $facebookUser->name,
             'email' => $facebookUser->email,
             'facebook_id' => $facebookUser->id,
             'password' => $this->generateRandomString(12),
             'avatar' => $facebookUser->avatar
         ]);
      }
      private function generateRandomString($length = 10) {
          $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
          $charactersLength = strlen($characters);
          $randomString = '';
          for ($i = 0; $i < $length; $i++) {
              $randomString .= $characters[rand(0, $charactersLength - 1)];
          }
          return $randomString;
      }

}
