function cgbuyshow(list){
	$(".cart-cgbuy").remove();
	$("#cgbuy_cov").remove();
	var boxhtml = '<div class="cart-cgbuy" style="height: 46px;">';
	if(list.length>1){
		boxhtml +='<span class="cart-cgbuy-up">展开全部<b>∨</b></span>';
	}
	for (var i = 0; i < list.length; i++){
        // 活动门槛还差多少钱 0 表示满足换购条件
        var promotionLimit = list[i]["promotionLimit"];
        //作用金额或数量
        var promotionConditionAmount = list[i]["promotionConditionAmount"];
        //  1是门槛金额，2是门槛件数
        var promotionConditionType = list[i]["promotionConditionType"];
        var resultStrBuffer = "购满";
        var a_html = "";
        var t_html = "";
        if(promotionLimit == 0){
            //用户是否已选换购商品
            var isJoin = list[i]["isJoin"];
            if (isJoin=="1"){
                a_html = "<a href='javascript:;' _ruleid='"+list[i]["popRuleId"]+"' _type='"+list[i]["popType"]+"' _justsee='0'class='gocgbuy'>重新选择 &gt;</a>";
            }else {
            	a_html = "<a href='javascript:;' _ruleid='"+list[i]["popRuleId"]+"' _type='"+list[i]["popType"]+"' class='gocgbuy'>去换购 &gt;</a>";
            }
            if (promotionConditionType == 1){
                t_html = resultStrBuffer+promotionConditionAmount+"元，可换购超值商品";
            }else {
                t_html = resultStrBuffer+promotionConditionAmount+"件，可换购超值商品";
            }
        }else {
        	var cdurl = "https://search."+BL.Global.getHost()+".com/fr/0.html?rn="+list[i]["popRuleId"]+"&type="+list[i]["popType"];
        	a_html = "<a href='"+cdurl+"' class='gocoudan'>去凑单&gt;</a> <a href='javascript:;' _ruleid='"+list[i]["popRuleId"]+"' _type='"+list[i]["popType"]+"' _justsee='1' class='gocgbuy'>查看活动</a>";
            if (promotionConditionType=="1"){
            	t_html = resultStrBuffer+promotionConditionAmount+"元，可换购超值商品，还差"+promotionLimit+"元";
            }else {
            	t_html = resultStrBuffer+promotionConditionAmount+"件，可换购超值商品，还差"+promotionLimit+"件";
            }
        }
        var ohtml = '<div class="cart-cgbuy-box"><i>超值换购</i>'+t_html+a_html+'</div>';
        boxhtml+=ohtml;
    }
    boxhtml+="</div>";
    $(".cart-title").after(boxhtml);
    //==========================================事件绑定
    $(".cart-cgbuy-up").toggle(
	  function () {
	  	$(this).html("收起<b>&and;</b>");
	    $(".cart-cgbuy").css("height","auto");
	  },
	  function () {
	  	$(this).html("展开全部<b>&or;</b>");
	    $(".cart-cgbuy").css("height","46px");
	  }
	);
    $(".gocoudan").bind("click",function(){
        clickButton("去凑单","toCollectBills","","PC_ShoppingCart","PC_Repurchase","购物车页");
    });

    $("body").append("<div id='cgbuy_cov' class='cgbuy_cov'><div class='cgbuy_cov_tit'></div><div class='cgbuy_cov_box'><ul></ul></div><div id='gocart'>返回购物车</div></div>");
	$(".gocgbuy").each(function(i,o){
		$(o).click(function(){
			var ruleId = $(this).attr("_ruleid");
			var otype = $(this).attr("_type");
            var justSee=$(o).attr("_justsee");
            if(justSee == '0'){
                clickButton("重新选择","ReSelection","","PC_ShoppingCart","PC_Repurchase","购物车页");
			}else if(justSee == '1'){
                clickButton("查看活动","ViewActivity","","PC_ShoppingCart","PC_Repurchase","购物车页");
			}else{
                clickButton("去换购","toRepurchase","","PC_ShoppingCart","PC_Repurchase","购物车页");
			}
			$.ajax({     
		         type: "POST",    
		         data:{"ruleid":ruleId,"huanGouType":otype},
		         url: domain.cart +"/queryHuanGouActivity.html",   
		         dataType: "json",     
		         success: function(data) {
		         		if(justSee == '1'){
		         			coverinit(data,ruleId,otype,true)
		         		}else{
		         			coverinit(data,ruleId,otype)
		         		}
		         }     
		    });
		});
	});
}

function coverinit(data,ruleId,otype,justsee){
	$("#cgbuy_cov").popbox({title:'超值商品换购'});
  	var olist = data.obj.goodsList;
  	var promotionConditionType = data.obj.promotionConditionType; //换购条件是金额还是件数(1.金额 2.件数)
  	var conditionText = data.obj.conditionText;	//换购文案
  	var iscan = data.obj.meetCondition;		//是否满足换购条件
  	var huangouBtn = data.obj.huangouBtn;//换购按钮文案
  	var maxSkus = data.obj.maxSkus; //最大换购数
  	var hgCheckedNumber = data.obj.hgCheckedNumber; //已加购物车的换购商品数量
  	var nowsel = 0;  //当前选中的总商品数
  	var param='[';
  	for(var j =0;j<olist.length;j++){
  		if(j==olist.length-1){
  			param +='{"goodsSid": '+olist[j]["goodsId"]+',"buyStockSum":1}';
  		}else{
  			param +='{"goodsSid": '+olist[j]["goodsId"]+',"buyStockSum":1},';
  		}
  	}
  	param +=']';
  	$.ajax({     
         type: "POST",    
         data:{"goodsList":param},
         url: domain.cart +"/product/queryGoodsListStock.html",   
         dataType: "json",  
         async : false,   
         success: function(data) {
         	 if(data.obj.list.length==olist.length){
         	 	for(var t=0;t<data.obj.list.length;t++){
         	 		olist[t]['saleStockSum'] = data.obj.list[t]['saleStockSum'];
             	}
         	 }
         }     
    });
  	if(iscan){
  		var tithtml = '<i>超值换购</i>'+conditionText+'<a href="javascript:;" style="cursor:default;color:#f13149;">已选择 <span id="sel_cgnums">'+hgCheckedNumber+'</span>/'+maxSkus+'</a>';
  	}else{
  		//去凑单
  		var cdurl = "https://search."+BL.Global.getHost()+".com/fr/0.html?rn="+ruleId+"&type="+otype;
  		var tithtml = '<i>超值换购</i>'+conditionText+'<a href="'+cdurl+'" class="">'+huangouBtn+' &gt;</a>';
  	}

  	var ulhtml = '';
  	for(var i=0;i<olist.length;i++){
  		var oli = "";
  		var goodsurl = domain.product+"/"+olist[i].goodsId+".html";
  		nowsel += olist[i].goodsNumber; 
  		oli += '<li>';
  		if(olist[i]['saleStockSum']<=0){
  			oli +='<div class="kccover">已售完</div>';
  		}
		oli += '<img src="'+olist[i].mainPicturesUrl+'">';
		oli += '<div class="name">'+olist[i].goodsSalesName+'</div>';
		oli += '<div class="numbs">'+olist[i].personLimitText+'</div>';
		oli += '<div class="line">';
		if(iscan){ //是否能换购
			//olist[i].addCartFlag
			if(olist[i]['saleStockSum']>0){		//查库存,各个换购商品已选择数量不能大于最大换购数
				//olist[i].goodsNumber = 2;
				if(olist[i].goodsNumber>0){  //是否已经选中
					oli += '<div class="input-line" _maxnums="'+olist[i].personLimit+'"><em class="reduce">-</em> <div class="text" type="text">'+olist[i].goodsNumber+'</div> <em class="add">+</em></div><a class="addtocart addtocart_ok" style="display:none" href="javascript:void(0);">选择换购</a>';
				}else{
					oli += '<div class="input-line" style="display:none" _maxnums="'+olist[i].personLimit+'"><em class="reduce">-</em> <div class="text" type="text">'+olist[i].goodsNumber+'</div> <em class="add">+</em></div><a class="addtocart addtocart_ok" href="javascript:void(0);">选择换购</a>';
				}
			}else{
				oli += '<div class="input-line" style="display:none" _maxnums="'+olist[i].personLimit+'"><em class="reduce">-</em> <div class="text" type="text">'+olist[i].goodsNumber+'</div> <em class="add">+</em></div><a class="addtocart" href="javascript:void(0);">选择换购</a>';
			}
		}else{
			oli += '<div class="input-line" style="display:none" _maxnums="'+olist[i].personLimit+'"><em class="reduce">-</em> <div class="text" type="text">'+olist[i].goodsNumber+'</div> <em class="add">+</em></div><a class="addtocart" href="javascript:void(0);">选择换购</a>';
		}
		oli += '<div class="nprice">'+olist[i].exchangePriceText+'</div>';
		oli += '<div class="oprice">'+olist[i].originalPriceText+'</div>';
		oli += '</div></li>';
  		ulhtml+=oli;
  	}	
  	$(".cgbuy_cov_tit").html(tithtml);
  	$(".cgbuy_cov_box ul").html(ulhtml);
  	//$("#cgbuy_cov").popbox({title:'超值商品换购'});
  	if(!justsee){ //如果是查看活动
  		$(".addtocart_ok").click(function(){
	  		$(this).hide().siblings(".input-line").show().find(".add").click();
	  	});
  	}else{
  		$(".addtocart").removeClass("addtocart_ok");
  	}

  	$(".cgbuy_cov_box .input-line").each(function(i,o){
  		var this_maxnums = parseInt($(o).attr("_maxnums"));
  		var this_val = parseInt($(o).find(".text").html());
  		var _goodsLine = (typeof olist[i]=="undefined")?"":olist[i]['goodslineNbr'];
  		$(o).attr("_goodsLineNbr",_goodsLine);
			$(o).find('.add').click(function(){
                clickButton("加购","toAddPurchase","","PC_greatvalueBuys","PC_Repurchase","超值商品弹层");
				if(nowsel<maxSkus){		//总数量限制
					if(this_val>=this_maxnums){ //各自数量限制
						$(this).addClass("disa");
						return;
					}
					this_val +=1;
					nowsel +=1;
					console.log('tttttt',olist,i)
					var isaddok = incart(olist[i],1,ruleId,otype,0,i,function(){
						$("#sel_cgnums").html(nowsel);
						$(o).find(".text").html(this_val);
					},function(errmsg){
						this_val -=1;
						nowsel -=1;
						alert("失败:"+errmsg);
					});
				}else{
					$(".cgbuy_cov_box .input-line .add").addClass("disa");
					$(".addtocart").removeClass("addtocart_ok");
				}
			});
			$(o).find('.reduce').click(function(){
				if(this_val<=0){
					$(o).hide().siblings(".addtocart").show();
					return;
				}
				this_val -=1;
				nowsel -=1;
				incart(olist[i],this_val,ruleId,otype,3,i,function(){
					$("#sel_cgnums").html(nowsel);
					$(o).find(".text").html(this_val);
					$(".cgbuy_cov_box .input-line .add").removeClass("disa");
					//$(".addtocart").addClass("addtocart_ok");
					$(".addtocart").each(function(i,o){
						if(!$(o).parents("li").find(".kccover").length){
							$(o).addClass("addtocart_ok");
						}
					});
				},
				function(errmsg){
					this_val +=1;
					nowsel +=1;
					alert("失败:"+errmsg);
				});
			});
  	});
  	//关闭弹层
  	$("#gocart,#pop-close").click(function(){
  		window.location.href = window.location.href;
  	});
}

//加入更新购物车
var isincart = false;
function incart(data,num,ruleId,otype,tag,i,fn1,fn2){
	var isok = "";
	//https://cart.bl.com/nj/updateShoppingCart.html
	if(num==0){
		tag = 1;
	}
	var _data = data;
	var goodsdata  = {};
	goodsdata['goodsId'] = _data['goodsId'];
	goodsdata['goodsNumber'] = num;
	//goodsdata['salePrice'] = _data['exchangePrice'];
	//goodsdata['originalPrice'] = _data['originalPrice'];
	goodsdata['ruleId'] = ruleId;
	goodsdata['type'] = otype;
	goodsdata['goodsLineNbr'] = $(".cgbuy_cov_box .input-line").eq(i).attr("_goodsLineNbr");
	//goodsdata['goodsPicUrl'] = "";
	//goodsdata['activityId'] = "";
	//goodsdata['activityType'] = "";
	//goodsdata['categoryid'] = "";
	//goodsdata['rule'] = "";
	//goodsdata['addGoodsPrice'] = _data['exchangePrice'];

	var sendata = {};
	sendata['goodsList'] = [goodsdata];
	sendata['tag'] = tag;


	if(isincart){
		fn2("计算中,请稍后");
		return false;
	}
	isincart = true;
	$.ajax({
		type : "POST",
		data : $.toJSON(sendata),
		dataType : "json",
		contentType : "application/json",
		url : domain.cart + "/nj/updateShoppingCart.html",
		async : true,
		success : function(data) {
			if (data != null &&data.resultCode == "200") {
				if(!$(".cgbuy_cov_box .input-line").eq(i).attr("_goodsLineNbr")){
					$(".cgbuy_cov_box .input-line").eq(i).attr("_goodsLineNbr",data.resultInfo.goodsLineNbr);
				}
				fn1();
			}else{
				fn2(data.resultMsg);
			}
		},
		error : function(data) {
			fn2(data.resultMsg);
		},
		complete: function(){
			isincart = false;
		}
	});
	return isok;
}
