@extends("Home..public.header")
@section("myheader")
		<b class="line"></b>
		<div class="center">
			<div class="col-main">
				<div class="main-wrap">

					<div class="user-comment">
						<!--标题 -->
						<div class="am-cf am-padding">
							<div class="am-fl am-cf"><strong class="am-text-danger am-text-lg">评价管理</strong> / <small>Manage&nbsp;Comment</small></div>
						</div>
						<hr/>

						<div class="am-tabs am-tabs-d2 am-margin" data-am-tabs>

							<ul class="am-avg-sm-2 am-tabs-nav am-nav am-nav-tabs">
								<li class="am-active"><a href="#tab1">所有评价</a></li>
								<li><a href="#tab2">有图评价</a></li>

							</ul>

							<div class="am-tabs-bd">
								<div class="am-tab-panel am-fade am-in am-active" id="tab1">

									<div class="comment-main">
										<div class="comment-list">
											<ul class="item-list">

												
												<div class="comment-top">
													<div class="th th-price">
														<td class="td-inner">评价</td>
													</div>
													<div class="th th-item">
														<td class="td-inner">商品</td>
													</div>													
                                                </div>
                                                @foreach($comments as $v)        
                                                
                                                <!--评论遍历开始-->
												<li class="td td-item">
													<div class="item-pic">
														<a href="#" class="J_MakePoint">
                                                        <img src="{{$v->pic}}" class="itempic">
														</a>
													</div>
												</li>
												<li class="td td-comment">
													<div class="item-title">
														<div class="item-opinion">@if($v->status==0)差评@elseif($v->status==1)中评@elseif($v->status==2)好评@endif</div>
														<div class="item-name">
															<a href="#">
																<p class="item-basic-info">{{$v->name}}</p>
															</a>
														</div>
													</div>
													<div class="item-comment">
														{!!$v->centent!!}
													</div>

													<div class="item-info">
														<div>
															<p class="info-little"><span>颜色：12#玛瑙</span> <span>包装：裸装</span> </p>
															<p class="info-time">2015-12-24</p>

														</div>
													</div>
                                                </li>
                                                @endforeach
											</ul>

										</div>
									</div>

								</div>
								<div class="am-tab-panel am-fade" id="tab2">
									
									<div class="comment-main">
										<div class="comment-list">
											<ul class="item-list">
												
												
												<div class="comment-top">
													<div class="th th-price">
														<td class="td-inner">评价</td>
													</div>
													<div class="th th-item">
														<td class="td-inner">商品</td>
													</div>													
                                                </div>

												<li class="td td-item">
													<div class="item-pic">
														<a href="#" class="J_MakePoint">
                                                        <img src="" class="itempic">
														</a>
													</div>
												</li>											
												
												<li class="td td-comment">
													<div class="item-title">
														<div class="item-opinion"></div>
														<div class="item-name">
															<a href="#">
																<p class="item-basic-info"></p>
															</a>
														</div>
													</div>
													<div class="item-comment">
														
													<div class="filePic"><img src="images/image.jpg" alt=""></div>	
													</div>

													<div class="item-info">
														<div>
															<p class="info-little"><span>颜色：12#玛瑙</span> <span>包装：裸装</span> </p>
															<p class="info-time">2015-12-24</p>

														</div>
													</div>
                                                </li>
  
                                                <!--评论遍历结束-->
                  

											</ul>

										</div>
									</div>									
									
								</div>
							</div>
						</div>

					</div>

				</div>
				<!--底部-->
				<div class="footer">
					<div class="footer-hd">
						<p>
							<a href="#">恒望科技</a>
							<b>|</b>
							<a href="#">商城首页</a>
							<b>|</b>
							<a href="#">支付宝</a>
							<b>|</b>
							<a href="#">物流</a>
						</p>
					</div>
					<div class="footer-bd">
						<p>
							<a href="#">关于恒望</a>
							<a href="#">合作伙伴</a>
							<a href="#">联系我们</a>
							<a href="#">网站地图</a>
							<em>© 2015-2025 Hengwang.com 版权所有</em>
						</p>
					</div>
				</div>
			</div>

			<aside class="menu">
				<ul>
					<li class="person">
						<a href="/person/create">个人中心</a>
					</li>
					<li class="person">
						<a href="/person/create">个人资料</a>
						<ul>
							<li> <a href="/person/create">个人信息</a></li>
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
							<li> <a href="/collect/create">收藏</a></li>
							<li> <a href="foot.html">足迹</a></li>
							<li class="active"> <a href="/mycomment">评价</a></li>
							<li> <a href="news.html">消息</a></li>
						</ul>
					</li>

				</ul>

			</aside>
		</div>

	</body>

</html>
@endsection
@section("titit","我的评价")