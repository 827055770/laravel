<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Hash;
class AdminLoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //销毁session
        $request->session()->pull("islogin");
        return redirect("/adminlogin/create");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //加载登录模块
        return view("Admin.adminlogin");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //接受数据
        //$a = $request->except("_token");
        //dd($a);
        //获取name
        $name=$request->input("name");
        //获取输入的密码
        $password=$request->input("password");
        //查询数据库有没有
        $info = DB::table("admin_users")->where("name","=",$name)->first();
        //获取加密的密码
        //var_dump($info);die;
        
        //var_dump($hashpassword);die;
        if($info){
            //echo "管理员ok";
            //检测密码
            $hashpassword=$info->password;
            if(Hash::check($password,$hashpassword)){
               //echo "账号密码ok"; 
               //把登录的用户名存储在session里
               session(['islogin'=>$name]);
               //权限管理1.获取登录管理员的所有权限信息 5表联查
               $list=DB::select("select n.name,n.mname,n.aname from user_role as ur,role_node as rn,node as n where ur.rid=rn.rid and rn.nid=n.id and uid={$info->id}");
               //dd($list);
               //2.初始化权限
               //把访问后台首页的权限初始化
               $nodelist['IndexController'][]="index";
                //遍历
                foreach($list as $v){
                    //把权限写入到$nodelist 二维数组下
                    $nodelist[$v->mname][]=$v->aname;
                    //判断如果权限里有create方法 添加store
                    if($v->aname=="create"){
                        $nodelist[$v->mname][]="store";
                    }
                    if($v->aname=="edit"){
                        $nodelist[$v->mname][]="update";
                    }
                    
                }
                //dd($nodelist);
                //3.把初始化的权限信息存储在session里
                session(['nodelist'=>$nodelist]);

                
               return redirect("/adminindex")->with("success","登录成功");
            }else{
                return back()->with("error","管理员名字或密码有误");
            }
        }
        else{
            return back()->with("error","管理员名字或密码有误");
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
