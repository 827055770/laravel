<!DOCTYPE html>
<!-- new common in localhost -->
<script>
var domain = {
		main : "https://www.bl.com",
		help : "https://help.bl.com",
		passport : "https://passport.bl.com",
		reg : "https://reg.bl.com",
		my : "https://my.bl.com",
		cart : "https://cart.bl.com",
		fashion : "https://fashion.bl.com",
		life : "https://life.bl.com",
		product : "https://product.bl.com",
		search : "https://search.bl.com",
		qiang : "https://qiang.bl.com",
		tuan : "https://tuan.bl.com",
		order : "https://channel.bl.com",
		js : "https://res12.iblimg.com/respc-1",
		image : "https://res12.iblimg.com/respc-1",
		chongzhi : "https://chongzhi.bl.com",
		jiaofei : "https://jiaofei.bl.com",
		coupon : "https://coupon.bl.com",
		trade : "https://trade.bl.com",
		promotion : "https://promotion.bl.com",
		payment : "https://payment.bl.com",
		cookie: ".bl.com",
		dc1: "https://dc1.bl.com",
		dt1: "https://dt1.bl.com",
		httpsImg : "https://res12.iblimg.com/respc-1",
		safe : "https://safe.bl.com",
		s: "https://s.bl.com",
		global : "https://global.bl.com",
		dc2: "https://dc2.bl.com",
		chexian: "https://bx.bl.com",
		blk:"https://blk.bl.com"
	};
	
	var jsonPageInfo = {
		"pageId" : "",
		"categoryId" : "",
		"searchTerm" : "",
		"searchResult" : "",
		"exportAttributes" : ""
	};

	var pageInfoJson = "{\"categoryId\":\"PC_Cart\",\"exportAttributes\":\"\",\"id\":\"tc-04\",\"pageId\":\"PC_购物车页\",\"searchResult\":\"\",\"searchTerm\":\"\",\"url\":\"shoppingCart/shoppingCart_v4.0\"}";
	if (pageInfoJson) {
		jsonPageInfo = eval("(" + pageInfoJson + ")");
	}
</script><html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" >
<meta name="renderer" content="webkit">
<title>购物车</title>

<meta name="keywords" content="购物车">
<meta name="description" content="购物车">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<link rel="stylesheet" type="text/css" href="/static/Home/css/base.css">
<link rel="stylesheet" type="text/css" href="/static/Home/css/cart.css">
<link rel="stylesheet" type="text/css" href="/static/Home/css/footer1200.css"/>
<link rel="stylesheet" type="text/css" href="/static/Home/css/tools1200.css"/>
</head>
<body class="w1000">
<!-- tools -->
<div class="tools">
    <div class="wrap">
    	<div class="bl-name" title="七七七七七"><div class="txt">七七七七七</div><b></b></div>
        <div class="tools-left">
            <div class="tools-leftfont"><a href="javascript:void(0);"><span>网站导航</span><i></i></a></div>
            <span class="left-span"></span>
            <div class="divshow left-show">
                <div class="left-show-dl">
                    <dl>
                    	<dd><a target="_blank" href="http://www.bailiangroup.cn/">百联集团官网</a></dd>
                        <dd><a target="_blank" href="http://www.safepass.cn/">安付宝网</a></dd>
                        <dd><a target="_blank" href="https://shop.bl.com/resmp-1/mp/shopDec/79484/79484.html">第一医药</a></dd>
                        <dd><a target="_blank" href="https://www.okcard.com/clogin">OK会员卡专区</a></dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="tools-info">
			<s style="display:none"> •</s>
			<a href="https://my.bl.com/message/mynews.html"  target="_blank" class="red-font">消息</a>
		</div>
        <div class="tools-right">
            <ul>
                @if(session("username"))
                <li id="user_not_login" class="box"> 
                  <div> 
                  <a href="/login/create"><span>欢迎{{session("username")}}</span></a> 
                  </div> <b></b> </li> 
                @else
                <li id="user_not_login" class="box"> 
                 <div> 
                  <a href="/login/create"><span>请登录</span></a> 
                  <a id="headerReg" href="/register/create" class="registered">注册</a> 
                 </div> <b></b> </li> 
                 @endif
				<li style="display: none" class="box-tols" id="user_login_in">
					<a href="https://my.bl.com/ym/nl/toIndex.html" target="_blank">
						<i>Hi，</i>
						<span id="member_name"></span>
					</a>
					<a href="https://passport.bl.com/loginDisplay.html?type=logout">退出</a>
					<b></b>
				</li>
                <li><div class="tools-leftfont"><a target="_blank" href="https://my.bl.com/ym/orderList.html">我的订单</a></div><b></b></li>
                <li>
                    <div class="tools-leftfont"><a target="_blank" href="https://my.bl.com"><span>我的信息</span><i></i></a></div>
                    <span class="left-span"></span>
                    <b></b>
                    <div class="divshow hdiv">
                        <dl>
                            <dd><a target="_blank" href="https://my.bl.com/ym/orderList.html">我的订单</a></dd>
                            <dd><a target="_blank" href="https://my.bl.com/ym/commentList.html">我的评价</a></dd>
                            <dd><a target="_blank" href="https://my.bl.com/ym/nl/memberPointList.html">我的积分</a></dd>
                            <dd><a target="_blank" href="https://my.bl.com/favorite/myFavorite.html">我的收藏</a></dd>
                            <dd><a target="_blank" href="https://my.bl.com/center/series/myCoupon.html">我的优惠券</a></dd>
                        </dl>
                    </div>
                </li>
                <li>
                    <div class="tools-leftfont"><a target="_blank" href="https://jiaofei.bl.com"><span>充值缴费</span><i></i></a></div>
                    <span class="left-span"></span>
                    <b></b>
                    <div class="divshow pay">
                        <dl class="pay-dl">
                        	<dd>
                                <div class="pay-title">水电煤缴费</div>
                                <div class="pay-head">
                                    <a target="_blank" onclick="clickButton('缴费首页',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com">缴费首页</a>
                                    <a target="_blank" onclick="clickButton('水费缴费',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com/syf/pubfeepage.html?type=sf">水费缴费</a>
                                    <a target="_blank" onclick="clickButton('电费缴费',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com/syf/pubfeepage.html?type=dl">电费缴费</a>
                                    <a target="_blank" onclick="clickButton('燃气缴费',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com/syf/pubfeepage.html?type=mq">燃气缴费</a>
                                </div>
                            </dd>
                            <dd>
                                <div class="pay-title">手机充值</div>
                                <div class="pay-head">
                                    <a target="_blank" onclick="clickButton('手机充值',null,null,'首页top','PC_Fees',null);" href="https://chongzhi.bl.com/cz/czpage.html">手机充值</a>
                                    </div>
                            </dd>
                            <dd>
                                <div class="pay-title">其他缴费</div>
                                <div class="pay-head">
                                <a target="_blank" onclick="clickButton('固话/宽带充值',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com/other/otherfee.html?type=tel">固话/宽带充值</a>
                                    <a target="_blank" onclick="clickButton('铁通缴费',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com/other/otherfee.html?type=tt">铁通缴费</a>
                                    <a target="_blank" onclick="clickButton('有线电视缴费',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com/other/otherfee.html?type=ds">有线电视缴费</a>
                                </div>
                            </dd>
                            <dd>
                                <div class="pay-title">游戏点卡</div>
                                <div class="pay-head">
                                    <a target="_blank" onclick="clickButton('腾讯Q币充值',null,null,'首页top','PC_Fees',null);" href="https://chongzhi.bl.com/game/gamerechange.html?version=v1">腾讯Q币充值</a>
                                    <a target="_blank" onclick="clickButton('盛大点券充值',null,null,'首页top','PC_Fees',null);" href="https://chongzhi.bl.com/game/capassgame.html?dsplb=01108&dsphh=364009">盛大点券充值</a>
                                    <a target="_blank" onclick="clickButton('更多游戏',null,null,'首页top','PC_Fees',null);" href="https://chongzhi.bl.com/game/gameshoplist.html">更多游戏</a>
                                </div>
                            </dd>
                            
                            </dl>
                    </div>
                </li>
                <li>
                    <div class="tools-leftfont"><a href="javascript:void(0);"><span>客户服务</span><i></i></a></div>
                    <span class="left-span"></span>
                    <b></b>
                    <div class="divshow hdiv">
                        <dl>
                            <dd><a  href="javascript:void(0);" class="c_ntkf">在线客服</a></dd>
                            <dd><a target="_blank" href="https://help.bl.com/helpCentersv7.html">帮助中心</a></dd>
                        </dl>
                    </div>
                </li>
                
                    <div class="tools-leftfont"><a target="_blank" href="https://cart.bl.com"><span>购物车</span></a></div>
                    <b></b>
                </li>
            </ul>
            <div id="btn_udesk_kf"></div>
        </div>
    </div>
</div>
<div id="trade-head">
	<div class="wrap">
		<div class="logo">
			<a href="https://www.bl.com"> 
				<img src="/static/Home/picture/logo.png">
			</a>			
		</div>
		<div class="name">购物车</div>
		<div class="login-message"> </div>
		<input type="hidden" id="isLogin" name="isLogin" value="false"/>
		</div>
</div>

<div class="wrap">
<div class="cart-title">
		<input type="hidden" id="orderAmount" value=""/>
		<input type="hidden" id="btnTag" value=""/>
		<div class="name">全部商品<span></span></div>
		
	</div>
	<div class="cart-table">
		<div class="cart-head">
			<label class="chk-line">
                <span class="name"> <input type="checkbox" name="song">全选</span>
			</label>
			<div class="item">商品信息</div>
			<div class="item-price">单价（元）</div>
			<div class="number">件数</div>
			<div class="total-price">金额（元）</div>
			<div class="action">操作</div>			
        </div>
        
  <div class="cart-table-name">
    <!--<label class="chk-line">
    <input type="checkbox" name="song">科技自营</label>-->
   </div>
   <ul class="cart-table-list">
       @if(empty($data1))
       <h1>购物车空空如也</h1>
       @endif
    @foreach($data1 as $row)
    <li>
     <div class="item">
      <div class="cart-table-line">
       <div class="chk-line" style="margin:43px auto auto auto;">
       <input type="checkbox" class="items" value="{{$row['id']}}">
       </div>
       <div class="item-box">
       <a target="blank" href="http://product.bl.com/4225322.html" title="【官方授权】{{$row['name']}}"> <img src="{{$row['pic']}}" /></a>
        <div class="name">
         <a target="blank" href="http://product.bl.com/4225322.html" title="【官方授权】{{$row['name']}}"> 【官方授权】{{$row['name']}} </a>
        </div>
        <div class="message-line"></div>
       </div>
       <div class="type-box"></div>
       <div class="item-price-box">
        <del>
         &yen;6229.00
        </del>
        <div class="price">
         &yen;{{$row['price']}}
        </div>
        <div class="icon">
         <i class="orange">闪购</i>
        </div>
       </div>
       <div class="number-box">
        <div class="input-line">
        <em class="reduce disable jianjian" name="{{$row['id']}}" id="">-</em> 
        <input class="text" onchange="" type="text" value="{{$row['num']}}" /> 
        <em class="add jiajia" id="add_4225322_11 " name="{{$row['id']}}">+</em>
        </div>
       </div>
       
       
       <div class="price-box">
        <div class="price" id="qqq1">
         &yen;{{$row['price']*$row['num']}}
        </div>
       </div>
       <div class="action-box">
        <a class="add-favourite" href="javascript:void(0);" onclick="addFavorite(this)">移入收藏夹</a> 
        <br />
       <form action="/cart/{{$row['id']}}" method="POST">
            {{csrf_field()}}
            {{method_field("DELETE")}}
        <input type="submit" value="删除">
        </form>
       </div>
      </div>
     </div>
    </li>
    @endforeach
   </ul>
 
		
	</div>
	<div class="pay-form" id="payForm">
		<div class="pay-line">
		  <div class="select-all">
		  	<span><input type="checkbox">全选</span>
		  	
		  </div>
		  <a href="/cartdelete" class="txt delete" ><i></i>全部删除</a>
		  <a href="javascript:void(0);" onclick="delNoGoods()" class="txt">清除失效商品</a>
		  <a href="javascript:void(0);" onclick="addFavoriteMore()" class="txt">移入收藏夹</a>
		  <a class="pay" id="qugo" class="">去结算</a>
		  <div class="message">
		  	<div class="price-line">
		    	<span class="black">合计：</span>
		  	  <span class="price"><i>¥</i><strong class="heji">0.00</strong></span>
		  	</div>
		  	
		  </div>
		  <a class="item-show" href="javascript:void(0);">
              <input value="0" type = "hidden" class="totalcheckedGoodsNumber">
			已选择
			<span class="numss">0</span>
			件商品
			<!-- <i class="up"></i> -->
		  </a>
		</div>
	</div>
	<div class="guessLike"></div>
	<div id="package-add-1" class="package-add" style="display: none;"></div>
</div>
<div id="pay-message-1" class="pay-message">
 <div class="info message-only">
	<div class="message-line clearfix">
	<i class="warning"></i>
	<div class="txt">
	<div class="name"></div>
	</div>
	</div>
  </div>

</div>
<div id="pay-message-2" class="pay-message">

 <div class="flex">
 	<ul class="slides">
 	</ul>
 	<ul class="flex-direction-nav">
 		<li>
		<a class="prev" href="#" style="display: none;">←</a>
		</li>
		<li>
		<a class="next" href="#" style="display: none;">→</a>
		</li>
 	</ul>
  </div>

  </div>
</div>
<input type="hidden" id="cartFreightResourceId" value="20190714">
		<div id="footer" class="footer">
    <div class="helpnav clearfix">
        <div class="wrap">
        <div class="footer-center">
            <div class="helpnav-list">
                <div class="helpnav-title">
                    <i class="footic1"></i>
                  新手入门
              </div>
                <ul>
                     <li><a href="https://help.bl.com/articleDetailed.html?articleId=261&&categoryType=help" target="_blank">购物流程</a></li>
                     <li><a href="https://help.bl.com/articleDetailed.html?articleId=262&&categoryType=help" target="_blank">会员介绍</a></li>
                     <li><a href="https://help.bl.com/articleDetailed.html?articleId=263&&categoryType=help" target="_blank">常见问题</a></li>
                     <li><a href="https://help.bl.com/articleDetailed.html?articleId=264&&categoryType=help" target="_blank">发票说明</a></li>
                     <li><a href="https://help.bl.com/articleDetailed.html?articleId=265&&categoryType=help" target="_blank">联系客服</a></li>
                </ul>
            </div>
            <div class="helpnav-list">
                <div class="helpnav-title">
                    <i class="footic2"></i>
                    配送服务
                </div>
                <ul>
                    <li><a href="https://help.bl.com/articleDetailed.html?articleId=275&&categoryType=help" target="_blank">配送范围及运费</a></li>
                    <li><a href="https://help.bl.com/articleDetailed.html?articleId=278&&categoryType=help" target="_blank">配送进度查询</a></li>
                    <li><a href="https://help.bl.com/articleDetailed.html?articleId=276&&categoryType=help" target="_blank">自提服务</a></li>
                    <li><a href="https://help.bl.com/articleDetailed.html?articleId=277&&categoryType=help" target="_blank">商品验货与签收</a></li>
                </ul>
            </div>
            <div class="helpnav-list">
                <div class="helpnav-title">
                    <i class="footic3"></i>
                    支付方式
                </div>
                <ul>
                    <li><a href="https://help.bl.com/articleDetailed.html?articleId=279&&categoryType=help" target="_blank">货到付款</a></li>
                    <li><a href="https://help.bl.com/articleDetailed.html?articleId=280&&categoryType=help" target="_blank">在线支付</a></li>
                </ul>
            </div>
            <div class="helpnav-list">
                <div class="helpnav-title">
                    <i class="footic4"></i>
                    售后服务
                </div>
                <ul>
                     <li><a href="https://help.bl.com/articleDetailed.html?articleId=281&&categoryType=help" target="_blank">退换货政策</a></li>
                     <li><a href="https://help.bl.com/articleDetailed.html?articleId=282&&categoryType=help" target="_blank">退换货流程</a></li>
                     <li><a href="https://help.bl.com/articleDetailed.html?articleId=283&&categoryType=help" target="_blank">退款说明</a></li>
                </ul>
            </div>
            <div class="helpnav-list">
                <div class="helpnav-title">
                    <i class="footic5"></i>
                    商家支持
                </div>
                <ul>
                    <li><a href="https://help.bl.com/toHelpCenter/queryCategoryId.html?categoryId=382&&categoryType=help" target="_blank">商家入驻</a></li>
                    <li><a href="https://help.bl.com/toHelpCenter/queryCategoryId.html?categoryId=401&&categoryType=help" target="_blank">商家规则</a></li>
                    <li><a href="https://help.bl.com/toHelpCenter/queryCategoryId.html?categoryId=345&&categoryType=help" target="_blank">商家常见问题</a></li>
                </ul>
            </div>
        </div>
        </div>
    </div>
    <div class="public-ad">
            <div class="footer-center">
                <ul class="public-adlist">
                    <li>
                            <a data_wa_type="ad" data_wa_val="2020666_-_2464725_-_1" href="http://promotion.bl.com/nc/shanghaigongshang_GY002.html" target="_blank"><img src="/static/Home/picture/1237223137.jpg"></a>
                        </li>
                    <li>
                            <a data_wa_type="ad" data_wa_val="2020666_-_2464726_-_1" href="http://promotion.bl.com/nc/shanghaigongshang_GY003.html" target="_blank"><img src="/static/Home/picture/951075255.jpg"></a>
                        </li>
                    <li>
                            <a data_wa_type="ad" data_wa_val="2020666_-_2464727_-_1" href="http://promotion.bl.com/nc/shanghaigongshang_GY004.html" target="_blank"><img src="/static/Home/picture/1425410214.jpg"></a>
                        </li>
                    </ul>
            </div>
        </div>
    <div class="bottom-nav">
    <div>
        <a target="_blank" href="https://help.bl.com/articleDetailed.html?articleId=285&&categoryType=about">关于我们</a>
        <span>|</span>
        <a target="_blank" href="https://help.bl.com/articleDetailed.html?articleId=286&&categoryType=about">联系我们</a>
        <span>|</span>
        <a target="_blank" href="https://help.bl.com/articleDetailed.html?articleId=287&&categoryType=about">加盟合作</a>
        <span>|</span>
        <a target="_blank" href="https://help.bl.com/articleDetailed.html?articleId=288&&categoryType=about">诚征英才</a>
        <span>|</span>
        <a target="_blank" href="https://help.bl.com/articleDetailed.html?articleId=289&&categoryType=about">友情链接</a>
        <span>|</span>
        <a target="_blank" href="https://www.bl.com/newretail.html">新零售合作</a>
    </div>
    <div class="copyright">百联集团有限公司版权所有 <span>|</span>  客服电话：400-900-8800  <span>|</span> 沪ICP备15028847号-1</div>
    <a target="_blank" href="https://res15.iblimg.com/respc-1/resources/v4.0/img/yaopingzigezheng.png" class="drug-message">互联网药品信息服务资质证书编号：沪-（非营业性）-2016-0044</a><br>
    <a target="_blank" href="https://res12.iblimg.com/respc-1/resources/v4.0/img/yiliaoqixiepingzheng.pdf" class="drug-message">医疗器械网络交易服务第三方平台备案凭证-（沪）网械平台备字[2020]第00002号</a><br>
    <a target="_blank" href="https://promotion.bl.com/nc/PC_HDGL20180705000005986_6252.html" class="drug-message">全渠道增值电信业务经营许可证</a>
    <div class="police">
        <a class="gongan" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010102002366" target="_blank">
        <img src="/static/Home/picture/gongan.png">
        <span style="">沪公网安备  31010102002366号</span>
      </a>
      <a class="gongs" href="http://218.242.124.22:8081/businessCheck/verifKey.do?showType=extShow&amp;serial=9031000020160729145737000001099658-SAIC_SHOW_310000-20160406145114141192&amp;signData=MEYCIQCUhx+ulQL4t9jJgfgCH1oeTxexuWOVww3Hel3/UlRyLQIhAO2fVtZDl0EkYb0p/3M50cXqe694wDQoJNuUKNdQNOWf" target="_blank">
        <img src="/static/Home/picture/gongs.png" width="20" height="21">
        <span style="">上海工商</span>
      </a>
      <a target="_blank" class="zhizhao" href="https://promotion.bl.com/nc/PC_HDGL20170407000001552_1592.html">
        <img src="/static/Home/picture/zhizhao.png">
        <span style="">经营执照</span>
      </a>
        <a class="wangping" href="http://scjgj.sh.gov.cn/platform/survey/step1_phone" target="_blank">
            <img src="/static/Home/picture/wangjing1.png" width="21">
            <span style="">网购大家评</span>
        </a>
    </div>
    </div>
</div>
<div id="thickdesk" class="thickdiv" style="opacity: 0.5; display: none;"></div>

<div id="pop-body01" class="content" style="display:none;">
	<iframe id="conbar_0_iframe" src="" width="424px" height="450px" frameborder="no" border="0"  scrolling="no" allowtransparency="yes"></iframe>
</div>
<script type="text/javascript" src="/static/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/static/Home/js/bl.js"></script>
<script type="text/javascript" src="/static/Home/js/jquery.poshytip.min.js"></script>
<script type="text/javascript" src="/static/Home/js/jquery.flexslider.js"></script>
<script type="text/javascript" src="/static/Home/js/jquery.json-2.2.js"></script>
<script type="text/javascript" src="/static/Home/js/cover.js"></script>
<script type="text/javascript" src="/static/Home/js/tools.js"></script>
<script type="text/javascript" src="/static/Home/js/cartcgbuy.js"></script>
<script type="text/javascript" src="/static/Home/js/cartfreightv2.js"></script>
<script type="text/javascript" src="/static/Home/js/cartother.js"></script>
<script type="text/javascript" src="/static/Home/js/cartfreight.js"></script>
<script type="text/javascript" src="/static/Home/js/eluminate.js"></script>
<script type="text/javascript" src="/static/Home/js/pageinit.js"></script>
<script type="text/javascript" src="/static/Home/js/pageinfo.js"></script>

</body>
<script>
    $(".jianjian").click(function(){
        id=$(this).attr("name");
        o=$(this);
        //alert(id);
        $.get("/cartjianjian",{id:id},function(data){
            //alert(data);
            //开始赋值
            //给客户端的数量赋值
            o.next("input").val(data.num);
            //给客户端的价格赋值
            o.parents('div').next('div').find('#qqq1').html(data.tot);
        },'json')
    })

    $(".jiajia").click(function(){
        id=$(this).attr("name");
        o=$(this);
        //alert(id);
        $.get("/cartjiajia",{id:id},function(data){
            //alert(data);
            o.prev("input").val(data.num);
            //给客户端的价格赋值
            o.parents('div').next('div').find('#qqq1').html(data.tot);
        },'json')
    })

    //判断购物车数据有没有被选中
    arr=[];
    $(".items").change(function(){
        //判断复选框是否被选中
        if($(this).attr("checked")){
            //alert($(this).val());
            //选中的话就把这个id赋值给id
            id=$(this).val();
            //把所有的id放入数组里
            //alert(id);
            arr.push(id);
            //alert(arr);
        }
        //复选框不被选中
        else{
            //获取没有选中的id
            id1=$(this).val();
            //alert(id1);
            //首先给js的数组对象定义一个函数，用于查找指定的元素在数组中的位置
            Array.prototype.indexOf = function(val) {
          for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
          }
          return -1;
          }

          // 然后使用通过得到这个元素的索引，使用js数组自己固有的函数去删除这个元素
          Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
                if (index > -1) {
                  this.splice(index, 1);
                }
            }
            arr.remove(id1);
        }
        //alert(arr);
        //ajax把储存选中数据id的数组当做附加参数传递到服务端页面
        $.get("/carttot",{arr:arr},function(data){
            //alert(data); 总数量nums  总价格sum
            $(".numss").html(data.nums);
            $(".heji").html(data.sum);
        },'json')
    })

    //结算
    $("#qugo").click(function(){
        //判断购买的商品是否被勾选 is判断是否被选中
        if($(".items").is(":checked")){
            //alert("sss");
            //用ajax把结算的数据传过去
            $.get("/accounts",{arr:arr},function(data){
                //alert(data);
                if(data){
            //跳转到结算页面
            //js跳转加载页面
            window.location="/order/insert";
                }
            },'json')
            
        }else{
            alert("请至少选中一条数据")
        }
    })
</script>
</html>