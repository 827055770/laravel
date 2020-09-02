<?php

namespace App\Http\Controllers\Home;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class MyOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //首先查询userid
        $userid=session("user_id");
        //查询订单表
        $orders=DB::table("orders")->where("user_id",'=',$userid)->get();
        //dd($orders);
        //var_dump($orders);die;
        //查询订单表中的商品
        $orders_good=[];
        foreach($orders as $k=>$v){

        $orders_good[]=DB::table("order_goods")->where("order_id",'=',$v->id)->first();

        }
        //dd($orders_good);

        //var_dump($orders_good); die;
        return view("Home.MyOrder.index",['orders'=>$orders,'orders_good'=>$orders_good]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function waitpay(){
        //首先查询userid
        $userid=session("user_id");
        //查询订单表
        $orders=DB::table("orders")->where("user_id",'=',$userid)->where("status",'=',0)->get();
        //dd($orders);
        //var_dump($orders);die;
        //查询订单表中的商品
        $orders_good=[];
        foreach($orders as $k=>$v){
        $orders_good[]=DB::table("order_goods")->where("order_id",'=',$v->id)->first();

        }
        
        //dd($orders_good);

        //var_dump($orders_good); die;
        return view('Home.MyOrder.waitpay',['orders'=>$orders,'orders_good'=>$orders_good]);
    }


    //我的订单之待发货
    public function remind(){
        //首先查询userid
        $userid=session("user_id");
        //查询订单表代发货表
        $orders=DB::table("orders")->where("user_id",'=',$userid)->where("status",'=',1)->get();
        //dd($orders);
        //var_dump($orders);die;
        //查询订单表中的商品
        $orders_good=[];
        foreach($orders as $k=>$v){

        $orders_good[]=DB::table("order_goods")->where("order_id",'=',$v->id)->first();

        }
        
        //dd($orders_good);

        //var_dump($orders_good); die;
        return view('Home.MyOrder.waitpay',['orders'=>$orders,'orders_good'=>$orders_good]);
    }

    //我的订单之提醒发货
    public function tixingreceipt(){
        $id=$_GET["id"];
        //告诉管理员让他发货
        
        //然后返回数据
        echo $id;

    }
    //待收货界面
    public function daireceipt(){
        //首先查询userid
        $userid=session("user_id");
        //查询订单表代发货表
        $orders=DB::table("orders")->where("user_id",'=',$userid)->where("status",'=',2)->get();
        //dd($orders);
        //var_dump($orders);die;
        //查询订单表中的商品
        $orders_good=[];
        foreach($orders as $k=>$v){

        $orders_good[]=DB::table("order_goods")->where("order_id",'=',$v->id)->first();

        }
        
        //dd($orders_good);

        //var_dump($orders_good); die;
        return view('Home.MyOrder.daireceipt',['orders'=>$orders,'orders_good'=>$orders_good]);

    }
    //确认收货订单
    public function yesreceipt($id){
        //dd($id);
        $info=DB::table('orders')->where('id','=',$id)->first();
        //dd($info);
        //把状态改为3
        $data['status']=3;
        if(DB::table('orders')->where('id','=',$id)->update($data)){
            return redirect("/daiaccess");
        }
    }
    //待评价界面
    public function daiaccess(){
        //首先查询userid
        $userid=session("user_id");
        //查询订单表代发货表
        $orders=DB::table("orders")->where("user_id",'=',$userid)->where("status",'=',3)->get();
        //dd($orders);
        //var_dump($orders);die;
        //查询订单表中的商品
        $orders_good=[];
        foreach($orders as $k=>$v){

        $orders_good[]=DB::table("order_goods")->where("order_id",'=',$v->id)->first();

        }
        
        //dd($orders_good);

        //var_dump($orders_good); die;
        return view('Home.MyOrder.daiaccess',['orders'=>$orders,'orders_good'=>$orders_good]);
    }

    //我的订单里付款
    public function yespay($id){
        //echo $id;
        //查询此数据库
        $orders=DB::table('orders')->where('id','=',$id)->first();
        //dd($orders);
        //查看订单价格
        $tot=$orders->tot;
        //dd($tot);
        
                session(['order_id'=>$id]);
                //付款金额
                session(['tot'=>$tot]);
                //收货地址id
                session(['address_id'=>$orders->address_id]);
                //调用支付接口
                //第一个是订单号  第二个是描述   但三个是价钱  
                pay($orders->order_num,'购买商品',0.01,'商品付款');
    }

    
}
