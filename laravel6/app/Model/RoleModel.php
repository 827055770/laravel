<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class RoleModel extends Model
{
    //指定对应的表
    protected $table = "role";
    //自动对update_at和时间做维护默认是true
    public $timestamps = false;
}
