<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class PersonController extends Controller
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
        //查找users_id的信息
        //在session里找到user_id
        //查找此id的个人信息
        //echo "adsg";
        $user_id=session("user_id");
        //找到此用户的详情信息和信息
        $user=DB::table("users")->where("id",'=',$user_id)->first();
        $user_info=DB::table("users_info")->where('users_id','=',$user_id)->first();
        //dd($user_info);
        return view("Home.person.index",['info'=>$user_info,'user'=>$user]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //dd($request->all());
        //接收参数
        $id=$request->input("id");
        $data=$request->except("_token");
        unset($data['id']);
        //dd($data);
        $a=DB::table("users_info")->where('id','=',$id)->update($data);
        if($a){
            return redirect("/person/create");
        }
        else{
            echo "修改失败"."<a href='/person'>点击返回</a>";
        }
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
