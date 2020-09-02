@extends("Admin.public")
@section("admin")
<html>
 <head>
   
 </head>
 <script src="/static/jquery-1.8.3.min.js"></script>
 <body>
  <div class="mws-panel grid_8"> 
   <div class="mws-panel-header"> 
    <span><i class="icon-table"></i> 管理员列表</span> 
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
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending" style="width: 211px;">管理员名称</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending" style="width: 197px;">管理员密码</th>



        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" style="width: 98px;">操作</th>
       </tr> 
      </thead> 
      <tbody role="alert" aria-live="polite" aria-relevant="all">
      	@foreach($admin_user as $row)
       <tr class="odd"> 
        <td class="  sorting_1">{{$row->id}}</td> 
        <td class=" ">{{$row->name}}</td> 
        <td class=" ">{{$row->password}}</td> 

        <td class=" ">
          <button class="btn btn-danger">ajax删除</button>
          <a href="/admin/{{$row->id}}/edit" class="btn btn-danger">修改</a>
        @if($rote->uid==$row->id)
        无法分配
        @else
        
        <a href="/adminrole/{{$row->id}}" class="btn btn-success">分配角色</a>
        </td> 
        @endif
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
 <script>
   $('button').click(function(){
     //获取删除数据的id  parents获取祖先元素tr
     id=$(this).parents("tr").find("td:first").html();
     //alert(id);
     //获取祖先元素tr
     o=$(this).parents("tr");
     //ajax get传值方法
     con=confirm("你确定删除吗?");
     //alert(con)
     if(con){
     $.get("/admindel",{id:id},function(data){
      //alert(data);
      //接受传过来的json数据
      if(data.msg=="ok"){
        alert("删除成功");
        //把删除的数据干掉  移除方法
        o.remove();
      }
      else{
        alert("删除失败");
      }
     },'json')
     }
   })
 </script>
</html>
@endsection
@section("title","后台--管理员列表")