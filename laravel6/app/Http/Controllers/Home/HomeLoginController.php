<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\User;
use Hash;
use Mail;
class HomeLoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //加载登录模板
        return view("Home.Login.login");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //接收登录模块传过来的参数
        //dd($request->all());
        $email=$request->input("email");
        $password=$request->input("password");
        $info=user::where('email','=',$email)->first();
        if($info){
            if(Hash::check($password,$info->password)){
                $status = $info->status;
                if($status=='已激活'){
                    session(["username"=>$email]);
                    $id=$info->id;
                    session(["user_id"=>$id]);
                    $username=$info->username;
                    return redirect("/index");
                    
                }
                else{
                    return back()->with("error","此用户还没有被激活");
                }
            }
            else{
                return back()->with("error","用户名或密码错误");
            }
        }
        else{
            return back()->with("error","用户名或密码错误");
        }
    }

    public function loginout(Request $request){
        
        $request->session()->flush();
        return redirect("/index");
        
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
    //邮箱发送方法
    public function sendemail($email,$id){
        Mail::send("Home.Login.reset",["id"=>$id],function($message)use($email){
            //发送的邮箱
            $message->to($email);
            //发送的主题
            $message->subject("重置密码密码");
        });
    }


    public function forget(){
        return view("Home.Login.forget");
    }

    public function doforget(Request $request){
        $email = $request->input("email");
        //dd($email);
        $info=user::where("email",'=',$email)->first();
        $id=$info->id;
        $res=$this->sendemail($email,$id);
            echo "重置密码已发送到您的邮箱请,去您的邮箱查看.";
        
    }

    public function reset(Request $request){
        //var_dump($request->all());
        //接收模板
        $id=$request->input('id');
        //加载模板
        return view("Home.Login.forreset",['id'=>$id]);
    }
    public function doreset(Request $request){
        //接收参数
        //dd($request->all());
        $id = $request->input('id');
        $password = $request->input('password');
        $data['password']=Hash::make($password);
        $a=user::where('id','=',$id)->update($data);
        if($a)
        {
            //修改成功 返回到登录界面
            return redirect("/login/create")->with("xiugai","修改成功");
        }
    }
}
