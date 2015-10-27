<?php

namespace App\Listeners;


use App\Stat;
use App\User;
use Auth;
use Carbon\Carbon;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserLoginListener
{
    /**
     * Create the event handler.
     *
     * @return void
     */
    public function __construct() {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Events  $event
     * @return void
     */
    public function handle(User $user, $remember) {
      $this->collectStat();
    }
    private function collectStat() {
      //collect stats on users
      $stat=new Stat;
      $stat->user_id = Auth::user()->email;
      $stat->last_login = User::lastLoginDate();
      $stat->ip = $_SERVER['REMOTE_ADDR'];
      $stat->browser = $_SERVER['HTTP_USER_AGENT'];
      $stat->save();
    }
}
