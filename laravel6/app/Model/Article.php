<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    //指定对应的表
    protected $table = "articles";
    //自动对update_at和时间做维护默认是true
    public $timestamps = false;
    //批量赋值属性 (用来声明需要添加的数据的字段,必须要声明)
    protected $fillable = ['title','editor','descr','pic'];
}
