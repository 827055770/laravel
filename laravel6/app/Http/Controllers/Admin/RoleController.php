<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\RoleModel;
use App\Model\NodeModel;
use DB;
class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $role=RoleModel::get();
        //加载模板
        return view("Admin.Role.index",['role'=>$role]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view("Admin.Role.add");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        //接收传过来的参数
        $a=$request->except("_token");
        //dd($a);
        //把接收的参数添加进数据库
        if(DB::table("role")->insert($a))
        {
            return redirect("/role")->with("success","添加成功");
        }
        else{
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
        //echo $id;
        //如果id等于1
        if($id==1){
            return back()->with("error","此管理员不可删除");
        }
        else{
            //把数据删除
            if(DB::table("role")->where("id","=",$id)->delete()){
                return redirect("/role")->with("success","删除成功");
            }
            else{
                return back()->with("error","删除失败");
            }
        }
    }

    public function auth($id){
        //接收id
        //echo "$id";
        //获取角色信息
        $role=RoleModel::where("id",'=',$id)->first();
        //dd($node);
        //获取权限信息表
        $node=NodeModel::get();
        //dd($node);
        //获取当前角色已有的权限信息
        $data=DB::table("role_node")->where("rid","=",$id)->get();
        //dd($data);
        
        //判断是否有权限信息
        if(count($data)){
            //之前有权限
            //遍历
            foreach($data as $v){
                $nid[]=$v->nid;
            }
        //加载模板 把有权限信息的传过去
        return view("Admin.Role.auth",['role'=>$role,'node'=>$node,"nid"=>$nid]);
        }else{
        //加载模板 
        return view("Admin.Role.auth",['role'=>$role,'node'=>$node]);
        }    
    }
    public function saveauth(Request $request){
        //接收传过来的参数
        $rid = $request->input("rid");
        $nids = $request->input("nids");
        //dd($nids);
        //删除当前角色已有的权限信息
        DB::table("role_node")->where("rid","=",$rid)->delete();
        foreach($nids as $v){
            //封装需要插入的数据
            $data['rid']=$rid;
            $data['nid'] = $v;
            //数据插入
            DB::table("role_node")->insert($data);
        }
        
        return redirect("/role")->with("success","权限分配成功");
    }
}
