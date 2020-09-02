<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
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
    //获取城市级联
    public function address(Request $request){
        //获取upid
        $upid=$request->input("upid");
        //获取数据
        $address=DB::table('district')->where("upid","=",$upid)->get();
        echo json_encode($address);
    }

    //添加收货地址
    public function insert(Request $request){
        //获取数据
        $data=$request->except("_token");
        //dd($data);
        //在session里获取user_id
        $user_id=session("user_id");
        $data['users_id']=$user_id;
        $data['huo']=$data['ddss'].$data['huo'];
        unset($data['ddss']);
        //dd($data);
        if(DB::table("address")->insert($data)){
           return redirect("/order/insert");
        }
        else{
            echo "失败";
        }
        //把数据存入道数据库

    }
    public function chooseaddres(Request $request){
        //接收地址id
        $address_id=$request->input('address_id');
        //echo $address_id;
        //查询表
        $address=DB::table("address")->where('id','=',$address_id)->first();
        return response()->json($address);
    }
}
