<!DOCTYPE html>
<html lang="zh-CN">
 <head>
  <script src="//hm.baidu.com/hm.js?d4bb30b3ba58b04cd3d04be8ebb57263"></script>
  <script type="text/javascript" async="" src="/static/Home/js/mba_dsp.js"></script>
  <script type="text/javascript" async="" src="/static/Home/js/mba.js"></script>
  <script async="" src="/static/Home/js/sensorsdata.min.js"></script> 
  <script src="/static/jquery-1.8.3.min.js"></script>
  <meta charset="utf-8" /> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
  <meta name="renderer" content="webkit" /> 
  <title>【{{$shop->name}}】【官方授权】</title> 
 <meta name="keywords" content="{{$shop->name}}" /> 
  <meta name="description" content="{{$shop->descr}}" /> 
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
    
        var pageInfoJson = "{\"categoryId\":\"PC_SpecificZone\",\"exportAttributes\":\"产品id-_-4225322-_--_--_--_-\",\"id\":\"tp-11\",\"map\":{\"priceTypeStr\":\"\",\"discountStr\":\"\",\"brandIdStr\":\"\"},\"pageId\":\"PC_闪购商品详情页_4225322\",\"searchResult\":\"\",\"searchTerm\":\"\",\"url\":\"product_v5/product_v5\"}";
        if (pageInfoJson) {
            jsonPageInfo = eval("(" + pageInfoJson + ")");
        }
    </script>
  <link rel="icon" href="/favicon.ico" mce_href="/favicon.ico" type="image/x-icon" /> 
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" /> 
  <link type="text/css" rel="stylesheet" href="/static/Home/css/base.css" /> 
  <link type="text/css" rel="stylesheet" href="/static/Home/css/detail.css" /> 
  <link type="text/css" rel="stylesheet" href="/static/Home/css/tools1200.css" /> 
  <link type="text/css" rel="stylesheet" href="/static/Home/css/footer1200.css" /> 
  <link type="text/css" rel="stylesheet" href="/static/Home/css/button.css" /> 
  <link type="text/css" rel="stylesheet" href="/static/Home/css/pop-up.css" /> 
  <link type="text/css" rel="stylesheet" href="/static/Home/css/header1200.css" /> 
  <link type="text/css" rel="stylesheet" href="/static/Home/css/nav1200.css" /> 
  <link type="text/css" rel="stylesheet" href="/static/Home/css/sidebar.css" /> 
  <script type="text/javascript" async="" src="/static/Home/js/loader.js"></script>
  <script type="text/javascript" async="" src="/static/Home/js/73105.js"></script>
  <link type="text/css" rel="stylesheet" href="https://livechat.bl.com/live800/deploy/live800Button.css" />
 </head> 
 <body class="w1200 black-nav"> 
  
  <!-- tools --> 
  <div class="tools"> 
   <div class="wrap"> 
    <div class="bl-name" title="七七七七七">
     <div class="txt">
      七七七七七
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
        <a target="_blank" href="https://my.bl.com/ym/orderList.html">我的订单</a>
       </div><b></b></li> 
      <li> 
       <div class="tools-leftfont">
        <a target="_blank" href="https://my.bl.com"><span>我的信息</span><i></i></a>
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
          <a target="_blank" href="https://my.bl.com/favorite/myFavorite.html">我的收藏</a>
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
       <div class="tools-leftfont">
        <a href="javascript:void(0);"><span>掌上百联</span><i></i></a>
       </div> <span class="left-span"></span> <b></b> 
       <div class="divshow palm"> 
        <div class="palm-item"> 
         <span class="palm-item-img"><img src="https://img23.iblimg.com/market-2/images/activity/1807592795.jpg" width="100" height="100" /></span> 
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
         <span class="palm-item-img"><img src="https://img22.iblimg.com/market-2/images/activity/1849148942.png" width="100" height="100" /></span> 
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
  <div id="search" class="header"> 
   <div class="wrap"> 
    <div class="header-font"> 
     <div class="header-logo"> 
      <div class="logo">
       <a href="https://www.bl.com"><img src="https://res11.iblimg.com/respc-1/resources/v4.0/css/i/header-logo.png" /></a>
      </div> 
      <div class="secondary-logo">
       <a href="http://channel.bl.com/apple.html" target="_blank" data_wa_type="ad" data_wa_val="393_-_2147413_-_1"><img src="https://img22.iblimg.com/market-2/images/activity/231190231.png" width="150" /></a>
      </div> 
     </div> 
     <div class="header-search"> 
      <div class="header-search-top"> 
       <div class="header-search-input"> 
        <div class="indiv">
         <input type="text" id="first_header_search_input" class="gray" value="酸奶" />
        </div> 
        <div class="header-input-show" style="display: none;"> 
         <div class="header-input-title"> 
          <div class="header-input-title-fl">
           历史搜索
          </div> 
          <a target="_blank" href="javascript:;" class="header-input-title-fr"> <i></i> <span>清除</span> </a> 
         </div> 
         <dl></dl> 
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
        <!-- 
                            <div class="header-input-show2">
                                <dl>
                                    
                                </dl>
                            </div> --> 
       </div> 
       <div class="header-search-button">
        <button type="button" class="header-search-button"></button>
       </div> 
      </div> 
      <div class="header-search-font">
       <a href="http://search.bl.com/k-%25E5%2595%25A4%25E9%2585%2592.html" data_wa_type="ad" data_wa_val="P668824_-_%u5564%u9152_-_5">啤酒</a>
       <span>|</span>
       <a href="http://search.bl.com/k-%25E9%2587%2591%25E9%25BE%2599%25E9%25B1%25BC.html" data_wa_type="ad" data_wa_val="P668824_-_%u91D1%u9F99%u9C7C_-_5">金龙鱼</a>
       <span>|</span>
       <a href="http://search.bl.com/k-%25E7%2589%2599%25E8%2586%258F.html" data_wa_type="ad" data_wa_val="P668824_-_%u7259%u818F_-_5">牙膏</a>
       <span>|</span>
       <a href="http://search.bl.com/k-%25E5%258F%25AF%25E4%25B9%2590.html" data_wa_type="ad" data_wa_val="P668824_-_%u53EF%u4E50_-_5">可乐</a>
       <span>|</span>
       <a href="http://search.bl.com/k-%25E5%2585%25B0%25E8%2594%25BB.html" data_wa_type="ad" data_wa_val="P668824_-_%u5170%u853B_-_5">兰蔻</a>
       <span>|</span>
       <a href="http://search.bl.com/k-%25E5%2592%2596%25E5%2595%25A1.html" data_wa_type="ad" data_wa_val="P668824_-_%u5496%u5561_-_5">咖啡</a>
       <span>|</span>
       <a href="http://search.bl.com/k-%25E7%25B1%25B3.html" data_wa_type="ad" data_wa_val="P668824_-_%u7C73_-_5">米</a>
       <span>|</span>
       <a href="http://search.bl.com/k-%25E6%25B4%2597%25E8%25A1%25A3%25E6%25B6%25B2.html" data_wa_type="ad" data_wa_val="P668824_-_%u6D17%u8863%u6DB2_-_5">洗衣液</a>
       <span>|</span>
       <a href="http://search.bl.com/k-%25E6%2588%25B4%25E6%25A3%25AE.html" data_wa_type="ad" data_wa_val="P668824_-_%u6234%u68EE_-_5">戴森</a>
       <span>|</span>
       <a href="http://search.bl.com/k-%25E5%258D%25AB%25E7%2594%259F%25E5%25B7%25BE.html" data_wa_type="ad" data_wa_val="P668824_-_%u536B%u751F%u5DFE_-_5">卫生巾</a>
      </div> 
     </div> 
    </div> 
   </div> 
  </div> 
  <div class="nav"> 
   <div class="wrap"> 
    <div class="nav-left"> 
     <div class="nav-leftfont"> 
      <i></i> 
      <span><a href="https://www.bl.com/commodity/toCommodity.html" target="_blank">所有商品分类</a></span> 
     </div> 
     <div class="show-nav">
      <div class="banner-itemleft_newbg"></div>
      <div class="banner-itemleft int-nav">
       <ul>
        <li data_qid="9999062360"> <i class="jinkou"></i> <span><a href="http://global.bl.com/" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999062360_-_3">百联进口 全球购</a></span></li>
        <li data_qid="9999060472"> <i class="shengxian"></i> <span><a href="http://channel.bl.com/freshhome.html?bl_ad=7304_-_427578_-_1" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999060472_-_3">生鲜食品</a></span></li>
        <li data_qid="9999060421"> <i class="shipin"></i> <span><a href="http://search.bl.com/c-a102660.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999060421_-_3">食品粮油</a> <a href="http://search.bl.com/c-a212822.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999060421_-_3">酒水冲饮</a></span></li>
        <li data_qid="9999060376"> <i class="huli"></i> <span><a href="http://search.bl.com/c-a103443.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999060376_-_3">美容护理</a></span></li>
        <li data_qid="9999059932"> <i class="lengdong"></i> <span><a href="http://search.bl.com/c-a102516.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999059932_-_3">家清 纸品 一次性</a></span></li>
        <li data_qid="9999060060"> <i class="sanc"></i> <span><a href="http://search.bl.com/c-a101742.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999060060_-_3">手机数码</a> <a href="http://search.bl.com/c-a212905.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999060060_-_3">电脑办公</a></span></li>
        <li data_qid="9999059985"> <i class="jiadian"></i> <span><a href="http://search.bl.com/c-a102228.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999059985_-_3">家用电器</a></span></li>
        <li data_qid="9999059882"> <i class="muying"></i> <span><a href="http://search.bl.com/c-a102435.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999059882_-_3">母婴玩具</a></span></li>
        <li data_qid="9999060521"> <i class="yiliao"></i> <span><a href="http://search.bl.com/c-a103942,a103983,a103910,a104067.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999060521_-_3">营养保健</a> <a href="http://search.bl.com/k-%25E7%25AC%25AC%25E4%25B8%2580%25E5%258C%25BB%25E8%258D%25AF.html?bl_ad=P668822_-_%u7B2C%u4E00%u533B%u836F_-_5#" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999060521_-_3">第一医药</a></span></li>
        <li data_qid="9999061110"> <i class="jiaju"></i> <span><a href="http://search.bl.com/c-a102537.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999061110_-_3">餐厨用具 家居家装</a></span></li>
        <li data_qid="9999059635"> <i class="fuzhuang"></i> <span><a href="http://search.bl.com/c-a102561.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999059635_-_3">女装男装</a></span></li>
        <li data_qid="9999060010"> <i class="xiangbao"></i> <span><a href="http://search.bl.com/c-a102653.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999060010_-_3">鞋靴箱包</a> <a href="http://search.bl.com/c-a102261.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999060010_-_3">珠宝饰品</a></span></li>
        <li data_qid="9999060575"> <i class="qiche"></i> <span><a href="http://search.bl.com/c-a102103.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999060575_-_3">运动户外</a> <a href="http://search.bl.com/c-a103771.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999060575_-_3">汽车用品</a></span></li>
        <li data_qid="9999109339"> <i class="cardbook"></i> <span><a href="http://blk.bl.com/" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999109339_-_3">礼品卡</a> <a href="http://chongzhi.bl.com/" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999109339_-_3">充值</a> <a href="http://search.bl.com/c-a104715.html" target="_blank" data_wa_type="ad" data_wa_val="P668899_-_9999109339_-_3">服务</a></span></li>
       </ul>
      </div>
      <div class="left-ul-show clearfix">
       <div class="gb-icon"></div>
       <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
       </ul>
      </div>
     </div> 
    </div> 
    <div class="nav-right"> 
     <ul> 
      <li><a href="https://www.bl.com" target="_blank">首页<span></span></a></li> 
      <li><a href="https://life.bl.com" target="_blank">生活日用<span></span></a></li> 
      <li><a href="https://fashion.bl.com" target="_blank">24H百货<span></span></a></li> 
      <li><a href="https://global.bl.com" target="_blank">全球购<span></span></a></li> 
      <li><a href="https://s.bl.com" target="_blank">精品闪购<span></span></a></li> 
      <li><a href="https://channel.bl.com/3c.html" target="_blank">电器城<span></span></a></li> 
      <li><a href="https://blk.bl.com" target="_blank">百联卡<span></span></a></li> 
     </ul> 
    </div> 
   </div> 
  </div> 
  <div class="wrap detail"> 
   <input type="hidden" id="q_categoryId" value="aSpecificZone" /> 
   <div class="seller"> 
    <div class="seller-name"> 
     <em class="seller-logo"><a href="javascript:void(0);" class="brandJump"><img src="http://img15.iblimg.com/goods-135/images/brand/1493500521.jpg" height="44" /></a></em> 
     <input id="brandname" type="hidden" value="Apple" />
     <input id="brandKeyWord" type="hidden" value="%25E8%258B%25B9%25E6%259E%259C%2528Apple%2529" />
     <input id="brandid" type="hidden" value="205046" />
     <input id="props" type="hidden" value="{&quot;displayBrandSid&quot;:&quot;184215&quot;}" />
    </div> 
   </div> 
   <div class="product-intro clearfix"> 
    <div class="intro-left"> 
     <div class="spec-preview" id="preview"> 
      <span class="jqzoom"> 
       <div id="mainPic" class="jqzoom-body">
        <img class="zoomimg lazytag" src="{{$shop->pic}}" width="" style="display: inline;" alt="" />
       </div> </span> 
      <div class="load-video" id="loadVideo"> 
      </div> 
     </div> 
     <!-- 缩图开始 --> 
     <div class="spec-scroll"> 
      <a class="prev" style="display: none;"></a> 
      <a class="next" style="display: none;"></a> 
      <div class="items"> 
       <ul id="picture"> 
       <li><img jqimg="images/b1.jpg" id="img_0" class="lazytag itemborder" src="{{$shop->pic}}" onmousemove="preview(this);" style="display: inline;" /></li>
       </ul> 
      </div> 
     </div> 
     <!-- 缩图结束 --> 
     <!-- 分享 --> 
     <!-- 分享结束 --> 
    </div>
    <div class="details "> 
     <div class="goods-name"> 
     <h1> <em class="late">宋岐</em> 【官方授权】【{{$shop->name}}】</h1> 
      <div class="title">
       好就得了
       <a href="http://promotion.bl.com/nc/PC_HDGL202004290000012097_12831.html" title="##follow me##" target="_blank" onclick="clickButton(&quot;PC_文字链_4225322&quot;,null,null,&quot;闪购商品详情页&quot;,&quot;PC_Text&quot;,null)">##follow me##</a>
      </div> 
     </div> 
     <div class="active-box" id="productFlash_html">
      <input type="hidden" id="q_leftTimesSum" value="1773259000" /> 
      <input type="hidden" id="q_distanceStartTimes" value="" /> 
      <em>闪购</em>
     </div> 
     <div class="goods-price clearfix"> 
      <div class="price-line"> 
       <span class="black"> 活动价</span> 
      <span class="price"> <strong id="FlashPrice"><i>&yen;</i>&nbsp;{{$shop->price}}</strong> </span> 
       <span class="c999" id="salePrice">参考价 ￥100000.0</span> 
       <span class="gral" id="productPoint"></span> 
      </div> 
     </div> 
     <div class="min-hight" id="goods-details"> 
      <div id="promotion-dl"></div> 
      <!--  服务  关税 --> 
      <div class="pay-sevice"> 
       <!-- 服务 --> 
       <dl> 
        <dt>
         服务
        </dt> 
        <dd> 
         <div class="message-line">
           本产品由科技岐有限公司提供发货和售后服务
          <em id="delivery-timeliness" style="display: none;"></em> 
         </div> 
         <div class="frozen-line" id="frozenLine"></div> 
         <ul class="service-line"> 
          <li class="service-on"> <strong class="point-color"></strong> </li> 
         </ul> 
        </dd> 
       </dl> 
      </div> 
      <!-- 规格 choose-type choose-type-error--> 
      <div id="error-tip" class="choose-type">
       <div class="type-table" id="type_table"> 
        <div class="error-table">
          请选择商品规格 
        </div> 
        <dl> 
         <dt> 
          <span>型号及主要配置</span> 
         </dt> 
         <dd> 
          <ul class="color-list" id="ifHaveModel"> 
           <li name="prop_model" goodssid="3843012" class="">WIFI 64G 灰色</li> 
           <li name="prop_model" goodssid="3843013" class="select">WIFI 64G 银色</li> 
           <li name="prop_model" goodssid="3843014" class="">WIFI 64G 金色</li> 
           <li name="prop_model" goodssid="3843015" class="">WIFI 256G 灰色</li> 
           <li name="prop_model" goodssid="3843016" class="">WIFI 256G 银色</li> 
           <li name="prop_model" goodssid="3843017" class="">WIFI 256G 金色</li> 
          </ul> 
         </dd> 
        </dl> 
       </div> 
       <input type="hidden" id="q_goodList" value="[{&quot;colourSid&quot;:0,&quot;goodsSid&quot;:4225302,&quot;proSellBit&quot;:4,&quot;propValue&quot;:&quot;WIFI 512G 深空灰&quot;,&quot;stanSid&quot;:0,&quot;stockNum&quot;:&quot;0&quot;,&quot;subStanSid&quot;:0},{&quot;colourSid&quot;:0,&quot;goodsSid&quot;:4225303,&quot;proSellBit&quot;:4,&quot;propValue&quot;:&quot;WIFI 512G 银色&quot;,&quot;stanSid&quot;:0,&quot;stockNum&quot;:&quot;9&quot;,&quot;subStanSid&quot;:0},{&quot;colourSid&quot;:0,&quot;goodsSid&quot;:4225305,&quot;proSellBit&quot;:4,&quot;propValue&quot;:&quot;WIFI 1T 深空灰&quot;,&quot;stanSid&quot;:0,&quot;stockNum&quot;:&quot;0&quot;,&quot;subStanSid&quot;:0},{&quot;colourSid&quot;:0,&quot;goodsSid&quot;:4225310,&quot;proSellBit&quot;:4,&quot;propValue&quot;:&quot;WIFI 128G 银色&quot;,&quot;stanSid&quot;:0,&quot;stockNum&quot;:&quot;7&quot;,&quot;subStanSid&quot;:0},{&quot;colourSid&quot;:0,&quot;goodsSid&quot;:4225311,&quot;proSellBit&quot;:4,&quot;propValue&quot;:&quot;WIFI 1T 银色&quot;,&quot;stanSid&quot;:0,&quot;stockNum&quot;:&quot;0&quot;,&quot;subStanSid&quot;:0},{&quot;colourSid&quot;:0,&quot;goodsSid&quot;:4225322,&quot;proSellBit&quot;:4,&quot;propValue&quot;:&quot;WIFI 128G 深空灰&quot;,&quot;stanSid&quot;:0,&quot;stockNum&quot;:&quot;9&quot;,&quot;subStanSid&quot;:0},{&quot;colourSid&quot;:0,&quot;goodsSid&quot;:4225324,&quot;proSellBit&quot;:4,&quot;propValue&quot;:&quot;WIFI 256G 银色&quot;,&quot;stanSid&quot;:0,&quot;stockNum&quot;:&quot;24&quot;,&quot;subStanSid&quot;:0},{&quot;colourSid&quot;:0,&quot;goodsSid&quot;:4225328,&quot;proSellBit&quot;:4,&quot;propValue&quot;:&quot;WIFI 256G 深空灰&quot;,&quot;stanSid&quot;:0,&quot;stockNum&quot;:&quot;7&quot;,&quot;subStanSid&quot;:0}]" /> 
       <input type="hidden" id="q_ifHaveModel" value="1" />
      </div> 
     </div> 
     <form action="/cart" method="post">
     <dl> 
      <dt class="item-number">
       购买数量
      </dt> 
      <dd> 
       <div class="item-quantity"> 
        <div class="wrap-input"> 
         <button id="reduce" type="button" class="btn-add jian" >-</button> 
         <input value="1" id="" name="num" type="text"/> 
         <button type="button" id="addnum" class="btn-add jia">+</button> 
        </div>  
    <span id="productStor">库存{{$shop->num}}件</span> 
       </div> 
      </dd>
     </dl> 
     <dl class="buy-cart"> 
      <dt></dt> 
      <dd> 
        
       <div class="btn-line" id="but_tiem">
           {{csrf_field()}}
       <input type="hidden" name="id" value="{{$shop->id}}">
        <button type="submit" id="addCart" class="btn-buy">加入购物车</button>
       </div> 
      <a href="javascript:void(0);" class="collect mycollect" good_id="{{$shop->id}}" user_id="{{$user_id}}" id="">收藏</a> 
      <a href="javascript:void(0);" class="collect mygive" good_id="{{$shop->id}}" give_id="{{$give->id}}">{{$give->give_num}}</a> 
      </dd> 
     </dl> 
    </form>
    <script src="/public/static/jquery-1.8.3.min.js"></script>
    <script>
      //alert($)
      $(".mycollect").click(function(){
        //alert("收藏");
        $(this).html("已收藏");
        good_id=$(this).attr("good_id");
        //alert(good_id);
        user_id=$(this).attr("user_id");
        //alert(user_id);
        $.get("/collect/create",{good_id:good_id,user_id:user_id},function(data){
          //alert(data);
          if(data.msg=='ok'){
            alert("收藏成功");
          }
          else{
            alert("收藏失败");
          }
        },'json')
      })

    </script>
    <script>
      //alert($);
      $(".mygive").toggle(function(){
        good_id=$(this).attr("good_id");
        give_id=$(this).attr("give_id");
        var o=$(this);
        //alert(good_id);
        //alert(give_id);
        $.get("/addgive",{good_id:good_id,give_id:give_id},function(data){
          //alert(data);
          if(data.msg=='ok'){
            n=o.html();
            num=parseInt(n)+1;
            o.html(num);
            //alert(n);
            alert("点赞成功");
          }
          else{
            alert("点赞失败");
          }
        },'json')},function(){  //这是第二次的点击事件
          //alert("取消");
          var give_id=$(this).attr("give_id");
          var o=$(this);
          //alert(give_id);
          $.get("/delgive",{give_id:give_id},function(data){
            //alert(data);
            if(data.msg=='ok'){
            n=o.html();
            num=parseInt(n)-1;
            o.html(num);
            //alert(n);
            alert("取消点赞");
          }
          else{
            alert("取消点赞失败");
          }
          },'json')
      })





      /*$(".mygive").click(function(){
        //alert("a");
        
      })*/
     


    </script>
    <script>
        $(".jia").click(function(){
            //alert("加一个");
            var n=$(this).prev().val();
            var num=parseInt(n)+1;
            if(num==0){return;}
            $(this).prev().val(num);
        })
        $(".jian").click(function(){
            //alert("减一个");
            var n=$(this).next().val();
            var num=parseInt(n)-1;
            if(num==0){return;}
            $(this).next().val(num);
        })
    </script>
     <div class="praise"> 
      <span><em>88%</em>好评</span> 
      <i>|</i> 
      <span><a href="#proinfo-main-menu" class="black">8</a> 评价</span> 
      <i>|</i> 
      <span class="blue" id="memberCommentPoints"><a href="http://promotion.bl.com/nc/PC_HDGL20170308000001406_1386.html" class="blue" target="_blank">评价返积分</a></span> 
     </div> 
    </div> 
   </div> 
   <div class="product-table clearfix"> 
    <div class="proinfo-left"> 
     <div class="list-main-left-unit lazy-fn" id="loadCms2" data-original="v4.2/js/product/loadCms2.js"> 
      <div class="unit clearfix"> 
       <div class="unit-title">
        大家都在买
       </div> 
       <ul class="pro-class" id="cms_2"> 
        <li>
         <div class="pro-show">
          <div class="pro-img">
           <a target="_Blank" data_wa_type="ad" data_wa_val="hotsale_-_pc_hotsale_-_2" href="" title="【官方授权】Apple iPad mini 2019款7.9英寸平板电脑 64G WIFI版 银色 MUQX2CH/A"><img class="lazytag" src="https://Img.iblimg.com/photo-42/3020/1593399389_220x220.jpg" data-original="https://Img.iblimg.com/photo-42/3020/1593399389_220x220.jpg" width="200" height="200" alt="【官方授权】Apple iPad mini 2019款7.9英寸平板电脑 64G WIFI版 银色 MUQX2CH/A" style="display: inline;" /> </a>
          </div>
          <div class="pro-name">
           <a data_wa_type="ad" data_wa_val="hotsale_-_pc_hotsale_-_2" href="">【官方授权】Apple iPad mini 2019款7.9英寸平板电脑 64G WIFI版 银色 MUQX2CH/A</a>
          </div> 
          <div class="pro-money">
           ￥
           <i>2608.0</i>
          </div>
         </div> </li>
        
        
       
        
       </ul> 
      </div> 
     </div> 
    </div> 
    <div class="proinfo-main"> 
     <div class="product-tab-fixed" id="product-tab-fixed" style="display: none;"> 
      <div class="wrap fixed-border"> 
       <div class="item-message"> 
        <img id="des-img" src="https://Img.iblimg.com/photo-49/3020/75414464_60x60.jpg" /> 
        <div class="txt"> 
         <div class="name">
          【官方授权】Apple iPad Pro 11英寸 2020新款 128G MY232CH/A 深空灰色 平板电脑
         </div> 
         <div class="price">
          &yen;5999.00
         </div> 
        </div> 
        <em></em> 
       </div> 
       <div class="product-tab"> 
        <ul id="product-fix-tab" class="product-tab"> 
         <li class="select"><a class="name name-first" href="/index/{{$shop->id}}">商品介绍</a></li> 
         <li class=""><a class="name" href="#proinfo-main-menu">参数及包装</a></li> 
         <li><a class="name" href="#proinfo-main-menu">售后服务</a></li> 
         <li><a class="name" href="/comments/{{$shop->id}}"> 评价详情 ( <span id="p_comment">8</span> )</a></li> 
        </ul> 
       </div> 
       <button class="btn-buy" id="floatCart"> <i></i><span>加入购物车</span> </button> 
      </div> 
     </div> 
     <div class="product-tab"> 
      <ul id="proinfo-main-menu"> 
       <li class="select" classid="1" isnull="1"><a class="name" href="/index/{{$shop->id}}">商品介绍</a></li> 
       <li classid="2" isnull="2" class=""><a class="name" href="#proinfo-main-menu">参数及包装</a></li> 
       <li classid="3" isnull="1"><a class="name" href="#proinfo-main-menu">售后服务</a></li> 
       <li> <a class="name" href="/comments/{{$shop->id}}"> 评价详情 ( <span id="p_comment">8</span> )</a> </li> 
      </ul> 
      
     </div> 
     <div class="goods-details-box"> 
      <div class="goods-details-con clearfix picture-center" id="goodsDetail" style="display: block;"> 
       <div class="goods_ztico" style="display: block;"> 
       </div> 
       <div id="describe">
       <p>{!!$shop->descr!!}</p>
       </div> 
      </div> 
      <div style="display: none;" id="properties" class="goods-details-con clearfix">
       <div class="parameters">
        <strong>包裹清单</strong>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         包裹清单
        </div> 
        <div class="detail">
         iPad Pro USB-C 充电线 (1 米) 18W USB-C 电源适配器
        </div>
       </div>
       <div class="parameters">
        <strong>主体</strong>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         型号
        </div> 
        <div class="detail">
         MY232CH/A
        </div>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         预装操作系统
        </div> 
        <div class="detail">
         IOS
        </div>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         操作系统
        </div> 
        <div class="detail">
         IOS
        </div>
       </div>
       <div class="parameters">
        <strong>配置</strong>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         处理器
        </div> 
        <div class="detail">
         A12Z
        </div>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         CPU核心数
        </div> 
        <div class="detail">
         其它
        </div>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         存储容量(ROM)
        </div> 
        <div class="detail">
         128GB
        </div>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         扩展卡
        </div> 
        <div class="detail">
         不可扩展
        </div>
       </div>
       <div class="parameters">
        <strong>显示</strong>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         分辨率
        </div> 
        <div class="detail">
         2388 x 1668
        </div>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         屏幕尺寸
        </div> 
        <div class="detail">
         11英寸
        </div>
       </div>
       <div class="parameters">
        <strong>网络连接</strong>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         内置网络
        </div> 
        <div class="detail">
         不支持
        </div>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         WiFi功能
        </div> 
        <div class="detail">
         支持WiFi
        </div>
       </div>
       <div class="parameters">
        <strong>功能</strong>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         内置摄像头
        </div> 
        <div class="detail">
         双摄像头
        </div>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         高级功能
        </div> 
        <div class="detail">
         WIFI,重力感应,视网膜屏,蓝牙
        </div>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         通话功能
        </div> 
        <div class="detail">
         不支持
        </div>
       </div>
       <div class="parameters">
        <strong>电源</strong>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         电池类型
        </div> 
        <div class="detail">
         锂聚合物充电电池
        </div>
       </div>
       <div class="parameters">
        <strong>产地</strong>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         产地
        </div> 
        <div class="detail">
         见包装
        </div>
       </div>
       <div class="detail-line clearfix">
        <div class="detail-title">
         进口/国产
        </div> 
        <div class="detail">
         国产
        </div>
       </div>
      </div> 
      <div style="display: block" class="goods-details-con clearfix" id="afterSale"> 
       <div class="server-detail"> 
        <div class="server-title"> 
         <strong>售后服务</strong> 
        </div> 
        <div class="directions"> 
         <div class="sub-title">
          售后保障
         </div> 
         <div class="detail-con">
          品牌官方网站：http://www.apple.com.cn/，售后服务电话：4006668800 
         </div> 
         <div class="sub-title tip">
          i百联承诺
         </div> 
         <div class="detail-con">
          i百联向您保证所售商品均为正品行货，请放心购买！ 如我们的商品不能让您满意，您可通过“帮助中心→售后服务→《退换货政策》”查询退换货相关规则及流程。
          <br /> 特别说明：
          <br /> 1、因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，I百联不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
          <br /> 2、因拍摄灯光及不同显示器色差等原因造成商品图片与实物有色差，一切以实物为准。
         </div> 
         <div class="sub-title tip">
          极限词失效协议：
         </div> 
         <div class="detail-con">
          1、本平台全力支持关于《中华人民共和国广告法》实施的“极限化违禁词”相关规定，且已竭力规避使用相关“违禁词”(如“顶级”、最佳”等极限化词汇)。
          <br /> 2、故即日起凡本平台商品详情页及商品标题等含有“极限化违禁词”介绍的文字说明，一律非本平台主观意愿并即刻失效，不可用于客户作为下单购物的参考依据，不作为理赔的理由。 对商品描述有疑问的可联系在线客服。
          <br /> 3、凡顾客购买本平台商品并下单付款，均表示认同此条约，感谢各位顾客的配合！
         </div> 
         <div class="sub-title tip">
          价格说明
         </div> 
         <div class="detail-con">
          i百联价：商品在i百联平台上，不参加降价让利促销团购等活动时的常规销售价格。
          <br /> 参考价：商品展示的参考价，可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在i百联平台曾经展示过的销售价或其他网站的售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价、销售商门店曾经展示过的销售价等可能会与您购物时展示的不一致，该价格仅供您参考。
          <br /> 异常问题：商品促销信息以商品详情页“促销”栏中的信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议在购买前联系客服咨询。
         </div> 
         <div class="directions-detail-line"> 
          <i class="i1"></i>正品保证 
         </div> 
         <div class="directions-detail-line-message">
           i百联保证所售商品均为正品行货，i百联自营商品可开具机打发票或电子发票。 
         </div> 
         <div class="directions-detail-line"> 
          <i class="i2"></i>精选品牌 
         </div> 
         <div class="directions-detail-line-message">
           迄今为止，已有超过20,000多个国内外品牌入驻i百联，涵盖流行百货、潮流服饰、品质家电、大牌美妆、优质家纺、母婴用品、精选食品等多种品类。 
         </div> 
         <div class="directions-detail-line"> 
          <i class="i3"></i>多种支付方式 
         </div> 
         <div class="directions-detail-line-message">
           全站放心买，支付安心用！百联卡、OK卡、微信、支付宝、银联随心付，优惠折上折！ 
         </div> 
         <div class="directions-detail-line"> 
          <i class="i4"></i>快速配送 
         </div> 
         <div class="directions-detail-line-message">
           专业的仓储管理系统，全流水线无缝衔接，完善的服务保障体系，全程可视化追踪，确保包裹以最快的方式送到顾客的手中。 
         </div> 
         <div class="directions-detail-line"> 
          <i class="i5"></i>金牌客服 
         </div> 
         <div class="directions-detail-line-message">
           365天客服热线，7*12小时品质服务，7*24小时智能问答，用我们的热诚和坦诚为客户提供个性又贴心的服务，让顾客满意是我们永远不变的宗旨。 
         </div>
        </div> 
       </div> 
      </div> 
      <div style="display: none" class="goods-details-con clearfix commentlast"></div> 
     </div> 
     
     <div id="page" class="page-show">
      <table border="0" cellspacing="0" cellpadding="0" align="center">
       <tbody>
        <tr>
         <td>
          <ul class="page">
           <li class="on"><a href="#navigation">1</a></li>
          </ul></td>
        </tr>
       </tbody>
      </table>
     </div> 
     <div class="emption-mend lazy-fn" onselectstart="return false" id="loadTrace" data-original="v4.2/js/product/loadTrace.js">
      <h2>最近浏览相关推荐</h2>
      <span class="currer-mend"><a href="javascript:void(0);" class="prev">&lt;</a><span><i>1</i>/5</span><a href="javascript:void(0);" class="next">&gt;</a></span>
      <div class="emption-box-mend">
       <ul class="emption-scroll" style="width: 4636px;">
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/4267241.html" title="微软（Microsoft）Surface Pro 7 中文版 12.3英寸平板电脑套机（十代i5 8G 256G 典雅黑主机+黑色键盘）"><li><span class="picture"><img src="https://Img.iblimg.com/photo-53/3020/1539324600_220x220.jpg" width="200" height="200" /></span><span class="name">微软（Microsoft）Surface Pro 7 中文版 12.3英寸平板电脑套机（十代i5 8G 256G 典雅黑主机+黑色键盘）</span><span class="price">&yen; <i>8788.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/4372702.html" title="微软 (Microsoft) Surface Go 2 二合一平板电脑/笔记本电脑 10.5英寸 奔腾4425Y 4G 64G eMMC 亮铂金"><li><span class="picture"><img src="https://Img.iblimg.com/photo-56/3020/534665312_220x220.jpg" width="200" height="200" /></span><span class="name">微软 (Microsoft) Surface Go 2 二合一平板电脑/笔记本电脑 10.5英寸 奔腾4425Y 4G 64G eMMC 亮铂金</span><span class="price">&yen; <i>2988.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/4372712.html" title="微软 (Microsoft) Surface Go 2 二合一平板电脑/笔记本电脑 10.5英寸 奔腾4425Y 4G 64G eMMC 亮铂金+黑色键盘套装"><li><span class="picture"><img src="https://Img.iblimg.com/photo-56/3020/1290815289_220x220.jpg" width="200" height="200" /></span><span class="name">微软 (Microsoft) Surface Go 2 二合一平板电脑/笔记本电脑 10.5英寸 奔腾4425Y 4G 64G eMMC 亮铂金+黑色键盘套装</span><span class="price">&yen; <i>3588.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/4372703.html" title="微软 (Microsoft) Surface Go 2 二合一平板电脑/笔记本电脑 10.5英寸 奔腾4425Y 8G 128G SSD 亮铂金"><li><span class="picture"><img src="https://Img.iblimg.com/photo-56/3020/1623516959_220x220.jpg" width="200" height="200" /></span><span class="name">微软 (Microsoft) Surface Go 2 二合一平板电脑/笔记本电脑 10.5英寸 奔腾4425Y 8G 128G SSD 亮铂金</span><span class="price">&yen; <i>3988.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/4113998.html" title="微软（Microsoft）Surface Pro 7 12.3英寸平板电脑（十代i5 8G 256G）亮铂金"><li><span class="picture"><img src="https://Img.iblimg.com/photo-45/3020/1577774969_220x220.jpg" width="200" height="200" /></span><span class="name">微软（Microsoft）Surface Pro 7 12.3英寸平板电脑（十代i5 8G 256G）亮铂金</span><span class="price">&yen; <i>9388.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/4227253.html" title="【官方授权】Apple iPad Pro 11英寸 2020新款 128G MY312CH/A 蜂窝版 深空灰色 平板电脑"><li><span class="picture"><img src="https://Img.iblimg.com/photo-49/3020/2004762841_220x220.jpg" width="200" height="200" /></span><span class="name">【官方授权】Apple iPad Pro 11英寸 2020新款 128G MY312CH/A 蜂窝版 深空灰色 平板电脑</span><span class="price">&yen; <i>7329.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/4227168.html" title="【官方授权】Apple iPad Pro 12.9英寸 2020新款 256G MXFN2CH/A蜂窝版 深空灰色 平板电脑"><li><span class="picture"><img src="https://Img.iblimg.com/photo-49/3020/1923947830_220x220.jpg" width="200" height="200" /></span><span class="name">【官方授权】Apple iPad Pro 12.9英寸 2020新款 256G MXFN2CH/A蜂窝版 深空灰色 平板电脑</span><span class="price">&yen; <i>9799.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/4227237.html" title="【官方授权】Apple iPad Pro 12.9英寸 2020新款 128G MY3G2CH/A 蜂窝版 深空灰色 平板电脑"><li><span class="picture"><img src="https://Img.iblimg.com/photo-49/3020/1342575332_220x220.jpg" width="200" height="200" /></span><span class="name">【官方授权】Apple iPad Pro 12.9英寸 2020新款 128G MY3G2CH/A 蜂窝版 深空灰色 平板电脑</span><span class="price">&yen; <i>8999.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/4227259.html" title="【官方授权】Apple iPad Pro 11英寸 2020新款 256G MXEM2CH/A 蜂窝版 深空灰色 平板电脑"><li><span class="picture"><img src="https://Img.iblimg.com/photo-49/3020/1520963146_220x220.jpg" width="200" height="200" /></span><span class="name">【官方授权】Apple iPad Pro 11英寸 2020新款 256G MXEM2CH/A 蜂窝版 深空灰色 平板电脑</span><span class="price">&yen; <i>8129.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/4229600.html" title="蒙牛纯甄轻酪乳芒果芝士味风味酸牛乳瓶装230g*10瓶（礼盒装）"><li><span class="picture"><img src="https://Img.iblimg.com/photo-50/3060/1152677802_220x220.jpg" width="200" height="200" /></span><span class="name">蒙牛纯甄轻酪乳芒果芝士味风味酸牛乳瓶装230g*10瓶（礼盒装）</span><span class="price">&yen; <i>56.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/3175353.html" title="椰树椰汁1L"><li><span class="picture"><img src="https://Img.iblimg.com/photo-42/3060/2064892423_220x220.jpg" width="200" height="200" /></span><span class="name">椰树椰汁1L</span><span class="price">&yen; <i>13.9</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/2598751.html" title="佳乐 椰子水 330ml"><li><span class="picture"><img src="https://Img.iblimg.com/photo-11/1000/344929363_220x220.jpg" width="200" height="200" /></span><span class="name">佳乐 椰子水 330ml</span><span class="price">&yen; <i>8.5</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/4241923.html" title="福临门一级大豆油5L"><li><span class="picture"><img src="https://Img.iblimg.com/photo-55/3060/506991795_220x220.jpg" width="200" height="200" /></span><span class="name">福临门一级大豆油5L</span><span class="price">&yen; <i>43.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/3830224.html" title="金龙鱼 精炼一级大豆油1.8L*2瓶"><li><span class="picture"><img src="https://Img.iblimg.com/photo-42/3030/1441415818_220x220.jpeg" width="200" height="200" /></span><span class="name">金龙鱼 精炼一级大豆油1.8L*2瓶</span><span class="price">&yen; <i>43.9</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/3959858.html" title="华为（HUAWEI）M6 10.8英寸 4GB+64GB WiFi（银钻灰）"><li><span class="picture"><img src="https://Img.iblimg.com/photo-42/3020/538192785_220x220.jpeg" width="200" height="200" /></span><span class="name">华为（HUAWEI）M6 10.8英寸 4GB+64GB WiFi（银钻灰）</span><span class="price">&yen; <i>2199.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/3959857.html" title="华为（HUAWEI）M6 10.8英寸 4GB+64GB WiFi（香槟金）"><li><span class="picture"><img src="https://Img.iblimg.com/photo-42/3020/87021622_220x220.jpeg" width="200" height="200" /></span><span class="name">华为（HUAWEI）M6 10.8英寸 4GB+64GB WiFi（香槟金）</span><span class="price">&yen; <i>2199.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/3843015.html" title="【官方授权】Apple iPad mini 2019款7.9英寸平板电脑 256G WIFI版 灰色 MUU32CH/A"><li><span class="picture"><img src="https://Img.iblimg.com/photo-42/3020/1133747699_220x220.jpg" width="200" height="200" /></span><span class="name">【官方授权】Apple iPad mini 2019款7.9英寸平板电脑 256G WIFI版 灰色 MUU32CH/A</span><span class="price">&yen; <i>3695.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/3843016.html" title="【官方授权】Apple iPad mini 2019款7.9英寸平板电脑 256G WIFI版 银色 MUU52CH/A"><li><span class="picture"><img src="https://Img.iblimg.com/photo-42/3020/2002293617_220x220.jpg" width="200" height="200" /></span><span class="name">【官方授权】Apple iPad mini 2019款7.9英寸平板电脑 256G WIFI版 银色 MUU52CH/A</span><span class="price">&yen; <i>3695.0</i></span></li></a>
        <a data_wa_type="ad" data_wa_val="histgl_-_histgl_-_2" href="https://product.bl.com/3843017.html" title="【官方授权】Apple iPad mini 2019款7.9英寸平板电脑 256G WIFI版 金色 MUU62CH/A"><li><span class="picture"><img src="https://Img.iblimg.com/photo-42/3020/396418539_220x220.jpg" width="200" height="200" /></span><span class="name">【官方授权】Apple iPad mini 2019款7.9英寸平板电脑 256G WIFI版 金色 MUU62CH/A</span><span class="price">&yen; <i>3695.0</i></span></li></a>
       </ul>
      </div>
     </div> 
    </div> 
   </div> 
  </div> 
  <!-- 引入右边栏 --> 
  <!-- 引入尾部 --> 
  <div id="footer" class="footer"> 
   <div class="helpnav clearfix"> 
    <div class="wrap"> 
     <div class="footer-center"> 
      <div class="helpnav-list"> 
       <div class="helpnav-title"> 
        <i class="footic1"></i> 新手入门 
       </div> 
       <ul> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=261&amp;&amp;categoryType=help" target="_blank">购物流程</a></li> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=262&amp;&amp;categoryType=help" target="_blank">会员介绍</a></li> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=263&amp;&amp;categoryType=help" target="_blank">常见问题</a></li> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=264&amp;&amp;categoryType=help" target="_blank">发票说明</a></li> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=265&amp;&amp;categoryType=help" target="_blank">联系客服</a></li> 
       </ul> 
      </div> 
      <div class="helpnav-list"> 
       <div class="helpnav-title"> 
        <i class="footic2"></i> 配送服务 
       </div> 
       <ul> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=275&amp;&amp;categoryType=help" target="_blank">配送范围及运费</a></li> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=278&amp;&amp;categoryType=help" target="_blank">配送进度查询</a></li> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=276&amp;&amp;categoryType=help" target="_blank">自提服务</a></li> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=277&amp;&amp;categoryType=help" target="_blank">商品验货与签收</a></li> 
       </ul> 
      </div> 
      <div class="helpnav-list"> 
       <div class="helpnav-title"> 
        <i class="footic3"></i> 支付方式 
       </div> 
       <ul> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=279&amp;&amp;categoryType=help" target="_blank">货到付款</a></li> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=280&amp;&amp;categoryType=help" target="_blank">在线支付</a></li> 
       </ul> 
      </div> 
      <div class="helpnav-list"> 
       <div class="helpnav-title"> 
        <i class="footic4"></i> 售后服务 
       </div> 
       <ul> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=281&amp;&amp;categoryType=help" target="_blank">退换货政策</a></li> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=282&amp;&amp;categoryType=help" target="_blank">退换货流程</a></li> 
        <li><a href="https://help.bl.com/articleDetailed.html?articleId=283&amp;&amp;categoryType=help" target="_blank">退款说明</a></li> 
       </ul> 
      </div> 
      <div class="helpnav-list"> 
       <div class="helpnav-title"> 
        <i class="footic5"></i> 商家支持 
       </div> 
       <ul> 
        <li><a href="https://help.bl.com/toHelpCenter/queryCategoryId.html?categoryId=382&amp;&amp;categoryType=help" target="_blank">商家入驻</a></li> 
        <li><a href="https://help.bl.com/toHelpCenter/queryCategoryId.html?categoryId=401&amp;&amp;categoryType=help" target="_blank">商家规则</a></li> 
        <li><a href="https://help.bl.com/toHelpCenter/queryCategoryId.html?categoryId=345&amp;&amp;categoryType=help" target="_blank">商家常见问题</a></li> 
       </ul> 
      </div> 
     </div> 
    </div> 
   </div> 
   <div class="public-ad"> 
    <div class="footer-center"> 
     <ul class="public-adlist"> 
      <li> <a data_wa_type="ad" data_wa_val="2020666_-_2464725_-_1" href="http://promotion.bl.com/nc/shanghaigongshang_GY002.html" target="_blank"><img src="https://img23.iblimg.com/market-4/images/activity/1237223137.jpg" /></a> </li> 
      <li> <a data_wa_type="ad" data_wa_val="2020666_-_2464726_-_1" href="http://promotion.bl.com/nc/shanghaigongshang_GY003.html" target="_blank"><img src="https://img23.iblimg.com/market-4/images/activity/951075255.jpg" /></a> </li> 
      <li> <a data_wa_type="ad" data_wa_val="2020666_-_2464727_-_1" href="http://promotion.bl.com/nc/shanghaigongshang_GY004.html" target="_blank"><img src="https://img23.iblimg.com/market-4/images/activity/1425410214.jpg" /></a> </li> 
     </ul> 
    </div> 
   </div> 
   <div class="bottom-nav"> 
    <div> 
     <a target="_blank" href="https://help.bl.com/articleDetailed.html?articleId=285&amp;&amp;categoryType=about">关于我们</a> 
     <span>|</span> 
     <a target="_blank" href="https://help.bl.com/articleDetailed.html?articleId=286&amp;&amp;categoryType=about">联系我们</a> 
     <span>|</span> 
     <a target="_blank" href="https://help.bl.com/articleDetailed.html?articleId=287&amp;&amp;categoryType=about">加盟合作</a> 
     <span>|</span> 
     <a target="_blank" href="https://help.bl.com/articleDetailed.html?articleId=288&amp;&amp;categoryType=about">诚征英才</a> 
     <span>|</span> 
     <a target="_blank" href="https://help.bl.com/articleDetailed.html?articleId=289&amp;&amp;categoryType=about">友情链接</a> 
     <span>|</span> 
     <a target="_blank" href="https://www.bl.com/newretail.html">新零售合作</a> 
    </div> 
    <div class="copyright">
     百联集团有限公司版权所有 
     <span>|</span> 客服电话：400-900-8800 
     <span>|</span> 
     <a href="http://www.beian.miit.gov.cn" target="_blank">沪ICP备15028847号-1</a>
    </div> 
    <a target="_blank" href="https://res12.iblimg.com/respc-1/resources/v4.0/img/yaopingzigezheng.png" class="drug-message">互联网药品信息服务资质证书编号：沪-（非营业性）-2016-0044</a>
    <br /> 
    <a target="_blank" href="https://res13.iblimg.com/respc-1/resources/v4.0/img/yiliaoqixiepingzheng.pdf" class="drug-message">医疗器械网络交易服务第三方平台备案凭证-（沪）网械平台备字[2020]第00002号</a>
    <br /> 
    <a target="_blank" href="https://promotion.bl.com/nc/PC_HDGL20180705000005986_6252.html" class="drug-message">全渠道增值电信业务经营许可证</a> 
    <div class="police"> 
     <a class="gongan" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010102002366" target="_blank"> <img src="https://res14.iblimg.com/respc-1/resources/v4.0/css/i/gongan.png" /> <span style="">沪公网安备 31010102002366号</span> </a> 
     <a class="gongs" href="http://218.242.124.22:8081/businessCheck/verifKey.do?showType=extShow&amp;serial=9031000020160729145737000001099658-SAIC_SHOW_310000-20160406145114141192&amp;signData=MEYCIQCUhx+ulQL4t9jJgfgCH1oeTxexuWOVww3Hel3/UlRyLQIhAO2fVtZDl0EkYb0p/3M50cXqe694wDQoJNuUKNdQNOWf" target="_blank"> <img src="https://res15.iblimg.com/respc-1/resources/v4.1/widget/footer1200/i/gongs.png" width="20" height="21" /> <span style="">上海工商</span> </a> 
     <a target="_blank" class="zhizhao" href="https://promotion.bl.com/nc/PC_HDGL20170407000001552_1592.html"> <img src="https://res12.iblimg.com/respc-1/resources/v4.1/widget/footer1200/i/zhizhao.png" /> <span style="">经营执照</span> </a> 
     <a class="wangping" href="http://scjgj.sh.gov.cn/platform/survey/step1_phone" target="_blank"> <img src="https://res13.iblimg.com/respc-1/resources/v4.1/widget/footer1200/i/wangjing1.png" width="21" /> <span style="">网购大家评</span> </a> 
    </div> 
   </div> 
  </div> 
  <input type="hidden" id="mid" value="" /> 
  <input type="hidden" id="mdm_Sid" value="-1" /> 
  <input type="hidden" id="mdm_categorySid" value="29151" /> 
  <input type="hidden" id="mdm_categoryName" value="平板电脑" /> 
  <input type="hidden" id="q_priceStartDate" value="1588003200000" /> 
  <input type="hidden" id="q_priceEndDate" value="1593446399000" /> 
  <input type="hidden" id="q_CoreID" value="" />
  <input type="hidden" id="q_imgSize" value="0" /> 
  <input type="hidden" id="q_stor" value="9" /> 
  <input type="hidden" id="q_goodsType" value="1" /> 
  <input type="hidden" id="q_preActive_priceType" value="" /> 
  <input type="hidden" id="q_colorid" value="0" /> 
  <input type="hidden" id="q_stanid" value="0" /> 
  <input type="hidden" id="q_subid" value="0" /> 
  <input type="hidden" id="q_colorMap" value="" /> 
  <input type="hidden" id="q_priveType" value="6" />
  <input type="hidden" id="q_price" value="6229.0" /> 
  <input type="hidden" id="q_productid" value="4225322" /> 
  <input type="hidden" id="q_productSalesName" value="【官方授权】Apple iPad Pro 11英寸 2020新款 128G MY232CH/A 深空灰色 平板电脑" />
  <input type="hidden" id="q_productSalePrice" value="5999.0" /> 
  <input type="hidden" id="q_promotionPrice" value="5999.00" /> 
  <input type="hidden" id="q_activitytype" value="" /> 
  <input type="hidden" id="q_activeClassify" value="" /> 
  <input type="hidden" id="q_supplierId" value="23787" /> 
  <input type="hidden" id="q_productUrl" value="https://Img.iblimg.com/photo-49/3020/75414464_60x60.jpg" /> 
  <input type="hidden" id="q_urlSize" value="12" /> 
  <input type="hidden" id="q_brandSid" value="205046" /> 
  <input type="hidden" id="q_proSellBit" value="4" /> 
  <input type="hidden" id="q_limitBuyNum" value="2" />
  <input type="hidden" id="q_activeCode" value="JPSG30895" /> 
  <input type="hidden" id="q_imgurl" value="https://Img.iblimg.com/photo-49/3020/75414464_800x800.jpg" /> 
  <input type="hidden" id="t_num" value="8" />
  <input type="hidden" id="t_score" value="4.5" />
  <input type="hidden" id="v_num" value="0" />
  <input type="hidden" id="productid" value="4225322" /> 
  <input type="hidden" id="priceType" value="6" /> 
  <input type="hidden" id="categorysid" value="212907" /> 
  <input type="hidden" id="categorysname" value="平板电脑" /> 
  <input type="hidden" id="searchCateInfo" value="212907" />
  <input type="hidden" id="basketrtId" value="" /> 
  <input type="hidden" id="specialBasket" value="" /> 
  <input type="hidden" id="exper" value="" />
  <input type="hidden" id="q_productSid" value="2245951" /> 
  <input type="hidden" id="q_companyName" value="" /> 
  <input type="hidden" id="q_importWarehouse" value="" /> 
  <input type="hidden" id="isExpert" value="" />
  <input type="hidden" id="q_crossBorderType" value="" />
  <input type="hidden" id="q_prop1Sid" value="" /> 
  <input type="hidden" id="q_prop2Sid" value="" /> 
  <input type="hidden" id="q_prop3Sid" value="" /> 
  <input type="hidden" id="q_prop4Sid" value="" /> 
  <input type="hidden" id="q_prop5Sid" value="" /> 
  <input type="hidden" id="q_yunType" value="1" /> 
  <input type="hidden" id="q_comid" value="3020" /> 
  <input type="hidden" id="version" value="1590654218662" /> 
  <input type="hidden" id="productCode" value="302010159427" />
  <input type="hidden" id="h_canSend" value="1" /> 
  <input type="hidden" id="q_pageName" value="闪购商品详情页" /> 
  <input type="hidden" id="q_iphoneBrandSid" value="1" />
  <input type="hidden" id="q_isVirtual" value="" />
  <input type="hidden" id="q_logisticsType" value="1" />
  <input type="hidden" id="q_showFlag" value="1" />
  <input type="hidden" id="q_sourceType" value="" />
  <input type="hidden" id="timestamp" value="1591673140046" /> 
  <input type="hidden" id="q_chooseGoods" value="" />
  <input type="hidden" id="q_intalmentInfo" value="false" /> 
  <input type="hidden" id="quickBuyFlag" value="1" autocomplete="off" />
  <script type="text/javascript" src="https://res14.iblimg.com/respc-1/resources/v4.2/unit/jquery-1.8.2.min.js"></script> 
  <script type="text/javascript" src="https://res15.iblimg.com/respc-1/resources/v4.2/unit/bl.js?version=1590654218662"></script> 
  <script type="text/javascript" src="/static/Home/css/sea.js"></script> 
  <script type="text/javascript">
    seajs.use('https://res13.iblimg.com/respc-1/resources/v4.2/js/product/commodity.js?version=1590654218662');
    </script> 
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
  <div class="info message-center" id="stages-message1" style="display: none;"> 
   <div class="message-line clearfix"> 
    <div class="txt"> 
     <div class="name"> 
     </div> 
    </div> 
   </div> 
   <div class="btn-line clearfix"> 
    <div class="line-center"> 
     <button type="button" class="btn btn-greysubmit">不开通</button> 
     <button type="button" class="btn btn-secondary" id="stagesSp">马上开通</button> 
    </div> 
   </div> 
  </div> 
  <script src="/static/Home/js/kf-udesk.js"></script>
  <script type="text/javascript" src="https://res11.iblimg.com/respc-1/resources/v4.2/js/coremetrics/eluminate.js"></script>
  <script type="text/javascript" src="https://res11.iblimg.com/respc-1/resources/v4.2/js/coremetrics/pageInit.js?179117"></script>
  <script type="text/javascript" src="https://res11.iblimg.com/respc-1/resources/v4.2/js/coremetrics/pageInfo.js?179117"></script>
  <iframe name="220844" height="0" width="0" src="https://360fenxi.mediav.com/mediav0308.html" style="display: none;"></iframe>
  <iframe name="220844" height="0" width="0" src="https://s.union.360.cn/proxy.html" style="display: none;"></iframe>
  <div style="display:none;" class="jqPreload0"></div>
 </body>
</html>
