@extends("Home.public.public")

@section("homeinfo")
<div style="margin-top: 30px;width: 1068px; margin: 15px 0 30px 170px;">

    <div class="user-profile clearfix" style="margin-left: 0px;width: 100%;border: 0px;">
        <div class="user-profile-wrap" style="width: 100%;height: 500px;">
            <div style="margin-left: 70px;margin-top: 30px;height: 30px;">
                <span style="color: #F2873B;">*&nbsp;</span><span class="titles">所在地区:</span>
                <select id="cid"> 
                <option class="ss"></option> 
                 </select> 
            </div>
        
        <form action="/myaddress/{{$address->id}}" method="POST">
        <div style="margin-left: 70px;margin-top: 50px;">
            <span style="color: #F2873B;">*&nbsp;</span><span class="titles">详细地址:</span>
        </div>
        <div style="margin-left: 150px;margin-top:-40px;">
            <textarea name="huo" style="width:500px;height: 90px;padding: 5px;" placeholder="建议您如实填写详细收货地址，例如街道 名称，门牌号码，楼层和房间号等信息">{{$address->huo}}</textarea>
        </div>
        
        <div style="margin-left: 55px;margin-top: 30px;">
            <span style="color: #F2873B;">*</span>
            <span class="titles">收货人姓名:</span>
        <input type="text" name="name" value="{{$address->name}}" placeholder="长度不超过25个字符" style="padding: 5px;width: 300px;margin-left: 14px;">
        </div>
        <div style="margin-left: 80px;margin-top: 30px;">
            <span class="titles">手机号码:</span>
        <input type="text" name="phone" value="{{$address->phone}}" placeholder="电话号码、手机号码必须填一项" style="padding: 5px;width: 200px;">
        </div>

        <div style="margin-left: 80px;margin-top: 10px;">
            @if(empty($data))
            <div class="am-u-sm-7 am-u-sm-offset-3" style="padding-right: 0rem;"> 
        <span class="title">是否默认:</span>
                    <input type="radio" name="status" value="1">默认
                    <input type="radio" name="status" value="0">非默认
                    
        </div>
            @else
            
            @endif
        <input type="hidden" name="ddss">
        {{csrf_field()}}
        {{method_field("PUT")}}
        <input id="buttonid" style="margin-left:150px;margin-top:10px;background-color:#F37B1D ;color: #fff;width: 100px;height: 30px;border: 0px;border-radius: 5px;" type="submit" value="修改">
        </div>

    </form>
        
    </div>
    </div>
    <script src="/static/jquery-1.8.3.min.js"></script>
    <script type="text/javascript">
        //第一级数据
          $.ajax({
            url:'/address',//url地址
            type:'get',//请求方式
            data:{upid:0},
            async:true,//异步处理
            dataType:'json',//返回响应数据类型
            //Ajax 响应成功匿名函数
            success:
            function(data){
              //alert(data);
              //遍历
              for(var i=0;i<data.length;i++){
                $(".ss").attr("disabled",true);
                // alert(data[i].name);
                //存储在option
                option='<option value="'+data[i].id+'">'+data[i].name+'</option>';
                // alert(option);
                //把带有数据的option内部插入到第一个select
                $("#cid").append(option);
              }
            },
            //Ajax 响应失败的匿名函数
            error:
            function(){
              alert("Ajax响应失败");
            }
          });
      
          //获取其他几级数据 
          //事件委派 live(事件,事件处理器函数)
          $("select").live("change",function(){
            //移除元素
            $(this).nextAll("select").remove();
            // alert($(this).val());
            o=$(this);
            //获取子级的upid
            upid=$(this).val();
            // alert(upid);
            $.ajax({
            url:'/address',//url地址
            type:'get',//请求方式
            data:{upid:upid},
            async:true,//异步处理
            dataType:'json',//返回响应数据类型
            //Ajax 响应成功匿名函数
            success:
            function(data){
              //创建select
              select=$("<select></select>");
              //内部插入option
              select.append('<option value="" class="mm">--请选择--</option>');
              // alert(data);
              //判断
              if(data.length>0){
                //遍历
                for(var i=0;i<data.length;i++){
                  // alert(data[i].name);
                  //存储在option
                  option='<option value="'+data[i].id+'">'+data[i].name+'</option>';
                  // alert(option);
                  // 把带有数据的option内部插入到创建好的select
                  select.append(option);
                }
                //把创建好的select 追加到前一个select后
                o.after(select);
                //禁用其他级别 请选择
                $(".mm").attr("disabled",true);
              }
      
            },
            //Ajax 响应失败的匿名函数
            error:
            function(){
              alert("Ajax响应失败");
            }
          });
          });
      </script>
      
      <script>
        arr=[];
      //获取城市级联选中的数据=》赋值给隐藏域
      $("#buttonid").click(function(){
        //遍历所有城市级下拉框
        $("select").each(function(){
          //查找select下的选中的option
          value=$(this).find("option:selected").html();
          //alert(value);
          //把地址放入arr数组里
          arr.push(value);
        })
        $("input[name='ddss']").val(arr);
      })
      </script>
@endsection
