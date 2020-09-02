@extends("Admin.public")
@section("admin")
<html>
 <head></head>
 <body>
  <div class="mws-panel grid_8"> 
   <div class="mws-panel-header"> 
    <span>分类修改</span> 
   </div> 
   <div class="mws-panel-body no-padding"> 
   <form class="mws-form" action="/poster/{{$info->id}}" method="post" enctype="multipart/form-data">
    	@if ($errors->any())
		    <div class="mws-form-message error">
		        <ul>
		            @foreach ($errors->all() as $error)
		                <li>{{ $error }}</li>
		            @endforeach
		        </ul>
		    </div>
		@endif
     <div class="mws-form-inline"> 
      <div class="mws-form-row"> 
       <label class="mws-form-label">广告地址</label> 
       <div class="mws-form-item"> 
       <input type="text" class="large" name="url" value="{{$info->url}}" /> 
       </div> 
      </div> 

      <div class="mws-form-row"> 
        <label class="mws-form-label">广告图片</label> 
        <div class="mws-form-item"> 
            <img src="{{$info->img}}" alt="">
         <input type="file" class="large" name="img" value="" /> 
        </div> 
       </div> 

      <div class="mws-form-row"> 
       <label class="mws-form-label">状态</label> 
       <div class="mws-form-item"> 
        <select name="status" id="">
            <option value="1">展示</option>
            <option value="0">不展示</option>
        </select>
       </div> 
      </div> 
      <div class="mws-form-row"> 
        <label class="mws-form-label">状态</label> 
        <div class="mws-form-item"> 
         <select name="seat" id="">
             <option value="da" @if($info->seat=='da')selected="selected"@endif>大位置</option>
             <option value="xiao" @if($info->seat=='xiao')selected="selected"@endif>小位置 </option>
         </select>
        </div> 
       </div> 
     <div class="mws-button-row"> 
         {{csrf_field()}}
         {{method_field("PUT")}}
      <input type="submit" value="Submit" class="btn btn-danger" /> 
      <input type="reset" value="Reset" class="btn " /> 
     </div> 
    </form> 
   </div> 
  </div>
 </body>
</html>
@endsection
@section("title","后台--广告修改")