<?php

namespace App;

use Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class Task extends Model
{
  protected $fillable=['user_id', 'title','notes','priority_id','status'];

  /**
   * [priority description]
   * @return [type] [description]
   */
  public function priority()
  {
      return $this->belongsTo('App\Priority');
  }
    /**
   * [tags description]
   * @return [type] [description]
   */
  public function tags() {
      return $this->belongsToMany('App\Tag');
  }

  /**
 * [scopeDue description]
 * @param  [type] $query [description]
 * @return [type]        [description]
 */
  public function scopeOwn($query) {
    $query->where('user_id', Auth::id());
  }

  /**
   * [findByUser description]
   * @param  [type] $id [description]
   * @return [type]     [description]
   */
  public static function findByUser($id) {
  $task=Task::where('id', $id)
      ->where('user_id', Auth::id())
      ->first();

      if (!$task){
          throw new ModelNotFoundException;
      }
      return $task;
  }

  /**
   * [user description]
   * @return [type] [description]
   */
  public function user() {
    return $this->belongsTo('App\User');
  }
}
