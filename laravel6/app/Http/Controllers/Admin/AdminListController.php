<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class AdminListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lists=DB::table("lists")->get();
        return view("Admin.List.index",['lists'=>$lists]);
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
        //查询数据库
        $lists=DB::table("lists")->where('id','=',$id)->first();
        return view("Admin.List.edit",['lists'=>$lists]);
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
        //dd($request->all());
        //判断有没有图片上传
        if($request->hasFile("pic")){
            //初始化名字
            $name=time().rand(1,10000);
            //初始化文件名
            $upda=date("Ymd");
            //获取后缀
            $ext=$request->file("pic")->getClientOriginalExtension();
            //移动
            $request->file('pic')->move("./upload/$upda",$name.".".$ext);
            //接收数据

            $data=$request->except("_token","_method");
            $data['pic']=trim("./upload/$upda/".$name.".".$ext,'.');
            dd($data);
            //把数据入库
            if(DB::table("lists")->where('id','=',$id)->update($data)){
                return redirect("/adminlist")->with("success","修改成功");
            }
            else{
                return back()->with("error","修改失败");
            }
        }
        else{
            
            //接收数据
            $data=$request->except("_token","_method");
            //把修改数据入库
            if(DB::table("lists")->where('id','=',$id)->update($data)){
                return redirect("/adminlist")->with("success","修改成功");
            }
            else{
                return back()->with("error","修改失败");
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
        //删除操作
        //删除数据库的图片
        $lists=DB::table('lists')->where('id','=',$id)->first();
        $pic=$lists->pic;
        $pic='.'.$pic;
        if(DB::table('lists')->where('id','=',$id)->delete()){
            unlink($pic);
            return redirect("/adminlist")->with("success","删除成功");
        }
        else{
            return back()->with("error","删除失败");
        }
    }
}
