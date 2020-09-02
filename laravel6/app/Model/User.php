<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    //User模型类对应的数据表
    protected $table = "users";
    //自动对应updated_at和created_at做时间的维护 默认是true
    public $timestamps = true;
    //批量复制属性(用来声明需要添加的数据的字段，必须要声明)
    protected $fillable = ["username","password","email","phone","status"];

    public function getStatusAttribute($value){
        //处理status字段的状态
        $status=[0=>"未激活",1=>"已激活",2=>"已禁止"];
        //返回处理后的数据结果
        return $status[$value];
    }

    //会员和会员详情关联
    public function info(){
        //'App\Model\Userinfo' 需要关联的模型类   user_id关联数据
        return $this->hasOne("App\Model\Userinfo","users_id");
    }

    //获取会员模块下所有的收货地址
    public function address(){
        return $this->hasMany('App\Model\Useraddress','users_id');
    }



}
