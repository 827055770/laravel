<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminUserinsert;
use Illuminate\Http\Request;
use Hash;
use App\Model\User;//导入Users表对应的模型类
use App\Http\Requests\AdminUsersinsert;//导入表单校验请求类
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        //获取当前数据的所有分页
        //获取数据的总条数
        $count=User::count();
        //初始化每页的数据条数
        $rev=2;
        //获取最大的页
        $maxpage=ceil($count/$rev);
        //echo $maxpage;
        $pp=array();
        //遍历
        for($i=1;$i<=$maxpage;$i++){
            $pp[$i]=$i;
        }
        //获取页码
        $page=$request->input("page");
        //判断
        if(empty($page)){
            $page=1;
        }
        //获取偏移量
        $offset=($page-1)*$rev;
        //准备sql语句
        $data=User::offset($offset)->limit($rev)->get();
        //echo $page;
        //判断是否是Ajax请求 返回值为true表示请求为ajax请求
        if($request->ajax()){
            return view("Admin.User.ajaxpage",['data'=>$data]);
        }
        
        return view("Admin.User.index",['pp'=>$pp,'data'=>$data]);
    
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //添加
        return view("Admin.User.add");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AdminUserinsert $request)
    {
        //数据插入
        // echo "this is store";
        $data=$request->except(['repassword','_token']);
        //密码加密
        $data['password']=Hash::make($data['password']);
        //默认去添加状态
        $data['status']=0;//0=>未激活 1=》已经激活

        //使用模型类入库
        if(User::create($data)){
            return redirect("/adminuser")->with("success","添加成功");

        }else{
            return back()->with("error","添加失败");

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
        //echo $id;
        $userinfo=User::find($id)->info;
        //dd($userinfo);
        //分配数据到视图里
        return view("Admin.User.info",['userinfo'=>$userinfo]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //echo $id;
        //获取需要修改的数据
        $data = User::where("id","=",$id)->first();
        //加载模板  分配数据
        return view("Admin.User.edit",["data"=>$data]);
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
        //获取所有的参数
        //dd($request->all());
        $data=$request->except(['_token','_method']);
        $data['status']=0;
        //执行修改
        if(User::where("id","=",$id)->update($data)){
            return redirect("/adminuser")->with("success","修改成功");
        }
        else{
            return back();
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
        if(User::where("id","=",$id)->delete()){
            return redirect("/adminuser")->with("success","删除成功");
        }
        else{
            return redirect("/adminuser")->with("error","删除失败");
        }
    }

    //获取会员收货地址
    public function address($id){
         //echo $id;
        $address=User::find($id)->address;
        //dd($address);
        //加载视图 分配数据
        return view("Admin.User.address",['address'=>$address]);

    }
}
