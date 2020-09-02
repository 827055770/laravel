@extends("Admin.public")
@section("admin")
<html>
 <head>
   <script src="/static/jquery.min.js"></script>
 </head>
 <body>
  <div class="mws-panel grid_8"> 
   <div class="mws-panel-header"> 
    <span><i class="icon-table"></i>公告列表</span> 
   </div> 
   <div class="mws-panel-body no-padding"> 
    <div id="DataTables_Table_1_wrapper" class="dataTables_wrapper" role="grid">
     <table class="mws-datatable-fn mws-table dataTable" id="DataTables_Table_1" aria-describedby="DataTables_Table_1_info"> 
      <thead> 
       <tr role="row">
        <th class="sorting_asc" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending" style="width: 155px;">操作</th>
        <th class="sorting_asc" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending" style="width: 155px;">ID</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending" style="width: 211px;">标题</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" style="width: 98px;">内容</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" style="width: 98px;">作者</th>
        <th class="sorting" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" style="width: 98px;">图片</th>
        <th class="sorting_asc" role="columnheader" tabindex="0" aria-controls="DataTables_Table_1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending" style="width: 155px;">操作</th>
    </tr> 
      </thead> 
      <tbody role="alert" aria-live="polite" aria-relevant="all">
      	@foreach($arts as $row)
       <tr class="odd"> 
       <td class="  sorting_1"><input type="checkbox" value="{{$row['id']}}"></td>
        <td class="  sorting_1">{{$row['id']}}</td>
        <td class=" ">{{$row['title']}}</td> 
        <td class=" ">{!!$row['descr']!!}</td> 
        <td class=" ">{{$row['editor']}}</td> 
        <td class=" "><img src="{{$row['pic']}}" alt=""></td> 
       <td>
        <a class="btn btn-success" href="/adminarticles/{{$row['id']}}/edit">修改</a>
        </td>
       </tr>
       @endforeach
       <tr>
        <td colspan="10"><a href="javascript:void(0)" class="btn btn-success allchoose">全选</a><a href="javascript:void(0)" class="btn btn-success nochoose">全不选</a><a href="javascript:void(0)" class="btn btn-success fchoose">反选</a></td>
       </tr>
       <tr>
        <td colspan="10"><a href="javascript:void(0)" class="btn btn-danger del">删除</a></td>
       </tr>
      </tbody>
     </table>
     
     

     <div class="dataTables_paginate paging_full_numbers" id="pages">
     </div>
    </div> 
   </div> 
  </div>
 </body>
 <script>
     //全选
     $(".allchoose").click(function(){
         //找到table 遍历tr 设置复选框
         $("#DataTables_Table_1").find('tr').each(function(){
             //找到tr下的复选框 设置全选
             $(this).find(":checkbox").attr("checked",true);
         })
     })
     //全不选
     $(".nochoose").click(function(){
         //找到table 遍历tr 设置复选框
         $("#DataTables_Table_1").find('tr').each(function(){
             //找到tr下的复选框 设置全不选
             $(this).find(":checkbox").attr("checked",false);
         })
     })
     //反选
     $(".fchoose").click(function(){
         $("#DataTables_Table_1").find("tr").each(function(){
             //判断
             if($(this).find(":checkbox").attr("checked")){
                 //设置为啥不选中
                 $(this).find(":checkbox").attr("checked",false);
             }else{
                $(this).find(":checkbox").attr("checked",true);
             }
         })
     })

     //获取删除按钮 绑定单击事件
$(".del").click(function(){
  arr=[];
  //获取选中数据的id
  //遍历
  $(":checkbox").each(function(){
    //判断
    if($(this).attr("checked")){
      //获取id
      id=$(this).val();
      // alert(id);
      //存储在数组里
      arr.push(id);
      //alert(arr);
    }
  });
  //alert(arr);
  //Ajax请求

  $.get("/articledel",{id:arr},function(data){
     //alert(data);
    if(data.msg=='ok'){
      alert("删除ok");
      //找到删除数据所在的tr 并且移除掉
      for(var i=0;i<arr.length;i++){
        //arr[i]=>选中数据的id
        $("input[value='"+arr[i]+"']").parents("tr").remove();
      }
    }
    else if(data.msg=='no'){
      alert("不可以不选择");
    }
  },'json')
});
</script>
</html>
@endsection
@section("title","后台--公告列表")