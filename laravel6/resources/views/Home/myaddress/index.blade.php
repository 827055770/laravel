@extends("Home.public.public")

@section("homeinfo")
<div style="margin-top: 30px;width: 1068px; margin: 15px 0 30px 170px;">
								
								
		<table class="sui-table table-bordered-simple" style="margin-top: 20px;">
								  <thead>
								    <tr>
								      <th>收货人</th>
								      <th>收货地址</th>
								      <th>电话/手机</th>
								      <th>操作</th>
								      <th></th>
								    </tr>
								  </thead>
								  <tbody>
                                    @foreach($address as $v)
								    <tr>
                                    <td>{{$v->name}}</td>
								      <td>{{$v->huo}}</td>
								      <td>{{$v->phone}}</td>
									<td style="color: #007AFF;"><button><a href="/myaddress/{{$v->id}}/edit">修改</a></button>&nbsp;&nbsp;<form action="/myaddress/{{$v->id}}" method="POST">{{csrf_field()}}{{method_field("DELETE")}}<input type="submit" value="删除"></form></td>
                                      @if($v->status==1)
								      <td><span style="padding: 2px;font-size: 10px;color: #EC5937;border-radius:5px;background-color: #fad5d0;border: 1px #C85E0B solid;">默认地址</span></td>
                                      @endif
                                      </tr>
                                    @endforeach
								  </tbody>
                                </table>
                                <button><a href="/myaddress/create">添加收货地址</a></button> 
	</div>
@endsection