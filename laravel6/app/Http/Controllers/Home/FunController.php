<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FunController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //测试laravel下的云之讯发送短信验证码
        sendsphone("15344466651");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendphone(Request $request){
        $p=$request->input("p");
        //echo $p;
        sendsphone($p);
    }
    public function checkphone(Request $request){
        //获取输入的校验码
        $code=$request->input("code");
        //作对比
        if(isset($_COOKIE['fcode'])&&!empty($code)){
            //获取发送的校验码
            $fcode=$request->cookie("fcode");
            if($fcode==$code){
                //返回json响应数据
                return response()->json(['msg'=>'ok']);
            }else{
                return response()->json(['msg'=>'error']);
            }
        }else if(empty($code)){
            return response()->json(['msg'=>'empty']);
        }else{
            return response()->json(['msg'=>'timeout']);
        }
    }

    public function create()
    {
        return view("Home.Register.register");
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
}
