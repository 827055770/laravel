<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Model\RoleModel;
use Hash;
class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { 
        //查询数据
        $admin_user = DB::table("admin_users")->get();
        //dd($admin_users);
        //获取用户角色
        $rote=DB::table("user_role")->where("rid","=",1)->first();
        return view("Admin.AdminUser.index",['admin_user'=>$admin_user,"rote"=>$rote]);
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //管理员添加
        return view("Admin.AdminUser.add");
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
        $a=$request->except("_token");
        $a['password']=Hash::make($a['password']);
        //存入数据库
        if(DB::table("admin_users")->insert($a))
        {
           return redirect("/admin")->with("success","添加成功");
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
        //echo $id;
        //数据库
        $data=DB::table("admin_users")->where("id",'=',$id)->first();
        //dd($admin_users);
        return view("Admin.AdminUser.edit",['data'=>$data]);
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
        //修改数据库
        if(DB::table("admin_users")->where("id",'=',$id)->update($data)){
            return redirect("/admin")->with("success","修改成功");
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

    //ajax删除
    public function del(Request $request){
        //获取id
        //$id=$request->input("id");
        $id=$_GET['id'];
        //echo $id;
        //echo json_encode($id);
        if(DB::table("admin_users")->where("id","=",$id)->delete()){
            //echo "1";            
            return response()->json(['msg'=>'ok']);
        }else{
            return response()->json(['msg'=>'error']);
        }
    }
    public function role($id){
        //echo $id;
        
        $user = DB::table("admin_users")->where("id","=",$id)->first();
        //获取所有的角色
        $role = RoleModel::get();
        //获取当前用户已有的角色信息
        $data=DB::table('user_role')->where("uid","=",$id)->get();
        //判断

        //用户以前有角色
        if(count($data)){
            //遍历
            foreach($data as $v){
                $rids[]=$v->rid;
            }
        
        //加载模板
        return view("Admin/AdminUser/role",['user'=>$user,'role'=>$role,"rids"=>$rids]);
    }
    else{
        return view("Admin/AdminUser/role",['user'=>$user,'role'=>$role,"rids"=>array()]);
    }
    }
    public function saverole(Request $request){
        //向user_role 插入数据 uid rid
        //获取uid
        $uid = $request->input("uid");
        //获取分配的角色id数组
        $rids = $_POST['rids'];
        DB::table('user_role')->where('uid','=',$uid)->delete();
        //var_dump($rids);
        //遍历
        foreach($rids as $key=>$v){
            //封装要插入的数据
            $data['uid']=$uid;
            $data['rid']=$v;
            DB::table("user_role")->insert($data);
        }
        return redirect("/admin")->with("success","分配成功");
    }
}
