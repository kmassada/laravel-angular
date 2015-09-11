<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  protected $fillable=['title','notes','priority_id'];

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
}
