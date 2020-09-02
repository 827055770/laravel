@extends("Home.public.public")

@section("homeinfo")
<script type="text/javascript" charset="utf-8" src="/static/Admin/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/static/Admin/ueditor/ueditor.all.min.js">
</script>
<!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
<!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加
载的中文，那最后就是中文-->
<script type="text/javascript" charset="utf-8" src="/static/Admin/ueditor/lang/zh-cn/zh-cn.js">
</script>
<div style="margin-top: 30px;width: 1068px; margin: 15px 0 30px 170px;">

    <div class="user-profile clearfix" style="margin-left: 0px;width: 100%;border: 0px;">
        <div class="user-profile-wrap" style="width: 100%;height: 500px;">
        
    <form action="/commentcreate" method="POST">
        
        <div style="margin-left: 70px;margin-top: 50px;">
            <span style="color: #F2873B;">&nbsp;&nbsp;&nbsp;</span><span class="titles">评论内容:</span>
        </div>
        <div style="margin-left: 150px;margin-top:-40px;">
            <script id="editor" type="text/plain" name="centent" style="width:700px;height:300px;">
            </script>
        </div>
        
        

        <div style="margin-left: 80px;margin-top: 10px;">
            <div class="am-u-sm-7 am-u-sm-offset-3" style="padding-right: 0rem;"> 
        <span class="title">评价:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="radio" name="status" value="2">好评
                    <input type="radio" name="status" value="1">中评
                    <input type="radio" name="status" value="0">差评
                    
        </div>
    <input type="hidden" name="user_id" value="{{$user_id}}">
    <input type="hidden" name="goods_id" value="{{$goods_id}}">
        {{csrf_field()}}
        <input id="buttonid" style="margin-left:150px;margin-top:10px;background-color:#F37B1D ;color: #fff;width: 100px;height: 30px;border: 0px;border-radius: 5px;" type="submit" value="发送评论">
        </div>

    </form>
        
    </div>
    </div>
    <script type="text/javascript">
        //实例化编辑器
        //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接
        //调用UE.getEditor('editor')就能拿到相关的实例
        var ue = UE.getEditor('editor');
        </script>
@endsection
@section("hometitle","评论页面")