@extends("Admin.public")
@section("admin")
<div class="mws-panel grid_8"> 
    <div class="mws-panel-header"> 
     <span>订单状态</span> 
    </div> 
    <div class="mws-panel-body no-padding"> 
     <form class="mws-form" action="/adminorders/{{$order->id}}" method="post"> 
      <div class="mws-form-row"> 
       <div class="mws-form-item clearfix"> 
        <ul class="mws-form-list"> 
         <li><input name="status" type="radio" value="0" @if($order->status=='已下单未支付')checked @endif/> <label>已下单未支付</label></li> 
         <li><input name="status" type="radio" value="1" @if($order->status=='已支付')checked @endif/> <label>已支付</label></li> 
         <li><input name="status" type="radio" value="2" @if($order->status=='已发货')checked @endif/> <label>已发货</label></li> 
         <li><input name="status" type="radio" value="3" @if($order->status=='已收货')checked @endif/> <label>已收货</label></li> 
        </ul> 
       </div> 
      </div> 
     
    </div> 
    <div class="mws-button-row"> 
        {{csrf_field()}}
        {{method_field("PUT")}}
     <input type="submit" value="Submit" class="btn btn-danger" /> 
     <input type="reset" value="Reset" class="btn " /> 
    </div>  
   </div> 
</form>
@endsection
@section("title","后台--订单状态修改")