@extends("Admin.public")
@section("admin")
<html>
 <head></head>
 <body>
  <div class="mws-panel grid_8"> 
   <div class="mws-panel-header"> 
    <span>友情修改</span> 
   </div> 
   <div class="mws-panel-body no-padding"> 
    <form class="mws-form" action="/adminlist/{{$lists->id}}" method="post" enctype="multipart/form-data">
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
            <label class="mws-form-label">友情图片</label> 
            <div class="mws-form-item"> 
                <img src="{{$lists->pic}}" alt="">
            <input type="file" class="large" name="pic"/>
            </div> 
           </div> 
      <div class="mws-form-row"> 
       <label class="mws-form-label">友情地址</label> 
       <div class="mws-form-item"> 
        <input type="text" class="large" name="url" value="{{$lists->url}}" /> 
       </div> 
      </div>
      <div class="mws-form-row"> 
        <label class="mws-form-label">友情状态</label> 
        <div class="mws-form-item"> 
         <input type="radio" @if($lists->status==1) checked @endif class="large" name="status" value="1"/>展示
         <input type="radio" @if($lists->status==0) checked @endif class="large" name="status" value="0"/>不展示
        </div> 
       </div>  
     <div class="mws-button-row"> 
         {{csrf_field()}}
         {{method_field('PUT')}}
      <input type="submit" value="Submit" class="btn btn-danger" /> 
      <input type="reset" value="Reset" class="btn " /> 
     </div> 
    </form> 
   </div> 
  </div>
 </body>
</html>
@endsection
@section("title","后台--友情修改")