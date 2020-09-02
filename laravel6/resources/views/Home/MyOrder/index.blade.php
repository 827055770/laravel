@extends("Home.public.public")
@section("homeinfo")
<div class="main-wrap mt15" style="border: 0px;">
    <ul class="sui-nav nav-tabs" style="margin-top:0px;width: 1000px;margin-left: 30px;">
        <li style="margin-left: -5px;"><a href="/myorder" data-toggle="tab"><a href="myorder">所有订单</a><span style="margin-left: 20px;color: #ccc;">|</span></a></li>
        <li class=""><a href="/waitpay" data-toggle="tab"><a href="/waitpay">待付款</a><span style="margin-left: 20px;color: #ccc;">|</span></a></li>
         <li class=""><a href="#profile" data-toggle="tab"><a href="/remind">待发货<span style="margin-left: 20px;color: #ccc;">|</span></a></li>
          <li class=""><a href="#profile" data-toggle="tab"><a href="/daireceipt">待收货<span style="margin-left: 20px;color: #ccc;">|</span></a></li>
          <li class=""><a href="#profile" data-toggle="tab"><a href="/daiaccess">待评价<span style="margin-left: 20px;color: #ccc;">|</span></a></li>
      </ul>
  <div class="profile-info">
      <div class="control-group clearfix " style="width: 1020px;margin-bottom: 0px;">
          <div style="margin-top: -60px" ;="">
              <div style="float:right;display: inline;margin-left:60px;display: inline-block;height: 25px;margin-right: -5px;padding-top: 10px;"> 
              <img src="img/trash-拷贝.png" style="height: 10px;width: 10px;">
              </div> 
           </div>
          
      </div>
  </div>
  
  <div class="tab-content" style="width: 1000px;margin-top: 10px;border:1px #fff solid; border-top:transparent;margin-left: 30px;">
        <div id="index" class="tab-pane " style="padding: 40px 30px;">
        </div>
       <div id="profile" class="tab-pane active" style="padding: 00px 00px;">
       <div style="width: 100%;height: 50px;border: 1px #ccc solid;line-height: 50px;background-color: #fdfdfd">
           <span style="color: #858585;margin-left: 160px;">宝贝</span>
           <span style="color: #858585;margin-left: 190px;">单价(元)</span>
           <span style="color: #858585;margin-left: 29px;">数量</span>
           <span style="color: #858585;margin-left: 45px;">商品操作</span>
           <span style="color: #858585;margin-left: 100px;">实付款(元)</span>
           <span style="color: #858585;margin-left: 45px;">交易状态</span>
           <span style="color: #858585;margin-left: 45px;">交易操作</span>
       </div>
       <div style="width: 100%;height: 0px;padding: 10px;">
           <span style="line-height: 20px;">全选</span>
          <div style="float: right;margin-right: 5px;">
              <input type="button" style="display: inline-block;background-color: #fff; background-image: url(img/我的订单/组-39.png);width: 20px;height: 20px;border: 0px;background-repeat: no-repeat;">
              <input type="button" style="border:0px;display: inline-block;background-color: #fff;background-image: url(img/我的订单/组-40.png);background-repeat: no-repeat;width: 58px;height: 20px;">
          </div>
       </div>
       

       <!--商品订单遍历-->
       @foreach($orders as $v)
       
       <div style="margin-top: 30px;width: 100%;height: 150px;border: 1px #ccc solid;">
       <div style="width: 100%;height: 50px;background-color: #f5f5f5;vertical-align: middle;font-size: 12px;">
      <input type="checkbox" style="line-height: 50px;margin-left: 20px;">
       <span style="line-height: 50px;">{{$v->updated_at}}</span>
      <span style="line-height: 50px;margin-left: 20px;">{{$v->order_num}}</span>
       </div>	

       @foreach($orders_good as $value)
       @if($v->id==$value->order_id)
       <div style="float: left;width: 65%;height: 12px;">
           <div style="width: 100%;">
           <img src="{{$value->pic}}" style="width: 100px;float: left;">
           <dl style="width: 220px;float: left;margin-left: 20px;margin-top: 20px;">{{$value->name}}</dl>
          <del style="display: inline-block;margin-left: -38px;margin-top: 20px;color: #858585;">10000</del>
          <dl style="float: left;margin-left: 50px;margin-top: 40px;">{{$v->tot}}</dl>
          <span style="margin-left: 59px;">{{$value->num}}</span>
          <dl style="float: right;margin-right: 50px;margin-top: 20px;">退款/退货
          <br>投诉卖家
          <br>
          退运保险
          </dl>
          </div>
       </div>	
       
       <div style="float: left;border-left: 1px #ccc solid;width: 11%;height:100px;text-align: center;">
           <span style="font-weight: bold;margin-top: 30px;display: block;">{{$v->tot}}</span>
           <dl>(含运费:00)</dl>
       </div>
       <div style="float: left;border-left: 1px #ccc solid;width: 11%;height:100px;text-align: center ;">
           <dl style="margin-top: 30px;">卖家已发货</dl>
           <dl>订单详情</dl>
           <dl>查看物流</dl>
       </div>
       <div style="float: left;border-left: 1px #ccc solid;width: 11%;height:100px;text-align: center ;">
       <button style="color: fff;background-color: #65b5ff;border: 0px;padding: 4px;margin-top: 38px;">@if($v->status==0)<a href="/yespay/{{$v->id}}">去付款</a></button>@elseif($v->status==1)<a href="/tixingreceipt/{{$value->goods_id}}">提醒发货</a></button>@elseif($v->status==2)<a href="/yesreceipt/{{$v->id}}">确认收货</a>@elseif($v->status==3)<a href="/commentadd/{{$value->id}}">去评价</a>@elseif($v->status==4)<p>完成订单</p>@endif
       </div>
       @else

       @endif
       @endforeach
       </div>
       @endforeach
       <!--商品订单遍历结束-->

       	
       </div>
  </div>		 

            
</div>



@endsection
@section("hometitle","订单详情")