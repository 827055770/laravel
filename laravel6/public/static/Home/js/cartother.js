$(function(){
	$('.global-list').poshytip({
		content:'全球购单笔订单总价不可超过 <span class="tip-red-txt tip-bold-txt">￥2000.00</span>',
    className: 'tip-yellow',
    alignTo: 'target',
    alignX: 'right',
    alignY: 'center',
    showOn:	'none',
    keepInViewport:	false,
    offsetX: 8,
  offsetY: 5,
    showTimeout: 200
});
	$('.stk-list').poshytip({
		content:'百联卡（实体）单笔订单最高不能超过 <span class="tip-red-txt tip-bold-txt">￥10000.00</span>',
    className: 'tip-yellow',
    alignTo: 'target',
    alignX: 'right',
    alignY: 'center',
    showOn:	'none',
    keepInViewport:	false,
    offsetX: 8,
  offsetY: 5,
    showTimeout: 200
});
});    	
    	/*$(".pay-line a.pay").click(function(){
    		$("#pay-message-1").popbox({title:'结算'});
    	});*/
    	$("a.delete").click(function(){
    		 var goodsList = new Array();
    		  $(".cart-table-list > li").each(function() {
    				var item = $(this).children(".item");
    				if (item.find("[name=checked]").val() == "true") {
    					item.each(function(){
    						var good = new Object(); 
    						$(this).find(".goods").each(function() {
        						good[$(this).attr('name')] = $(this).val();
        					});
    						goodsList.push(good);
    					});
//    					item.find(".goods").each(function() {
//    						good[$(this).attr('name')] = $(this).val();
//    					});
    				}
    			});	
    		  if (goodsList.length > 0) {
	    			 $("#delete-message").find("span.bold").html(goodsList.length);
	    			 $("#delete-message").popbox({title:'提示'});
				}else{
					$("#deletenull-message").find("div.name").html("您还没有选择商品哦");
					$("#deletenull-message").popbox({title:'提示'});
				}
    	});
    	
    	$(".type-choice .edit").click(function(){
    		$(".type-choice").removeClass("type-show");
    		$(this).parent().addClass("type-show");
    	});
      $(".type-choice .btn-notsecondary").click(function(){
    		$(".type-choice").removeClass("type-show");
    	});
    	$(".type-choice .type-choose dl dd").click(function(){
    		$(this).siblings().removeClass("select");
    		$(this).addClass("select");
    	});
      $(".item-flex").flexslider({controlNav: false});
      $(".flex").flexslider({controlNav: false});
		
		/**
		*弹窗登录
		*/
		function login(){
                        var loginurl = "https://passport."+BL.Global.getHost()+".com/sidebar/loginWindowPop.html";
                        $("#conbar_0_iframe").attr("src",loginurl);
                        $("#conbar_0_iframe").load(function(){
                            $("#pop-close").click(function(){
                                $("#conbar_0_iframe").attr("src","");
                            });
                        });
						$("#pop-body01").popbox({
							title: '用户登录'
						});
						var domainHost = document.location.hostname;
						domainHost = domainHost.substring(domainHost.indexOf(".")+1);
						document.domain = domainHost;
		}


		
		/**
		 * 弹框登录成功，回调方法
		 */
		function loginSuccessCallBack(){
			$.popbox.hide();
			$(".cart-login").remove();
				$(".login-message").remove();
				loadShoppingCart();
		}
