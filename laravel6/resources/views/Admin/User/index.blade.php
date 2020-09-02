@extends("Admin.public")
@section("admin")
<html>
 <head>
   <script src="/static/jquery-1.8.3.min.js"></script>
 </head>
 <body>
  <div class="mws-panel grid_8"> 
   <div class="mws-panel-header"> 
    <span><i class="icon-table"></i> 用户模块列表</span> 
   </div> 
   <div class="mws-panel-body no-padding"> 
    <div id="DataTables_Table_1_wrapper" class="dataTables_wrapper" role="grid">
    
      <form action="" method="get">
     <div class="dataTables_filter" id="DataTables_Table_1_filter">
      <label>搜索名字: <input type="text" name="" value="" aria-controls="DataTables_Table_1" /></label>
      <input type="submit" class="btn btn-success" value="搜索">
     </div>
     </form>
     <div id="uid">
     <table class="mws-datatable-fn mws-table dataTable" id="DataTables_Table_1" aria-describedby="DataTables_Table_1_info"> 
      <thead> 
       <tr role="row">
        <th class="sorting_asc" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending" style="width: 155px;">ID</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending" style="width: 211px;">用户名</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending" style="width: 197px;">邮箱</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" style="width: 134px;">电话</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" style="width: 134px;">状态</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" style="width: 134px;">添加时间</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending" style="width: 134px;">修改时间</th>



        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" style="width: 98px;">操作</th>
       </tr> 
      </thead> 
      <tbody role="alert" aria-live="polite" aria-relevant="all">
      	@foreach($data as $row)
       <tr class="odd"> 
        <td class="  sorting_1">{{$row->id}}</td> 
        <td class=" ">{{$row->username}}</td> 
        <td class=" ">{{$row->email}}</td> 
        <td class=" ">{{$row->phone}}</td> 
        <td class=" ">{{$row->status}}</td> 
        <td class=" ">{{$row->created_at}}</td> 
        <td class=" ">{{$row->updated_at}}</td> 


        <td class=" ">
          <form action="/adminuser/{{$row->id}}" method="post">
              {{csrf_field()}}
              {{method_field("DELETE")}}
              <button type="submit" class="btn btn-danger">删除</button>
          </form>
          <a href="/adminuser/{{$row->id}}/edit" class="btn btn-danger">修改</a>
          <a href="/adminuser/{{$row->id}}" class="btn btn-success">会员详情</a>
          <a href="/address/{{$row->id}}" class="btn btn-success">会员收货地址</a>
        </td> 
       </tr>
       @endforeach
      </tbody>
     </table>
     </div>
    
     <div class="dataTables_paginate paging_full_numbers" id="pages">
     @foreach($pp as $row)
     <button class="btn btn-success" onclick="page({{$row}})">{{$row}}</button>
     @endforeach
     </div>
    </div> 
   </div> 
  </div>
 </body>
 <script>
   //鼠标点击事件
   function page(page){
     //alert(page);
     $.get("adminuser",{page:page},function(data){
       //alert(data);
       //给id是uid的div赋值以此来替换页面
       $('#uid').html(data);
     })
   }
 </script>
</html>
@endsection
@section("title","后台--用户列表")