<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class CommentController extends Controller
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
    //增评论
    public function commentadd($id){
        //接收id
        //echo "ojbk".$id;
        //查询当前登录的user_id
        //dd($id);
        $user_id=session("user_id");

        return view("Home.comment.create",['goods_id'=>$id,'user_id'=>$user_id]);
    }
    //增评论操作
    public function commentcreate(Request $request){
        
        //接收数据
        $data=$request->except("_token");
        //到这一步了就需要把订单状态改为完成
        //dd($data);
        $sta['status']=4;    
        $good=DB::table("order_goods")->where('id','=',$data['goods_id'])->first();
            //根据order_id修改订单表的状态
              DB::table("orders")->where('id','=',$good->order_id)->update($sta);
        //把数据插入数据库
        if(DB::table("comments")->insert($data)){
            //然后转到我的评价
            return redirect("/mycomment");
        }
    }
    //我的评论遍历
    public function mycomment(){
        //查询userid
        $user_id=session("user_id");
        //查询评价数据表
        //查询商品表是那个商品
        $comments=DB::table('comments')->where("user_id",'=',$user_id)->join("order_goods","comments.goods_id","=","order_goods.id")->select("comments.*","order_goods.*")->get();
        return view("Home.comment.mycomment",['comments'=>$comments]);

    }
}
