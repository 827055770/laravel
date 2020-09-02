<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        echo "哈哈哈";
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
    //勾选的数据入session
    public function accounts(Request $request){
        //清除session数据
        $request->session()->pull('goods');
        //获取arr
        $arr=$_GET['arr'];
        $data=array();
        //遍历
        foreach($arr as $key=>$value){
            //获取session
            $cart=session('cart');
            //遍历
            foreach($cart as $k=>$v){
                //判断
                if($value==$v['id']){
                    $data[$k]['num']=$cart[$k]['num'];
                    $data[$k]['id']=$value;
                }
            }
        }
        
        //把案由勾选数据的id和num存储在session里
        $request->session()->push("goods",$data);
        echo json_encode($data);
    }
    //这是结算加载页面
    public function insert(){
        //echo "jieduanye";
        $typm=array();
        $d=array();
        $allprice=0;
        //获取session里数据
        $good=session("goods");
        //把id和数量遍历
        foreach($good[0] as $k=>$v){
            $info=DB::table("shops")->where("id","=","$v[id]")->first();
            //var_dump($info);die;
            $typm['num']=$v['num'];
            $typm['name']=$info->name;
            $typm['pic']=$info->pic;
            $typm['price']=$info->price;
            //总计价格遍历一次加一次
            $allprice=$info->price*$v['num'];
            $d[]=$typm;
        }
        //首先获取用户的id
        $id=session("user_id");
        //获取用户的所有收货地址
        $address=DB::table("address")->where("users_id",'=',$id)->get();
        //var_dump($address);die;
        //var_dump($d);die;
        //获取默认收货地址status=1的默认地址
        $defuaddres=DB::table("address")->where("status","=",1)->where("users_id",'=',$id)->first();
        //dd($defuaddres);
        //加载结算页
        return view("Home.Order.index",['d'=>$d,'address'=>$address,"allprice"=>$allprice,"defuaddres"=>$defuaddres]);

    }
    public function insertorder(Request $request){
        //dd($request->all());
        //接收参数加入到订单表
        $order=$request->except("_token");
        //dd($order);
        $order['order_num']=time().rand(1,10000);
        $order['user_id']=session("user_id");
        $order['status']=0;
        //dd($order);
        //插入数据
        $id=DB::table('orders')->insertGetId($order);
        //dd($id);

        //在下单的同时向订单详情表插入数据
        if($id){
            $tmp=[];
            $d=[];
            $goods=session("goods");
            //dd($goods);
            foreach($goods[0] as $k=>$v){
                $good=DB::table("shops")->where('id','=',$v['id'])->first();
                $tmp['order_id']=$id;
                $tmp['goods_id']=$v['id'];
                $tmp['num']=$v['num'];
                $tmp['name']=$good->name;
                $tmp['pic']=$good->pic;
                $d[]=$tmp;
            }
            //插入数据
            if(DB::table("order_goods")->insert($d)){
                //echo "订单提交完毕";
                session(['order_id'=>$id]);
                //付款金额
                session(['tot'=>$order['tot']]);
                //收货地址id
                session(['address_id'=>$order['address_id']]);
                //调用支付接口
                pay($order['order_num'],'购买商品',0.01,'商品付款');

            }
        }
    }
    public function zhifuok(){
        //获取付款金额
        $tot=session("tot");
        //获取收货人信息
        $address_id=session('address_id');
        $address=DB::table('address')->where('id','=',$address_id)->first();
        //把order的状态修改为已付款
        $order_id=session("order_id");
        $data['status']=1;
        DB::table("orders")->where('id','=',$order_id)->update($data);
        return view("Home.Order.zhifuok",['tot'=>$tot,'address'=>$address]);
    }
}
