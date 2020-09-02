<?php

namespace App\Http\Controllers\Admin\Cate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use DB;
class CateController extends Controller
{
    public static function getCates(){
        $cate=DB::table("cates")->select(DB::raw('*,concat(path,",",id) as paths'))->orderBy("paths")->get();

        //添加分隔符
        foreach($cate as $k=>$v){
            //获取path值
            $path=$v->path;
            //echo $path."<br>";
            //把字符串转换成数组
            $arr=explode(",",$path);
            //echo "<pre>";
            //var_dump($arr); 
            
            //获取逗号个数
            $len=count($arr)-1;
            //echo $len;
            //重复字符串的函数 添加分隔符
            $cate[$k]->name=str_repeat("--|",$len).$v->name;
        
        }
        return $cate;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //获取无线分类数据
        //$cate=DB::table("cates")->get();
        
        //调整类别顺序
        //$cate = DB::select("select *,concat(path,',',id) as paths from cates order by paths;");
        //连贯方法(推荐 执行效率快)
        //在laravel框架里并没有concat连贯方法,使用raw的原始表达式，把原生态的sql语句转换成连贯操作
        $cate=DB::table("cates")->select(DB::raw('*,concat(path,",",id) as paths'))->orderBy("paths")->get();

        //添加分隔符
        foreach($cate as $k=>$v){
            //获取path值
            $path=$v->path;
            //echo $path."<br>";
            //把字符串转换成数组
            $arr=explode(",",$path);
            //echo "<pre>";
            //var_dump($arr); 
            
            //获取逗号个数
            $len=count($arr)-1;
            //echo $len;
            //重复字符串的函数 添加分隔符
            $cate[$k]->name=str_repeat("--|",$len).$v->name;
        
        }

        return view("Admin.Cate.index",["cate"=>$cate]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //获取分类数据
        //$cate=DB::table("cates")->get();
        $cate=self::getCates();
        //加载添加模块
        return view("Admin.Cate.add",['cate'=>$cate]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //获取除了_token的参数
        $data = $request->except("_token");
        //获取pid值
        $pid = $request->input("pid");
        //判断
        if($pid==0){
            //顶级分类
            //拼接 path
            $data['path']="0";
        }
        else{
            //添加的是子类
            //获取当前添加的子类的父类的数据
            $info = DB::table("cates")->where("id","=",$pid)->first();
            //拼接path
            $data['path']=$info->path.",".$info->id;
        }
    
    //入库
    if(DB::table("cates")->insert($data)){
        return redirect("/cate")->with("success","添加成功");
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
    {   //根据id差出数据
        $cate = DB::table("cates")->where('id','=',$id)->first();
        //dd($cate);
        //加载修改模块
        return view("Admin.Cate.edit",["cate"=>$cate]);
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
        //修改数据
        $a=$request->except('_token','_method');
        if(DB::table('cates')->where('id','=',$id)->update($a)){
            return redirect('/cate')->with("success","修改成功");
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
        //echo $id;
        //判断是否此类底下是否有子类
        $res=DB::table("cates")->where("pid",'=',$id)->count();
        //echo $res;
        if($res>0){
            return back()->with('error',"此分类不可删除请把下面的子类删除");
        }
        if(DB::table("cates")->where('id','=',$id)->delete()){
            return redirect("/cate")->with("success","删除成功");
        }
        
    }
}
