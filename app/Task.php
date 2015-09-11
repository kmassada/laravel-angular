<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  protected $fillable=['title','notes'];

  public function priority()
  {
      return $this->hasOne('App\Priority');
  }
}
