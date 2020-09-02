<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\ShopModel;
use DB;
class HomeCartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { 
        //查看session
        $cart=session("cart");
        $data1=array();
        if(!empty($cart)){
        //dd($cart);
        
        foreach($cart as $k=>$v){
            //查询传过来的id表数据
            $info=ShopModel::where('id','=',$v['id'])->first();
            //dd($info);
            $data['id']=$v['id'];
            $data['name']=$info['name'];
            $data['pic']=$info['pic'];
            $data['descr']=$info['descr'];
            $data['num']=$v['num'];
            $data['price']=$info['price'];
           //多条记录的话需要把东西存到二维数组
            $data1[]=$data;
        }
        //dd($data1);
        }
        //dd($data1);
        //加载模板  分配值
        return view("Home.Cart.index",['data1'=>$data1]);
    }
    


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
        public function create()
    {
        
    }
    //去重方法
    public function checkExists($id){
        //遍历session里数据
        $data=session("cart");
        if(empty($data)){
            return false;
        }
        foreach($data as $k=>$v){
            
            if($v['id']==$id){
                return true;
            }
        }
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {    
        //接收商品传过来的数据
        $data=$request->except("_token");
        //dd($data);
        if(!$this->checkExists($data['id'])){
        //把购买的商品参数(id num)传到session里
        $request->session()->push("cart",$data);
        }

        
        //到购物车页面
        return redirect("/cart");
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
        //接收传过来的id
        //echo $id;
        $data=session("cart");
        foreach($data as $k=>$v){
            if($v['id']==$id){
            unset($data[$k]);
            }
            session(['cart'=>$data]);
            //再把数据写回
        }
        return redirect("/cart");
    }
    public function cartdelete(Request $request){
        $request->session()->pull("cart");
        return redirect("/cart");
    }
    //ajax减操作
    public function cartjianjian(Request $request){
        $id=$request->input("id");
        //echo $id;
        //获取数据库的单价
        $a=ShopModel::where('id','=',$id)->first();
        $d=$a->price;
        //session做减操作
        //获取session
        $data=session("cart");
        //遍历
        foreach($data as $k=>$v){
            //判断 作对比
            if($v['id']==$id){
                //该商品的数量减一
                $data[$k]['num']-=1;
                //判断如果数量小于1也等于1
                if($data[$k]["num"]<1){
                    $data[$k]['num']=1;
                }
                //把数据从新存入到session里
                session(["cart"=>$data]);
                //返回封装后的数量和金额
                $data1['num']=$data[$k]['num'];
                $data1['tot']=$data[$k]['num']*$d;
                //echo $data[$k]['num'];
                //把减一后的数量值返回
                return response()->json($data1);
            }
            
        }
        
        
        

    }
    //ajax加加操作
    public function cartjiajia(Request $request){
        //接收传过来的id
        $id=$request->id;
        //echo $id;
        //查询数据库
        $info=ShopModel::where('id','=',$id)->first();
        //查询单价
        $p=$info->price;
        //查询数据库的num存库
        $nn=$info->num;
        //查session数据
        $cart=session("cart");
        //dd($cart);
        //遍历数据
        foreach($cart as $k=>$v){
            if($v['id']==$id){
                $cart[$k]['num']+=1;
                if($cart[$k]['num']>=$nn){
                    $cart[$k]['num']=$nn;
                }
                //echo $cart[$k]['num'];
                //把数据存入到session里
                session(['cart'=>$cart]);
                //把数据打包传json里
                $data['num']=$cart[$k]['num'];
                $data['tot']=$p*$data['num'];
                //把加一的数据返回
                return response()->json($data);
            }
        }

    } 
    public function carttot(Request $request){
        //echo json_encode($_GET['arr']);
        //判断
        if(isset($_GET['arr'])){
            //累积的总价格
            $sum=0;
            //累积的选中的数量
            $nums=0;
            //遍历数组  遍历出来id
            foreach($_GET['arr'] as $value1){
                //获取session的数据
                $data=session('cart');
                //遍历
                foreach($data as $key=>$value){
                    //判断
                    if($value['id']==$value1){
                        //获取单价和数量
                        $num=$data[$key]['num'];
                        //获取数据库数据
                        $info=DB::table("shops")->where("id","=",$value1)->first();
                        //获取价格
                        $price=$info->price;
                        //计算每条数据的总计
                        $tot=$price*$num;
                        //总价格累加
                        $sum+=$tot;
                        //总计数量的累加
                        $nums+=$num;
                    }
                }
            }
            //封装数据
            $data2['nums']=$nums;
            $data2['sum']=$sum;
            return response()->json($data2);
        }
        else{
            $data2['nums']=0;
            $data2['sum']=0;
            return response()->json($data2);
        }
    }
}
