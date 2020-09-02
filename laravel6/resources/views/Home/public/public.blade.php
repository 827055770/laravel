<html>
	<head>
		<meta charset="utf-8">
		<title>@yield("hometitle")</title>
		<meta name="keywords" content="">
        <meta name="description" content="">
        <script type="text/javascript">
            (function(a){var b={_bl_m_name:"_bl_m",bl_m_value:"",ua:"",url:domain.m,matchUa:/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i,_init:function(){this.bl_m_value=b.getCookie(this._bl_m);this.ua=a.navigator.userAgent.toLocaleLowerCase();this.go()},go:function(){if(this.matchUa.test(this.ua)&&this.bl_m_value!="1"){a.location.href=this.url;return}},getCookie:function(f){var d=f+"=";var h=d.length;var c=document.cookie.length;var g=0;while(g<c){var e=g+h;if(document.cookie.substring(g,e)==d){return this.getCookieValue(e)}g=document.cookie.indexOf(" ",g)+1;if(g==0){break}}return null},getCookieValue:function(d){var c=document.cookie.indexOf(";",d);if(c==-1){c=document.cookie.length}return unescape(document.cookie.substring(d,c))}};b._init()})(window);
            </script> 
            <script type="text/javascript" src="js/jquery-1.9.1.min.js" ></script>
            <script type="text/javascript" src="js/sui.js" ></script>
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
		<link rel="stylesheet" href="/static/Home/css/safe/css.css" />
		<link rel="stylesheet" href="/static/Home/css/safe/common.min.css" />
		<link rel="stylesheet" href="/static/Home/css/safe/ms-style.min.css" />
		<link rel="stylesheet" href="/static/Home/css/safe/personal_member.min.css" />
		<link rel="stylesheet" href="/static/Home/css/safe/Snaddress.min.css" />
		<link rel="stylesheet" href="/static/Home/css/sui.css" />
		<script type="text/javascript" src="/static/Home/js/jquery-1.9.1.min.js" ></script>
        <script type="text/javascript" src="/static/Home/js/sui.js" ></script>
        <style>
			progress {
				width: 300px;
				border: 1px solid #ffffff;
				background-color: #e6e6e6;
				color: #0064B4;
				/*IE10*/
			}
			
			progress::-moz-progress-bar {
				background: #FFFFFF;
			}
			
			progress::-webkit-progress-bar {
				background: #ccc;
			}
			
			progress::-webkit-progress-value {
				background: #FF7700;
			}
			a{
				color: #000000;
			}
			.sui-table th, .sui-table td {
		    padding: 16px 8px;
		    line-height: 18px;
		    text-align: center;
		    vertical-align: middle;
		    border-top: 1px solid #e6e6e6;
		    
		}
	 .sui-nav.nav-tabs > .active > a {
	    border:1px #fff solid;
	    background-color: #fff;
	     border-bottom-color: transparent; 
	    cursor: default;
	    font-weight: normal;
	    color: #F2873B;
		}
		.sui-nav.nav-tabs > li > a {
		    color: #333333;
		    line-height: 18px;
		    -webkit-border-radius: 3px 3px 0 0;
		    -moz-border-radius: 3px 3px 0 0;
		    border-radius: 3px 3px 0 0;
		    border: 1px #fff solid;
		    border-bottom: 1px #fff solid;
		    height: 30px;
		    width: 80px;
		    text-align: center;
		    padding-top: 10px;
		    font-size: 14px;
		}
		.sui-nav.nav-tabs {
		    border-bottom: 1px solid #CECECE;
		    padding-left: 5px;
		}
		/*.sui-nav.nav-tabs > .active > a:hover {
			  font-weight: bold;
		    cursor: default;
		    font-weight: bold;
		    color: #F37B1D;
		}*/
		.sui-nav.nav-tabs > li {
		    margin-bottom: -1px;
		     background-color: #fff; 
		     border-bottom: 1px #ccc solid;
		}
		.sui-nav.nav-tabs > .active {
		    border-bottom: 0;
		}
		.sui-nav.nav-tabs > li + li {
		    margin-left: -3px;
		}
		</style>
        <style type="text/css">
            .nav-manage .list-nav-manage {
                position: absolute;
                padding: 15px 4px 10px 15px;
                left: 0;
                top: -15px;
                width: 90px;
                background: #FFF;
                box-shadow: 1px 1px 2px #e3e3e3, -1px 1px 2px #e3e3e3;
                z-index: 10;
            }
            
            .ms-nav li {
                float: left;
                position: relative;
                padding: 0 20px;
                height: 44px;
                font: 14px/26px "Microsoft YaHei";
                color: #FFF;
                cursor: pointer;
                z-index: 10;
            }
            .sui-table th {
        font-weight: normal;
        line-height:40px
            }
                .sui-table td {
        font-weight: normal;
        line-height:40px
            }
            </style>
		<style>

		body {
		    background: #f5f5f5;
		}
			.sui-table th{
		    padding: 16px 8px;
		    line-height: 18px;
		    text-align: center;
		    vertical-align: middle;
		    border-top: 1px solid #e6e6e6;
		    font-weight: normal;
		    font-size: 14px;
		    color: #333333;
		   }
		   .sui-table td {
		    padding: 16px 8px;
		    line-height: 18px;
		    text-align: center;
		    vertical-align: middle;
		    border-top: 1px solid #e6e6e6;
		    font-weight: normal;
		    font-size: 12px;
		    color: #333333;
		   }
	img {
	    max-width: 100%;
	    height: auto;
	    /*vertical-align: bottom;*/
	    border: 0;
	    -ms-interpolation-mode: bicubic;
	    margin-left: -10px;
	}
a{
	color: #000000;
}
		</style>
	</head>

	<body class="ms-body">
		<div id="" class="ng-top-banner"></div>
        <div class="tools"> 
            <div class="wrap"> 
             <div class="bl-name" title="宋岐最帅">
              <div class="txt">
               宋岐最帅
              </div>
              <b></b>
             </div> 
             <div class="tools-left"> 
              <div class="tools-leftfont">
               <a href="javascript:void(0);"><span>网站导航</span><i></i></a>
              </div> 
              <span class="left-span"></span> 
              <div class="divshow left-show"> 
               <div class="left-show-dl"> 
                <dl> 
                 <dd>
                  <a target="_blank" href="http://www.bailiangroup.cn/">百联集团官网</a>
                 </dd> 
                 <dd>
                  <a target="_blank" href="http://www.safepass.cn/">安付宝网</a>
                 </dd> 
                 <dd>
                  <a target="_blank" href="https://shop.bl.com/resmp-1/mp/shopDec/79484/79484.html">第一医药</a>
                 </dd> 
                 <dd>
                  <a target="_blank" href="https://www.okcard.com/clogin">OK会员卡专区</a>
                 </dd> 
                </dl> 
               </div> 
              </div> 
             </div> 
             <div class="tools-info"> 
              <s style="display:none">
                •
              </s> 
              <a href="https://my.bl.com/message/mynews.html" target="_blank" class="red-font">消息</a> 
             </div> 
             <div class="tools-right"> 
              <ul>
                     <li id="user_not_login" class="box"> 
                 <div> 
                 <a href="/login/create"><span>欢迎827055770@qq.com</span></a> 
                 </div> <b></b> </li> 
                     <li style="display: none" class="box-tols" id="user_login_in"> <a href="https://my.bl.com/ym/nl/toIndex.html" target="_blank"> <i>Hi，</i> <span id="member_name"></span> </a> <a href="/logout">退出</a> <b></b> </li> 
               
               <li> 
                <div class="tools-leftfont">
                 <a target="_blank" href="/person/create"><span>我的信息</span><i></i></a>
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
                <div class="tools-leftfont">
                 <a target="_blank" href="https://jiaofei.bl.com"><span>充值缴费</span><i></i></a>
                </div> <span class="left-span"></span> <b></b> 
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
                  <span class="palm-item-img"><img src="/static/Home/picture/1807592795.jpg" width="100" height="100"></span> 
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
                  <span class="palm-item-img"><img src="/static/Home/picture/1849148942.png" width="100" height="100"></span> 
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
        
           <div class="header"> 
            <div class="wrap"> 
             <div class="header-font"> 
              <div class="header-logo"> 
               <div class="logo"><a href="/index"><img src="/static/Home/header-logo.png"></a></div> 
               
              </div> 
              <div class="header-search"> 
               <div class="fl-w215"> 
                <a href="http://www.okcard.com" target="_blank">安付宝OK卡专区</a> 
               </div> 
               <div class="header-search-top"> 
                <div class="header-search-input"> 
                 <div class="indiv">
                  <input class="gray" type="text" data-value="" data-placeholder="" value="光明" id="first_header_search_input">
                 </div> 
                 <div class="header-input-show" id="first_ul" style="display: none;"> 
                  <div class="header-input-title"> 
                   <div class="header-input-title-fl">
                    历史搜索
                   </div> 
                   <a href="#" class="header-input-title-fr"> <i></i> <span>清除</span> </a> 
                  </div> 
                  <dl> 
                  </dl> 
                 </div> 
                 <div class="header-input-show1" style="display: none;"> 
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
               <div class="header-search-font"><a href="http://search.bl.com/k-%25E5%2586%259C%25E5%25A4%25AB%25E5%25B1%25B1%25E6%25B3%2589.html" data_wa_type="ad" data_wa_val="P668824_-_%u519C%u592B%u5C71%u6CC9_-_5">农夫山泉</a><span>|</span><a href="http://search.bl.com/k-%25E9%25B8%25A1%25E8%259B%258B.html" data_wa_type="ad" data_wa_val="P668824_-_%u9E21%u86CB_-_5">鸡蛋</a><span>|</span><a href="http://search.bl.com/k-%25E6%25B0%25B4.html" data_wa_type="ad" data_wa_val="P668824_-_%u6C34_-_5">水</a><span>|</span><a href="http://search.bl.com/k-%25E6%2596%2599%25E9%2585%2592.html" data_wa_type="ad" data_wa_val="P668824_-_%u6599%u9152_-_5">料酒</a><span>|</span><a href="http://search.bl.com/k-%25E7%259F%25BF%25E6%25B3%2589%25E6%25B0%25B4.html" data_wa_type="ad" data_wa_val="P668824_-_%u77FF%u6CC9%u6C34_-_5">矿泉水</a><span>|</span><a href="http://search.bl.com/k-%25E8%25B5%2584%25E7%2594%259F%25E5%25A0%2582.html" data_wa_type="ad" data_wa_val="P668824_-_%u8D44%u751F%u5802_-_5">资生堂</a><span>|</span><a href="http://search.bl.com/k-%25E9%2585%25B1%25E6%25B2%25B9.html" data_wa_type="ad" data_wa_val="P668824_-_%u9171%u6CB9_-_5">酱油</a><span>|</span><a href="http://search.bl.com/k-%25E9%25BB%2584%25E9%2585%2592.html" data_wa_type="ad" data_wa_val="P668824_-_%u9EC4%u9152_-_5">黄酒</a><span>|</span><a href="http://search.bl.com/k-%25E6%25B4%2597%25E5%258F%2591%25E6%25B0%25B4.html" data_wa_type="ad" data_wa_val="P668824_-_%u6D17%u53D1%u6C34_-_5">洗发水</a><span>|</span><a href="http://search.bl.com/k-%25E6%25B4%2597%25E9%259D%25A2%25E5%25A5%25B6.html" data_wa_type="ad" data_wa_val="P668824_-_%u6D17%u9762%u5976_-_5">洗面奶</a></div> 
              </div> 
             </div> 
            </div> 
           </div>
		<div id="ms-center" class="personal-member">
			<div class="cont">
				<div class="cont-side">
					<div class="ms-side" style="margin-top: 20px;">
						<article class="side-menu side-menu-off">
							<dl class="side-menu-tree" style="padding-left: 50px;">
                                <dt><img src="/static/Home/img/左侧/我的购物车.png"  style="margin-right: 10px;margin-left: -20px;"/><a href="/cart">我的购物车</a></dt>
                                <dt><img src="/static/Home/img/左侧/我的买啦.png"  style="margin-right: 10px;margin-left: -20px;"/>我的信息</dt>
								<dd>
									<a href="/person/create">个人资料</a>

								</dd>
								<dd>
									<a href="/myaddress">收货地址</a>

								</dd>
								<dt><img src="/static/Home/img/左侧/file.png"  style="margin-right: 10px;margin-left: -20px;"/>订单管理</dt>
								<dd>
									<a href="/myorder">我的订单</a>

								</dd>
								<dd>
									<a href="/collect/">我的收藏</a>

								</dd>
								<dd>
									<a href="/mycomment">我的评价</a>

								</dd>
								<dd>
									<a >我的足迹</a>

								</dd>
								<dd>
									<a >我的拍卖</a>

								</dd>
								<dd>
									<a>我的优惠券</a>

								</dd>
								
								
								<dt><img src="/static/Home/img/左侧/v-card-3.png"  style="margin-right: 10px;margin-left: -20px;"/>售后服务</dt>
								<dd>
									<a >退换货</a>

								</dd>
								<dd>
									<a>意见/投诉</a>

								</dd>
							</dl>

							<a ison="on" class="switch-side-menu icon-up-side"><i></i></a>
						</article>
                    </div>
                </div>
                <!--以上为头部-->

<!--占位符-->
@section("homeinfo")

@show

        <!--以下为尾部-->
		<div class="clear "></div>
		<div class="ng-footer ">

			<textarea class="footer-dom " id="footer-dom-02 ">
			</textarea>
			<div class="ng-fix-bar "></div>
		</div>
		<style type="text/css ">
		
			.ng-footer {
				height: 130px;
				margin-top: 0;
			}
		
			
			.ng-s-footer {
				height: 130px;
				background: none;
				text-align: center;
			}
			
			.ng-s-footer p.ng-url-list {
				height: 25px;
				line-height: 25px;
			}
			
			.ng-s-footer p.ng-url-list a {
				color: #666666;
			}
			
			.ng-s-footer p.ng-url-list a:hover {
				color: #f60;
			}
			
			.ng-s-footer .ng-authentication {
				float: none;
				margin: 0 auto;
				height: 25px;
				width: 990px;
				margin-top: 5px;
			}
			
			.ng-s-footer p.ng-copyright {
				float: none;
				width: 100%;
			}
			
			.root1200 .ng-s-footer p.ng-copyright {
				width: 100%;
			}
		</style>
		<script type="text/javascript " src="/static/Home/js/safe/ms_common.min.js "></script>
	</body>
    <script type="text/javascript" src="/static/Home/js/jquery-1.8.2.min.js"></script> 
    <script type="text/javascript" src="/static/Home/js/bl.js"></script> 
    <script type="text/javascript" src="/static/Home/js/sea.js"></script> 
    <script type="text/javascript">
      seajs.use(domain.js+'/resources/v4.2/js/index/index.js?version=1590653691114');
  </script> 
    <script type="text/javascript" src="/static/Home/js/pageinit.js"></script> 
    <script type="text/javascript" src="/static/Home/js/pageinfo.js"></script> 
    <style type="text/css">
        .fenye{
                border: 1px #ccc solid;
                 padding: 3px; 
                width: 20px;
        }
        .ng-footer {
            height:514px;
            margin-top: 0;
        }
        
        .ng-s-footer {
            height: 130px;
            background: none;
            text-align: center;
        }
        
        .ng-s-footer p.ng-url-list {
            height: 25px;
            line-height: 25px;
        }
        
        .ng-s-footer p.ng-url-list a {
            color: #666666;
        }
        
        .ng-s-footer p.ng-url-list a:hover {
            color: #f60;
        }
        
        .ng-s-footer .ng-authentication {
            float: none;
            margin: 0 auto;
            height: 25px;
            width: 990px;
            margin-top: 5px;
        }
        
        .ng-s-footer p.ng-copyright {
            float: none;
            width: 100%;
        }
        
        .root1200 .ng-s-footer p.ng-copyright {
            width: 100%;
        }
</html>
<script type="text/javascript" src="js/safe/ms_common.min.js"></script>