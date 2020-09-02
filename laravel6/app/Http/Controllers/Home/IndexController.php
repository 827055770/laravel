<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\ShopModel;
use DB;
class IndexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    //无限分类递归的核心代码
    public static function getcatesBypid($pid){
        $cate=DB::table("cates")->where("pid","=",$pid)->get();
        $data=[];
        //遍历
        foreach($cate as $key=>$value){
            //获取子类信息
            $value->suv=self::getcatesBypid($value->id);
            $data[]=$value;
        }
        return $data;
    }



    public function index()
    {
        //遍历商品      暂时放到猜你喜欢里
        $shops=DB::table("shops")->get();
        //热销商品
        $shop=DB::table("shops")->where("host","=","1")->get();
        //dd($shop);
        //echo "asdf";
        //获取当前顶级分类下所有的子类信息(无限分类递归)
        $cate=self::getcatesBypid(0);

        //前台友情链接
        $lists=DB::table("lists")->where("status","=","1")->get();

        //前台轮播图
        $chart=DB::table("chart")->where("status",'=',"1")->get();
        //公告数据库查询
        $articles=DB::table("articles")->get();
        //广告模块大的查询
        $poster=DB::table("poster")->where('seat','=','da')->where("status",'=',1)->first();
        //广告模块小的查询
        $posters=DB::table("poster")->where('seat','=','xiao')->where("status",'=',1)->get();
        //dd($poster);
        //轮播图查询
        $lunbotu=DB::table("lunbotu")->where("status","=","1")->get();
        //dd($lunbotu);
        //加载前台页面
        return view("Home.Index.index",['cate'=>$cate,'shop'=>$shop,'shops'=>$shops,'lists'=>$lists,'chart'=>$chart,'articles'=>$articles,'poster'=>$poster,'posters'=>$posters,"lunbotu"=>$lunbotu]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //dd($id);
        //查询数据
        $shop=ShopModel::where('id','=',$id)->first();
        //dd($shop);
        //多表联查点赞数
        $give=DB::table("give")->where('id','=',$shop->id)->first();
        //统一性全部转成数组
        //判断是否为空
        if($give==null){
            //新建数据数据表
            $data['goods_id']=$id;
            $data['give_num']=1;
            DB::table("give")->insert($data);

            $give=DB::table("give")->where('id','=',$shop->id)->first();
            //前台详情页
            $user_id=session("user_id");
            //dd($user_id);
            return view("Home.Index.homeinfo",['shop'=>$shop,'user_id'=>$user_id,'give'=>$give]);
            
        }else{
            //前台详情页
            $user_id=session("user_id");
            //dd($user_id);
            return view("Home.Index.homeinfo",['shop'=>$shop,'user_id'=>$user_id,'give'=>$give]);
        }
        //var_dump($give);die;
        
        //DB::table("shops")->where('shops.id','=',$id)->join("give","shops.id","=","give.goods_id")->select("shops.*","give.*")->first();
        //dd($shop);
        
    }
    //评论页
    public function comments($id){
        //echo $id;
        //查询数据
        $shop=ShopModel::where('id','=',$id)->first();
        //dd($shop);

        //查询数据
        $comments=DB::table("shops")->where('shops.id','=',$id)->join("order_goods","order_goods.goods_id",'=','shops.id')->join("comments","comments.goods_id",'=','order_goods.id')->join("users",'users.id','=',"comments.user_id")->select('shops.*','order_goods.*','comments.status as cstatus','comments.*',"users.*")->get();
        //dd($comments);
        

    
       
        return view("Home.Index.comments",['comments'=>$comments,'shop'=>$shop]);
}

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
*/
    public function edit($id)
    {
        
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
    //友情链接添加
    public function list(){
        return view("Home.Index.listadd");
    }

    //友情链接入库
    public function listadds(Request $request){
        //接收数据
        //1.判断是否有文件上传
        if($request->hasFile("pic")){
            //初始化名字
            $name=time().rand(1,10000);
            //初始化文件名
            $upda=date("Ymd");
            //获取后缀
            $ext=$request->file("pic")->getClientOriginalExtension();
            //移动
            $request->file('pic')->move("./upload/$upda",$name.".".$ext);
            //接收数据
            $data=$request->except("_token");
            $data['pic']=trim("./upload/$upda/".$name.".".$ext,'.');
            //dd($data);
            //把数据入库
            if(DB::table("lists")->insert($data)){
                return redirect("/index")->with("success","ok");
            }
            else{
                return back()->with("error","失败");
            }

        }
    }
    public function chartindex(){
        

    }
    //详情页点赞模块
    public function addgive(){
        //接收参数
        $good_id=$_GET['good_id'];
        $give_id=$_GET['give_id'];
        //echo $good_id,$give_id;
        //首先查询此数据库的give_num是几
        $num=DB::table('give')->where('id','=',$give_id)->first();
        
        //修改数据库把give_num添加加一
        $data['give_num']=$num->give_num+1;
        //echo $data['give_id'];
        if(DB::table('give')->where('id','=',$give_id)->update($data))
        {
            return response()->json(['msg'=>'ok']);
        }
        else{
            return response()->json(['msg'=>'no']);
        }
    }
    public function delgive(){
        $give_id=$_GET['give_id'];
        //echo $give_id;
        //首先查询此数据库的give_num是几
        $num=DB::table('give')->where('id','=',$give_id)->first();
        
        //修改数据库把give_num添加加一
        $data['give_num']=$num->give_num-1;
        //echo $data['give_id'];
        if(DB::table('give')->where('id','=',$give_id)->update($data))
        {
            return response()->json(['msg'=>'ok']);
        }
        else{
            return response()->json(['msg'=>'no']);
        }
    }
}