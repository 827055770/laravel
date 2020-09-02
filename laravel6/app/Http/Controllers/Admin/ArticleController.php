<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Model\Article;
use App\Services\OSS; //导入oss类
use Illuminate\Routing\Route;
use Intervention\Image\ImageManager;//导入图片处理类
use Illuminate\Support\Facades\Redis;//引入Redis类
class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $arts=[];
        //初始化哈希表名和链表的名字
        $listKey="Lists:phper";//链表名字=》存储id
        $hashKey="Hashs:phper";//哈希表名=》存储公告的数据
        //判断链表里是否有id
        if(Redis::exists($listKey)){
            //获取id集合
            $lists=Redis::lrange($listKey,0,-1);
            //遍历id
            foreach($lists as $k=>$v){
                //根据遍历的id获取哈希表数据 每获取到一条吧数据添加到数组里
                $arts[]=Redis::hgetall($hashKey.$v);
            }
        }else{
            //缓存服务器没有数据  获取数据库数据=》给缓存服务器一份
            //查询公告表转换为数组格式
            $arts=Article::get()->toArray();
            //把数据库处理过的数据给缓存服务器一份
            //做遍历
            foreach($arts as $key=>$value){
                //把id存储在redis的链表集合里 $listKey
                Redis::rpush($listKey,$value['id']);
                //把数据放在哈希表里
                Redis::hmset($hashKey.$value['id'],$value);

            }
        }
        
        //dd($arts);
        //列表模块
        return view("Admin.article.index",['arts'=>$arts]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //加载模板
        return view("Admin.article.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
       /* //1.判断是否有文件上传
        if($request->hasFile("pic")){
            //初始化名字
            $name=time().rand(1,10000);
            //初始化文件名
            $upda=date("Ymd");
            //获取后缀
            $ext=$request->file("pic")->getClientOriginalExtension();
            //移动
            $request->file('pic')->move("./upload/$upda",$name.".".$ext);
            //图片剪切和图片水印处理
            //实例化图片处理类
            $manager=new ImageManager();
            //图片剪切
            $manager->make("./upload/$upda"."/".$name.".".$ext)->resize(100,100)->save("./upload/$upda"."/"."r_".$name.".".$ext);
            //图片水印
            //$manager->make("./upload/$upda"."/".$name.".".$ext)->insert("./upload/logo.jpg","'bottom-right",100,200)->save("./upload/$upda"."/"."r_".$name.".".$ext);*/
            
            //接收数据
            /*$data=$request->except("_token");
            $data['pic']=trim("./upload/$upda".$name.".".$ext,'.');
            //dd($data);
            //插入数据
            if(article::create($data)){
                redirect("/adminarticle")->with("succrss","添加成功");
            }else{
                echo "失败";
            }
            */

            //阿里云方法图片的上传
            //1.判断有没有上传目录
            if($request->hasFile("pic")){
                //获取上传资源
                $file=$request->file("pic");
                //获取上传的临时资源目录
                $filepath=$file->getRealPath();
                //初始化名字
                $name=time().rand(1,10000);
                //获取后缀
                $ext=$request->file("pic")->getClientOriginalExtension();
                //初始化名字-》当做oss上传以后的文件名字
                $newfile=$name.".".$ext;
                //使用oss
                OSS::upload($newfile,$filepath);

                $data=$request->except('_token');
                $data['pic']="https://laravel6.oss-cn-beijing.aliyuncs.com/".$newfile;
                
                //入库
                $data1=article::create($data);
                $id=$data1['id'];
                $data['id']=$id;
                //dd($data1);
                //初始化哈希表名和链表的名字
                $listKey="Lists:phper";
                $hashKey="Hashs:phper"; 
                //添加链表
                Redis::rpush($listKey,$id);
                //添加哈希数据表
                Redis::hmset($hashKey.$id,$data);
                if($id){
                    return redirect("/adminarticles")->with("success","添加成功"); 
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
        //查询数据
        $data=Article::where('id','=',$id)->first();
        return view("Admin.article.edit",['data'=>$data]);
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
            //阿里云方法图片的上传
            //1.判断有没有上传目录
            if($request->hasFile("pic")){
                //获取上传资源
                $file=$request->file("pic");
                //获取上传的临时资源目录
                $filepath=$file->getRealPath();
                //初始化名字
                $name=time().rand(1,10000);
                //获取后缀
                $ext=$request->file("pic")->getClientOriginalExtension();
                //初始化名字-》当做oss上传以后的文件名字
                $newfile=$name.".".$ext;
                //使用oss
                OSS::upload($newfile,$filepath);

                $data=$request->except("_token","_method");
                $data['pic']="https://laravel6.oss-cn-beijing.aliyuncs.com/".$newfile;
                
                //更新数据库
                $data1=Article::where('id','=',$id)->update($data);
                //dd($data1);
                //初始化哈希表名和链表的名字
                $listKey="Lists:phper";
                $hashKey="Hashs:phper"; 
                $dd[]=$id;
                //修改链表
                Redis::hmset($listKey,$dd);
                //修改哈希数据表
                Redis::hmset($hashKey.$id,$data);
                if($id){
                    return redirect("/adminarticles")->with("success","修改成功"); 
                }
                else{
                    back()->with("error","修改失败");
                }
                
                
            }
        //接收参数
        $data=$request->except("_token","_method");
                
        //更新数据库
        if(Article::where('id','=',$id)->update($data)){
            $dd[]=$id;
            //初始化名字
            $listKey="Lists:phper";
            $hashKey="Hashs:phper"; 
            //修改链表
            Redis::hmset($listKey,$dd);
            //修改哈希数据表
            Redis::hmset($hashKey.$id,$data);
            return redirect("/adminarticles")->with("success","修改成功");
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
        //接收传过来的参数
        //echo $id;
        //数据库中查到此数据
        $info=Article::where("id","=",$id)->first();
        //把阿里云OSS文件删除
        $pic = $info->pic;
        //https://laravel6.oss-cn-beijing.aliyuncs.com/15915211282554.jpg
        //替换字符串操作
        $res=str_replace("https://laravel6.oss-cn-beijing.aliyuncs.com/","",$pic);
        //删除阿里云OSS文件只放入文件名
        OSS::deleteObject($res);
        
        //初始化哈希表名和链表的名字
        $listKey="Lists:phper";
        $hashKey="Hashs:phper";
        
        //删掉缓存服务器的数据
            //干掉链表里的id
            Redis::lrem($listKey,0,$id);
            //干掉哈希表里的数据
            Redis::del($hashKey.$id);
        if(Article::where("id","=",$id)->delete()){
            return redirect("/adminarticles")->with("success","删除成功");
        }
        else{
            return back()->with("error","删除失败");
        }
    }


    public function del(Request $request){
        //接收id
        
        $id=$request->input("id");
        if($id){
         //echo json_encode($id);
        foreach($id as $k=>$v){
            $info = Article::where("id",'=',$v)->first();
            $pic=$info->pic;
            //https://laravel6.oss-cn-beijing.aliyuncs.com/15914372442684.jpg
            //替换字符串操作
            $ress=str_replace("https://laravel6.oss-cn-beijing.aliyuncs.com/","",$pic);
            //echo $ress;
            //删除阿里云OSS的文件只放入文件名
            OSS::deleteObject($ress);
            //初始化哈希表名和链表的名字
            $listKey="Lists:phper";
            $hashKey="Hashs:phper";
            //删掉缓存服务器的数据
            //干掉链表里的id
            Redis::lrem($listKey,0,$v);
            //干掉哈希表里的数据
            Redis::del($hashKey.$v);
            Article::where("id",'=',$v)->delete();
        }
            return response()->json(['msg'=>'ok']);
        }else{
            return response()->json(['msg'=>'no']);
        }
    }
    //测试redis
    public function redis(){
        //之前研究过的redis数据类型都可以使用
        //存入字符串
        //Redis::set("name","abc");
        //获取字符串数据
        echo Redis::get("name");
    }
}
