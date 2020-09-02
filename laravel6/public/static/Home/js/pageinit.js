// 点击统计    描述事件，区分不同业务场景          收集内容        收集值            收集值Json格式             点击位置标示
function  clickStatistics(clickType,clickKey,clickValue,clickValueJson,clickLocation){
	sa.track('clickStatistics', {
		//点击类型
		clickType:clickType !=null && typeof(clickType)!="undefined" ? clickType.toString() : "",
		//点击内容
		clickKey:clickKey !=null && typeof(clickKey)!="undefined" ? clickKey.toString() : "",
		//点击值
		clickValueR:clickValue !=null && typeof(clickValue)!="undefined" ? clickValue.toString() : "",
		//点击收集信息
		clickValueJson:clickValueJson !=null && typeof(clickValueJson)!="undefined" ? clickValueJson.toString() : "",
		//点击位置
		clickLocationR:clickLocation !=null && typeof(clickLocation)!="undefined" ? clickLocation.toString() : ""
	});
}

//按钮点击事件埋点
function clickButton(buttonName,buttonId,buttonLocation,buttonPage,categoryId,pageId){
	sa.trackLink($(this),'clickButton', {
		buttonName:buttonName,
		buttonId: buttonId,
		buttonLocation: buttonLocation,
		buttonPage:buttonPage,
		categoryId:categoryId,
		pageId:pageId
	});
} 

// 资源位追踪浏览商品事件。资源位整站传递落地页js  
function ViewResource(resourceId,resourceContent,resourceType,str){
	var pageId = jsonPageInfo.pageId;
	if (pageId == "" || pageId == undefined || pageId == "NaN") {
		pageId = "PC_缺省_"+$("title").html();
	};
	sa.trackLink(str,'clickResource', {
		memberId: mid,
		resourceId: resourceId,
		resourceType: resourceType,
		deployId: unescape(resourceContent),
		mmc:bl_mmc
    });
}

//单品页追踪浏览商品事件。
function ViewProduct(productId,productCatalog,productName,productPrice,resourceId,resourceContent,resourceType,productBrand,originalPriceR,mid,mpShop,priceType){
	sa.track('viewProduct', {
		productId:productId,
		productName: productName,
		productType: productCatalog,
		productBrand:productBrand,
		originalPriceR:originalPriceR*1,
		memberId:mid,
		resourceId:resourceId,
		resourceType:resourceType,
		deployId:unescape(resourceContent),
		mpShop:mpShop,
		priceType:priceType,
		salePrice:productPrice*1,
		mmc:bl_mmc
    });
}

//加入购物车追踪浏览商品事件。资源位整站传递落地页js  
function AddCart(productId,productCatalog,productName,productNubmer,productPrice,resourceId,resourceContent,resourceType,productBrand,mpShop,originalPriceR,priceType,state){
	sa.track('addCart', {
		productId:productId,
		productName: productName,
		productType: productCatalog,
		productBrand:productBrand,
		originalPriceR:originalPriceR*1,
		memberId:mid,
		resourceId:resourceId,
		resourceType:resourceType,
		deployId:unescape(resourceContent),
		mpShop:mpShop,
		priceType:priceType,
		salePrice:productPrice*1,
		state:state,
		productCount:productNubmer*1,
		mmc:bl_mmc
    });
}

//点击购物车
function clickCart(productId,productCatalog,productName,productNubmer,productPrice,resourceId,resourceContent,resourceType,productBrand,mpShop,originalPriceR,priceType){
	sa.track('clickCart', {
		productId:productId,
		productName: productName,
		productType: productCatalog,
		productBrand:productBrand,
		originalPriceR:originalPriceR*1,
		memberId:mid,
		resourceId:resourceId,
		resourceType:resourceType,
		deployId:unescape(resourceContent),
		mpShop:mpShop,
		priceType:priceType,
		salePrice:productPrice*1,
		productCount:productNubmer*1,
		mmc:bl_mmc
    });
}

//登录
function scLogin(memberId){
	sa.track('login', {
		memberId:memberId,
		mmc:bl_mmc
    });
}
//注册
function scSignup(memberId){
	sa.track('signup', {
		memberId:memberId,
		mmc:bl_mmc
    });
}

//搜索
function scSearch(memberId,keyword,searchResult,cateAtt,codeAtt,resourceId,resourceType,deployId,realKeyword){
	sa.track('search', {
	  memberId:memberId,
     // keyword:keyword,
      searchResult:searchResult,
      cateAtt:cateAtt,
      codeAtt:codeAtt,
      resourceId:resourceId,
      resourceType:resourceType,
      deployId:deployId,
      mmc:bl_mmc,
      realKeyword:realKeyword
    });
}

/*
**V1.0
**功能:第三方统计特殊部署(针对a标签)
**创建日期:2016-06-16
**修改日期:2016-07-25(加入tel: mailto: 锚点的区分)
*/
var BL = BL||{};
var bl_mmc = "";
var bl_ad = "";
var bl_nurl = "";
BL.tjCma = {
     init: function(){
            if(this.getUrlq("cm_mmc")){
                window.bl_mmc = this.getUrlq("cm_mmc").replace(/-_-/g, "_-_");
            }
            if(this.getUrlq("bl_mmc")){
                window.bl_mmc = this.getUrlq("bl_mmc");
            }
            if(this.getUrlq("bl_ad")){
                window.bl_ad = this.getUrlq("bl_ad");
            }
            this.blAd();
            this.cmTobl();
            this.nowUrl();
            this.sourceUrl();
     },
     sUrl: window.location.search,
     getUrlq:function(name){
          var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          var r = this.sUrl.substr(1).match(reg);
          if(r!=null)return  r[2]; return null;
     },
     cmTobl:function(){
          var _this = this;
          var oHash = "";
          if(this.getUrlq("cm_mmc") || this.getUrlq("bl_mmc")){   //若页面url中有cm_mmc
            $(document).off(".ca");
            $(document).on("mousedown.ca","a",function(){
                 nUrl = "bl_mmc="+_this.getUrlq("cm_mmc");
                 if(nUrl.indexOf("-_-")>0){
                     nUrl = nUrl.replace(/-_-/g, "_-_");
                 }else{
                     
                 }
                 if(_this.sUrl.indexOf("bl_mmc")>0){  //若是bl_mmc时
                    nUrl = "bl_mmc="+_this.getUrlq("bl_mmc");
                    if(nUrl.indexOf("-_-")>0){
                       nUrl = nUrl.replace(/-_-/g, "_-_");
                    }else{

                    }
                 }
                 var oHref = $(this).attr("href");
                 if(oHref.match(/script:/i)){
                     return;
                 }
                 if(oHref.match(/tel:/i)){
                     return;
                 }
                 if(oHref.match(/mailto:/i)){
                     return;
                 }
                 if(oHref.indexOf("#")==0){  //若是本页面锚点跳转
                 	return;
                 }
                 if(oHref.match(/#/i)){ //若当前连接有锚点
                     oHash = oHref.substr(oHref.indexOf("#"));  //hash值
                     oSiurl = oHref.substr(0,oHref.indexOf("#")); //除去hash值的url
                     if(oHref.indexOf("?")>0){  //如果当前href最后有参数?
	                    oSiurl = oSiurl+"&"+nUrl;
	                 }else{
	                    oSiurl = oSiurl+"?"+nUrl;
	                 }
	                 oHref =  oSiurl+oHash;
                 }else{
                 	 if(oHref.indexOf("?")>0){  //如果当前href最后有参数?
	                    oHref = oHref+"&"+nUrl;
	                 }else{
	                    oHref = oHref+"?"+nUrl;
	                 }
                 }
                 if(!$(this).data("cmLink")){
                    $(this).attr("href",oHref).data("cmLink","1");
                 }
            });
          }
     },
     blAd:function(){
         var _this = this;
         var oHash = "";
         var oSiurl ="";
         var ofHref = ""; //为未混入"bl_ad"的参数地址
         if(this.sUrl.indexOf("bl_ad")>0){  //如果当前地址有"bl_ad"
              $(document).off(".ba");
              $(document).on("mousedown.ba","a",function(){
                      var nUrl = "bl_ad="+_this.getUrlq("bl_ad");
                      var oHref = $(this).attr("href");
                      if(!oHref){
                    	  return;
                      }
                      if(oHref.match(/script:/i)){
                          return;
                      }
                      if(oHref.match(/tel:/i)){
                          return;
                      }
                      if(oHref.match(/mailto:/i)){
                          return;
                      }
                      if(oHref.indexOf("#")==0){  //若是本页面锚点跳转
                         return;
                      }
                      if(oHref.match(/#/i)){ //若当前连接有锚点
                          oHash = oHref.substr(oHref.indexOf("#"));  //hash值
                          oSiurl = oHref.substr(0,oHref.indexOf("#")); //除去hash值的url
                          if(oHref.indexOf("?")>0){  //如果当前href最后有参数?
                             oSiurl = oSiurl+"&"+nUrl;
                          }else{
                             oSiurl = oSiurl+"?"+nUrl;
                          }
                          oHref =  oSiurl+oHash;
                          ofHref = oHref;
                      }else{
                          ofHref = oHref;
                          if(oHref.indexOf("?")>0){  //如果当前href最后有参数?
                             oHref = oHref+"&"+nUrl;
                          }else{
                             oHref = oHref+"?"+nUrl;
                          }
                      }

                      if(!$(this).data("cblLink")){
                         $(this).attr("href",oHref).data("cblLink","1");
                      }             
              });
         }
         $(document).off(".cm");
         $(document).on("mousedown.cm","a[data_wa_type='ad']",function(){
	        	 var blList = $(this).attr("data_wa_val").split("_-_");
	      		 var zywId = blList[0]==undefined?"":blList[0];
	      		 var zywnrId = blList[1]==undefined?"":blList[1];
	      		 var zywlx = blList[2]==undefined?"":blList[2];
	              ViewResource(zywId,zywnrId,zywlx,$(this));
                  var oHref = $(this).attr("href");
                  if(!oHref || oHref.indexOf("javascript:") >=0){
                	  return false;
                  }
                  if(_this.sUrl.indexOf("bl_ad")>0){   //点击资源位时判断当前是否有"bl_ad"
                     oHref = ofHref;
                  }
              
                  if(oHref.indexOf("?")>0){  //如果当前href最后有参数?
                     oHref = oHref+"&"+"bl_ad="+$(this).attr("data_wa_val");
                  }else{
                     oHref = oHref+"?"+"bl_ad="+$(this).attr("data_wa_val");
                  }

                  //alert(oHref)
                  if(!$(this).data("blLink")){
                     $(this).attr("href",oHref).data("blLink","1");
                  }

         });
     },
     nowUrl:function(){
    	var nowUrl = window.location.href;
    	if (nowUrl.indexOf("?")>0) {
    		bl_nurl=nowUrl.substring(0,nowUrl.indexOf("?"));
		}else{
			bl_nurl=nowUrl;
		}
     },
     sourceUrl:function(){
    	//获取页面来源URL地址
    	 var ref = "";
    	 if (document.referrer.length > 0) {  
    	 	  ref = document.referrer;  
    	  }  
    	 try {  
    	 	 if (ref.length == 0 && opener.location.href.length > 0) {  
    	 	   ref = opener.location.href;  
    	 	 }
    	  } catch (e) {} 
    	  if (ref.indexOf("?")>0) {
    		  window.bl_sourceurl=ref.substring(0,ref.indexOf("?"));
		}else{
			 window.bl_sourceurl=ref;
		}
    	 
     }
}

//执行
BL.tjCma.init(); 

var server_url = "";
if(BL.Global.getHost()=="st.bl" || BL.Global.getHost()=="ut.bl"){
	server_url = 'https://sensorsdata.bl.com/sa?project=default';
}else if(BL.Global.getHost()=="bl"){
	server_url = 'https://sensorsdata.bl.com/sa?project=production';
}

(function(para) {
	  var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
	  w['sensorsDataAnalytic201505'] = n;
	  w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
	  var ifs = ['track','quick','register','registerPage','registerOnce','clearAllRegister','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister'];
	  for (var i = 0; i < ifs.length; i++) {
	    w[n][ifs[i]] = w[n].call(null, ifs[i]);
	  }
	  if (!w[n]._t) {
	    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
	    x.async = 1;
	    x.src = p;
	    y.parentNode.insertBefore(x, y);
	    w[n].para = para;
	  }
})({
	sdk_url: domain.js+'/resources/v4.2/unit/sensorsdata.min.js',
	name: 'sa',
	server_url: server_url
});
sa.register({platform:"PC"});

//MEDIAV 埋点
var _mvq = window._mvq || [];
window._mvq = _mvq;
_mvq.push(
['$setAccount', 'm-208145-1'],
['$logConversion']
);
(function() {
	// MEDIAV流量统计代码
	var mvjs = document.createElement('script');
	mvjs.type = 'text/javascript';
	mvjs.async = true;
	mvjs.src = document.location.protocol + '//cdn.dsp.com/static/js/loader.js';
	(document.getElementsByTagName('head')[0] ||document.getElementsByTagName('body')[0]).appendChild(mvjs);
	// 360流量统计代码
	var qihoojs = document.createElement('script');
	qihoojs.type = 'text/javascript';
	qihoojs.async = true;
	qihoojs.src = document.location.protocol + '//s.union.360.cn/73105.js';
	(document.getElementsByTagName('head')[0] ||document.getElementsByTagName('body')[0]).appendChild(qihoojs);
})();
