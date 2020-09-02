<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class MyAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //首先查看登录的userid
        $userid=session("user_id");
        //查找表users_id等于登录的id遍历
        $address=DB::table("address")->where("users_id",'=',$userid)->get();
        return view("Home.myaddress.index",['address'=>$address]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //首先查找登录的userid
        $userid=session("user_id");
        //查找表里面此userid是否有默认的
        $data=DB::table("address")->where("users_id",'=',$userid)->where('status','=',1)->first();
        //dd($data);
        //加载模块
        return view("Home.myaddress.create",['userid'=>$userid],['data'=>$data]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //接收数据
        //dd($request->all());
        $data=$request->except("_token");
        //dd($data);
        //把收货地址放到一起
        $data['huo']=$data['ddss'].$data['huo'];
        //删除传过来的ddss
        unset($data['ddss']);
        //dd($data);
        //查询当前登录的user_id
        $userid=session("user_id");
        //添加到数据库
        $data['users_id']=$userid;
        if(DB::table("address")->insert($data)){
           return redirect("/myaddress");
        }
           echo "失败";
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
        //dd($id);
        //查看登录用户的id
        $userid=session('user_id');
        
        //根据userid和status查看是否有默认的
        $data=DB::table("address")->where('users_id','=',$userid)->where("status",'=',1)->first();
        //dd($data);
        //查询当前id数据库里的数据
        $address=DB::table("address")->where('id','=',$id)->first();
        //dd($address);
        return view("Home.myaddress.edit",['address'=>$address,'data'=>$data]);
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
        //echo $id;
        //接收参数
        $data=$request->except("_token","_method");
        //如果传过来的ddss就删除
        if(empty($data['ddss'])){
            unset($data['ddss']);
            $a=DB::table("address")->where("id",'=',$id)->update($data);
             if($a){
                return redirect("/myaddress");
                   }
            else{
            echo "修改失败";
                }
        }else{
        //dd($data);
        //如果不是空的话就链接
        $data['huo']=$data['ddss'].$data['huo'];
        //更新数据库数据
        $a=DB::table("address")->where("id",'=',$id)->update($data);
        if($a){
            return redirect("/myaddress");
        }
        else{
            echo "修改失败";
        }
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
        //数据库删除
        if(DB::table("address")->where('id','=',$id)->delete()){
             return redirect("/myaddress");
        }
        else{
            echo "删除失败";
        }
    }

}
