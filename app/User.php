<?php

namespace App;

use Hash;
use Auth;
use Carbon\Carbon;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract,
                                    AuthorizableContract,
                                    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'email', 'password', 'avatar'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    public function setPasswordAttribute($value)
    {
      $this->attributes['password'] = Hash::make($value);
    }

    /**
     * return given user role
     * @return Role
     */
    public function role() {
      return $this->belongsTo('\App\Role');
    }
    /**
     * return tasks
     * @return object Task
     */
    public function tasks() {
      return $this->hasMany('\App\Task');
    }

    /**
     * return acounts
     * @return object Account
     */
    public function accounts() {
      return $this->hasMany('\App\Account');
    }

    /**
     * [lastLogin description]
     * @return [type] [description]
     */
    public static function lastLoginDate() {
      $stat=User::lastLoginStat(Auth::user());
      return ($stat && $stat->last_login) ? $stat->last_login : Carbon::now();
    }
    /**
     * [lastLogin description]
     * @return [type] [description]
     */
    public static function lastLoginStat($user) {
      return Stat::where('user_id', $user? $user: Auth::user())->latest('created_at')->first();
    }
}
