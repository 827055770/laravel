<!DOCTYPE html>
<html lang="zh-CN">
 <head> 
  <meta charset="UTF-8" /> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
  <meta name="renderer" content="webkit" /> 
  <meta name="keywords" content="网上购物,网上商城,进口商品，生鲜食品，家用电器，手机数码，百联" /> 
  <meta name="description" content="百联（BL.COM）-专业的综合网上购物商城，在线销售进口商品、家电、手机、电脑、服装服饰、母婴、图书、食品等数万个品牌千万种优质商品。便捷、诚信的服务，为您提供愉悦的网上商城购物体验! " /> 
  <title>宋岐的官网</title> 
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
        <a target="_blank" href="/person/create"><span>我的信息</span><i></i></a>
       </div> <span class="left-span"></span> <b></b> 
       <div class="divshow hdiv"> 
        <dl> 
         <dd>
          <a target="_blank" href="/myorder">我的订单</a>
         </dd> 
         <dd>
          <a target="_blank" href="/mycomment">我的评价</a>
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
          @foreach($cate as $row)
       <li data_qid="9999109339"> <i class="cardbook"></i> <span> <a href="" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999109339_-_3">{{$row->name}}</a>     </span> </li> 
          <!--最顶级结束-->
        </ul> 
       </div> 
       <div class="left-ul-show clearfix" id="menuDataClone"> 
        <div class="gb-icon"></div> 
        <ul> 
         <li> 
         
          <div class="menu_floor"> 
            @foreach($row->suv as $rows)
              <!--二级标题-->
           <span> <a style="color:#000000;" href="http://search.bl.com/c-9999395904#美妆护肤.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999395904_-_3">{{$rows->name}}</a> &gt;</span> 
              <!--二级结束-->

              <!--三级开始-->
             
           <div class="menu_floor_a"> 
            @foreach($rows->suv as $rowss)
            <a style="color:#e6133c;" href="http://search.bl.com/c-9999395906#面膜.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999395906_-_3">{{$rowss->name}}</a>
            @endforeach
           </div> 
           
           <!--三级结束-->
           @endforeach
          </div> 
          
           </li> 
           @endforeach


          
        </ul> 
       </div> 
      </div> 
     </div> 
    </div> 
    <div class="file-head-logo">
     <a target="_blank" href="/index"><img src="/static/Home/header-logo.png" /></a>
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
  <div class="nav"> 
   <div class="doudou"></div> 
   <div class="wrap"> 
    <div class="nav-left"> 
     
     <!--侧边栏-->
     
     <!--侧边栏结束-->
    </div> 
    <div class="nav-right"> 
     <ul> 
      <li> <a data_wa_type="ad" data_wa_val="641_-_363596_-_1" href="http://life.bl.com/" target="_blank"> 生活日用<span></span> </a></li> 
      <li> <a data_wa_type="ad" data_wa_val="642_-_363598_-_1" href="http://fashion.bl.com/" target="_blank"> 24H百货<span></span> </a></li> 
      <li> <a data_wa_type="ad" data_wa_val="643_-_366048_-_1" href="http://global.bl.com/" target="_blank"> 全球购<span></span> </a></li> 
      <li> <a data_wa_type="ad" data_wa_val="644_-_366041_-_1" href="http://s.bl.com/" target="_blank"> 精品闪购<span></span> </a></li> 
      <li> <a data_wa_type="ad" data_wa_val="645_-_363599_-_1" href="http://channel.bl.com/3c.html" target="_blank"> 电器城<span></span> </a></li> 
      <li> <a data_wa_type="ad" data_wa_val="647_-_377627_-_1" href="http://blk.bl.com/" target="_blank"> 百联卡<span></span> </a></li> 
      <li> <a data_wa_type="ad" data_wa_val="648_-_555556_-_1" href="http://promotion.bl.com/nc/PC_HDGL20170808000002853_3033.html" target="_blank"> 百联到家<span></span> </a></li> 
     </ul> 
    </div> 
   </div> 
  </div> 
  <div id="headerimg" data-original="js/mdata/headerimg.html" style="display:none;"></div> 
  <div id="headerfont" data-original="js/mdata/headerfont.html" style="display:none;"></div> 
  <div id="anyueTan" data-tan=""></div> 
  <div id="banner"> 
   <div class="banner_eye" onselectstart="return false" id="lazy-banner" data-original="" style="background: url(/static/Home/images/loading1.gif) no-repeat center center;"> 
    <!--不会的轮播图-->
    <div class="slider">

      <div class="slider-img">
        <ul class="slider-img-ul">
          <!--轮播图遍历-->
          @foreach($lunbotu as $k=>$v)
          <li><a href="{{$v->url}}"><img src="{{$v->img}}" style="width: 1200px" height="420"></a></li>

          @endforeach
        </ul>
      </div>
    
    </div>
  <script src="/static/jquery.min.js"></script>
  <script type="text/javascript" src="/static/Home/js/xSlider.js"></script>
   </div> 
   <div class="banner-recommend"> 
    <div class="banner-recommend_bg"></div> 
    <div class="ban_tit0"> 
     <div class="ban_tit0_d1"> 
      <div class="ban_tit_tx">

        <h3>
       <div class="ban_tit_txd">
        Hi，
        <span id="memberName">{{session("username")}}欢迎</span>
        <br /> 
       </div> 
      </h3>
       <a href="javascript:;"> <img id="personAvatar" src="/static/Home/picture/userpic001.png" width="46" height="46" /> </a> 
      </div> 
      <input type="hidden" id="isLogin" value="false" autocomplete="off" /> 
      @if(session("username")) 
      <div class="ban_txta"> 
       <a href="/loginout" data_wa_type="" data_wa_val="" class="tipa" id="benefits" target="">退出</a> 
      </div> 
      @else
      <div class="ban_txta"> 
        <a href="/login/create" data_wa_type="" data_wa_val="" class="tipa" id="benefits" target="">登录</a>
        <a href="/register/create" data_wa_type="" data_wa_val="" class="tipa" id="benefits" target="_blank">注册</a>  
       </div> 
      @endif
     </div> 
    </div> 
    <div class="ban_tit1"> 
     <a href="" target="_blank" class="ban_more">更多&gt;</a> 
     <ol class="ban_qnew"> 
       <!--公告遍历-->
       @foreach($articles as $v)
     <li><a data_wa_type="ad" data_wa_val="510_-_974382_-_1" href="" target="_blank"><span>[必读]</span>{{$v->title}}</a></li> 
       @endforeach
      <!--公告遍历结束-->
    </ol> 
    </div> 
    <div class="ban_tit2"> 
     <ul class="ban_life"> 
      <li> <a onclick="clickButton('手机充值',null,null,'首页生活服务','PC_Fees',null);" href="https://chongzhi.bl.com" target="_blank"> 
        <div class="life_i life_i1"></div> <span>手机充值</span> </a> </li> 
      <li> <a onclick="clickButton('宽带充值',null,null,'首页生活服务','PC_Fees',null);" href="https://jiaofei.bl.com/other/otherfee.html?type=tel&amp;jump=1" target="_blank"> 
        <div class="life_i life_iz1"></div> <span>宽带充值</span> </a> </li> 
      <li> <a onclick="clickButton('固话充值',null,null,'首页生活服务','PC_Fees',null);" href="https://jiaofei.bl.com/other/otherfee.html?type=tel" target="_blank"> 
        <div class="life_i life_i4"></div> <span>固话充值</span> </a> </li> 
      <li> <a onclick="clickButton('水费',null,null,'首页生活服务','PC_Fees',null);" href="https://jiaofei.bl.com/syf/pubfeepage.html?type=sf" target="_blank"> 
        <div class="life_i life_iz2"></div> <span>水费</span> </a> </li> 
      <li> <a onclick="clickButton('电费',null,null,'首页生活服务','PC_Fees',null);" href="https://jiaofei.bl.com/syf/pubfeepage.html?type=dl" target="_blank"> 
        <div class="life_i life_iz3"></div> <span>电费</span> </a> </li> 
      <li> <a onclick="clickButton('燃气费',null,null,'首页生活服务','PC_Fees',null);" href="https://jiaofei.bl.com/syf/pubfeepage.html?type=mq" target="_blank"> 
        <div class="life_i life_iz4"></div> <span>燃气费</span> </a> </li> 
      <li> <a onclick="clickButton('游戏充值',null,null,'首页生活服务','PC_Fees',null);" href="https://chongzhi.bl.com/game/gamerechange.html?version=v1" target="_blank"> 
        <div class="life_i life_i3"></div> <span>游戏充值</span> </a> </li> 
      <li> <a onclick="clickButton('有线电视',null,null,'首页生活服务','PC_Fees',null);" href="https://jiaofei.bl.com/other/otherfee.html?type=ds" target="_blank"> 
        <div class="life_i life_i6"></div> <span>有线电视</span> </a> </li> 
      <li> <a onclick="clickButton('百联卡',null,null,'首页生活服务','PC_Fees',null);" href="https://blk.bl.com" target="_blank"> 
        <div class="life_i life_i9"></div> <span>百联卡</span> </a> </li> 
     </ul> 
    </div> 
   </div> 
  </div> 
  <!-- banner end --> 
  <div class="new_czt"> 
   <div class="wrap lazy-fn" id="czt" style="height: 250px; background: none; display: block;">
    <div class="new_czt_l">
     <div class="new_czt_lbox rollBody">
      <ul class="new_czt_lul main-top-scroll">
        <!--这块是小的方框-->
       <li><a href="http://hot.bl.com/brandIndex.html?bl_ad=10102_-_284322_-_1&amp;bl_mmc=YXTF_-_baiduPC_-_6xk1078b_-_0&amp;bl_ad=7300_-_370210_-_1&amp;bl_mmc=YXTF_-_baiduPC_-_6xk1078b_-_0" target="_blank" data_wa_type="ad" data_wa_val="7300_-_2588433_-_1"><img src="
        https://laravel6.oss-cn-beijing.aliyuncs.com/777.jpg" width="224" height="250" /></a></li>
      </ul>
     </div>
    </div>
    <div class="new_czt_r">
     <a href="javascript:;" class="new_czt_prev" style="display: inline;"></a>
     <a href="javascript:;" class="new_czt_next" style="display: none;"></a>
     <ul id="new_czt_ul" style="width: 1932px; left: 0px;">
      <input type="hidden" id="goodsPriceList" value="[{&quot;backCatId&quot;:&quot;102870&quot;,&quot;brandSid&quot;:&quot;209467&quot;,&quot;buid&quot;:&quot;2000&quot;,&quot;categoryid&quot;:&quot;a212885&quot;,&quot;goodsDetSid&quot;:&quot;3480439&quot;,&quot;goodsType&quot;:&quot;1&quot;,&quot;ruleList&quot;:[&quot;13_BK17894&quot;],&quot;shopid&quot;:&quot;-1&quot;,&quot;supplySid&quot;:&quot;78795&quot;},{&quot;backCatId&quot;:&quot;103640&quot;,&quot;brandSid&quot;:&quot;172007&quot;,&quot;buid&quot;:&quot;1000&quot;,&quot;categoryid&quot;:&quot;a103640&quot;,&quot;goodsDetSid&quot;:&quot;4263290&quot;,&quot;goodsType&quot;:&quot;1&quot;,&quot;ruleList&quot;:[&quot;13_BK17894&quot;],&quot;shopid&quot;:&quot;400011569&quot;,&quot;supplySid&quot;:&quot;-1&quot;},{&quot;backCatId&quot;:&quot;102868&quot;,&quot;brandSid&quot;:&quot;208231&quot;,&quot;buid&quot;:&quot;3060&quot;,&quot;categoryid&quot;:&quot;a212882&quot;,&quot;goodsDetSid&quot;:&quot;3887487&quot;,&quot;goodsType&quot;:&quot;16&quot;,&quot;ruleList&quot;:[&quot;13_BK17894&quot;],&quot;shopid&quot;:&quot;-1&quot;,&quot;supplySid&quot;:&quot;22880&quot;},{&quot;backCatId&quot;:&quot;102806&quot;,&quot;brandSid&quot;:&quot;208043&quot;,&quot;buid&quot;:&quot;3020&quot;,&quot;categoryid&quot;:&quot;a102806&quot;,&quot;goodsDetSid&quot;:&quot;3830063&quot;,&quot;goodsType&quot;:&quot;1&quot;,&quot;ruleList&quot;:[&quot;13_BK17894&quot;],&quot;shopid&quot;:&quot;-1&quot;,&quot;supplySid&quot;:&quot;24131&quot;},{&quot;backCatId&quot;:&quot;102685&quot;,&quot;brandSid&quot;:&quot;203381&quot;,&quot;buid&quot;:&quot;3060&quot;,&quot;categoryid&quot;:&quot;a102685&quot;,&quot;goodsDetSid&quot;:&quot;3326759&quot;,&quot;goodsType&quot;:&quot;16&quot;,&quot;ruleList&quot;:[&quot;13_BK17894&quot;],&quot;shopid&quot;:&quot;-1&quot;,&quot;supplySid&quot;:&quot;590&quot;},{&quot;backCatId&quot;:&quot;102001&quot;,&quot;brandSid&quot;:&quot;204627&quot;,&quot;buid&quot;:&quot;3030&quot;,&quot;categoryid&quot;:&quot;a102001&quot;,&quot;goodsDetSid&quot;:&quot;3807608&quot;,&quot;goodsType&quot;:&quot;1&quot;,&quot;ruleList&quot;:[&quot;13_BK17894&quot;],&quot;shopid&quot;:&quot;-1&quot;,&quot;supplySid&quot;:&quot;24858&quot;},{&quot;backCatId&quot;:&quot;102874&quot;,&quot;brandSid&quot;:&quot;159997&quot;,&quot;buid&quot;:&quot;3060&quot;,&quot;categoryid&quot;:&quot;a212892&quot;,&quot;goodsDetSid&quot;:&quot;3887561&quot;,&quot;goodsType&quot;:&quot;16&quot;,&quot;ruleList&quot;:[&quot;13_BK17894&quot;],&quot;shopid&quot;:&quot;-1&quot;,&quot;supplySid&quot;:&quot;22848&quot;},{&quot;backCatId&quot;:&quot;102718&quot;,&quot;brandSid&quot;:&quot;209551&quot;,&quot;buid&quot;:&quot;2000&quot;,&quot;categoryid&quot;:&quot;a102718&quot;,&quot;goodsDetSid&quot;:&quot;65913&quot;,&quot;goodsType&quot;:&quot;1&quot;,&quot;ruleList&quot;:[&quot;13_BK17894&quot;],&quot;shopid&quot;:&quot;-1&quot;,&quot;supplySid&quot;:&quot;77091&quot;},{&quot;backCatId&quot;:&quot;102874&quot;,&quot;brandSid&quot;:&quot;208239&quot;,&quot;buid&quot;:&quot;2000&quot;,&quot;categoryid&quot;:&quot;a212892&quot;,&quot;goodsDetSid&quot;:&quot;89549&quot;,&quot;goodsType&quot;:&quot;1&quot;,&quot;ruleList&quot;:[&quot;13_BK17894&quot;],&quot;shopid&quot;:&quot;-1&quot;,&quot;supplySid&quot;:&quot;77449&quot;},{&quot;backCatId&quot;:&quot;102794&quot;,&quot;brandSid&quot;:&quot;207885&quot;,&quot;buid&quot;:&quot;2000&quot;,&quot;categoryid&quot;:&quot;a200078&quot;,&quot;goodsDetSid&quot;:&quot;73040&quot;,&quot;goodsType&quot;:&quot;1&quot;,&quot;ruleList&quot;:[&quot;13_BK17894&quot;],&quot;shopid&quot;:&quot;-1&quot;,&quot;supplySid&quot;:&quot;77048&quot;},{&quot;backCatId&quot;:&quot;105550&quot;,&quot;brandSid&quot;:&quot;159002&quot;,&quot;buid&quot;:&quot;2000&quot;,&quot;categoryid&quot;:&quot;a105550&quot;,&quot;goodsDetSid&quot;:&quot;4232343&quot;,&quot;goodsType&quot;:&quot;7&quot;,&quot;ruleList&quot;:[&quot;13_BK17894&quot;],&quot;shopid&quot;:&quot;-1&quot;,&quot;supplySid&quot;:&quot;80691&quot;},{&quot;backCatId&quot;:&quot;102704&quot;,&quot;brandSid&quot;:&quot;208272&quot;,&quot;buid&quot;:&quot;2000&quot;,&quot;categoryid&quot;:&quot;a212884&quot;,&quot;goodsDetSid&quot;:&quot;4278668&quot;,&quot;goodsType&quot;:&quot;1&quot;,&quot;ruleList&quot;:[&quot;13_BK17894&quot;],&quot;shopid&quot;:&quot;-1&quot;,&quot;supplySid&quot;:&quot;79674&quot;}]" />
      <input type="hidden" id="goodsPriceflag" value="1" />

      <!--商品遍历开始-->
      @foreach($shop as $v)
      <li data-sku="3480439">
       <div class="new_czt_show">
       <a target="_blank" href="/index/{{$v->id}}"><img src="{{$v->pic}}" height="140" width="140" /></a>
        <div class="new_czt_name">
        <a href="/index/{{$v->id}}" target="_blank" title="{{$v->name}}">{{$v->name}}</a>
        </div>
        <div class="new_czt_money">
         <div class="money">
          ￥
         <span style="font-size:16px;">{{$v->price}}</span>
         </div>
         <div class="price">
          剩余数量：{{$v->num}}
         </div>
        </div>
       </div>
      </li>
      @endforeach
      <!--商品遍历结束-->

     </ul>
    </div>
   </div> 
  </div>
  <div class="new_tm">
 <body>
  <div class="wrap lazy-fn" id="featuredChannel" style="height: 370px; background: none; display: block;">
   <div class="new_tm_l">
    <div class="new_tm_lbox rollBody">
     <ul class="new_tm_lul main-top-scroll" style="width: 500%; margin-left: -100%;">
      <li style="float: left; width: 20%;"><a href="http://promotion.bl.com/nc/PC_HDGL202005270000012500_13154.html" target="_blank" data_wa_type="ad" data_wa_val="7301_-_2596336_-_1"><img src="https://img22.iblimg.com/market-11/images/activity/1435030667.jpg" width="305" height="370" /></a></li>
      <!--前台广告大模块遍历只能是1个-->
      
     <li style="float: left; width: 20%;"><a href="{{$poster->url}}" target="_blank" data_wa_type="ad" data_wa_val="7301_-_2597253_-_1"><img src="{{$poster->img}}" width="305" height="370" /></a></li>
      
      <!--前台广告大模块遍历结束-->
    </ul>
    </div>
    <ol class="pagechange-ol">
     <li class="prev" style="margin-left: 0px; display: none;"></li>
     <li class="next" style="margin-right: 0px; display: none;"></li>
    </ol>
    <ol class="progress-bar-ol" style="width: 126px; visibility: visible;">
     <li class="listyle"><a class="li-a-process" style="width: 98.8162%; overflow: hidden;"></a></li>
    </ol>
   </div>
   <ol class="new_tm_r">
     <!--广告小模快遍历-->
     @foreach($posters as $v)
   <li style="background: none;"><a href="{{$v->url}}" target="_blank" data_wa_type="ad" data_wa_val="7302_-_2600515_-_1"><img src="{{$v->img}}" width="285" height="180" /></a></li>
     @endforeach
    <!--遍历结束-->
   </ol>
  </div>
  </div>
  <!-- floor --> 
  
 <body>
  <div class="alsolike lazy-fn" id="olikes1" style="display: block; background: none;">
   <div class="featured_tit">
    <div class="guess_love">
     猜你喜欢
     <span>Guess you like</span>
    </div>
   </div>
   <div class="featured_log">
   </div>
   
   <ol class="like_class">
    @foreach($shops as $v)
    <li>
     <div class="pro-show">
      <div class="pro-img">
       <a target="_blank" data_wa_type="ad" data_wa_val="pcgl_-_pcgl_als_-_2 " href="/index/{{$v->id}}"><img src="{{$v->pic}}" height="220" width="220" alt="" /></a>
      </div>
      <div class="pro-name">
      <a href="/index/{{$v->id}}" target="_blank" title="">{{$v->name}}</a>
      </div>
      <div class="pro-money">
       <div class="money-fl">
        ￥
        <span style="font-size:18px;">{{$v->price}}</span>
        <a href="" goodsid="4384227" name="" class="geta">收藏</a>
       </div>
      </div>
     </div></li>
     @endforeach
   </ol>

  </div>
 
  <div id="navigation" style="display:none;"> 
   <a id="navigation9" href="#top">
    <div class="box i9">
     返回顶部
    </div></a> 
  </div> 
  <div id="float-floor" style="display: none;"> 
   <div class="back"></div> 
   <a class="floatFloor" data_wa_type="ad" data_wa_val="" href="javascript:void(0);" target="_blank"> <img src="/static/Home/picture/loading200x200.gif" /></a> 
   <a class="close" href="javascript:void(0);">&times;</a> 
  </div> 
  <div id="adv-show" style="display: none;"> 
   <a class="advShow" data_wa_type="ad" data_wa_val="" href="javascript:void(0);" target="_blank"> <img src="/static/Home/picture/loading200x200.gif" /></a> 
   <a class="close" href="javascript:void(0);">&times;</a> 
  </div> 
  <div id="adv-show-back" style="display: none;"> 
  </div> 
  <div id="footer" class="footer"> 


  </div> 
     </div> 
    </div> 
   </div> 
   
   <div class="public-ad"> 
    <div class="footer-center">
      <a href="/listadd">申请添加友情链接</a> 
     <ul class="public-adlist"> 
       @foreach($lists as $v)
     <li style="float:left;"> <a href="{{$v->url}}" target="_blank"><img src="{{$v->pic}}" width="420"/></a> </li> 
      @endforeach
    </ul> 
    </div> 
   </div> 
   <div class="bottom-nav"> 
    <div> 

    </div> 
    
    </div> 
   </div> 
  </div> 
  <script type="text/javascript" src="/static/Home/js/jquery-1.8.2.min.js"></script> 
  <script type="text/javascript" src="/static/Home/js/bl.js"></script> 
  <script type="text/javascript" src="/static/Home/js/sea.js"></script> 
  <script type="text/javascript">
    seajs.use(domain.js+'/resources/v4.2/js/index/index.js?version=1590653691114');
</script> 
  <script type="text/javascript" src="/static/Home/js/pageinit.js"></script> 
  <script type="text/javascript" src="/static/Home/js/pageinfo.js"></script> 
  <div id="pop-body01" class="content" style="display:none;"> 
   <div class="info message-only"> 
    <div class="message-line clearfix"> 
     <i class="warning"></i> 
     <div class="txt"> 
      <div class="name">
       弹框信息
      </div> 
     </div> 
    </div> 
    <div class="btn-line clearfix"> 
     <div class="line-center"> 
      <button type="button" id="confitrue" class="btn btn-secondary cancelOK">确 认</button> 
     </div> 
    </div> 
   </div> 
  </div>  
 </body>
</html>