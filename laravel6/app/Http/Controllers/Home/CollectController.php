<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class CollectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //需判断一下当前登录的账号的id
        $id=session("user_id");
        //dd($id);
        //查询数据表
        //多表联查
        $collect=DB::table("collect")->where('user_id','=',$id)->join("users","collect.user_id",'=',"users.id")->join("shops","collect.good_id",'=','shops.id')->select("collect.id as cid","users.*","shops.*")->get();
        //dd($collect);
       // var_dump($user,$shop);die;
        //加载模块
        return view("Home.collect.index",['collect'=>$collect]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //ajax添加收藏
        //接收参数
        $user_id=$_GET['user_id'];
        $good_id=$_GET['good_id'];
        //echo $user_id;
        //echo $good_id;
        $data['user_id']=$user_id;
        $data['good_id']=$good_id;
        //添加到数据库
        if(DB::table("collect")->insert($data)){
            return response()->json(['msg'=>'ok']);
        }
        else{
            return response()->json(['msg'=>'error']);
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
        //删除传过来的id内容
        if(DB::table("collect")->where("id",'=',$id)->delete()){
            return redirect("/collect");
        }
        else{
            echo "失败";
        }
    }
}
