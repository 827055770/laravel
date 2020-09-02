@extends("Admin.public")
@section("admin")
<html>
 <head></head>
 <body>
  <div class="mws-panel grid_8"> 
   <div class="mws-panel-header"> 
    <span>轮播图添加</span> 
   </div> 
   <div class="mws-panel-body no-padding"> 
    <form class="mws-form" action="/lunbotu" method="post" enctype="multipart/form-data">
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
       <label class="mws-form-label">轮播图地址</label> 
       <div class="mws-form-item"> 
        <input type="text" class="large" name="url" value="" /> 
       </div> 
      </div> 

      <div class="mws-form-row"> 
        <label class="mws-form-label">轮播图图片</label> 
        <div class="mws-form-item"> 
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
     <div class="mws-button-row"> 
     	{{csrf_field()}}
      <input type="submit" value="Submit" class="btn btn-danger" /> 
      <input type="reset" value="Reset" class="btn " /> 
     </div> 
    </form> 
   </div> 
  </div>
 </body>
</html>
@endsection
@section("title","后台--轮播图添加")