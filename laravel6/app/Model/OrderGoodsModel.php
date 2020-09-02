<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class OrderGoodsModel extends Model
{
    //对应的表
    protected $table="order_goods";
    //是否维护时间戳
    public $timestamps="false";
    
}
