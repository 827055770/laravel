<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Services\OSS;
class LunbotuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //轮播图列表
    public function index()
    {
        //查看表数据
        $lun=DB::table("lunbotu")->get();
        return view("Admin.lunbotu.index",['lun'=>$lun]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //加载模板
        return view("Admin.lunbotu.create");
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
        if($request->hasFile("img")){
            //获取上传资源
            $file=$request->file("img");
            //获取上传的临时资源目录
            $filepath=$file->getRealPath();
            //初始化名字
            $name=time().rand(1,10000);
            //获取后缀
            $ext=$request->file("img")->getClientOriginalExtension();
            //初始化名字-》当做oss上传以后的文件名字
            $newfile=$name.".".$ext;
            //使用oss
            OSS::upload($newfile,$filepath);

            $data=$request->except('_token');
            $data['img']="https://laravel6.oss-cn-beijing.aliyuncs.com/".$newfile;
            
            //入库
            if(DB::table("lunbotu")->insert($data)){
                return redirect("/lunbotu")->with("success","添加成功"); 
            }
            else{
                back()->with("error","添加失败");
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
        //查找表数据
        $info=DB::table("lunbotu")->where('id','=',$id)->first();
        //dd($info);
        return view("Admin.lunbotu.edit",['info'=>$info]);
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
        //判断是否有文件上传
        if($request->hasFile("img")){
            //获取上传资源
            $file=$request->file("img");
            //获取上传的临时资源目录
            $filepath=$file->getRealPath();
            //初始化名字
            $name=time().rand(1,10000);
            //获取后缀
            $ext=$request->file("img")->getClientOriginalExtension();
            //初始化名字-》当做oss上传以后的文件名字
            $newfile=$name.".".$ext;
            //使用oss
            OSS::upload($newfile,$filepath);

            $data=$request->except('_token','_method');
            $data['img']="https://laravel6.oss-cn-beijing.aliyuncs.com/".$newfile;
            if(DB::table('lunbotu')->where('id','=',$id)->update($data)){
                return redirect("/lunbotu")->with("success","修改成功");
            }else{
                return back()->with('error',"修改失败");
            }
    }
    else{
            $data=$request->except('_token','_method');
            if(DB::table('lunbotu')->where('id','=',$id)->update($data)){
                //echo "ok";
                return redirect("/lunbotu")->with("success","修改成功");
            }else{
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
        //数据库中查到此数据
        $info=DB::table("lunbotu")->where("id","=",$id)->first();
        //把阿里云OSS文件删除
        $pic = $info->img;
        //https://laravel6.oss-cn-beijing.aliyuncs.com/15915211282554.jpg
        //替换字符串操作
        $res=str_replace("https://laravel6.oss-cn-beijing.aliyuncs.com/","",$pic);
        //删除阿里云OSS文件只放入文件名
        //dd($res);
        OSS::deleteObject($res);

        //echo $id;
        if(DB::table('lunbotu')->where('id','=',$id)->delete()){
            return redirect("/lunbotu")->with("success","删除成功");
        }
        else{
            return back()->with("error","删除失败");
        }
    }
}
