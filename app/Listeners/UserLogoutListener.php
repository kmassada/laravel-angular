<?php

namespace App\Listeners;

use App\Stat;
use App\User;
use Auth;
use Carbon\Carbon;
use App\Events;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserLogoutListener
{
    /**
     * Create the event handler.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Events  $event
     * @return void
     */
    public function handle() {
      if($stat=User::lastLoginStat()){
        // dd($stat->created_at->diff(Carbon::now())->format('%hh:%im:%ss'));
        $stat->duration=$stat->created_at->diff(Carbon::now())->format('%hh:%im:%ss');
        $stat->last_login = Carbon::now();
        $stat->save();
      }
    }
}
