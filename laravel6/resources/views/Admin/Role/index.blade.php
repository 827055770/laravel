@extends("Admin.public")
@section("admin")
<html>
 <head>
   <script src="/static/jquery-1.8.3.min.js"></script>
 </head>
 <body>
  <div class="mws-panel grid_8"> 
   <div class="mws-panel-header"> 
    <span><i class="icon-table"></i>角色列表</span> 
   </div> 
   <div class="mws-panel-body no-padding"> 
    <div id="DataTables_Table_1_wrapper" class="dataTables_wrapper" role="grid">
    <form action="/adminuser" method="get">
     <!--<div class="dataTables_filter" id="DataTables_Table_1_filter">
      <label>搜索名字: <input type="text" name="keyword" value="{/*{$usernamekeyword}}" aria-controls="DataTables_Table_1" /></label>
      搜索邮箱: <input type="text" name="keyword1" value="{/*{$emailkeyword}}" aria-controls="DataTables_Table_1" /></label>
      <input type="submit" class="btn btn-success" value="搜索">
     </div>-->
     </form>
     <table class="mws-datatable-fn mws-table dataTable" id="DataTables_Table_1" aria-describedby="DataTables_Table_1_info"> 
      <thead> 
       <tr role="row">
        <th class="sorting_asc" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending" style="width: 155px;">ID</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending" style="width: 211px;">角色名称</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" style="width: 98px;">操作</th>
       </tr> 
      </thead> 
      <tbody role="alert" aria-live="polite" aria-relevant="all">
      	@foreach($role as $row)
       <tr class="odd"> 
        <td class="  sorting_1">{{$row->id}}</td> 
        <td class=" ">{{$row->name}}</td> 
        <td class=" ">
          <center>
        <form action="/role/{{$row->id}}" method="post">
          {{method_field("DELETE")}}
            {{csrf_field()}}
            <input class="btn btn-danger" type="submit" value="删除">
            
          </form>
          <a href="/auth/{{$row->id}}" class="btn btn-success">权限分配</a>
          </center>
          
        </td> 
       </tr>
       @endforeach
      </tbody>
     </table>
     <div class="dataTables_paginate paging_full_numbers" id="pages">
     </div>
    </div> 
   </div> 
  </div>
 </body>
 

</html>
@endsection
@section("title","后台--角色列表")