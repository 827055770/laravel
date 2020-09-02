<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Cate\CateController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//导入OSS类
use App\Services\OSS;
//导入模型
use App\Model\ShopModel;
use DB;
class ShopsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //查询所有数据
        $shop=DB::table("shops")->join('cates','shops.cate_id','=','cates.id')->select("cates.id as cid","cates.name as cname","shops.id","shops.name","shops.pic","shops.descr","shops.num","shops.price","shops.host")->get();
        //dd($shop);
        //载入模板传数据
        return view("Admin.Shops.index",['shop'=>$shop]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //获取类别数据
        $cate=CateController::getCates();
        //载入添加模板
        return view("Admin.Shops.create",['cate'=>$cate]);
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
        //dd($request->all());
        $data=$request->except("_token");
        //判断是否上传文件
        if($request->hasFile('pic')){
        //获取上传的资源
        $file=$request->file("pic");
        //获取上传的临时资源目录
        $filepath=$file->getRealPath();
        //初始化名字
        $name=time()+rand(1,10000);
        //获取后缀
        $ext=$request->file("pic")->getClientOriginalExtension();
        //初始化名字=》当做OSS上传以后的文件名
        $newfile=$name.".".$ext;
        //使用OSS 第一个参数上传以后的文件名 第二个是临时资源目录
        OSS::upload($newfile,$filepath);
        //dd($data);
        $data['pic']="https://laravel6.oss-cn-beijing.aliyuncs.com/$newfile";
        $data1=ShopModel::create($data);
        $id=$data1->id;
        if($id){
            return redirect("/adminshops")->with("success","添加成功");
        }
        else{
            return back()->with("error","添加失败");
        }
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
        //dd($id);
        //获取数据
        $shops=ShopModel::where('id','=',$id)->first();
        //dd($shops);
        //获取类别数据
        $cate=CateController::getCates();
        //加载修改模板
        return view("Admin.Shops.edit",['shops'=>$shops,'cate'=>$cate]);
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
        //接收数据
        //dd($request->all());
        $data=$request->except("_token","_method");
        //判断是否上传文件
        if($request->hasFile('pic')){
            //获取上传的资源
            $file=$request->file("pic");
            //获取上传的临时资源目录
            $filepath=$file->getRealPath();
            //初始化名字
            $name=time()+rand(1,10000);
            //获取后缀
            $ext=$request->file("pic")->getClientOriginalExtension();
            //初始化名字=》当做OSS上传以后的文件名
            $newfile=$name.".".$ext;
            //使用OSS 第一个参数上传以后的文件名 第二个是临时资源目录
            OSS::upload($newfile,$filepath);
            //dd($data);
            $data['pic']="https://laravel6.oss-cn-beijing.aliyuncs.com/$newfile";
            $data1=ShopModel::where('id','=',$id)->update($data);
            if($data1){
                return redirect("/adminshops")->with("success","修改成功");
            }
            else{
                return back()->with('error',"修改失败");
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
        //echo $id;
        //查询数据表
        $info=ShopModel::where('id','=',$id)->first();
        //获取pic
        $pic=$info->pic;
        //dd($pic);
        //https://laravel6.oss-cn-beijing.aliyuncs.com/1591608951.jpg
        //替换字符串操作
        $pic=str_replace("https://laravel6.oss-cn-beijing.aliyuncs.com/","",$pic);
        //dd($pic);
        //删除阿里Oss的图片操作
        OSS::deleteObject($pic);
        //然后删除表里数据
        if(ShopModel::where('id','=',$id)->delete()){
            return redirect("/adminshops")->with("success","删除成功");
        }
        else{
            return back()->with("error","删除失败");
        }
    }

}