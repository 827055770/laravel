<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\User;
//引入Hash
use Hash;
//引入mail
use Mail;
//引入第三方验证码类库
use Gregwar\Captcha\CaptchaBuilder;
class RegisterController extends Controller
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
      //前台注册
    public function create()
    {

        //前台注册页面
        return view("Home.Register.register");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    //邮箱发送方法
    public function sendemail($email,$id){
        Mail::send("Home.Register.jihuo",["id"=>$id],function($message)use($email){
            //发送的邮箱
            $message->to($email);
            //发送的主题
            $message->subject("账号激活");
        });
    }
    //前台注册验证码测试
    public function img(){
        ob_clean();//清除操作
    $builder = new CaptchaBuilder;
    //可以设置图片宽高及字体
    $builder->build($width = 100, $height = 40, $font = null);
    //获取验证码的内容
    $phrase = $builder->getPhrase();
    //把内容存入session
    session(['vcode'=>$phrase]);
    //生成图片
    header("Cache-Control: no-cache, must-revalidate");
    header('Content-Type: image/jpeg');
    $builder->output();
    
    }
    //前台注册提交
    public function store(Request $request)
    {   
        //获取验证码
        $code=$request->input("code");
        //获取session中的vcode
        $vcode=session('vcode');
        //判断验证码是否正确
        //var_dump($vcode);
        if($code==$vcode){
        //dd($request->all());
        //获取邮箱
        $data['email']=$request->input("email");
        $email=$request->input("email");
        //判断数据库里是否有重复的email
        if(user::where("email",'=',$email)->first()){
            return back()->with("error","已有此邮箱");
        }
        //接收密码
        $data['password']=$request->input("password");
        //加密密码
        $data['password']=Hash::make($data['password']);
        //dd($data);
        //用户名
        $data['username']=$data['email'];
        //是否激活
        $data['status']=0; //0代表未激活
        //插入数据
        $data1=user::create($data);
        $id=$data1->id;
        if($id){
            //echo "成功";
            //调用邮箱sendemail
            $a=$this->sendemail($data['email'],$id);
                echo "邮件已发送请去邮箱激活账号";
            
        }
    }else{
        return back()->with('error',"验证码错误");
    }
}
    public function jihuo1(Request $request){
        $id=$request->input('id');
        //echo $id;
        $data['status']=1;
        if(user::where('id','=',$id)->update($data)){
            echo "此账号已激活成功，可以使用了";
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
    //测试邮箱发送的方法
    public function send(){
        //echo "sadf";

        //发送原始字符串 $message消息生成器（里面有很多方法）
        Mail::raw("this is email ceshi",function($message){
            //发送的邮箱
            $message->to("827055770@qq.com");
            //发送的主题
            $message->subject("email ceshi");
        });
    }
    //发送视图的邮件
    public function sendview(){
        Mail::send("Home.Register.view1",["id"=>100],function($message){
            //发送的邮箱
            $message->to("827055770@qq.com");
            //发送的主题
            $message->subject("email ceshi");
        });
    }
    //需要单击访问的方法
    public function jihuo(Request $request){
        echo $request->input("id");
    }


    //前台手机判断是否重复
    public function checkphones(Request $request){
        $p=$request->input("p");
        //echo $p;
        //查出数据库一列的手机号作对比
        $phone=User::pluck("phone");
        //echo "<pre>";
        //var_dump($phone);
        $arr=array();
        //把phone转换为数组
        foreach($phone as $k=>$v){
            $arr[$k]=$v;
        }
        //判断手机号是否在数据库里
        if(in_array($p,$arr)){
            //如果在数据里返回ok
            return response()->json(['msg'=>'error']);
        }
        else{
            //如果不在返回error
            return response()->json(['msg'=>"ok"]);
        }
    }
    //手机号注册提交
    public function registers(Request $request){
        //接收参数
        //dd($request->all());
        $data['phone']=$request->input("phone");
        $password=$request->input("password1");
        $data['username']=$request->input("phone");
        $data['status']=0;
        $password=Hash::make($password);
        $data['password']=$password;
        if(user::create($data)){
            echo "成功";
        }else{
            echo "失败";
        }
    }
}
