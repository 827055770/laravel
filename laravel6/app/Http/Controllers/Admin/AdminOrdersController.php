<?php

namespace App\Http\Controllers\Admin;
use App\Model\OrdersModel;
use App\Model\OrderGoodsModel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminOrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //用模型查表
        $orders=OrdersModel::get();
        //dd($orders);
        return view("Admin.Orders.index",["orders"=>$orders]);
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
        //根据id查找表数据
        $order=OrdersModel::where('id','=',$id)->first();
        //加载模板
        return view("Admin.Orders.edit",['order'=>$order]);
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {   //接收数据
        //dd($request->all());
        $status=$request->input("status");
        //echo $status;
        //更新数据表
        $data['status']=$status;
        $ok=OrdersModel::where('id','=',$id)->update($data);
        if($ok){
           return redirect("/adminorders")->with("success","状态修改成功");
        }
        else{
           return back()->with("error","修改失败");
        }
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
    public function ordergoods($id){
        //echo $id;
        //查找表
        $ordergoods=OrdersModel::find($id)->orderinfo;
        //dd($ordergoods);
        //把数据分配到模板
        return view("Admin.Orders.orderinfo",['ordergoods'=>$ordergoods]);
    }
}
