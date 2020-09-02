@extends("Home.public.header")
@section("myheader")

		<div class="center">
	<div class="col-main">
		<div class="main-wrap">

			<div class="user-info">
				<!--标题 -->
				<div class="am-cf am-padding">
					<div class="am-fl am-cf"><strong class="am-text-danger am-text-lg">个人资料</strong> / <small>Personal&nbsp;information</small></div>
				</div>
				<hr/>

				<!--头像 -->
				<div class="user-infoPic">

					<div class="filePic">
						<input type="file" class="inputPic" allowexts="gif,jpeg,jpg,png,bmp" accept="image/*">
						<img class="am-circle am-img-thumbnail" src="images/getAvatar.do.jpg" alt="" />
					</div>

					<p class="am-form-help">头像</p>

					<div class="info-m">
						<div><b>用户名：<i>{{$user->username}}</i></b></div>
						<div class="u-level">
							<span class="rank r2">
								 <s class="vip1"></s><a class="classes" href="#">铜牌会员</a>
							</span>
						</div>
						<div class="u-safety">
							<a href="safety.html">
							 账户安全
							<span class="u-profile"><i class="bc_ee0000" style="width: 60px;" width="0">60分</i></span>
							</a>
						</div>
					</div>
				</div>

				<!--个人信息 -->
				<div class="info-main">
					<form class="am-form am-form-horizontal" action="/person" method="POST">

						

						<div class="am-form-group">
							<label for="user-name" class="am-form-label">姓名</label>
							<div class="am-form-content">
							<input type="text" name="name" id="user-name2" placeholder="name" value="{{$info->name}}">

							</div>
						</div>


						<div class="am-form-group">
							<label class="am-form-label">性别</label>
							<div class="am-form-content sex">
								<label class="am-radio-inline">
									<input type="radio" @if($info->sex=="1")checked="checked" @endif  name="sex" value="1" data-am-ucheck> 男
								</label>
								<label class="am-radio-inline">
									<input type="radio" @if($info->sex=="0")checked="checked" @endif name="sex" value="0" data-am-ucheck> 女
								</label>
								<label class="am-radio-inline">
									<input type="radio" @if($info->sex=="2")checked="checked" @endif name="sex" value="2" data-am-ucheck> 保密
								</label>
							</div>
						</div>

						<div class="am-form-group">
							<label for="user-name2" class="am-form-label">爱好</label>
							<div class="am-form-content">
							<input type="text" id="user-name2" name="hobby" value="{{$info->hobby}}" placeholder="nickname">

							</div>
						</div>

					
						
					<input type="hidden" name="id" value="{{$info->id}}">
						<div class="info-btn">
							{{csrf_field()}}
							<div class="am-btn am-btn-danger"><input type="submit" value="保存修改"></div>
						</div>

					</form>
				</div>

			</div>

		</div>
		<!--底部-->

	</div>

	<aside class="menu">
		<ul>
			<li class="person">
				<a href="/person/create">个人中心</a>
			</li>
			<li class="person">
				<a href="/person/create">个人资料</a>
				<ul>
					<li class="active"> <a href="/person/create">个人信息</a></li>
					<li> <a href="safety.html">安全设置</a></li>
					<li> <a href="/myaddress">收货地址</a></li>
				</ul>
			</li>
			<li class="person">
				<a href="#">我的交易</a>
				<ul>
					<li><a href="/myorder">订单管理</a></li>
					<li> <a href="change.html">退款售后</a></li>
				</ul>
			</li>
			<li class="person">
				<a href="#">我的资产</a>
				<ul>
					<li> <a href="coupon.html">优惠券 </a></li>
					<li> <a href="bonus.html">红包</a></li>
					<li> <a href="bill.html">账单明细</a></li>
				</ul>
			</li>

			<li class="person">
				<a href="#">我的小窝</a>
				<ul>
					<li> <a href="/collect">收藏</a></li>
					<li> <a href="foot.html">足迹</a></li>
					<li> <a href="/mycomment">评价</a></li>
					<li> <a href="news.html">消息</a></li>
				</ul>
			</li>

		</ul>

	</aside>
</div>
@endsection
@section("titit","个人信息")