<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class OrdersModel extends Model
{
    //对应的表
    protected $table="orders";
    //是否维护时间戳
    public $timestamps="false";
    //修改器 对数据库数据自动做转换
    public function getStatusAttribute($value){
        $status=[0=>'已下单未支付',1=>'已支付',2=>'已发货',3=>'已收货',4=>'完成订单'];
        return $status[$value];
    }
    //获取当前订单下所有的详情
    public function orderinfo(){
        return $this->hasMany("App\Model\OrderGoodsModel","order_id");
    }

    
}
