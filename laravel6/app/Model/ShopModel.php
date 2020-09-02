<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ShopModel extends Model
{
    //ShopModel模型类对应的数据表
    protected $table = "shops";
    //自动对updated_at 和created_at 做时间维护 默认为true
    public $timestamps=false;
    //批量赋值属性（用来声明需要添加的数据的字段，必须要声明）
    protected $fillable = ['name',"cate_id","descr","pic","num","price"];
}
