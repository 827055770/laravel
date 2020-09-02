<!DOCTYPE html>
<html lang="zh-CN">
 <head> 
  <meta charset="UTF-8" /> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
  <meta name="renderer" content="webkit" /> 
  <meta name="keywords" content="网上购物,网上商城,进口商品，生鲜食品，家用电器，手机数码，百联" /> 
  <meta name="description" content="百联（BL.COM）-专业的综合网上购物商城，在线销售进口商品、家电、手机、电脑、服装服饰、母婴、图书、食品等数万个品牌千万种优质商品。便捷、诚信的服务，为您提供愉悦的网上商城购物体验! " /> 
  <title>@yield("titit")</title> 
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
		blk:"https://blk.bl.com",
		m: "https://m.bl.com/h5-web/page/view_Index.html",
		version : "1590653691114"
	};
	
	var jsonPageInfo = {
		"pageId" : "",
		"categoryId" : "",
		"searchTerm" : "",
		"searchResult" : "",
		"exportAttributes" : ""
	};

	var pageInfoJson = "{\"categoryId\":\"PC_HomePage\",\"exportAttributes\":\"\",\"id\":\"li-01\",\"pageId\":\"PC_首页\",\"searchResult\":\"\",\"searchTerm\":\"\",\"url\":\"baiLianIndexV2\"}";
	if (pageInfoJson) {
		jsonPageInfo = eval("(" + pageInfoJson + ")");
	}
</script>
  <script type="text/javascript">
(function(a){var b={_bl_m_name:"_bl_m",bl_m_value:"",ua:"",url:domain.m,matchUa:/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i,_init:function(){this.bl_m_value=b.getCookie(this._bl_m);this.ua=a.navigator.userAgent.toLocaleLowerCase();this.go()},go:function(){if(this.matchUa.test(this.ua)&&this.bl_m_value!="1"){a.location.href=this.url;return}},getCookie:function(f){var d=f+"=";var h=d.length;var c=document.cookie.length;var g=0;while(g<c){var e=g+h;if(document.cookie.substring(g,e)==d){return this.getCookieValue(e)}g=document.cookie.indexOf(" ",g)+1;if(g==0){break}}return null},getCookieValue:function(d){var c=document.cookie.indexOf(";",d);if(c==-1){c=document.cookie.length}return unescape(document.cookie.substring(d,c))}};b._init()})(window);
</script> 
<link href="/static/HomeRegister/css/colstyle.css" rel="stylesheet" type="text/css">

<link href="/static/HomeRegister/AmazeUI-2.4.2/assets/css/admin.css" rel="stylesheet" type="text/css">
<link href="/static/HomeRegister/AmazeUI-2.4.2/assets/css/amazeui.css" rel="stylesheet" type="text/css">
<link href="/static/HomeRegister/css/personal.css" rel="stylesheet" type="text/css">
<link href="/static/HomeRegister/css/cmstyle.css" rel="stylesheet" type="text/css">
<script src="/static/HomeRegister/AmazeUI-2.4.2/assets/js/amazeui.js"></script>




<link href="/static/HomeRegister/AmazeUI-2.4.2/assets/css/amazeui.css" rel="stylesheet" type="text/css">

<link href="/static/HomeRegister/css/infstyle.css" rel="stylesheet" type="text/css">
<script src="/static/HomeRegister/AmazeUI-2.4.2/assets/js/jquery.min.js" type="text/javascript"></script>


  <link rel="stylesheet" type="text/css" href="/static/Home/css/base.css" /> 
  <link rel="stylesheet" type="text/css" href="/static/Home/css/index.css" /> 
  <link type="text/css" rel="stylesheet" href="/static/Home/css/button.css" /> 
  <link type="text/css" rel="stylesheet" href="/static/Home/css/pop-up.css" /> 
  <link rel="stylesheet" type="text/css" href="/static/Home/css/tools1200.css" /> 
  <link rel="stylesheet" type="text/css" href="/static/Home/css/fileheader.css" /> 
  <link rel="stylesheet" type="text/css" href="/static/Home/css/header1200.css" /> 
  <link rel="stylesheet" type="text/css" href="/static/Home/css/sidebar.css" /> 
  <link rel="stylesheet" type="text/css" href="/static/Home/css/nav1200.css" /> 
  <link rel="stylesheet" type="text/css" href="/static/Home/css/headerfont.css" /> 
  <link rel="stylesheet" type="text/css" href="/static/Home/css/headerimg.css" /> 
  <link rel="stylesheet" type="text/css" href="/static/Home/css/footer1200.css" /> 
  <!--轮播图css-->
  <link rel="stylesheet" type="text/css" href="/static/Home/css/normalize.css" />
  <link rel="stylesheet" href="/static/Home/css/app.css">
 </head> 
 <body class="w1200"> 
  <!-- tools --> 
  <div class="tools"> 
   <div class="wrap"> 
    <div class="bl-name" title="宋岐最帅">
     <div class="txt">
      宋岐最帅
     </div>
     <b></b>
    </div> 

    <div class="tools-info"> 
     <s style="display:none">
       •
     </s> 
     <a href="/" target="_blank" class="red-font">消息</a> 
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
      <li style="display: none" class="box-tols" id="user_login_in"> <a href="https://my.bl.com/ym/nl/toIndex.html" target="_blank"> <i>Hi，</i> <span id="member_name"></span> </a> <a href="https://passport.bl.com/loginDisplay.html?type=logout">退出</a> <b></b> </li> 
      
      <li> 
       <div class="tools-leftfont">
        <a target="_blank" href="/person"><span>我的信息</span><i></i></a>
       </div> <span class="left-span"></span> <b></b> 
       <div class="divshow hdiv"> 
        <dl> 
         <dd>
          <a target="_blank" href="https://my.bl.com/ym/orderList.html">我的订单</a>
         </dd> 
         <dd>
          <a target="_blank" href="https://my.bl.com/ym/commentList.html">我的评价</a>
         </dd> 
         <dd>
          <a target="_blank" href="https://my.bl.com/ym/nl/memberPointList.html">我的积分</a>
         </dd> 
         <dd>
          <a target="_blank" href="/collect">我的收藏</a>
         </dd> 
         <dd>
          <a target="_blank" href="https://my.bl.com/center/series/myCoupon.html">我的优惠券</a>
         </dd> 
        </dl> 
       </div> </li> 
      <li> 
       
       <div class="divshow pay"> 
        <dl class="pay-dl"> 
         <dd> 
          <div class="pay-title">
           水电煤缴费
          </div> 
          <div class="pay-head"> 
           <a target="_blank" onclick="clickButton('缴费首页',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com">缴费首页</a> 
           <a target="_blank" onclick="clickButton('水费缴费',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com/syf/pubfeepage.html?type=sf">水费缴费</a> 
           <a target="_blank" onclick="clickButton('电费缴费',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com/syf/pubfeepage.html?type=dl">电费缴费</a> 
           <a target="_blank" onclick="clickButton('燃气缴费',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com/syf/pubfeepage.html?type=mq">燃气缴费</a> 
          </div> 
         </dd> 
         <dd> 
          <div class="pay-title">
           手机充值
          </div> 
          <div class="pay-head"> 
           <a target="_blank" onclick="clickButton('手机充值',null,null,'首页top','PC_Fees',null);" href="https://chongzhi.bl.com/cz/czpage.html">手机充值</a> 
          </div> 
         </dd> 
         <dd> 
          <div class="pay-title">
           其他缴费
          </div> 
          <div class="pay-head"> 
           <a target="_blank" onclick="clickButton('固话/宽带充值',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com/other/otherfee.html?type=tel">固话/宽带充值</a> 
           <a target="_blank" onclick="clickButton('铁通缴费',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com/other/otherfee.html?type=tt">铁通缴费</a> 
           <a target="_blank" onclick="clickButton('有线电视缴费',null,null,'首页top','PC_Fees',null);" href="https://jiaofei.bl.com/other/otherfee.html?type=ds">有线电视缴费</a> 
          </div> 
         </dd> 
         <dd> 
          <div class="pay-title">
           游戏点卡
          </div> 
          <div class="pay-head"> 
           <a target="_blank" onclick="clickButton('腾讯Q币充值',null,null,'首页top','PC_Fees',null);" href="https://chongzhi.bl.com/game/gamerechange.html?version=v1">腾讯Q币充值</a> 
           <a target="_blank" onclick="clickButton('盛大点券充值',null,null,'首页top','PC_Fees',null);" href="https://chongzhi.bl.com/game/capassgame.html?dsplb=01108&amp;dsphh=364009">盛大点券充值</a> 
           <a target="_blank" onclick="clickButton('更多游戏',null,null,'首页top','PC_Fees',null);" href="https://chongzhi.bl.com/game/gameshoplist.html">更多游戏</a> 
          </div> 
         </dd> 
        </dl> 
       </div> </li> 
      <li> 
       <div class="tools-leftfont">
        <a href="javascript:void(0);"><span>客户服务</span><i></i></a>
       </div> <span class="left-span"></span> <b></b> 
       <div class="divshow hdiv"> 
        <dl> 
         <dd>
          <a href="javascript:void(0);" class="c_ntkf">在线客服</a>
         </dd> 
         <dd>
          <a target="_blank" href="https://help.bl.com/helpCentersv7.html">帮助中心</a>
         </dd> 
        </dl> 
       </div> </li> 
      <li> 
       
       <div class="divshow palm"> 
        <div class="palm-item"> 
         <span class="palm-item-img"><img src="/static/Home/picture/1807592795.jpg" width="100" height="100" /></span> 
         <div class="palm-item-line">
          <apan class="palm-item-title">
           i百联微信
          </apan>
         </div> 
         <div class="palm-item-line">
          <apan class="palm-item-message">
           扫一扫关注
          </apan>
         </div> 
        </div> 
        <div class="palm-item"> 
         <span class="palm-item-img"><img src="/static/Home/picture/1849148942.png" width="100" height="100" /></span> 
         <div class="palm-item-line">
          <apan class="palm-item-title">
           i百联APP
          </apan>
         </div> 
         <div class="palm-item-line">
          <apan class="palm-item-message">
           手机购物更方便
          </apan>
         </div> 
        </div> 
       </div> </li> 
      <li> 
       <div class="tools-leftfont">
        <a target="_blank" href="/cart"><span>购物车</span></a>
       </div> <b></b> </li> 
     </ul> 
     <div id="btn_udesk_kf"></div> 
    </div> 
   </div> 
  </div> 
  <div id="fileheader" class="file-head"> 
   <div class="wrap"> 
    <div class="flienav"> 
     <div class="flienavtitle">
      全部分类
     </div> 
     <div class="flienavicon"></div> 
     <div class="nav-show flieshownav"> 
      <div class="show-nav" style="top:0;"> 
       <div class="banner-itemleft_newbg"></div> 
       <div class="banner-itemleft int-nav"> 
        <ul>
          <!--最顶级--> 
          
       <li data_qid="9999109339"> <i class="cardbook"></i> <span> <a href="http://blk.bl.com/" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999109339_-_3"></a>     </span> </li> 
          <!--最顶级结束-->
        </ul> 
       </div> 
       <div class="left-ul-show clearfix" id="menuDataClone"> 
        <div class="gb-icon"></div> 
        <ul> 
         <li> 
         
          <div class="menu_floor"> 
            
              <!--二级标题-->
           <span> <a style="color:#000000;" href="http://search.bl.com/c-9999395904#美妆护肤.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999395904_-_3"></a> &gt;</span> 
              <!--二级结束-->

              <!--三级开始-->
             
           <div class="menu_floor_a"> 
            
            <a style="color:#e6133c;" href="http://search.bl.com/c-9999395906#面膜.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999395906_-_3"></a>
         
           </div> 
           
           <!--三级结束-->
   
          </div> 
          
           </li> 



          
        </ul> 
       </div> 
      </div> 
     </div> 
    </div> 
    <div class="file-head-logo">
     <a target="_blank" href="/"><img src="/static/Home/header-logo.png" /></a>
    </div> 
    <div class="header-search-1"> 
     <div class="header-search-top"> 
      <div class="header-search-input"> 
       <div class="indiv">
        <input class="gray" type="text" data-value="" data-placeholder="" value="" id="first_float_serarch_input" />
       </div> 
       <div class="header-input-show" id="first_ul"> 
        <div class="header-input-title"> 
         <div class="header-input-title-fl">
          历史搜索
         </div> 
         <a href="#" class="header-input-title-fr"> <i></i> <span>清除</span> </a> 
        </div> 
        <dl> 
        </dl> 
       </div> 
       <div class="header-input-show1"> 
        <div class="inpshow"> 
         <dl> 
         </dl> 
        </div> 
        <div class="intshow-dl"> 
         <dl> 
         </dl> 
        </div> 
       </div> 
      </div> 
      <div class="header-search-button">
       <button type="button"></button>
      </div> 
     </div>
    </div> 
    <div style="display: none;" id="fileheader_in_login" class="file-head-info"> 
     <i>Hi</i> 
     <a id="fileheader_name" target="_blank" href="https://my.bl.com" title=""></a> 
     <span>|</span> 
     <a target="_blank" href="https://passport.bl.com/loginDisplay.html?type=logout">退出</a> 
    </div> 
    <div id="fileheader_not_login" class="file-head-info"> 
     <a href="/login/create">登录</a> 
     <span>|</span> 
     <a href="/register">注册</a> 
    </div> 
   </div> 
  </div>
  <div class="header"> 
   <div class="wrap"> 
    <div class="header-font"> 
     <div class="header-logo"> 
      <div class=""> 
       <a href="/index"> <img src="/static/Home/header-logo.png" /> </a> 
      </div> 
      <div class="secondary-logo"> 
      </div> 
     </div> 
     <div class="header-search"> 
      <div class="header-search-top"> 
       <div class="header-search-input"> 
        <div class="indiv">
         <input class="gray" type="text" data-value="" data-placeholder="" value="" id="first_header_search_input" />
        </div> 
        <div class="header-input-show" id="first_ul"> 
         <div class="header-input-title"> 
          <div class="header-input-title-fl">
           历史搜索
          </div> 
          <a href="#" class="header-input-title-fr"> <i></i> <span>清除</span> </a> 
         </div> 
         <dl> 
         </dl> 
        </div> 
        <div class="header-input-show1"> 
         <div class="inpshow"> 
          <dl> 
          </dl> 
         </div> 
         <div class="intshow-dl"> 
          <dl> 
          </dl> 
         </div> 
        </div> 
       </div> 
       <div class="header-search-button">
        <button type="submit"></button>
       </div> 
      </div> 
      <div class="header-search-font"> 
       <button type="button" style="display:none;"></button> 
      </div> 
     </div> 
    </div> 
   </div> 
  </div>
@section("myheader")
@show


        