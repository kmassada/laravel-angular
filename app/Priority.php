<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
  protected $fillable=['name'];

  /**
   * [tasks description]
   * @return [type] [description]
   */
  public function tasks()
  {
      return $this->hasMany('App\Task');
  }
}
