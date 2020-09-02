
var updateTime = null;
var iscalcCart = false;

//计算购物车
function calcCart(){
	var goodsWeb = new Object();
	var goodsList = new Array();
	var selectcart = new Array();
	var addressInfo = new Object();  
	$(".cart-table-list").find(".item").each(function() {
		if ($(this).find("[name = goodsId]").val() != undefined && $(this).parent().parent().attr("class") !== "slides") {
			var good = new Object();
			$(this).find(".goods").each(function() {
					good[$(this).attr('name')] = $(this).val();
			});
			good.goodsName="";
			good.totalPrice="";
			goodsList.push(good);
		}
	});
	addressInfo.province = $(".provinceId").val();
	addressInfo.city = $(".cityId").val();
	addressInfo.district = $(".districtId").val();
	goodsWeb.addressInfo = addressInfo;
	goodsWeb.goodsList = goodsList;
	//console.log(goodsWeb,'fffkkkk')
	$.ajax({
		type : "POST",
		data : $.toJSON(goodsWeb),
		dataType : "json",
		contentType : "application/json",
		url : domain.cart + "/nj/calculateShoppingCartChecked.html",
		async : false,
		success : function(data) {
			if(data.resultInfo && data.resultInfo.topPopList.length>0){
				cgbuyshow(data.resultInfo.topPopList)
			}

			/*var allbox = [];
			for(var a1=0;a1<data.resultInfo.goodsGroupDtoList.length;a1++){
				for(var a2 in data.resultInfo.goodsGroupDtoList[a1].freightImbodyMap){
					//console.log(a2,"a2222222")
					allbox.push(data.resultInfo.goodsGroupDtoList[a1].freightImbodyMap[a2]);
				}
			}
			covercd.allbox = allbox;*/

			if(!iscdcov){
				$('#pop-close').click();
				covercd.rendertab = false;
				covercd.rendertab1 = false;
			}
			$(".no-points").remove();
			$(".cart-table-name").remove();
			$(".cart-table-list").remove();
			$(".cart-list").remove();
			$(".tip-yellow").remove();
			//购物车中无商品显示内容
			if (data == null||data.resultInfo == null || data.totalGoodsAmount == 0) {
				var html = "";
				html +="<div class=\"no-points\">";
				html +="<i></i>";
				html +="<div class=\"message\">购物车快饿扁了 /(ToT)/~~</div>";
				html +="<div class=\"txt\">尝试买些东西再回来看看，快去 <a href=\""+domain.main+"\">i百联首页</a> 挑选商品吧！</div>";
				html +="	</div>";
				//购物车中SKU商品数量
				$(".cart-title").find("div.name").find("span").html(0);
				$(".cart-head").find("div.chk").hide();
				//顶部结算
				$(".cart-title").find("div.pay-message").find("span.price").html("&#165;0.00");
				$(".cart-title").find("div.pay-message").find("span.reduce").html("-&#165;0.00");
				$(".cart-head").after(html);
				 $(".pay-form").remove();
				return;
			}
			if (null != data && data.resultCode == "200") {
				data = data.resultInfo;
			}
			//购物车中SKU商品数量
			$(".cart-title").find("div.name").find("span").html(data.totalGoodsAmount);
			//顶部结算
			$(".cart-title").find("div.pay-message").find("span.price").html("&#165;"+(data.orderPay*1).toFixed(2));
			$("#orderAmount").val(data.orderPay);
			$(".cart-title").find("div.pay-message").find("span.reduce").html("-&#165;"+(data.showOrderDiscount*1).toFixed(2));
			//尾部结算
			$(".pay-line").find("div.price-line").find("span.price").html("<i>&#165;</i><strong>"+(data.orderPay*1).toFixed(2)+"</strong>");
			$(".pay-line").find("div.reduce-line").find("span.black").html("-<i>&#165;</i>"+(data.showOrderDiscount*1).toFixed(2));
			$(".item-show").find("span").html(data.totalcheckedGoodsNumber);
			$(".totalcheckedGoodsNumber").val(data.totalcheckedGoodsNumber);
			//结算按钮
			if (data.orderPay*1 > 0) {
				$(".cart-title").find("button").attr("class","btn btn-secondary");
				$(".pay-line").find("a.pay").attr("class","pay");
			}else{
				$(".cart-title").find("button").attr("class","btn-notsecondary");
				$(".pay-line").find("a.pay").attr("class","pay disable");
			}
			//全选
			if (data.checked == true) {
				$(".cart-head").find("label.chk-line").attr("class","chk-line select");
				$(".pay-line").find("div.select-all").attr("class","select-all select");
			}else{
				$(".cart-head").find("label.chk-line").attr("class","chk-line");
				$(".pay-line").find("div.select-all").attr("class","select-all");
			}
			$(".cart-head").find("div.chk").show();
			var goodsGroupDtoList = data.goodsGroupDtoList;
			//遍历商家集合
			var htmlList = "";
			var freight = [];
			for (var i = 0; i < goodsGroupDtoList.length; i++) {
				
				var goodsGroupList = goodsGroupDtoList[i].goodsGroupList;
				var groupDtoHtml = "";
				freight[i] = goodsGroupDtoList[i]['freightImbodyMap'];
				//遍历满减/篮筐分组集合
				for (var o = 0; o < goodsGroupList.length; o++) {
					//篮筐
					var isLK = false;
					if (goodsGroupList[o].basketMark == "1") {
						isLK = true;
					}
					//满减
					var isMJ = false;
					if (goodsGroupList[o].popTypeMark == "1") {
						isMJ = true;
					}
					//x元y件
					var isXY = false;
					if(goodsGroupList[o].popTypeMark  == "7"){
						isXY = true;
					}
					var isMLJ = false;
					if(goodsGroupList[o].popTypeMark  == "12"){
						isMLJ = true;
					}
					var goodsList = goodsGroupList[o].goodsList;
					//遍历商品集合
					var groupDto = "";
					for (var j = 0; j < goodsList.length; j++) {
						var pagegoid = '';
						var typeid = goodsList[j]['type']?"_"+goodsList[j]['type']:"";
						var ruleid = goodsList[j]['ruleId']?"_"+goodsList[j]['ruleId']:"";
						pagegoid = goodsList[j]['goodsId']+typeid+ruleid;
						var goodsHtml = "";
						var goods = goodsList[j];
						var isYS =true;
						if(goods.priceType == "18"){
							isYS = false;
						}
						goodsHtml += "<input type = \"hidden\" class=\"showOrderAmount1\" name=\"showOrderAmount\" value =\""+goodsGroupDtoList[i].showOrderAmount+"\" >";
						goodsHtml += "<input type = \"hidden\" class=\"showOrderAmount2\" name=\"showOrderAmount\" value =\""+goodsGroupList[o].showOrderAmount+"\" >";
						goodsHtml += "<input type = \"hidden\" class=\"showOrderAmount3\" name=\"showOrderAmount\" value =\""+goodsList[j].showOrderAmount+"\" >";
						if ((isLK||isMJ||isXY||isMLJ)&&isYS) {
								if (isMJ || isXY||isMLJ) {
									if ((goodsList.length-1) == j) {
										if (goods.checked == true) {
											goodsHtml += "<div class=\"item  border-last select\">";
										}else{
											goodsHtml += "<div class=\"item border-last\">";
										}
									}else{
										if (goods.checked == true) {
											goodsHtml += "<div class=\"item  border-middle select\">";
										}else{
											goodsHtml += "<div class=\"item border-middle\">";
										}
									}
								}else{
									if ((goodsList.length-1) == j) {
										goodsHtml += "<div class=\"item  border-last select\">";
									}else{
										goodsHtml += "<div class=\"item  border-middle select\">";
									}
								}
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"goodsId\" name=\"goodsId\" value =\""+goods.goodsId+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"goodsNumber\" name=\"goodsNumber\" value =\""+goods.goodsNumber+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"goodsName\" name=\"goodsName\" value =\""+goods.goodsName+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"goodsUrl\" name=\"goodsUrl\" value =\""+goods.goodsUrl+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"goodsPicUrl\" name=\"goodsPicUrl\" value =\""+goods.goodsPicUrl+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"salePrice\" name=\"salePrice\" value =\""+goods.salePrice+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"categoryid\" name=\"categoryid\" value =\""+goods.categoryid+"\" >";
								if (isLK&&goodsGroupList[o].dissatisfy == "true") {
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"checked\" name=\"checked\" value =\"false\" >";
									goodsHtml += "<input type = \"hidden\" class=\"checkedOriginal\" id=\"checkedOriginal\" name=\"checkedOriginal\" value =\"false\" >";
								}else{
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"checked\" name=\"checked\" value =\""+goods.checked+"\" >";
									goodsHtml += "<input type = \"hidden\" class=\"checkedOriginal\" id=\"checkedOriginal\" name=\"checkedOriginal\" value =\""+goods.checked+"\" >";
								}
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"stor\" name=\"stor\" value =\""+goods.stor+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"limitBuySum\" name=\"limitBuySum\" value =\""+goods.limitBuySum+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"totalPrice\" name=\"totalPrice\" value =\""+goods.totalPrice+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"rule\" name=\"rule\" value =\""+goods.rule+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"type\" name=\"type\" value =\""+goods.type+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"goodsLineNbr\" name=\"goodsLineNbr\" value =\""+goods.goodsLineNbr+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"groupId\" name=\"groupId\" value =\""+goodsGroupList[o].groupId+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"infoStoreSid\" name=\"infoStoreSid\" value =\""+goods.infoStoreSid+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"addGoodsPrice\" name=\"addGoodsPrice\" value =\""+goods.addGoodsPrice+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"proSellBit\" name=\"proSellBit\" value =\""+goods.proSellBit+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"activeCode\" name=\"activeCode\" value =\""+goods.activeCode+"\" >";
								var originalPrice = goods.originalPrice?goods.originalPrice:0;
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"originalPrice\" name=\"originalPrice\" value =\""+ originalPrice +"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"normalSalePrice\" name=\"normalSalePrice\" value =\""+goods.normalSalePrice+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"promotionPrice\" name=\"promotionPrice\" value =\""+goods.promotionPrice+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"priceType\" name=\"priceType\" value =\""+goods.priceType+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"limitBuyPersonSum\" name=\"limitBuyPersonSum\" value =\""+goods.limitBuyPersonSum+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"preBuyFlag\" name=\"preBuyFlag\" value =\""+goods.preBuyFlag+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"mpReduceMoney\" name=\"mpReduceMoney\" value =\""+goods.mpReduceMoney+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"discountRate\" name=\"discountRate\" value =\""+goods.discountRate+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"depositMoney\" name=\"depositMoney\" value =\""+goods.depositMoney+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"finalPaymentMoney\" name=\"finalPaymentMoney\" value =\""+goods.finalPaymentMoney+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"depositStartTime\" name=\"depositStartTime\" value =\""+goods.depositStartTime+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"brandSid\" name=\"brandSid\" value =\""+goods.brandSid+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"reduceAmout\" name=\"reduceAmout\" value =\""+goods.reduceAmout+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"reduceTag\" name=\"reduceTag\" value =\""+goods.reduceTag+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"showSalePrice\" name=\"showSalePrice\" value =\""+goods.showSalePrice+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"activityRuleForProm\" name=\"activityRuleForProm\" value =\""+goods.activityRuleForProm+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"activityTypeForProm\" name=\"activityTypeForProm\" value =\""+goods.activityTypeForProm+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goodsOriginalNumber\" id=\"goodsOriginalNumber\" name=\"goodsOriginalNumber\" value =\""+goods.goodsNumber+"\" >";
								
								goodsHtml += "<input type = \"hidden\" class=\"showOrderDiscounto\" name=\"showOrderDiscount\" value =\""+goods.showOrderDiscount+"\" >";
								//0-普通商品;1-直邮;2-保税;3-i百联提货卡（电子）;4-实体卡；5-百联卡（电子）
								if (goodsGroupList[o].groupType == "0" ||goodsGroupList[o].groupType == "7") {
									goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"ptGoods\" name=\"ptGoods\" value =\"0\" >";
								}else if (goodsGroupList[o].groupType == "5" ||goodsGroupList[0].groupType == "75") {
									//直邮
									goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"zyGoods\" name=\"zyGoods\" value =\"1\" >";
								}else if (goodsGroupList[o].groupType == "6" ||goodsGroupList[0].groupType == "76") {
									//保税
									goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"bsGoods\" name=\"bsGoods\" value =\"2\" >";
								}else if (goodsGroupList[o].groupType == "9") {
									goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"dzk\" name=\"goodsType\" value =\"3\" >";
								}else if (goodsGroupList[o].groupType == "10") {
									goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"stk\" name=\"goodsType\" value =\"4\" >";
								}else if (goodsGroupList[o].groupType == "12") {
									goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"blk\" name=\"goodsType\" value =\"5\" >";
								}
								goodsHtml += "<div class=\"cart-table-line\">";
								goodsHtml += "<div class=\"chk-line\">";
								if (isMJ || isXY||isMLJ) {
									if (goods.proSellBit == "4" && goods.stor*1 > 0) {
										goodsHtml += "<div class='chk goodsid_"+pagegoid+"' onclick='checkBox(this)'>";
									}else if(goods.proSellBit != "4" ||  goods.stor*1 <= 0){
										goodsHtml += "<div class=\"no-item\">失效";
									}else{
										goodsHtml += "<div class=\"chk\">";
									}
									goodsHtml += "</div>";
								}else{
									goodsHtml += "<div class=\"point\">•</div>";
								}
								goodsHtml += "</div>";
								goodsHtml += "<div class=\"item-box\">";

								if(goods.proSellBit != "4" ||  goods.stor*1 <= 0){  //失效 
									if(goods.priceType == "18"){
										goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\"> <img src=\""+goods.goodsPicUrl+"\" />";
									}else if(goods.priceType == "25"){
										goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\"> <img src=\""+goods.goodsPicUrl+"\" />";
									}else{
										goodsHtml += "<a href=\""+"javascript:void(0);"+"\" title=\""+goods.goodsName+"\"> <img src=\""+goods.goodsPicUrl+"\" />";
									}
								}else{
									if (goods.goodsType == "15") {
										goodsHtml += "<a href=\""+"javascript:void(0);"+"\" title=\""+goods.goodsName+"\"> <img src=\""+goods.goodsPicUrl+"\" />";
									}else{
										goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\"> <img src=\""+goods.goodsPicUrl+"\" />";
									}
								}


								goodsHtml += "</a>";
								if(goods.priceType == "18"){
									goodsHtml += "<div class='message' _ptpye='"+goods.priceType+"'>";
									goodsHtml += "<div class=\"text\">定金预售</div>";
									goodsHtml += "</div>";	
								}else if(goods.priceType == "25"){
									goodsHtml += "<div class='message' _ptpye='"+goods.priceType+"'>";
									goodsHtml += "<div class=\"text\">预约抢购</div>";
									goodsHtml += "</div>";	
								}else{
									if (!goods.stor*1 > 0) {
										goodsHtml += "<div class=\"message\">";
										goodsHtml += "<div class=\"text\">无货</div>";
										goodsHtml += "</div>";
									}
									//判断已下架
									if(goods.proSellBit == "6"){
										goodsHtml += "<div class=\"message\">";
										goodsHtml += "<div class=\"text\">商品已下架</div>";
										goodsHtml += "</div>";										
									}
								}
								goodsHtml += "<div class=\"name\">";
								if (goodsGroupList[o].groupType == "5" || goodsGroupList[o].groupType == "75") {
									goodsHtml += "<i class=\"dm\"></i> ";
								}else if (goodsGroupList[o].groupType == "6" || goodsGroupList[o].groupType == "76") {
									goodsHtml += "<i class=\"protective\"></i>";
								}else if (goods.globalType == "8" ) {
									//goodsHtml += "<i class=\"global\"></i>";
								}
								var goodsName = "";
								if(goods.goodsName != undefined || goods.goodsName != null){
									if (goods.goodsName.length > 30) {
										goodsName = goods.goodsName.substr(0,30)+"...";
									}else{
										goodsName = goods.goodsName;
									}
								}
								if (goods.goodsType == "15") {
									goodsHtml += "<a href=\""+"javascript:void(0);"+"\" title=\""+goods.goodsName+"\"> "+goodsName+" </a>";
								}else{
									if(goods.proSellBit != "4" ||  goods.stor*1 <= 0){ //失效
										if(goods.priceType == "18"){
											goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\"> "+goodsName+" </a>";
										}else if(goods.priceType == "25"){
											goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\"> "+goodsName+" </a>";
										}else{
											goodsHtml += "<a href=\""+"javascript:void(0);"+"\" title=\""+goods.goodsName+"\"> "+goodsName+" </a>";
										}
									}else{
										goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\"> "+goodsName+" </a>";
									}
								}
								goodsHtml += "</div>";
								//预定
								if (goods.virtualSellFlag=="1") {
									goodsHtml += "<div class=\"icon-line\">";
									goodsHtml += "<i class=\"pre\">预定</i>";
									goodsHtml += "</div>";
								}
								goodsHtml += "<div class=\"message-line\">";
								goodsHtml += "</div>";
								goodsHtml += "</div>";
								goodsHtml += "<div class=\"type-box\">";
								if (goods.attrList != null) {
									var attrList = goods.attrList;
									for (var x = 0; x < attrList.length; x++) {
										goodsHtml += "<div class=\"line\">"+attrList[x].name+"："+attrList[x].value+"</div>";
									}
								}
								goodsHtml += "</div>";
								goodsHtml += "<div class=\"item-price-box\">";
								if(goods.type=="16"){
									goodsHtml += "<del>&#165;"+(goods.normalSalePrice).toFixed(2)+"</del>";
									goodsHtml += "<div class=\"price\">&#165;"+(goods.showSalePrice).toFixed(2)+"</div>";
									goodsHtml += "<div class=\"icon\">";
									goodsHtml += "<i class=\"red\">换购价</i>";
								}else{
									if (goods.priceType == "6") {
										goodsHtml += "<del>&#165;"+(goods.originalPrice).toFixed(2)+"</del>";
										}
									goodsHtml += "<div class=\"price\">&#165;"+(goods.showSalePrice).toFixed(2)+"</div>";
									
									goodsHtml += "<div class=\"icon\">";
									if (goods.priceType == "6") {
										goodsHtml += "<i class=\"orange\">闪购</i>";
									}else if (goods.priceType == "13") {
										goodsHtml += "<i class=\"red\">抢购</i>";
									}else if(goods.priceType == "15"){
										goodsHtml += "<i class=\"green\">直降</i>";
									}else if(goods.priceType == "16"){
										goodsHtml += "<i class=\"pomelo\">折扣</i>";
									}else if(goods.priceType == "20"){
										//goodsHtml += "<i class=\"\" style=\"background:"+goods.activityColor+"\">"+goods.activityTitle+"</i>";
										goodsHtml += "<i class=\"green\">直降</i>";
									}
								}
								goodsHtml += "</div>";
								//降价标签
								if(goods.reduceTag == "1"){
									goodsHtml+="<div class=\"cart-depreciate\">"+"降价￥"+goods.reduceAmout;
									goodsHtml += "<div><i></i>商品比加入时便宜￥"+goods.reduceAmout+"</div>";
									goodsHtml += "</div>";
									}
								goodsHtml += "</div>";
								goodsHtml += "<div class=\"number-box\">";
								if (isMJ || isXY||isMLJ) {
									if (goods.proSellBit == "4" &&goods.stor*1 > 0 ) {
										if(goods.priceType == "18"){
											goodsHtml += goods.goodsNumber;
										}else if(goods.priceType == "25"){
											goodsHtml += goods.goodsNumber;
										}else{
											goodsHtml += "<div class=\"input-line\">";
											if (goods.goodsNumber*1 ==1) {
												goodsHtml += "<em class=\"reduce disable\" >-</em> " ;
											}else{
												goodsHtml += "<em class='reduce' id='reduce_"+pagegoid+"' onclick='downButton(this)'>-</em> " ;
											}
											goodsHtml +=	"<input class=\"text\" onchange=\"inputUpdata(this)\" type=\"text\" value=\""+goods.goodsNumber+"\" /> ";
											if (goods.goodsNumber*1>= 99) {
												goodsHtml +=	"<em class=\"add disable\" >+</em>";
											}else{
												goodsHtml +=	"<em class='add' id='add_"+pagegoid+"' onclick='upButton(this)'>+</em>";
											}
											goodsHtml += "</div>";
											if (goods.stor*1 <= 5) {
												goodsHtml += "<div class=\"error\">库存紧张</div>";
											}else if (goods.goodsNumber*1 >= goods.stor*1&& goods.limitBuySum*1  == -1  ) {
												if (goods.stor*1 > 99 ) {
													goodsHtml += "<div class=\"error\">最多只能购买99件</div>";
												}else{
													goodsHtml += "<div class=\"error\">最多只能购买"+goods.stor+"件</div>";
												}
											}else if (goods.limitBuySum*1 <=goods.goodsNumber*1&&goods.limitBuySum*1 >0) {
												goodsHtml += "<div class=\"error\">最多只能购买"+goods.limitBuySum+"件</div>";
											}
										}
									}else{
										goodsHtml += "";
									}
								}else{
									goodsHtml += "<div class=\"input-line\">";
									if (goods.goodsNumber*1 ==1) {
										goodsHtml += "<em class=\"reduce disable\" >-</em> " ;
									}else{
										goodsHtml += "<em class='reduce' id='reduce_"+pagegoid+"' onclick='downButton(this,1)'>-</em> " ;
									}
									goodsHtml +=	"<input class=\"text\" onchange=\"inputUpdata(this,1)\" type=\"text\" value=\""+goods.goodsNumber+"\" /> ";
									if (goods.goodsNumber*1 >= goods.basketLimitGoodsNum*1 && goods.basketLimitGoodsNum*1 >= 0) {
										goodsHtml +=	"<em class=\"add disable\" >+</em>";
									}else{
										goodsHtml +=	"<em class='add' id='add_"+pagegoid+"' onclick='upButton(this,1)'>+</em>";
									}
									goodsHtml += "</div>";
									if (goods.goodsNumber*1 >= goods.basketLimitGoodsNum*1 && goods.basketLimitGoodsNum*1 >= 0) {
										goodsHtml += "<div class=\"error\">最多只能购买"+goods.basketLimitGoodsNum+"件</div>";
									}
								}
								goodsHtml += "</div>";
								goodsHtml += "<div class=\"price-box\">";
								goodsHtml += "<div class=\"price\">&#165;"+(goods.totalPrice).toFixed(2)+"</div>";
								goodsHtml += "</div>";
								goodsHtml += "<div class=\"action-box\">";
//								if (isMJ || isXY) {
									if (goods.proSellBit == "4" ) {
										if (goods.goodsType == "15") {
											goodsHtml += "<a class=\"add-favourite\" href=\"javascript:void(0);\" onclick=\"\"></a> <br />";
										}else{
											goodsHtml += "<a class=\"add-favourite\" href=\"javascript:void(0);\" onclick=\"addFavorite(this)\">移入收藏夹</a> <br />";											
										}
									}
									if(goods.type=="16"){
										goodsHtml +="<a class='delete goodsid_"+pagegoid+"'' href='javascript:void(0);' onclick='removeGoods(this)'>删除</a>";
									}else{
										goodsHtml += "<a class=\"delete\" href=\"javascript:void(0);\" onclick=\"removeGoods(this)\">删除</a>";
									}
//								}
								goodsHtml += "</div>";
								goodsHtml += "</div>";
								if (goods.giftInfoList != null) {
									var giftHtml = "";
									giftHtml += "<div class=\"gift-line\">";
									for (var gift = 0; gift < goods.giftInfoList.length; gift++) {
										var giftInfo = goods.giftInfoList[gift];
										if (gift+1 == goods.giftInfoList.length) {
											if(giftInfo.goodsNumber >0){
												giftHtml += "<a target=\"blank\" href=\""+giftInfo.gifGoods.goodsUrl+"?ig=1"+"\" title=\""+giftInfo.gifGoods.goodsName+"\">【赠品】 "+giftInfo.gifGoods.goodsName+" </a> ×"+giftInfo.goodsNumber;	
											}
										}else{
											if(giftInfo.goodsNumber >0){
												giftHtml += "<a target=\"blank\" href=\""+giftInfo.gifGoods.goodsUrl+"?ig=1"+"\" title=\""+giftInfo.gifGoods.goodsName+"\">【赠品】 "+giftInfo.gifGoods.goodsName+" </a> ×"+giftInfo.goodsNumber+"<br /> ";
											}
										}
									}
									giftHtml += "</div>";
									goodsHtml += giftHtml;
								}
								
								if(goods.seleGiftList !=null){
									var giftHtml = "";
									giftHtml += "<div class=\"gift-line\">";
									for(var k =0 ;k<goods.seleGiftList.length;k++){
										var mzData =goods.seleGiftList[k];
										if(mzData.stor*1 > 0 && mzData.goodsNumber*1 > 0){
											if(mzData.checked){
												giftHtml += "【赠品】 "+mzData.goodsName+""+"x"+mzData.goodsNumber+"<br>";
											}
										}
									}
									giftHtml += "</div>";
									goodsHtml += giftHtml;
								}
								
								/********活动********/
								var mzpopDesc="";
								var mzMaxQty="";
								var popRuleId ="";
								if (goods.popDetails != null && !(goods.proSellBit != "4" ||  goods.stor*1 <= 0)) {
									for (var pop = 0; pop < goods.popDetails.length; pop++) {
										var popList = goods.popDetails[pop];
											if (popList.popType  == "2"|| popList.popType  == "4"||popList.popType == "6") {
												goodsHtml += "<div class=\"active-line active-line-bottom\">";
												goodsHtml += "<div class=\"message\">";
												if (popList.popType  == "2") {
													goodsHtml +="【参与折扣】";
												}else if(popList.popType  == "4"){
													goodsHtml +="【参与满返】";
												}else if(popList.popType == "6"){
													goodsHtml +="【参与满赠】";
												}
												goodsHtml += "<a class=\"name\" href=\"javascript:void(0);\" title=\"\">"+popList.popDesc+"</a>";
												if(popList.isMatch == true){
													if(popList.popType  == "4"){
														goodsHtml += " 可享受优惠";
//														goodsHtml +=" <a href=\""+domain.search+"/fr/"+popList.activityId+".html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
														goodsHtml +=" <a href=\""+domain.search+"/fr/0.html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
													}else if(popList.popType  == "2"){
														goodsHtml += " 已优惠"+goodsGroupList[o].showOrderDiscount+"元";
//														goodsHtml +=" <a href=\""+domain.search+"/fr/"+popList.activityId+".html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
														goodsHtml +=" <a href=\""+domain.search+"/fr/0.html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
													}else if(popList.popType  == "6"){
														goodsHtml += " 可领取赠品";
													}
												}else{
													goodsHtml += " 未满足促销条件";
													if(popList.popType  != "6"){
//														goodsHtml +=" <a href=\""+domain.search+"/fr/"+popList.activityId+".html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">去凑单 ></a>";
														goodsHtml +=" <a href=\""+domain.search+"/fr/0.html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">去凑单 ></a>";
													}
												}
												
												 if(popList.popType == "6" && goods.seleGiftList !=null){
														goodsHtml += "<a class=\"change\" onclick=\"selMz(this)\" href=\"javascript:void(0);\">选赠品</a>";
														 }
												goodsHtml += "<input type = \"hidden\" class=\"popRuleId\" name=\"popRuleId\" value =\""+popList.popRuleId+"\" >";
												goodsHtml += "<input type = \"hidden\" class=\"mzpopDesc\" name=\"mzpopDesc\" value =\""+popList.popDesc+"\" >";
												goodsHtml += "<input type = \"hidden\" class=\"mzMaxQty\" name=\"mzMaxQty\" value =\""+popList.maxQty+"\" >";
												goodsHtml += "<input type = \"hidden\" class=\"mzpopDesc\" name=\"mzMoneyCondition\" value =\""+popList.moneyCondition+"\" >";
												goodsHtml += "<input type = \"hidden\" class=\"mzpopDesc\" name=\"mzQtyCondition\" value =\""+popList.qtyCondition+"\" >";
												 mzpopDesc=popList.popDesc;
												 mzMaxQty=popList.maxQty;
												 popRuleId=popList.popRuleId;
												goodsHtml += "</div>";
												goodsHtml += "</div>";
											}
									}
								   }
								
								/***mz*/
								if(goods.seleGiftList !=null){
									var mzGoodsHtml = "";
									var mzGoods="";
									mzGoodsHtml+="<div class=\"cardCss\" style=\"display: none;\">";
									mzGoodsHtml+="<ul>";
									mzGoodsHtml+="<li>";
									mzGoodsHtml+="<div class=\"item-title item-focus\">";
									mzGoodsHtml+="<span>【满赠】 "+mzpopDesc+"<em>已选<i class=\"mzPopNum\">0</i>件，最多可选"+mzMaxQty+"件</em></span>"
									mzGoodsHtml+="<a class=\"closes\" href=\"javascript:void(0);\" style=\"display: block;\">×</a>";		
									mzGoodsHtml+="</div>";
									mzGoodsHtml+="<div class=\"card-flex\">";
									mzGoodsHtml+="<ul class=\"slides\">";
									for(var mzNum =0 ;mzNum<goods.seleGiftList.length;mzNum++){
										var mzHtml = "";
										var mzData =goods.seleGiftList[mzNum];
//										mzGoodsHtml += "<input type = \"hidden\" class=\"check\" name=\"check\" value =\""+mzData.check+"\" >";
//										mzGoodsHtml += "<input type = \"hidden\" class=\"promotionMark\" name=\"promotionMark\" value =\""+mzData.promotionMark+"\" >";		
//										goodsHtml += "<input type = \"hidden\" class=\"mzpopDesc\" name=\"mzpopDesc\" value =\""+popList.popDesc+"\" >";
//										goodsHtml += "<input type = \"hidden\" class=\"mzpopDesc\" name=\"mzpopDesc\" value =\""+popList.popDesc+"\" >";
//										goodsHtml += "<input type = \"hidden\" class=\"mzpopDesc\" name=\"mzpopDesc\" value =\""+popList.popDesc+"\" >";

										if(goods.seleGiftList.length>5){
											mzGoods+="<div class=\"item\">";
											mzGoods+="<a href=\""+mzData.goodsUrl+"?ig=1"+"\" title=\"\"><img src=\""+mzData.goodsPicUrl+"\"></a>";
											mzGoods += "<input type = \"hidden\" id=\"mzMaxQty\" class=\"mzMaxQty\" name=\"mzMaxQty\" value =\""+mzMaxQty+"\" >";
											mzGoods += "<input type = \"hidden\" id=\"checked\" class=\"mzGoods\" name=\"checked\" value =\""+mzData.checked+"\" >";
											mzGoods += "<input type = \"hidden\" id=\"mzgoodsId\" class=\"mzGoods\" name=\"goodsId\" value =\""+mzData.goodsId+"\" >";		
											mzGoods += "<input type = \"hidden\" id=\"goodsLineNbr\"  class=\"goodsLineNbr\" value =\""+goods.goodsLineNbr+"\" >";
											mzGoods += "<input type = \"hidden\" id=\"goodsId\"  class=\"goodsId\"  value =\""+goods.goodsId+"\" >";
											mzGoods += "<input type = \"hidden\"  class=\"popRuleId\"  value =\""+popRuleId+"\" >";
											if(mzData.stor*1 > 0 && mzData.goodsNumber*1 > 0 ){
												if(mzData.checked){
													mzGoods+="<i  class=\"card-checked\" onclick=\"upMzButt(this)\"></i>";
												}else{
													mzGoods+="<i  class=\"card-normal\" onclick=\"upMzButt(this)\"></i>";
												}
											}else{
												mzGoods+="<i  class=\"card-disabled\"></i>";
											}
											mzGoods+=" <div class=\"name\">";
											mzGoods+="<a target=\"blank\" href=\""+mzData.goodsUrl+"?ig=1"+"\" title=\"\">"+mzData.goodsName+"</a>";
											mzGoods+="</div>";
//											mzHtml+=" <div class=\"price\">¥400.00</div>";
//											mzHtml+=" <div class=\"number\">x1</div>";
											mzGoods+="</div>";	
											if (mzNum == 4) {
												mzHtml = "<li>"+mzGoods+"</li>";
												mzGoods = "";
											}else if((mzNum+1)%5 == 0 || (mzNum+1)-goods.seleGiftList.length==0){
												mzHtml = "<li >"+mzGoods+"</li>";
												mzGoods = "";
											}
										}else{
											mzGoods+="<div class=\"item\">";
											mzGoods+="<a href=\""+mzData.goodsUrl+"?ig=1"+"\" title=\"\"><img src=\""+mzData.goodsPicUrl+"\"></a>";
											mzGoods += "<input type = \"hidden\" id=\"mzMaxQty\" class=\"mzMaxQty\" name=\"mzMaxQty\" value =\""+mzMaxQty+"\" >";
											mzGoods += "<input type = \"hidden\" id=\"checked\" class=\"mzGoods\" name=\"checked\" value =\""+mzData.checked+"\" >";
											mzGoods += "<input type = \"hidden\" id=\"mzgoodsId\" class=\"mzGoods\" name=\"goodsId\" value =\""+mzData.goodsId+"\" >";		
											mzGoods += "<input type = \"hidden\" id=\"goodsLineNbr\"  class=\"goodsLineNbr\" value =\""+goods.goodsLineNbr+"\" >";
											mzGoods += "<input type = \"hidden\" id=\"goodsId\"  class=\"goodsId\"  value =\""+goods.goodsId+"\" >";
											mzGoods += "<input type = \"hidden\"  class=\"popRuleId\"  value =\""+popRuleId+"\" >";
											if(mzData.stor*1 > 0 && mzData.goodsNumber*1 > 0 ){
												if(mzData.checked){
													mzGoods+="<i  class=\"card-checked\" onclick=\"upMzButt(this)\"></i>";
												}else{
													mzGoods+="<i  class=\"card-normal\" onclick=\"upMzButt(this)\"></i>";
											}
											}else{
												mzGoods+="<i  class=\"card-disabled\"></i>";
											}
											mzGoods+=" <div class=\"name\">";
											mzGoods+="<a target=\"blank\" href=\""+mzData.goodsUrl+"?ig=1"+"\" title=\"\">"+mzData.goodsName+"</a>";
											mzGoods+="</div>";
//											mzHtml+=" <div class=\"price\">¥400.00</div>";
//											mzHtml+=" <div class=\"number\">x1</div>";
											mzGoods+="</div>";	
											if ((mzNum+1)-goods.seleGiftList.length==0) {
												mzHtml = "<li>"+mzGoods+"</li>";
												mzGoods = "";
											}
										}
									
										mzGoodsHtml +=	mzHtml;
									
									}
									mzGoodsHtml+="</ul>";
									mzGoodsHtml+="</div>";
									mzGoodsHtml+="</li>";
									mzGoodsHtml+="</ul>";
									mzGoodsHtml+="</div>";
									goodsHtml += mzGoodsHtml;									
								}
								/****************mz******************/
								
								goodsHtml += "</div>";
								if (j+1 < goodsList.length ) {
									goodsHtml += "<div class=\"item-border\"></div>";
								}
						}else{
								if (goods.proSellBit == "4" && goods.stor*1 >0) {
										goodsHtml += "<li>";
								}else{
									goodsHtml += "<li class=\"no-use\">";
								}
								if (goods.stor*1 > 0&&goods.goodsNumber*1 <= goods.stor*1) {
									if(goods.priceType == "18"){
										goodsHtml += "<div class=\"item disable\">";
									}else{
										if (goods.checked == true) {
											if(goods.goodsType == 11){
												goodsHtml += "<div id=\"pr-zh\" class=\"item pr-zh select\">";
											}else{
												goodsHtml += "<div id=\"pr-zh\" class=\"item select\">";
											}
										}else{
											if(goods.goodsType == 11){
												goodsHtml += "<div class=\"item pr-zh\">";
											}else{
												goodsHtml += "<div class=\"item\">";
											}
										}	
									}
								}else{
									if(goods.goodsType == 11){
										goodsHtml += "<div class=\"item disable pr-zh\">";
									}else{
										goodsHtml += "<div class=\"item disable\">";
									}
								}
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"goodsId\" name=\"goodsId\" value =\""+goods.goodsId+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"goodsNumber\" name=\"goodsNumber\" value =\""+goods.goodsNumber+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"goodsName\" name=\"goodsName\" value =\""+goods.goodsName+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"goodsUrl\" name=\"goodsUrl\" value =\""+goods.goodsUrl+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"goodsPicUrl\" name=\"goodsPicUrl\" value =\""+goods.goodsPicUrl+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"checked\" name=\"checked\" value =\""+goods.checked+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"stor\" name=\"stor\" value =\""+goods.stor+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"limitBuySum\" name=\"limitBuySum\" value =\""+goods.limitBuySum+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"totalPrice\" name=\"totalPrice\" value =\""+goods.totalPrice+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"rule\" name=\"rule\" value =\""+goods.rule+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"type\" name=\"type\" value =\""+goods.type+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"goodsLineNbr\" name=\"goodsLineNbr\" value =\""+goods.goodsLineNbr+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"groupId\" name=\"groupId\" value =\""+goodsGroupList[o].groupId+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"salePrice\" name=\"salePrice\" value =\""+goods.salePrice+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"categoryid\" name=\"categoryid\" value =\""+goods.categoryid+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"infoStoreSid\" name=\"infoStoreSid\" value =\""+goods.infoStoreSid+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"addGoodsPrice\" name=\"addGoodsPrice\" value =\""+goods.addGoodsPrice+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"proSellBit\" name=\"proSellBit\" value =\""+goods.proSellBit+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"activeCode\" name=\"activeCode\" value =\""+goods.activeCode+"\" >";
								var originalPrice = goods.originalPrice?goods.originalPrice:0;
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"originalPrice\" name=\"originalPrice\" value =\""+ originalPrice +"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"normalSalePrice\" name=\"normalSalePrice\" value =\""+goods.normalSalePrice+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"promotionPrice\" name=\"promotionPrice\" value =\""+goods.promotionPrice+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"priceType\" name=\"priceType\" value =\""+goods.priceType+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"limitBuyPersonSum\" name=\"limitBuyPersonSum\" value =\""+goods.limitBuyPersonSum+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"preBuyFlag\" name=\"preBuyFlag\" value =\""+goods.preBuyFlag+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"mpReduceMoney\" name=\"mpReduceMoney\" value =\""+goods.mpReduceMoney+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"discountRate\" name=\"discountRate\" value =\""+goods.discountRate+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"depositMoney\" name=\"depositMoney\" value =\""+goods.depositMoney+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"finalPaymentMoney\" name=\"finalPaymentMoney\" value =\""+goods.finalPaymentMoney+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"depositStartTime\" name=\"depositStartTime\" value =\""+goods.depositStartTime+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"brandSid\" name=\"brandSid\" value =\""+goods.brandSid+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"reduceAmout\" name=\"reduceAmout\" value =\""+goods.reduceAmout+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"reduceTag\" name=\"reduceTag\" value =\""+goods.reduceTag+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"showSalePrice\" name=\"showSalePrice\" value =\""+goods.showSalePrice+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"activityRuleForProm\" name=\"activityRuleForProm\" value =\""+goods.activityRuleForProm+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"activityTypeForProm\" name=\"activityTypeForProm\" value =\""+goods.activityTypeForProm+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"checkedOriginal\" id=\"checkedOriginal\" name=\"checkedOriginal\" value =\""+goods.checked+"\" >";
								goodsHtml += "<input type = \"hidden\" class=\"goodsOriginalNumber\" id=\"goodsOriginalNumber\" name=\"goodsOriginalNumber\" value =\""+goods.goodsNumber+"\" >";
								
								goodsHtml += "<input type = \"hidden\" class=\"showOrderDiscounto\" name=\"showOrderDiscount\" value =\""+goods.showOrderDiscount+"\" >";
								//0-普通商品;1-直邮;2-保税;3-电子卡;4-实体卡；
								if (goodsGroupList[o].groupType == "0" ||goodsGroupList[o].groupType == "7") {
									goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"ptGoods\" name=\"ptGoods\" value =\"0\" >";
								}else if (goodsGroupList[o].groupType == "5" ||goodsGroupList[o].groupType == "75") {
									//直邮
									goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"zyGoods\" name=\"zyGoods\" value =\"1\" >";
								}else if (goodsGroupList[o].groupType == "6" ||goodsGroupList[o].groupType == "76") {
									//保税
									goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"bsGoods\" name=\"bsGoods\" value =\"2\" >";
								}else if (goodsGroupList[o].groupType == "9") {
									goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"dzk\" name=\"goodsType\" value =\"3\" >";
								}else if (goodsGroupList[o].groupType == "10") {
									goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"stk\" name=\"goodsType\" value =\"4\" >";
								}else if (goodsGroupList[o].groupType == "12") {
									goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"blk\" name=\"goodsType\" value =\"5\" >";
								}
								goodsHtml += "<div class=\"cart-table-line\">";
								goodsHtml += "<div class=\"chk-line\">";
								if(goods.type=="16"){
									goodsHtml += "<div></div>";
								}else{
									if (goods.proSellBit == "4" && goods.stor*1 > 0 ) {
										if(goods.priceType == "18"){
											goodsHtml += "<div class=\"chk\"></div>";
										}else{
	//										if(goodsGroupList[o].popDetails == null){
											if(goods.popDetails == null){
												goodsHtml += "<div class='chk goodsid_"+pagegoid+"' onclick='checkBox(this,2)'></div>";
											}else{
												goodsHtml += "<div class='chk goodsid_"+pagegoid+"' onclick='checkBox(this)'></div>";	
											}
										}
									}else if(goods.proSellBit != "4" ||  goods.stor*1 <= 0){
										goodsHtml += "<div class=\"no-item\">失效</div>";
									}else{
										goodsHtml += "<div class=\"chk\"></div>";
									}
								}
								goodsHtml += "</div>";
								goodsHtml += "<div class=\"item-box\">";
								
								if(goods.proSellBit != "4" ||  goods.stor*1 <= 0){  //失效 
									if(goods.priceType == "18"){
										goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\"> <img src=\""+goods.goodsPicUrl+"\" />";
									}else if(goods.priceType == "25"){
										goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\"> <img src=\""+goods.goodsPicUrl+"\" />";
									}else{
										goodsHtml += "<a href=\""+"javascript:void(0);"+"\" title=\""+goods.goodsName+"\"> <img src=\""+goods.goodsPicUrl+"\" />";
									}
								}else{
									if (goods.goodsType == "15") {
										goodsHtml += "<a href=\""+"javascript:void(0);"+"\" title=\""+goods.goodsName+"\"> <img src=\""+goods.goodsPicUrl+"\" />";
									}else{
										goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\"> <img src=\""+goods.goodsPicUrl+"\" />";
									}
								}
								
								goodsHtml += "</a>";
								if(goods.priceType == "18"){
									goodsHtml += "<div class='message' _ptpye='"+goods.priceType+"'>";
									goodsHtml += "<div class=\"text\">定金预售</div>";
									goodsHtml += "</div>";	
								}else if(goods.priceType == "25"){
									goodsHtml += "<div class='message' _ptpye='"+goods.priceType+"'>";
									goodsHtml += "<div class=\"text\">预约抢购</div>";
									goodsHtml += "</div>";	
								}else{
									if (!goods.stor*1 > 0) {
										goodsHtml += "<div class=\"message\">";
										goodsHtml += "<div class=\"text\">无货</div>";
										goodsHtml += "</div>";
									}
									//判断已下架
									if(goods.proSellBit == "6"){
										goodsHtml += "<div class=\"message\">";
										goodsHtml += "<div class=\"text\">商品已下架</div>";
										goodsHtml += "</div>";										
									}
								}
								goodsHtml += "<div class=\"name\">";
								if (goodsGroupList[o].groupType == "5" || goodsGroupList[o].groupType == "75") {
									goodsHtml += "<i class=\"dm\"></i> ";
								}else if (goodsGroupList[o].groupType == "6" || goodsGroupList[o].groupType == "76") {
									goodsHtml += "<i class=\"protective\"></i>";
								}else if (goods.globalType == "8" ) {
									//goodsHtml += "<i class=\"global\"></i>";
								}
								if(goods.goodsType == 11){
									goodsHtml += "【组合商品】";
								}
								var goodsName = "";
								if(goods.goodsName != undefined || goods.goodsName != null){
									if (goods.goodsName.length > 30) {
										goodsName = goods.goodsName.substr(0,30)+"...";
									}else{
										goodsName = goods.goodsName;
									}
								}
								if (goods.goodsType == "15") {
									goodsHtml += "<a href=\""+"javascript:void(0);"+"\" title=\""+goods.goodsName+"\"> "+goodsName+" </a>";
								}else{
									if(goods.proSellBit != "4" ||  goods.stor*1 <= 0){ //失效
										if(goods.priceType == "18"){
											goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\"> "+goodsName+" </a>";
										}else if(goods.priceType == "25"){
											goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\"> "+goodsName+" </a>";
										}else{
											goodsHtml += "<a href=\""+"javascript:void(0);"+"\" title=\""+goods.goodsName+"\"> "+goodsName+" </a>";
										}
									}else{
										goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\"> "+goodsName+" </a>";
									}
								}
								
								goodsHtml += "</div>";
								//预定
								if (goods.virtualSellFlag=="1") {
									goodsHtml += "<div class=\"icon-line\">";
									goodsHtml += "<i class=\"pre\">预定</i>";
									goodsHtml += "</div>";
								}
								goodsHtml += "<div class=\"message-line\">";
								goodsHtml += "</div>";
								goodsHtml += "</div>";
								goodsHtml += "<div class=\"type-box\">";
								if (goods.attrList != null) {
									var attrList = goods.attrList;
									for (var x = 0; x < attrList.length; x++) {""
										goodsHtml += "<div class=\"line\">"+attrList[x].name+"："+attrList[x].value+"</div>";
									}
								}
								goodsHtml += "</div>";
								if(goods.goodsType == 11){
									goodsHtml += "<div class=\"item-price-box\">&#165;"+(goods.showSalePrice).toFixed(2);
									if (goods.priceType == "6") {
									goodsHtml += "<del>&#165;"+(goods.originalPrice).toFixed(2)+"</del>";
									}
									goodsHtml += "<div class=\"icon\">";
									if (goods.priceType == "6") {
										goodsHtml += "<i class=\"orange\">闪购</i>";
									}else if (goods.priceType == "13") {
										goodsHtml += "<i class=\"red\">抢购</i>";
									}else if(goods.priceType == "15"){
										goodsHtml += "<i class=\"green\">直降</i>";
									}else if(goods.priceType == "16"){
										goodsHtml += "<i class=\"pomelo\">折扣</i>";
									}else if(goods.priceType == "20"){
										//goodsHtml += "<i class=\"\" style=\"background:"+goods.activityColor+"\">"+goods.activityTitle+"</i>";
										goodsHtml += "<i class=\"green\">直降</i>";
									}
									goodsHtml += "</div>";
									//降价标签
									if(goods.reduceTag == "1"){
										goodsHtml+="<div class=\"cart-depreciate\">"+"降价￥"+goods.reduceAmout;
										goodsHtml += "<div><i></i>商品比加入时便宜￥"+goods.reduceAmout+"</div>";
										goodsHtml += "</div>";
										}
									goodsHtml += "</div>";											
								}else{
									goodsHtml += "<div class=\"item-price-box\">";
									if(goods.type=="16"){
										goodsHtml += "<del>&#165;"+(goods.normalSalePrice?goods.normalSalePrice.toFixed(2):goods.normalSalePrice)+"</del>";
										goodsHtml += "<div class=\"price\">&#165;"+(goods.showSalePrice)+"</div>";
										goodsHtml += "<div class=\"icon\">";
										goodsHtml += "<i class=\"red\">换购价</i>";
									}else{
										if (goods.priceType == "6") {
										goodsHtml += "<del>&#165;"+(goods.originalPrice).toFixed(2)+"</del>";
										}
										goodsHtml += "<div class=\"price\">&#165;"+(goods.showSalePrice).toFixed(2)+"</div>";
										goodsHtml += "<div class=\"icon\">";
										if (goods.priceType == "6") {
											goodsHtml += "<i class=\"orange\">闪购</i>";
										}else if (goods.priceType == "13") {
											goodsHtml += "<i class=\"red\">抢购</i>";
										}else if(goods.priceType == "15"){
											goodsHtml += "<i class=\"green\">直降</i>";
										}else if(goods.priceType == "16"){
											goodsHtml += "<i class=\"pomelo\">折扣</i>";
										}else if(goods.priceType == "20"){
											//goodsHtml += "<i class=\"\" style=\"background:"+goods.activityColor+"\">"+goods.activityTitle+"</i>";
											goodsHtml += "<i class=\"green\">直降</i>";
										}
									}
									goodsHtml += "</div>";
									//降价标签
									if(goods.reduceTag == "1"){
										goodsHtml+="<div class=\"cart-depreciate\">"+"降价￥"+goods.reduceAmout;
										goodsHtml += "<div><i></i>商品比加入时便宜￥"+goods.reduceAmout+"</div>";
										goodsHtml += "</div>";
										}
									goodsHtml += "</div>";										
								}
								goodsHtml += "<div class=\"number-box\">";
								if(goods.type=="16"){
									goodsHtml +='<div style="text-align:center">'+goods.goodsNumber+'</div>';
								}else{
									if (goods.proSellBit == "4" &&goods.stor*1 > 0 ) {
										if(goods.priceType == "18"){
											goodsHtml += goods.goodsNumber;
										}else if(goods.priceType == "25"){
											goodsHtml += goods.goodsNumber;
										}
										else{
											goodsHtml += "<div class=\"input-line\">";
											if (goods.goodsNumber*1 ==1) {
												goodsHtml += "<em class=\"reduce disable\" >-</em> " ;
											}else{
	//											if(goodsGroupList[o].popDetails == null){
												if(goods.popDetails == null){
													goodsHtml += "<em class='reduce' id='reduce_"+pagegoid+"' onclick='downButton(this,2)'>-</em> " ;
												}else{
													goodsHtml += "<em class='reduce' id='reduce_"+pagegoid+"' onclick='downButton(this)'>-</em> " ;
												}
											}
	//										if(goodsGroupList[o].popDetails == null){
											if(goods.popDetails == null){
												goodsHtml +=	"<input class=\"text\" onchange=\"inputUpdata(this,2)\" type=\"text\" value=\""+goods.goodsNumber+"\" /> ";
											}else{
												goodsHtml +=	"<input class=\"text\" onchange=\"inputUpdata(this)\" type=\"text\" value=\""+goods.goodsNumber+"\" /> ";	
											}
											if (goods.goodsNumber*1>= 99) {
												goodsHtml +=	"<em class=\"add disable\" >+</em>";
											}else{
	//											if(goodsGroupList[o].popDetails == null){
												if(goods.popDetails == null){
													goodsHtml +=	"<em class='add' id='add_"+pagegoid+"' onclick='upButton(this,2)'>+</em>";
												}else{
													goodsHtml +=	"<em class='add' id='add_"+pagegoid+"' onclick='upButton(this)'>+</em>";
												}
											}
											goodsHtml += "</div>";
											if (goods.stor*1 <= 5  ) {
												goodsHtml += "<div class=\"error\">库存紧张</div>";
											}else if (goods.goodsNumber*1 >= goods.stor*1&&  goods.limitBuySum*1  == -1   ) {
												if (goods.stor*1 > 99 ) {
													goodsHtml += "<div class=\"error\">最多只能购买99件</div>";
												}else{
													goodsHtml += "<div class=\"error\">最多只能购买"+goods.stor+"件</div>";
												}
											}else if (goods.limitBuySum*1 <=goods.goodsNumber*1&&goods.limitBuySum*1 >0) {
												goodsHtml += "<div class=\"error\">最多只能购买"+goods.limitBuySum+"件</div>";
											}	
										}
									}else{
										goodsHtml += "";
									}
								}
								goodsHtml += "</div>";
								if(goods.goodsType == 11){
									goodsHtml += "<div class=\"price\">&#165;"+(goods.totalPrice).toFixed(2)+"</div>";
									goodsHtml += "<div class=\"double-line\">";
									if (goods.proSellBit == "4" ) {
										if (goods.goodsType == "15") {
											goodsHtml += "<a class=\"add-favourite\" href=\"javascript:void(0);\" onclick=\"\"></a> <br />";
										}else{
											goodsHtml += "<a class=\"add-favourite\" href=\"javascript:void(0);\" onclick=\"addFavorite(this)\">移入收藏夹</a> <br />";		
										}
									}
									if(goods.type=="16"){
										goodsHtml +="<a class='delete goodsid_"+pagegoid+"'' href='javascript:void(0);' onclick='removeGoods(this)'>删除</a>";
									}else{
										goodsHtml += "<a class=\"delete\" href=\"javascript:void(0);\" onclick=\"removeGoods(this)\">删除</a>";
									}
									goodsHtml += "</div>";
								}else{
									goodsHtml += "<div class=\"price-box\">";
									goodsHtml += "<div class=\"price\">&#165;"+(goods.totalPrice).toFixed(2)+"</div>";
									goodsHtml += "</div>";										
									goodsHtml += "<div class=\"action-box\">";
									if (goods.proSellBit == "4" ) {
										if (goods.goodsType == "15") {
											goodsHtml += "<a class=\"add-favourite\" href=\"javascript:void(0);\" onclick=\"\"></a> <br />";
										}else{
											goodsHtml += "<a class=\"add-favourite\" href=\"javascript:void(0);\" onclick=\"addFavorite(this)\">移入收藏夹</a> <br />";
										}
									}
									if(goods.type=="16"){
										goodsHtml +="<a class='delete goodsid_"+pagegoid+"'' href='javascript:void(0);' onclick='removeGoods(this)'>删除</a>";
									}else{
										goodsHtml += "<a class=\"delete\" href=\"javascript:void(0);\" onclick=\"removeGoods(this)\">删除</a>";
									}
									goodsHtml += "</div>";
								}
								goodsHtml += "</div>";
								/**组合商品子商品 start*/
								if( goods.subGoodsList !=null){
								for(var n =0;n < goods.subGoodsList.length;n++){
									var subGoods =goods.subGoodsList[n];
									goodsHtml += "<div class=\"cart-dl\">";
									goodsHtml += "<dl>";
									goodsHtml += "<dd>";
									goodsHtml += "<div class=\"left-div\">";
									goodsHtml += "<a href=\""+subGoods.goodsUrl+"\">";
									goodsHtml += "<img src=\""+subGoods.goodsPicUrl+"\">";
									goodsHtml += "</a>";
									goodsHtml += "</div>";
									goodsHtml += "<div class=\"pleft\">";
									goodsHtml += "<div class=\"cart-pleft\">";
//									if (goods.globalType == "8" ) {
//										goodsHtml += "<i class=\"global\"></i>";
//									}
									goodsHtml += "<a href=\""+subGoods.goodsUrl+"\">"+subGoods.goodsName+"</a>";
									goodsHtml += "</div>";
									goodsHtml += "<div class=\"cart-font\">";
									goodsHtml += "";
									if (subGoods.attrList != null) {
										var attrList = subGoods.attrList;
										for (var x = 0; x < attrList.length; x++) {
											goodsHtml += "<p>"+attrList[x].name+"："+attrList[x].value+"</p>";
										}
									}else{
										goodsHtml += "<p>&nbsp;</p>";
									}
									goodsHtml += "</div>";
									goodsHtml += "<div class=\"cart-int\">"+subGoods.goodsNumber+"件/套"+"</div>";
									goodsHtml += "</div>";
									goodsHtml += "</dd>";
									goodsHtml += "</dl>";
									goodsHtml += "</div>";
//									console.info(subGoods);
								}
						}	
								/**组合商品子商品 end*/								
								
								goodsHtml += "</div>";
								if (goods.giftInfoList != null) {
									var giftHtml = "";
									giftHtml += "<div class=\"gift-line\">";
									for (var gift = 0; gift < goods.giftInfoList.length; gift++) {
										var giftInfo = goods.giftInfoList[gift];
										if (gift+1 == goods.giftInfoList.length) {
											if(giftInfo.goodsNumber >0){
												giftHtml += "<a target=\"blank\" href=\""+giftInfo.gifGoods.goodsUrl+"?ig=1"+"\" title=\""+giftInfo.gifGoods.goodsName+"\">【赠品】 "+giftInfo.gifGoods.goodsName+" </a> ×"+giftInfo.goodsNumber;	
											}
										}else{
											if(giftInfo.goodsNumber >0){
												giftHtml += "<a target=\"blank\" href=\""+giftInfo.gifGoods.goodsUrl+"?ig=1"+"\" title=\""+giftInfo.gifGoods.goodsName+"\">【赠品】 "+giftInfo.gifGoods.goodsName+" </a> ×"+giftInfo.goodsNumber+"<br /> ";
											}
										}
									}
									giftHtml += "</div>";
									goodsHtml += giftHtml;
								}
								
								if(goods.seleGiftList !=null){
									var giftHtml = "";
									giftHtml += "<div class=\"gift-line\">";
									for(var k =0 ;k<goods.seleGiftList.length;k++){
										var mzData =goods.seleGiftList[k];
										if(mzData.stor*1 > 0 && mzData.goodsNumber*1 > 0){
											if(mzData.checked){
												giftHtml += "【赠品】 "+mzData.goodsName+""+"x"+mzData.goodsNumber+"<br>";
											}
										}
									}
									giftHtml += "</div>";
									goodsHtml += giftHtml;
								}
								/********活动********/
								var mzpopDesc="";
								var mzMaxQty="";
								var popRuleId ="";
								if (goods.popDetails != null && !(goods.proSellBit != "4" ||  goods.stor*1 <= 0)) {
									for (var pop = 0; pop < goods.popDetails.length; pop++) {
										var popList = goods.popDetails[pop];
											if (popList.popType  == "2"|| popList.popType  == "4"||popList.popType == "6") {
												goodsHtml += "<div class=\"active-line active-line-bottom\">";
												goodsHtml += "<div class=\"message\">";
												if (popList.popType  == "2") {
													goodsHtml +="【参与折扣】";
												}else if(popList.popType  == "4"){
													goodsHtml +="【参与满返】";
												}else if(popList.popType == "6"){
													goodsHtml +="【参与满赠】";
												}
												goodsHtml += "<a class=\"name\" href=\"javascript:void(0);\" title=\"\">"+popList.popDesc+"</a>";
												if(popList.isMatch == true){
													if(popList.popType  == "4"){
														goodsHtml += " 可享受优惠";
//														goodsHtml +=" <a href=\""+domain.search+"/fr/"+popList.activityId+".html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
														goodsHtml +=" <a href=\""+domain.search+"/fr/0.html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
													}else if(popList.popType  == "2"){
														goodsHtml += " 已优惠"+goodsGroupList[o].showOrderDiscount+"元";
//														goodsHtml +=" <a href=\""+domain.search+"/fr/"+popList.activityId+".html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
														goodsHtml +=" <a href=\""+domain.search+"/fr/0.html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
													}else if(popList.popType  == "6"){
														goodsHtml += " 可领取赠品";
													}
												}else{
													goodsHtml += " 未满足促销条件";
													if(popList.popType  != "6"){
//														goodsHtml +=" <a href=\""+domain.search+"/fr/"+popList.activityId+".html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">去凑单 ></a>";
														goodsHtml +=" <a href=\""+domain.search+"/fr/0.html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">去凑单 ></a>";
													}
												}
												
												 if(popList.popType == "6" && goods.seleGiftList !=null){
														goodsHtml += "<a class=\"change\" onclick=\"selMz(this)\" href=\"javascript:void(0);\">选赠品</a>";
														 }
												goodsHtml += "<input type = \"hidden\" class=\"popRuleId\" name=\"popRuleId\" value =\""+popList.popRuleId+"\" >";
												goodsHtml += "<input type = \"hidden\" class=\"mzpopDesc\" name=\"mzpopDesc\" value =\""+popList.popDesc+"\" >";
												goodsHtml += "<input type = \"hidden\" class=\"mzMaxQty\" name=\"mzMaxQty\" value =\""+popList.maxQty+"\" >";
												goodsHtml += "<input type = \"hidden\" class=\"mzpopDesc\" name=\"mzMoneyCondition\" value =\""+popList.moneyCondition+"\" >";
												goodsHtml += "<input type = \"hidden\" class=\"mzpopDesc\" name=\"mzQtyCondition\" value =\""+popList.qtyCondition+"\" >";
												 mzpopDesc=popList.popDesc;
												 mzMaxQty=popList.maxQty;
												 popRuleId=popList.popRuleId;
												goodsHtml += "</div>";
												goodsHtml += "</div>";
											}
									}
								   }
								
								/***mz*/
								if(goods.seleGiftList !=null){
									var mzGoodsHtml = "";
									var mzGoods="";
									mzGoodsHtml+="<div class=\"cardCss\" style=\"display: none;\">";
									mzGoodsHtml+="<ul>";
									mzGoodsHtml+="<li>";
									mzGoodsHtml+="<div class=\"item-title item-focus\">";
									mzGoodsHtml+="<span>【满赠】 "+mzpopDesc+"<em>已选<i class=\"mzPopNum\">0</i>件，最多可选"+mzMaxQty+"件</em></span>"
									mzGoodsHtml+="<a class=\"closes\" href=\"javascript:void(0);\" style=\"display: block;\">×</a>";		
									mzGoodsHtml+="</div>";
									mzGoodsHtml+="<div class=\"card-flex\">";
									mzGoodsHtml+="<ul class=\"slides\">";
									for(var mzNum =0 ;mzNum<goods.seleGiftList.length;mzNum++){
										var mzHtml = "";
										var mzData =goods.seleGiftList[mzNum];
//										mzGoodsHtml += "<input type = \"hidden\" class=\"check\" name=\"check\" value =\""+mzData.check+"\" >";
//										mzGoodsHtml += "<input type = \"hidden\" class=\"promotionMark\" name=\"promotionMark\" value =\""+mzData.promotionMark+"\" >";		
//										goodsHtml += "<input type = \"hidden\" class=\"mzpopDesc\" name=\"mzpopDesc\" value =\""+popList.popDesc+"\" >";
//										goodsHtml += "<input type = \"hidden\" class=\"mzpopDesc\" name=\"mzpopDesc\" value =\""+popList.popDesc+"\" >";
//										goodsHtml += "<input type = \"hidden\" class=\"mzpopDesc\" name=\"mzpopDesc\" value =\""+popList.popDesc+"\" >";

										if(goods.seleGiftList.length>5){
											mzGoods+="<div class=\"item\">";
											mzGoods+="<a href=\""+mzData.goodsUrl+"?ig=1"+"\" title=\"\"><img src=\""+mzData.goodsPicUrl+"\"></a>";
											mzGoods += "<input type = \"hidden\" id=\"mzMaxQty\" class=\"mzMaxQty\" name=\"mzMaxQty\" value =\""+mzMaxQty+"\" >";
											mzGoods += "<input type = \"hidden\" id=\"checked\" class=\"mzGoods\" name=\"checked\" value =\""+mzData.checked+"\" >";
											mzGoods += "<input type = \"hidden\" id=\"mzgoodsId\" class=\"mzGoods\" name=\"goodsId\" value =\""+mzData.goodsId+"\" >";		
											mzGoods += "<input type = \"hidden\" id=\"goodsLineNbr\"  class=\"goodsLineNbr\" value =\""+goods.goodsLineNbr+"\" >";
											mzGoods += "<input type = \"hidden\" id=\"goodsId\"  class=\"goodsId\"  value =\""+goods.goodsId+"\" >";
											mzGoods += "<input type = \"hidden\"  class=\"popRuleId\"  value =\""+popRuleId+"\" >";
											if(mzData.stor*1 > 0 && mzData.goodsNumber*1 > 0 ){
												if(mzData.checked){
													mzGoods+="<i  class=\"card-checked\" onclick=\"upMzButt(this)\"></i>";
												}else{
													mzGoods+="<i  class=\"card-normal\" onclick=\"upMzButt(this)\"></i>";
												}
											}else{
												mzGoods+="<i  class=\"card-disabled\"></i>";
											}
											mzGoods+=" <div class=\"name\">";
											mzGoods+="<a target=\"blank\" href=\""+mzData.goodsUrl+"?ig=1"+"\" title=\"\">"+mzData.goodsName+"</a>";
											mzGoods+="</div>";
//											mzHtml+=" <div class=\"price\">¥400.00</div>";
//											mzHtml+=" <div class=\"number\">x1</div>";
											mzGoods+="</div>";	
											if (mzNum == 4) {
												mzHtml = "<li>"+mzGoods+"</li>";
												mzGoods = "";
											}else if((mzNum+1)%5 == 0 || (mzNum+1)-goods.seleGiftList.length==0){
												mzHtml = "<li >"+mzGoods+"</li>";
												mzGoods = "";
											}
										}else{
											mzGoods+="<div class=\"item\">";
											mzGoods+="<a href=\""+mzData.goodsUrl+"?ig=1"+"\" title=\"\"><img src=\""+mzData.goodsPicUrl+"\"></a>";
											mzGoods += "<input type = \"hidden\" id=\"mzMaxQty\" class=\"mzMaxQty\" name=\"mzMaxQty\" value =\""+mzMaxQty+"\" >";
											mzGoods += "<input type = \"hidden\" id=\"checked\" class=\"mzGoods\" name=\"checked\" value =\""+mzData.checked+"\" >";
											mzGoods += "<input type = \"hidden\" id=\"mzgoodsId\" class=\"mzGoods\" name=\"goodsId\" value =\""+mzData.goodsId+"\" >";		
											mzGoods += "<input type = \"hidden\" id=\"goodsLineNbr\"  class=\"goodsLineNbr\" value =\""+goods.goodsLineNbr+"\" >";
											mzGoods += "<input type = \"hidden\" id=\"goodsId\"  class=\"goodsId\"  value =\""+goods.goodsId+"\" >";
											mzGoods += "<input type = \"hidden\"  class=\"popRuleId\"  value =\""+popRuleId+"\" >";
											if(mzData.stor*1 > 0 && mzData.goodsNumber*1 > 0 ){
												if(mzData.checked){
													mzGoods+="<i  class=\"card-checked\" onclick=\"upMzButt(this)\"></i>";
												}else{
													mzGoods+="<i  class=\"card-normal\" onclick=\"upMzButt(this)\"></i>";
												}
											}else{
												mzGoods+="<i  class=\"card-disabled\"></i>";
											}
											mzGoods+=" <div class=\"name\">";
											mzGoods+="<a target=\"blank\" href=\""+mzData.goodsUrl+"?ig=1"+"\" title=\"\">"+mzData.goodsName+"</a>";
											mzGoods+="</div>";
//											mzHtml+=" <div class=\"price\">¥400.00</div>";
//											mzHtml+=" <div class=\"number\">x1</div>";
											mzGoods+="</div>";	
											if ((mzNum+1)-goods.seleGiftList.length==0) {
												mzHtml = "<li>"+mzGoods+"</li>";
												mzGoods = "";
											}
										}
										
										mzGoodsHtml +=	mzHtml;
									
									}
									mzGoodsHtml+="</ul>";
									mzGoodsHtml+="</div>";
									mzGoodsHtml+="</li>";
									mzGoodsHtml+="</ul>";
									mzGoodsHtml+="</div>";
									goodsHtml += mzGoodsHtml;									
								}
								/****************mz******************/
								goodsHtml += "</li>";
						}
						groupDto += goodsHtml;
					}
					if (isLK||isMJ || isXY||isMLJ) {
						var hdHtml = "";
						if (isLK) {
							if (goodsGroupList[o].dissatisfy == "true") {
								if (goodsGroupList[o].checked == true) {
									hdHtml += "<li class=\"disable border-first\">";
								}else{
									hdHtml += "<li class=\"disable border-first\">";
								}
							}else{
								if (goodsGroupList[o].checked == true) {
									hdHtml += "<li class=\"select border-first\">";
								}else{
									hdHtml += "<li class=\"border-first\">";
								}
							}
						}else{
							if (goodsGroupList[o].checked == true) {
								hdHtml += "<li class=\"select border-first\">";
							}else{
								hdHtml += "<li class=\"border-first\">";
							}
						}
						hdHtml += "<div class=\"active-line\">";
						if (isMJ || isXY||isMLJ) {
							hdHtml += "<div class=\"point\">•</div>";
						}else{
							hdHtml += "<div class=\"chk\" onclick=\"clickLK(this)\"></div>";
						}
						hdHtml += "<div class=\"message\">";
						if (isLK) {
							if (goodsGroupList[o].groupName !=null) {
								hdHtml += "【"+goodsGroupList[o].groupName+"】"+goodsGroupList[o].groupDes+" <a href=\""+domain.order+"/selectbasket.html?basketId="+goodsGroupList[o].rule+"&type=1\" class=\"link\">查看篮筐详情 ></a>";
							}else{
								hdHtml += "【精品篮筐】"+goodsGroupList[o].groupDes+" <a href=\""+domain.order+"/selectbasket.html?basketId="+goodsGroupList[o].rule+"&type=1\" class=\"link\">查看篮筐详情 ></a>";
							}
						}else if(isMJ){
							//满减优惠类型，1是减金额，2是折扣金额
							var promotionDiscountType = goodsGroupList[o].promotionDiscountType;
							//满减门槛类型，1是门槛金额，2是门槛件数
							var promotionConditionType = goodsGroupList[o].promotionConditionType;
							//上一级门槛金额
							var promotionLimit = goodsGroupList[o].promotionLimit;
							//上一级门槛可优惠金额
							var promotionDiscount = goodsGroupList[o].promotionDiscount;
							if(promotionDiscountType == "2"){
								hdHtml += "【满折】";
							}else if(promotionDiscountType == "1"){
								hdHtml += "【满减】";
							}
							hdHtml += goodsGroupList[o].groupDes;
							var groupId = goodsGroupList[o].groupId;
							var popRuleId = goodsGroupList[o].popRuleId;
							var ids=groupId.split("-");
							var promotionMsg ="";
							//是否满足促销条件=0,满足显示已优惠X元
		                    var promotionConditionAmount = goodsGroupList[o].promotionConditionAmount;
							if(promotionConditionAmount > 0){
								if ("1"==promotionConditionType && "1"==promotionDiscountType) {
									 //门槛金额+减金额
									promotionMsg = "再购" + promotionLimit + "元，优惠" + promotionDiscount + "元";
								} else if ("1"==promotionConditionType && "2"==promotionDiscountType) {
									//门槛金额+折扣金额
									promotionMsg = "再购" + promotionLimit + "元，享" + Number(promotionDiscount)*10 + "折";
								} else if ("2"==promotionConditionType && "1"==promotionDiscountType) {
									//门槛件数+减金额
									promotionMsg = "再购" + promotionLimit + "件，优惠" + promotionDiscount + "元";
								} else if ("2"==promotionConditionType && "2"==promotionDiscountType) {
									//门槛件数+折扣金额
									promotionMsg = "再购" + promotionLimit + "件，享" + Number(promotionDiscount)*10 + "折";
								}
							}else{
								promotionMsg = "已优惠" + (goodsGroupList[o].showOrderDiscount).toFixed(2) + "元";
							}
							
							var checked = goodsGroupList[o].checked;
							if(checked){
								hdHtml += "&nbsp;"+promotionMsg;
							}
                            if(goodsGroupList[o].isGroupPop == "1"){
                                hdHtml += "&nbsp;可跨组";
                            }
							if(goodsGroupList[o].showOrderDiscount*1 == 0){
								hdHtml +="&nbsp;<a href=\""+domain.search+"/fr/0.html?rn="+popRuleId+"&atp=1\" class=\"link\">去凑单 ></a>";
							}else if(goodsGroupList[o].showOrderDiscount*1 > 0){
								hdHtml +="&nbsp;<a href=\""+domain.search+"/fr/0.html?rn="+popRuleId+"&atp=1\" class=\"link\">查看活动 ></a>";
							}
							//isCrossShoppeSupport为1是同规则，为0是非同规则
							/*if(goodsGroupList[o].isCrossShoppeSupport == "1"){
								if(goodsGroupList[o].showOrderDiscount*1 == 0){
									//当已优惠金额=0时，显示“还差X元，可立减Y元”
									hdHtml +=" 还差"+(goodsGroupList[o].promotionLimit*1).toFixed(2) + "元，可立减"+(goodsGroupList[o].promotionDiscount*1).toFixed(2)+"元&nbsp;<a href=\""+domain.search+"/fr/0.html?rn="+ids[0]+"&atp=1\" class=\"link\">去凑单 ></a>";
								}
								if(goodsGroupList[o].showOrderDiscount*1 > 0 && goodsGroupList[o].promotionLimit*1 > 0){
									//当已优惠金额>0，门槛差额>0，显示“已优惠B元，再买X元，可立减Y元”
									//hdHtml +=" 已优惠"+(goodsGroupList[o].orderDiscount*1).toFixed(2)+"元，再买"+(goodsGroupList[o].promotionLimit*1).toFixed(2) + "元，可立减"+(goodsGroupList[o].promotionConditionAmount*1).toFixed(2)+"元&nbsp;<a href=\""+domain.search+"/fr/0.html?rn="+ids[0]+"&atp=1\" class=\"link\">去凑单 ></a>";
									hdHtml +=" 已优惠"+(goodsGroupList[o].showOrderDiscount*1).toFixed(2)+"元&nbsp;<a href=\""+domain.search+"/fr/0.html?rn="+ids[0]+"&atp=1\" class=\"link\">查看活动 ></a>";
								}
								if(goodsGroupList[o].showOrderDiscount*1 > 0 && goodsGroupList[o].promotionLimit*1 == 0){
									//当已优惠金额>0，门槛差额为空或者等于0，显示“已优惠B元”
									hdHtml +=" 已优惠"+(goodsGroupList[o].showOrderDiscount*1).toFixed(2)+"元&nbsp;<a href=\""+domain.search+"/fr/0.html?rn="+ids[0]+"&atp=1\" class=\"link\">查看活动 ></a>";
								}
							}else{
								if(goodsGroupList[o].showOrderDiscount*1 == 0){
									//当已优惠金额=0时，显示“未满足促销条件”
									hdHtml +=" 未满足促销条件&nbsp;<a href=\""+domain.search+"/fr/0.html?rn="+ids[0]+"&atp=1\" class=\"link\">去凑单 ></a>";
								}
								if(goodsGroupList[o].showOrderDiscount*1 > 0){
									//当已优惠金额>0时，显示“已优惠B元”
									hdHtml +=" 已优惠"+(goodsGroupList[o].showOrderDiscount*1).toFixed(2)+"元&nbsp;<a href=\""+domain.search+"/fr/0.html?rn="+ids[0]+"&atp=1\" class=\"link\">查看活动 ></a>";
								}
								
							}*/
						}else if(isXY){
							hdHtml +="【N元任选】"+ goodsGroupList[o].groupDes;
							var groupId = goodsGroupList[o].groupId;
							var popRuleId = goodsGroupList[o].popRuleId;
							var ids=groupId.split("-");
							//popType 促销类型  isMatch 是否满足  只有满减才显示去凑单
							if(goodsGroupList[o].fitXy == "1"){
								hdHtml +=" <a target=\"blank\" href=\""+domain.search+"/fr/0.html?rn="+popRuleId+"&atp=7\" class=\"link\">查看活动 ></a>";
							}else{
                                if(goodsGroupList[o].xyMakeUpCount){
                                    hdHtml +="&nbsp;&nbsp;还差"+goodsGroupList[o].xyMakeUpCount+"件即可享受优惠";
                                }
								hdHtml +=" <a target=\"blank\" href=\""+domain.search+"/fr/0.html?rn="+popRuleId+"&atp=7\" class=\"link\">去凑单 ></a>";
							}
						}else if(isMLJ){
							hdHtml +="【参与买立减】"+ goodsGroupList[o].groupDes;
							var groupId = goodsGroupList[o].groupId;
							var ids=groupId.split("-");
							//isCrossShoppeSupport为1是同规则，为0是非同规则
							if(goodsGroupList[o].isCrossShoppeSupport == "1"){
								if(goodsGroupList[o].showOrderDiscount*1 == 0){
									//当已优惠金额=0时，显示“去凑单”
									hdHtml +="未满足促销条件&nbsp;<a href=\""+domain.search+"/fr/0.html?rn="+popRuleId+"&atp=12\" class=\"link\">去凑单 ></a>";
								}
								if(goodsGroupList[o].showOrderDiscount*1 > 0){
									//当已优惠金额>0，门槛差额>0，显示“已优惠B元，查看活动”
									hdHtml +=" 已优惠"+(goodsGroupList[o].showOrderDiscount*1).toFixed(2)+"元&nbsp;<a href=\""+domain.search+"/fr/0.html?rn="+popRuleId+"&atp=12\" class=\"link\">查看活动 ></a>";
								}
							}else{
								if(goodsGroupList[o].showOrderDiscount*1 == 0){
									//当已优惠金额=0时，显示“未满足促销条件”
									hdHtml +=" 未满足促销条件&nbsp;<a href=\""+domain.search+"/fr/0.html?rn="+popRuleId+"&atp=12\" class=\"link\">去凑单 ></a>";
								}
								if(goodsGroupList[o].showOrderDiscount*1 > 0){
									//当已优惠金额>0时，显示“已优惠B元”
									hdHtml +=" 已优惠"+(goodsGroupList[o].showOrderDiscount*1).toFixed(2)+"元&nbsp;<a href=\""+domain.search+"/fr/0.html?rn="+popRuleId+"&atp=12\" class=\"link\">查看活动 ></a>";
								}
								
							}
						}else{
							hdHtml += goodsGroupList[o].groupDes;
						}
						hdHtml += "</div>";
						hdHtml += "<div class=\"item-price\"></div>";
						if (isMJ||isMLJ) {
							hdHtml +="<div class=\"else-message\">";
							hdHtml +="￥"+(goodsGroupList[o].showOrderAmount).toFixed(2)+"元 减：";
							hdHtml +="<span class=\"red\">￥"+(goodsGroupList[o].showOrderDiscount).toFixed(2)+"</span>";
							hdHtml +="</div>";
						}
						if (isLK) {
						hdHtml += "<div class=\"number-box\"></div>";
						hdHtml += "<div class=\"price\">&#165;"+(goodsGroupList[o].orderPay).toFixed(2)+"</div>";
						hdHtml += "<div class=\"double-line\">";
						hdHtml += "<a class=\"delete\" href=\"javascript:void(0);\"  onclick=\"removeLK(this)\">删除</a>";
						hdHtml += "</div>";
						}
						hdHtml += "</div>"+groupDto;
						hdHtml +="</li>";
						groupDto = hdHtml;
					}
					groupDtoHtml +=groupDto;
				}
				var emHtml = "";
				emHtml += "<div class=\"cart-table-name\">";
				if (goodsGroupDtoList[i].checked) {
					if (goodsGroupDtoList[i].groupType == "5" ||goodsGroupDtoList[i].groupType == "6") {
						emHtml += "<label id=\"global\" class=\"chk-line global-list select\">";
					}else if (goodsGroupDtoList[i].groupType == "10") {
						emHtml += "<label id=\"global\" class=\"chk-line stk-list select\">";
					}else if(goodsGroupDtoList[i].groupType == "12"){
						emHtml += "<label id=\"global\" class=\"chk-line blk-list select\">";
					}else{
						emHtml += "<label id=\"zu\" class=\"chk-line select\">";
					}
				}else{
					if (goodsGroupDtoList[i].groupType == "5" ||goodsGroupDtoList[i].groupType == "6") {
						emHtml += "<label id=\"global\" class=\"chk-line global-list\">";
					}else if (goodsGroupDtoList[i].groupType == "10") {
						emHtml += "<label class=\"chk-line stk-list\">";
					}else if(goodsGroupDtoList[i].groupType == "12"){
						emHtml += "<label id=\"global\" class=\"chk-line blk-list\">";
					}else{
						emHtml += "<label class=\"chk-line\">";
					}
				}
				emHtml += "<div class='chk goodsid_"+pagegoid+"' onclick='checkBox(this)'></div>";
				if (goodsGroupDtoList[i].groupType == "5") {
					//emHtml +=" <i class=\"global\"></i>";
				}else	if (goodsGroupDtoList[i].groupType == "6") {
					//emHtml +=" <i class=\"global\"></i>";
				}else if(goodsGroupDtoList[i].groupType == "9"){
					emHtml +=" <i class=\"card\"></i>";
				}else if(goodsGroupDtoList[i].groupType == "10"){
					emHtml +=" <i class=\"card\"></i>";
				}else if(goodsGroupDtoList[i].groupType == "12"){
					emHtml +=" <i class=\"card\"></i>";
				}else if(goodsGroupDtoList[i].groupType == "7"){
					emHtml +=" <i class=\"shop\"></i> ";
				}else{
					emHtml +=" <i class=\"bl\"></i>";
				}
				if(goodsGroupDtoList[i].groupType==20){
					emHtml +=" <span class=\"name\">失效商品</span>";
				}else{
					emHtml +=" <span class=\"name\">"+goodsGroupDtoList[i].merchantName+"</span>";
				}
				emHtml += "</label>";
				/**-----免运费--start---*/
				/*emHtml += "<div class=\"package-message\">";
				emHtml += "<div class=\"package-price\">";	
					emHtml +="<input class=\"freightLessPrice\" value=\""+goodsGroupDtoList[i].freightLessPrice+"\"  type=\"hidden\">";
					emHtml +="<input class=\"freightLessWeight\" value=\""+goodsGroupDtoList[i].freightLessWeight+"\"  type=\"hidden\">";
					emHtml +="<input class=\"freightTemplateId\" value=\""+goodsGroupDtoList[i].freightTemplateId+"\"  type=\"hidden\">";
					emHtml +="<input class=\"oringinDeliveryCharge\" value=\""+goodsGroupDtoList[i].oringinDeliveryCharge+"\"  type=\"hidden\">";
					emHtml +="<input class=\"freightRuleDesc\" value=\""+goodsGroupDtoList[i].freightRuleDesc+"\"  type=\"hidden\">";
					if(goodsGroupDtoList[i].totalcheckedGoodsAmount > 0){
						if(goodsGroupDtoList[i].deliveryCharge == 0){
							//emHtml += "<div class=\"price\">运费:已免邮</div>";
						}else{
							emHtml += "<div class=\"price\">运费:¥"+goodsGroupDtoList[i].deliveryCharge+"</div>";
						}	
					}
						emHtml += "<div class=\"package-list\">";
						 if(goodsGroupDtoList[i].freightRuleDesc != null){
							 emHtml += ""+goodsGroupDtoList[i].freightRuleDesc+""; 
						 }
							emHtml +="<a href=\""+domain.help+"/toHelpCenter/queryCategoryId.html?categoryId=262&&categoryType=help\" class=\"link\" target=\"blank\">全部运费规则&gt;</a>";
						emHtml +="</div>";
				emHtml +="</div>";
				if(goodsGroupDtoList[i].totalcheckedGoodsAmount > 0){
					if(goodsGroupDtoList[i].deliveryCharge > 0){
				emHtml +="<a href=\"javascript:void(0);\" class=\"package-link\" onclick=\"MakeSingle(this)\">免运费凑单&gt;</a>";
					}
				}
		   emHtml +="</div>";*/
			/**-----免运费--end---*/
				
				emHtml += "</div>";
				htmlList += emHtml+ "<ul class=\"cart-table-list\"><input type = \"hidden\" id=\"orderPay\" name=\"orderPay\" value =\""+goodsGroupDtoList[i].orderPay+"\" ><input type = \"hidden\" id=\"orderAmount\" name=\"orderAmount\" value =\""+goodsGroupDtoList[i].orderAmount+"\" ><input type = \"hidden\" id=\"showOrderAmount\" name=\"showOrderAmount\" value =\""+data.showOrderAmount+"\" ><input type = \"hidden\" id=\"orderPay1\" name=\"orderPay\" value =\""+data.orderPay+"\" >"+groupDtoHtml+"</ul>"	
			}

			$(".cart-head").after(htmlList);
			iscalcCart = true;

			
			covercd.showcdbtn(freight); //更新凑单按钮
			
			var freightmin = [];
			for(var i=0;i<freight.length;i++){
				var obj = {};
				for(var j in freight[i]){
					//if(freight[i][j].deliveryCharge!=0){
						obj[j] = freight[i][j];
					//}
				}
				freightmin.push(obj)
			}
			covercd.allbox = freightmin;
			//console.log('come_前',covercd.nowbox)
			//更新包裹
			if(!$("#package-add-1").is(":hidden")){
					var bosti = [];
					for(var i=0;i<$(".boxtab_d").length;i++){
						bosti.push($(".boxtab_d").eq(i).attr("_pid_tid"));
						//console.log('兄弟',bosti[i])
					}

					if(covercd.rendertab){  //批量取消选择
						covercd.rendertab = false;
						
						if($(".boxtab_d").length==1){  //如果是最后一个分包
							
							$('#pop-close').click();
							covercd.rendertab = false;
							covercd.rendertab1 = false;
						}else{
							//console.log('come_多前',covercd.nowbox)
							//alert('批量')
							//console.log(covercd.nowbox,'批量前')
							for(var i=0;i<covercd.allbox.length;i++){
								var arrbox_i = Object.keys(covercd.allbox[i]).map(function (key) { return covercd.allbox[i][key]; });
								//console.log(arrbox_i,'ininiinin');
								for(var j=0;j<arrbox_i.length;j++){
									if(arrbox_i[j]['isMergeTemplete']=="0"){
										var vpt = arrbox_i[j]['freightTemplateId']+"_"+arrbox_i[j]['packageId'];
									}else{
										var vpt = arrbox_i[j]['freightTemplateId'];
									}

									//console.log(vpt,covercd.rendertabn,'tttttt')
									/*if( vpt == covercd.onetag || vpt == covercd.rendertabn ){
										covercd.nowbox = arrbox_i;

										//console.log(arrbox_i,'tttttt22222')
									}	*/
									//console.log(vpt,'批量中0',bosti,arrbox_i)
									if(bosti.indexOf(vpt)>=0){
										covercd.nowbox = arrbox_i;
										break;
										//console.log(covercd.nowbox,'批量中',bosti)
									}
								}
							}
							//covercd.onetag = covercd.rendertabn;
							//console.log('come_多后',covercd.nowbox)
							//alert('批量取消');
							//console.log(covercd.nowbox,'批量后')
							covercd.getCovinfo();

						}
					}else{
						//console.log("covercd.rendertab",covercd.rendertab)
					}
					if(covercd.rendertab1){  //单勾选

						//console.log(covercd.allbox)
						for(var i=0;i<covercd.allbox.length;i++){
							var arrbox_i = Object.keys(covercd.allbox[i]).map(function (key) { return covercd.allbox[i][key]; });
							//console.log(arrbox_i,'ininiinin');
							/*if(arrbox_i.length<=0){
								//alert('jjh')
								covercd.getCovinfo();
								return false;
							}*/
							for(var j=0;j<arrbox_i.length;j++){
								if(arrbox_i[j]['isMergeTemplete']=="0"){
									//alert('dddd')
									var vpt = arrbox_i[j]['freightTemplateId']+"_"+arrbox_i[j]['packageId'];
								}else{
									var vpt = arrbox_i[j]['freightTemplateId'];
								}
								//console.log(vpt,covercd.onetag,'kakakaak')
								//console.log(vpt,covercd.rendertabn,'tttttt')
								/*if( vpt == covercd.onetag || vpt == covercd.rendertabn){
									
									covercd.nowbox = arrbox_i;
									//console.log(arrbox_i,'tttttt22222')
								}*/	
								if(bosti.indexOf(vpt)>=0){
									covercd.nowbox = arrbox_i;
								}

							}
						}
						//console.log('come_单后',covercd.nowbox)
						
						covercd.getCovinfo();
					}else{
						
					}
			}

			//免运费去凑单 start
			$('.address-list .line a').poshytip({
				content:$(this).attr("title"),
				className: 'tip-yellow',
				alignTo: 'target',
				alignX: 'center',
				alignY:'bottom',
				showOn:	'hover',
				offsetX: 0,
				offsetY: 10,
				showTimeout: 100
			});
			//免运费去凑单 end
			
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
			$('.global-list').poshytip('show');
			$('.stk-list').poshytip({
				content:'百联卡（实体）单笔购卡金额最高不能超过 <span class="tip-red-txt tip-bold-txt">￥10000.00</span>',
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
			$('.stk-list').poshytip('show');
		
			$('.blk-list').poshytip({
				content:'百联卡（电子）单笔购卡金额最高不能超过 <span class="tip-red-txt tip-bold-txt">￥10000.00</span>',
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
		$('.blk-list').poshytip('show');

			if ($(".pay-form").val() != undefined) {
		    	  $(".pay-form .item-show").toggle(function(){
		      		$(this).find("i").removeClass("up").addClass("down");
		      		$(".pay-form .item-flex").stop().animate({height:"270px"});
		      	},function(){
		      		$(this).find("i").removeClass("down").addClass("up");
		      		$(".pay-form .item-flex").stop().animate({height:"0"});
		      	});
		      	 $(".item-flex a.close").click(function(){
		      	 	$(".pay-form .item-show").click();
		      	});
		      	var t = $(".cart-table").offset().top+$(".cart-table").height();
		  		//alert(t);
		  		window.onscroll = function() {
		  			var u = $(this).scrollTop()+$(window).height();
		  			if (u >= t) {
		  				$(".pay-form").removeClass("pay-form-fix");	
		  			} else {
		  				$(".pay-form").addClass("pay-form-fix");				
		  			}
		  		}
			}
		}
	});
		buttonToPay();
}

/************mz**************/
function selMz(str){
	$(".pay-form .cart-purchase").remove();
	if($(str).parents().parents("li").find(".cardCss").length>0){
		var checkNum = 0; 
		$(str).parents().parents("li").find(".cardCss").find(".card-checked").each(function(){
			checkNum +=1;  
		   }); 
		$(str).parents().parents("li").find(".cardCss").find(".mzPopNum").html(checkNum);
		
		var mzCardHtml="";
		mzCardHtml+="<div class=\"cart-purchase\">";
		mzCardHtml+=$(str).parents().parents("li").find(".cardCss").html();
		mzCardHtml+="</div>";
		$(".pay-line").before(mzCardHtml);
		var L=$(".pay-form .cart-purchase ").children('ul').children('li').size(),height=240;
		   if(L>0){
		   	height+=(40*L)
		   };
		$(".pay-form .cart-purchase").stop().animate({height:height+"px"});		
		
		$(".pay-form .cart-purchase a.closes").click(function() {
			$(".pay-form .cart-purchase").stop().animate({height:"0"});
			$(".pay-form .cart-purchase").remove();
		});
	}
	$(".card-flex").flexslider({controlNav: false});
}

function  upMzButt(str){
	var mzMaxQty =$(str).siblings(".mzMaxQty").val();
	var mzPopNum = parseInt($(str).parents(".cart-purchase").find(".mzPopNum").html());
	if(mzMaxQty > 1){
		if($(str).hasClass('card-normal')){
			if(mzPopNum < mzMaxQty){
				$(str).attr("class","card-checked");
				$(str).parents(".item").find("[id=checked]").val("true");
				var data = updataMz(str);
				if(data.resultCode == "00100000"){
					$(".mzPopNum").html(mzPopNum+=1);
				}else{
					$(str).attr("class","card-normal");
					$(".mzPopNum").html(mzPopNum);
				}
//				$("#deletenull-message").find("div.name").html("更新赠品成功");
//				$("#deletenull-message").popbox({title:'提示'});
			}else{
				$(str).poshytip('show').poshytip('hideDelayed', 1000);
				$(".mzPopNum").html(mzPopNum);
				$("#deletenull-message").find("div.name").html(data.resultMsg);
				$("#deletenull-message").popbox({title:'提示'});
			}
		}else if($(str).hasClass('card-checked')){
			$(str).attr("class","card-normal");
			$(str).parents(".item").find("[id=checked]").val("false"); 
			var data = updataMz(str);
			if(data.resultCode == "00100000"){
				if(mzPopNum > 0){
					$(".mzPopNum").html(--mzPopNum);				
				}else{
					$(".mzPopNum").html("0");
				}
			}else{
//				$(str).attr("class","card-checked");
//				meg = data.resultMsg;
//				$(str).poshytip('show').poshytip('hideDelayed', 1000);
				if(mzPopNum > 0){
					$(".mzPopNum").html(--mzPopNum);				
				}else{
					$(".mzPopNum").html("0");
				}
				$("#deletenull-message").find("div.name").html(data.resultMsg);
				$("#deletenull-message").popbox({title:'提示'});
			}
			
		}		
	}else{
		
		if($(str).hasClass("card-checked")){
			$(str).removeClass("card-checked").addClass("card-normal");
			$(str).parents(".item").find("[id=checked]").val("false");
			$(".mzPopNum").html("0");
		}else{
			$(str).removeClass("card-normal").addClass("card-checked").parents("div.item").siblings(".item").find("i").removeClass("card-checked").addClass("card-normal");
			$(str).parents(".item").find("[id=checked]").val("true").parents("div.item").siblings(".item").find("[id=checked]").val("false");
		}
		var data = updataMz(str);
		if(data.resultCode == "00100000"){
//			$(".mzPopNum").html(mzPopNum+=1);
			$(".mzPopNum").html("1");
		}else{
			$(".mzPopNum").html("0");
			$("#deletenull-message").find("div.name").html(data.resultMsg);
			$("#deletenull-message").popbox({title:'提示'});
			$(str).attr("class","card-normal");
//			$(".mzPopNum").html(mzPopNum);
			
		}
		
	}

	$('i.card-normal').poshytip({
		content:'<div class="icon-refound"></div><div class="collect-txt">最多可选'+mzMaxQty+'件 </div>',
		className: 'tips-yellow',
		alignTo: 'target',
		alignX: 'center',
		alignY: 'bottom',
		showOn:	'none',
		offsetX: 0,
		offsetY: 7,
		showTimeout: 100
	});
	
}

//修改赠品
function updataMz(str){

	clearTimeout(updateTime);
	//更新赠品
	var goodsWeb = new Object();
	var goodsList = new Array();
	var seleGoods = new Object();
	var seleGiftList = new Array();
	$(".cart-purchase").find(".item").each(function() {
		if ($(this).find("[name = goodsId]").val() != undefined) {
			var good = new Object();
			$(this).find(".mzGoods").each(function() {
					good[$(this).attr('name')] = $(this).val();
			});
			seleGiftList.push(good);
		}
	});
	seleGoods["seleGiftList"]=seleGiftList;
	seleGoods["goodsId"]=$(str).siblings(".goodsId").val();
	seleGoods["goodsLineNbr"]=$(str).siblings(".goodsLineNbr").val();
	goodsList.push(seleGoods);
	goodsWeb.ruleId=$(str).siblings(".popRuleId").val();
	goodsWeb.mzTag="1";
	goodsWeb.goodsList = goodsList;

	var dataMeg;
	$.ajax({
		type : "POST",
		data : $.toJSON(goodsWeb),
		dataType : "json",
		contentType : "application/json",
		url : domain.cart + "/nj/calculateShoppingCartChecked.html",
		async : false,
		success : function(data) {
			if(data.resultInfo && data.resultInfo.topPopList.length>0){
				cgbuyshow(data.resultInfo.topPopList)
			}
			dataMeg =data;
			updateTime = setTimeout(function(){
				calcCart();
			},1000);
		}
	});

	return dataMeg;
}
/***********mz**************/

//修改购物车
function updateCart(goodsWeb) {
	$.ajax({
		type : "POST",
		data : $.toJSON(goodsWeb),
		dataType : "json",
		contentType : "application/json",
		url : domain.cart + "/nj/updateShoppingCart.html",
		async : false,
		success : function(data) {
			if (data != null &&data.resultCode == "200") {
				var goodsList = goodsWeb.goodsList;
				var zywId="";
				var zywnrId="";
				var zywlx="";
				var blList = [];
				if (bl_ad.length > 0) {
					blList = bl_ad.split("_-_");
   							 zywId = blList[0]==undefined?"":blList[0];
  							 zywnrId = blList[1]==undefined?"":blList[1];
   							 zywlx = blList[2]==undefined?"":blList[2];
				}
				for (var i = 0; i < goodsList.length; i++) {
					var goods = goodsList[i];
					var infoStoreSid =  goods.infoStoreSid=="null"?"":goods.infoStoreSid;
					var st = "";
					if (goodsWeb.tag == "0") {
						st = "1";
					}else if(goodsWeb.tag == "1"){
						st = "3";
					}else if(goodsWeb.tag == "3"){
						st = "2";
					}
					AddCart(goods.goodsId,goods.categoryid,goods.goodsName,goods.goodsNumber,goods.salePrice*1,zywId,unescape(zywnrId),zywlx,goods.brandSid,"",goods.originalPrice*1,goods.priceType,st);
				}
				calcCart();
			}
		},
		error : function(data) {
			alert(data);
		}
	});
}

//选择框
function checkBox(str,ty){
	//p
	if($(str).parents(".item").attr("class")=="item select"||$(str).parents(".item").attr("class")=="item  border-middle select"||$(str).parents(".item").attr("class")=="item  border-last select"){
		$(str).parents(".item").find("[id=checked]").val("false");
		$(str).parents(".item").removeClass("select");  //当前
		var index=$(".cart-table-list").index($(str).parents(".cart-table-list"));
		$(".cart-table-name").eq(index).find(".chk-line").removeClass("select");  //上级目录
		$("#payForm").find(".pay-line").find(".select-all").removeClass("select"); //底部全选
		$(str).parents(".cart-table-list").siblings(".cart-head").find(".chk-line").removeClass("select"); //顶部全选
	
	}else if($(str).parents(".item").attr("class")=="item" || $(str).parents(".item").attr("class")=="item border-middle" || $(str).parents(".item").attr("class")=="item border-last"){
		$(str).parents(".item").find("[id=checked]").val("true");
		$(str).parents(".item").addClass("select");
		var num = 0;
		$(str).parents(".cart-table-list").find("li").each(function(){
			if($(this).find(".item").hasClass("select")){
				num++;
			}
		});
		var m=0;
		$(str).parents(".cart-table-list").find("li").each(function(){
			if($(this).hasClass("no-use")){
				m++;
			}
		});
		if(num == $(str).parents(".cart-table-list").find("li").size()-m){
			var index=$(".cart-table-list").index($(str).parents(".cart-table-list"));
			$(".cart-table-name").eq(index).find(".chk-line").addClass("select");
			
			var n =0;
			$(str).parents(".cart-table-list").siblings(".cart-table-name").each(function(){
				if($(this).find(".chk-line").hasClass("select")){
					n++;
				}
			});
			
			if(n == $(str).parents(".cart-table-list").siblings(".cart-table-name").size()){
				$(str).parents(".cart-table-list").siblings(".cart-head").find(".chk-line").addClass("select");
				$("#payForm").find(".select-all").addClass("select");
			}
		}
		//二级勾选取消勾选
	}else if ($(str).parents(".chk-line").attr("class")=="chk-line select"&&$(str).parents(".chk-line").parent().attr("class")=="cart-table-name") {
		var index=$(".cart-table-name").index($(str).parents(".cart-table-name"));
		$(".cart-table-list").eq(index).find("[id=checked]").val("false");
		$(str).parents(".chk-line").removeClass("select");
		$(".cart-table-list").eq(index).find(".item").removeClass("select");
		$("#payForm").find(".pay-line").find(".select-all").removeClass("select");
		$(str).parents(".chk-line").parent().siblings(".cart-head").find(".chk-line").removeClass("select");  

		//二级勾选确认勾选
	}else if ($(str).parents(".chk-line").attr("class")=="chk-line"&&$(str).parents(".chk-line").parent().attr("class")=="cart-table-name") {
		var index=$(".cart-table-name").index($(str).parents(".cart-table-name"));
		$(str).parents(".chk-line").addClass("select");
		$(".cart-table-list").eq(index).find(".item").addClass("select");
		var num = 0;
		$(str).parents(".cart-table").find(".cart-table-name").each(function(){
			if($(this).find(".chk-line").hasClass("select")){
				num++;
			}
		});
		
		if(num==$(str).parents(".cart-table").find(".cart-table-name").size()){
			$(str).parents(".chk-line").parent().siblings(".cart-head").find(".chk-line").addClass("select");
			$("#payForm").find(".pay-line").find(".select-all").addClass("select");
		}
		$(str).parents(".cart-table").find(".cart-table-list").eq(index).find("li").each(function(){
			if($(this).find("#proSellBit").val() == "4" && $(this).find("#stor").val()*1 > 0){
				$(this).find("[id=checked]").val("true");
			}else{
				$(this).find("[id=checked]").val("false");
			}
		});		
		//bs
	}else if ($(str).parents(".chk-line").attr("class")=="chk-line global-list select"&&$(str).parents(".chk-line").parent().attr("class")=="cart-table-name") {
		var index=$(".cart-table-name").index($(str).parents(".cart-table-name"));
		$(".cart-table-list").eq(index).find("[id=checked]").val("false");
		$(str).parents(".chk-line").removeClass("select");
		$(".cart-table-list").eq(index).find("li").each(function(){
			$(this).find(".item").removeClass("select");
		});
		$(str).parents(".cart-table-name").siblings(".cart-head").find(".chk-line").removeClass("select");
		$("#payForm").find(".pay-line").find(".select-all").removeClass("select");

	}else if ($(str).parents(".chk-line").attr("class")=="chk-line global-list"&&$(str).parents(".chk-line").parent().attr("class")=="cart-table-name") {
		var index=$(".cart-table-name").index($(str).parents(".cart-table-name"));
		$(".cart-table-list").eq(index).find("[id=checked]").val("true");
		$(str).parents(".chk-line").addClass("select");
		$(".cart-table-list").eq(index).find("li").each(function(){
			$(this).find(".item").addClass("select");
		});
		var num = 0;
		$(".cart-table-list").eq(index).find("li").each(function(){
			if($(this).find(".item").hasClass("select")){
				num++;
			}
		});
		var m=0;
		$(str).parents(".cart-table-list").find("li").each(function(){
			if($(this).hasClass("no-use")){
				m++;
			}
		});
		
		if(num == $(".cart-table-list").eq(index).find("li").size()-m){
		var n =0;
			$(str).parents(".cart-table-name").siblings(".cart-table-list").find("li").each(function(){
				if($(this).find(".item").hasClass("select")){
					n++;
				}
			});
			
			if(n == $(str).parents(".cart-table-name").siblings(".cart-table-list").find("li").size()){
				$(str).parents(".cart-table-name").siblings(".cart-head").find(".chk-line").addClass("select");
				$("#payForm").find(".select-all").addClass("select");
			}
		}

	}else if ($(str).parents(".chk-line").attr("class")=="chk-line stk-list select"&&$(str).parents(".chk-line").parent().attr("class")=="cart-table-name") {
		var index=$(".cart-table-name").index($(str).parents(".cart-table-name"));
		$(".cart-table-list").eq(index).find("[id=checked]").val("false");
		$(str).parents(".chk-line").removeClass("select");
		
	}else if ($(str).parents(".chk-line").attr("class")=="chk-line stk-list"&&$(str).parents(".chk-line").parent().attr("class")=="cart-table-name") {
		var index=$(".cart-table-name").index($(str).parents(".cart-table-name"));
		$(".cart-table-list").eq(index).find("[id=checked]").val("true");
		$(str).parents(".chk-line").addClass("select");	
		
	}else if ($(str).parents(".chk-line").attr("class")=="chk-line blk-list select"&&$(str).parents(".chk-line").parent().attr("class")=="cart-table-name") {
		var index=$(".cart-table-name").index($(str).parents(".cart-table-name"));
		$(".cart-table-list").eq(index).find("[id=checked]").val("false");
		$(str).parents(".chk-line").removeClass("select");
		
	}else if ($(str).parents(".chk-line").attr("class")=="chk-line blk-list"&&$(str).parents(".chk-line").parent().attr("class")=="cart-table-name") {
		var index=$(".cart-table-name").index($(str).parents(".cart-table-name"));
		$(".cart-table-list").eq(index).find("[id=checked]").val("true");
		$(str).parents(".chk-line").addClass("select");	
		
	}else if ($(str).parents(".chk-line").attr("class")=="chk-line select"&&$(str).parents(".chk-line").parent().attr("class")=="cart-head") {
		$(".cart-table-list").find(".item").each(function(){
			$(this).find("[name=checked]").val("false");
			$(str).parents(".chk-line").removeClass("select");
			$(".cart-table-name").find(".chk-line").removeClass("select");
			$(".cart-table-list").find(".item").removeClass("select");
			//顶层选取
		});
		$("#payForm").find(".pay-line").find(".select-all").removeClass("select");
	}else if ($(str).parents(".chk-line").attr("class")=="chk-line"&&$(str).parents(".chk-line").parent().attr("class")=="cart-head") {
		$(".cart-table-list").find(".item").each(function(){
//			$(this).find("[name=checked]").val("true");
			$(str).parents(".chk-line").addClass("select");
			$(".cart-table-name").find(".chk-line").addClass("select");
			$(".cart-table-list").find(".item").addClass("select");
		});
		$(str).parents(".cart-table").find(".cart-table-list li").each(function(){
			if($(this).find("#proSellBit").val() == "4" && $(this).find("#stor").val()*1 > 0){
				$(this).find("[id=checked]").val("true");
			}else{
				$(this).find("[id=checked]").val("false");
			}
		});
		$("#payForm").find(".pay-line").find(".select-all").addClass("select");
		
		//db
	}else if ($(str).parents(".select-all").attr("class")=="select-all select"){
		$(".cart-table-list").find(".item").each(function(){
			$(this).find("[name=checked]").val("false");
			$(str).parents(".select-all").removeClass("select");
			$(".cart-table-list").find(".item").removeClass("select");
		});
		$(str).parents(".select-all").parents().parents().siblings(".cart-table").find(".cart-head").find(".chk-line").removeClass("select")
		$(str).parents(".select-all").parents().parents().siblings(".cart-table").find(".cart-table-name").find(".chk-line").removeClass("select")

	}else if ($(str).parents(".select-all").attr("class")=="select-all"){
		$(".cart-table-list").find(".item").each(function(){
//			$(this).find("[name=checked]").val("true");
			$(str).parents(".select-all").addClass("select");
			$(".cart-table-list").find(".item").addClass("select");
		});
		$(str).parents().parents().parents(".pay-form").siblings(".cart-table").find(".cart-table-list li").each(function(){
			if($(this).find("#proSellBit").val() == "4" && $(this).find("#stor").val()*1 > 0){
				$(this).find("[id=checked]").val("true");
			}else{
				$(this).find("[id=checked]").val("false");
			}
		});
		$(str).parents(".select-all").parents().parents().siblings(".cart-table").find(".cart-head").find(".chk-line").addClass("select");
		$(str).parents(".select-all").parents().parents().siblings(".cart-table").find(".cart-table-name").find(".chk-line").addClass("select")
	//zh
	}else if($(str).parents(".item").attr("class")=="item pr-zh"){
		$(str).parents(".item").find("[id=checked]").val("true");
		$(str).parents(".item").addClass("select");
		var num = 0;
		$(str).parents(".cart-table-list").find("li").each(function(){
			if($(this).find(".item").hasClass("select")){
				num++;
			}
		});
		var m=0;
		$(str).parents(".cart-table-list").find("li").each(function(){
			if($(this).hasClass("no-use")){
				m++;
			}
		});
		if(num == $(str).parents(".cart-table-list").find("li").size()-m){
			var index=$(".cart-table-list").index($(str).parents(".cart-table-list"));
			$(".cart-table-name").eq(index).find(".chk-line").addClass("select");
			
			var n =0;
			$(str).parents(".cart-table-list").siblings(".cart-table-name").each(function(){
				if($(this).find(".chk-line").hasClass("select")){
					n++;
				}
			});
			
			if(n == $(str).parents(".cart-table-list").siblings(".cart-table-name").size()){
				$(str).parents(".cart-table-list").siblings(".cart-head").find(".chk-line").addClass("select");
				$("#payForm").find(".select-all").addClass("select");
			}
		}
	}else if($(str).parents(".item").attr("class")=="item pr-zh select"){
		$(str).parents(".item").find("[id=checked]").val("false");
		$(str).parents(".item").removeClass("select");
		var index=$(".cart-table-list").index($(str).parents(".cart-table-list"));
		$(".cart-table-name").eq(index).find(".chk-line").removeClass("select");  //上级目录
		$("#payForm").find(".pay-line").find(".select-all").removeClass("select"); //底部全选
		$(str).parents(".cart-table-list").siblings(".cart-head").find(".chk-line").removeClass("select"); //顶部全选
	}
	if(ty != "2"){
		clearTimeout(updateTime);
		updateTime = setTimeout(function(){
			calcCart();
		},1000);		
	}else{
		var goodsListdto = new Array();
		var goodsGroupDtoListWeb = new Object();
		var goodsListWeb = new Object();
		var gooddto = new  Object();
		var goodsGroupDtoListWeb = new Object();
		var goodsGroupDtoList = new Array();
		var goodsGroupList = new Array();
		var goodsDtoWeb = new Object();
	 	goodsGroupDtoListWeb["orderAmount"] = $(str).parents(".cart-table-list").find("#orderAmount").val();
	 	goodsGroupDtoListWeb["orderPay"] = $(str).parents(".cart-table-list").find("#orderPay").val();
//	 	goodsGroupDtoListWeb["showOrderDiscount"] =$(str).parents(".cart-table-list").find(".showOrderDiscount").val();
	 	$(str).parents(".item").find(".goods").each(function(){
			gooddto[$(this).attr('name')] = $(this).val();
		});
	 	gooddto["goodsNumber"] = $(str).parents(".item").find("[name=goodsNumber]").val();
	 	gooddto["salePrice"] = $(str).parents(".item").find("[name=salePrice]").val();
	 	gooddto["checked"] = $(str).parents(".item").find("[name=checked]").val();
	 	gooddto["goodsId"] = $(str).parents(".item").find("[name=goodsId]").val();
	 	gooddto["checkedOriginal"] = $(str).parents(".item").find("[name=checkedOriginal]").val();
	 	gooddto["goodsOriginalNumber"] = $(str).parents(".item").find("[name=goodsOriginalNumber]").val();
//	 	gooddto["showOrderDiscount"] = $(str).parents(".item").find("[name=showOrderDiscount]").val();
	 	goodsListdto.push(gooddto);
//	 	goodsListWeb["showOrderDiscount"] = $(str).parents(".cart-table-list").find(".showOrderDiscount3").val();
//	 	goodsListWeb["showDiscountAmount"] = $(str).parents(".cart-table-list").find(".showDiscountAmount3").val();
	 	goodsListWeb["showOrderAmount"] = $(str).parents(".cart-table-list").find(".showOrderAmount2").val();
		goodsListWeb.goodsList = goodsListdto;
		goodsGroupList.push(goodsListWeb);
		goodsGroupDtoListWeb.goodsGroupList = goodsGroupList;
//		goodsGroupDtoListWeb["showOrderDiscount"] = $(str).parents(".cart-table-list").find(".showOrderDiscount2").val();
//		goodsGroupDtoListWeb["showDiscountAmount"] = $(str).parents(".cart-table-list").find(".showDiscountAmount2").val();
		goodsGroupDtoListWeb["showOrderAmount"] = $(str).parents(".cart-table-list").find(".showOrderAmount1").val();
	 	goodsGroupDtoList.push(goodsGroupDtoListWeb);
	 	goodsDtoWeb.goodsGroupDtoList = goodsGroupDtoList;
	 	goodsDtoWeb.timestamp = Date.parse(new Date());
	 	goodsDtoWeb.orderAmount = $("#orderAmount").val();
	 	goodsDtoWeb.totalcheckedGoodsNumber = $(".totalcheckedGoodsNumber").val();
//	 	goodsDtoWeb.showOrderDiscount = $(str).parents(".cart-table-list").find(".showOrderDiscount1").val();
//	 	goodsDtoWeb.showDiscountAmount = $(str).parents(".cart-table-list").find(".showDiscountAmount1").val();
	 	goodsDtoWeb.showOrderAmount = $(str).parents(".cart-table-list").find("#showOrderAmount").val();
	 	goodsDtoWeb.orderPay = $(str).parents(".cart-table-list").find("#orderPay1").val();
		calcFastCart(goodsDtoWeb,str,ty);
	}
 
}

function clickLK(str){
	if ($(str).parents("li").attr("class")=="select border-first") {
		$(str).parents("li").find("[name=checked]").val("false");
	}else{
		$(str).parents("li").find("[name=checked]").val("true");
	}
	calcCart();
}

function addFavorite(str){
	if ($(".login-message").html() != undefined) {
		login();
		return;
	}
	var goodsId =  $(str).parents(".item").find("[name=goodsId]").val();
	var url = "/favorite/joinFavorite.html";
	$.ajax({
		url : url + "?goodsId="+goodsId,
		success:function(data){
			if (null == data) {
				alert("网络超时，请重试");
				return;
			}
			if(data.resCode == "0002"){
				window.location.href = domain.passport+'/loginDisplay.html?requestUrl='+encodeURIComponent(window.location.href);
				return;
			}else{
				$('a.add-favourite').poshytip({
			       	content:'<div class="icon-cart"></div><div class="collect-txt">已移入收藏夹</div>',
				      className: 'tip-yellow',
				      alignTo: 'target',
				      alignX: 'center',
				      showOn:	'none',
				      offsetX: 0,
				      offsetY: 5,
				      showTimeout: 100
			      });
				 $(str).poshytip('show').poshytip('hideDelayed', 1500); 
				var goodsList = new Array();
				var good = new Object();
				$(str).parents(".item").find(".goods").each(function() {
					good[$(this).attr('name')] = $(this).val();
				});
				good.goodsName="";
				goodsList.push(good);
				var goodsWeb = new Object();
				goodsWeb.goodsList = goodsList;
				goodsWeb.tag = 1;
				setTimeout(function(){
					var cli = $(str).parents("li").find(".item").size();
					if(cli>1){
						$(str).parents(".item").remove();
					}else{
						$(str).parents("li").remove();
					}
					updateCart(goodsWeb);
				},2000); 
			}
		},error:function(){
			alert("网络超时，请重试","提示");
		}
	});
}

function addFavoriteMore(){
	if ($(".login-message").html() != undefined) {
		login();
		return;
	}
	var goodsList = new Array();
//	  $(".cart-table-list > li").each(function() {
//			var item = $(this).children(".item");
//			if (item.find("[name=checked]").val() == "true") {
//				var good = new Object();
//				item.find(".goods").each(function() {
//					good[$(this).attr('name')] = $(this).val();
//				});
//				good.goodsName="";
//				goodsList.push(good);
//			}
//		});	
	  $(".cart-table-list").find(".item").each(function(){
	    if ($(this).find("[name=checked]").val()=="true") {
	      var good = new Object();
	      $(this).find(".goods").each(function(){
	        good[$(this).attr("name")] = $(this).val();
	      });
	      good.goodsName="";
	      goodsList.push(good);
	    }
	  });
	 if (!goodsList.length > 0) {
		 $("#deletenull-message").find("div.name").html("您还没有选择商品哦");
		$("#deletenull-message").popbox({title:'提示'});
		return;
	}
	$("#pop-close").click();
	var goodsId = "";
	var goodsList = new Array();
	//满赠有问题，这边是个坑
//	  $(".cart-table-list > li").each(function() {
//			var item = $(this).children(".item");
//			if (item.find("[name=checked]").val() == "true") {
//				goodsId +=  $(this).find("[name=goodsId]").val()+"|";
//				var good = new Object();
//				item.find(".goods").each(function() {
//					good[$(this).attr('name')] = $(this).val();
//				});
//				goodsList.push(good);
//			}
//		});	
	 $(".cart-table-list").find(".item").each(function(){
		    if ($(this).find("[name=checked]").val()=="true") {
		    	goodsId +=  $(this).find("[name=goodsId]").val()+"|";
 				var good = new Object();
 				$(this).find(".goods").each(function() {
 						good[$(this).attr('name')] = $(this).val();
 				});
 				goodsList.push(good);
		    }
	});
	 goodsId = goodsId.substr(0,goodsId.length-1);
	var goodsWeb = new Object();
	goodsWeb.goodsList = goodsList;
	goodsWeb.tag = 1;
	 var url = "/favorite/joinFavoriteMore.html";
 	$.ajax({
 		url : url + "?goodsId="+goodsId,
 		success:function(data){
 			if (null == data) {
 				alert("网络超时，请重试");
 				return;
 			}
 			if(data.resCode == "0002"){
 				window.location.href = domain.passport+'/loginDisplay.html?requestUrl='+encodeURIComponent(window.location.href);
 				return;
 			}else if(data.resCode == "0000"){
 				$("[name=checked]").each(function(){
 					if ($(this).val()=="true") {
 						$(this).parents(".item").remove();
					}
 				});
 				updateCart(goodsWeb);
 				$("#deletenull-message").find("div.name").html("成功将"+goodsList.length+"件商品移入收藏夹!");
 				$("#deletenull-message").popbox({title:'提示'});
 			}else{
 				$("#deletenull-message").find("div.name").html(data.message);
 				$("#deletenull-message").popbox({title:'提示'});
 			}
 		},error:function(){
 			alert("网络超时，请重试","提示");
 		}
 	});
}

function removeLK(str){
	var goodsList = new Array();
	
	$(str).parents("li").find(".item").each(function(){
		var good = new Object();
		$(this).find(".goods").each(function(){
			good[$(this).attr("name")] = $(this).val();
		});
		good.goodsName="";
		goodsList.push(good);
	});
	$(str).parents("li").remove();
	var goodsWeb = new Object();
	goodsWeb.goodsList = goodsList;
	goodsWeb.tag = 1;
	updateCart(goodsWeb);
}

function removeGoods(str){
	var goodsList = new Array();
	var good = new Object();
	$(str).parents(".item").find(".goods").each(function(){
		good[$(this).attr("name")] = $(this).val();
	});
	good.goodsName="";
	goodsList.push(good);
	var cli = $(str).parents("li").find(".item").size();
	if(cli>1){
		$(str).parents(".item").remove();
	}else{
		$(str).parents("li").remove();
	}
	var goodsWeb = new Object();
	goodsWeb.goodsList = goodsList;
	goodsWeb.tag = 1;
	updateCart(goodsWeb);
}

function removeGoodsMore(){
	  var goodsList = new Array();
	  $("#pop-close").click();
	  $(".cart-table-list > li").each(function() {
			var item = $(this).children(".item");
			if (item.find("[name=checked]").val() == "true") {
				item.each(function(){
					var good = new Object();
					$(this).find(".goods").each(function() {
						good[$(this).attr('name')] = $(this).val();
					});
					 good.goodsName="";
					 goodsList.push(good);
					 $(this).remove();
				});
			}
		});	
	 
//	 $("#delete-message").find("span.bold").html(goodsList.length);
	  var goodsWeb = new Object();
	  goodsWeb.goodsList = goodsList;
	  goodsWeb.tag = 1;
	  updateCart(goodsWeb);
}

//+
function upButton(str,ty){
	clearTimeout(updateTime);
	var number = $(str).parent().find("input").val()*1 + 1;
	if (number > 99) {
		number = 99;
		$(str).attr("class","add disable");
	}
	var stro = $(str).parents(".item").find("[name=stor]").val()*1;
	var limitBuySum = $(str).parents(".item").find("[name=limitBuySum]").val()*1
	if (number > limitBuySum && limitBuySum > 0 ) {
		$(str).parents(".number-box").find(".error").remove();
		var html  = "<div class=\"error\">最多只能购买"+limitBuySum+"件</div>";
		$(str).parent().after(html);
	}else if(number > stro){
		$(str).parents(".number-box").find(".error").remove();
		var html  = "<div class=\"error\">最多只能购买"+stro+"件</div>";
		$(str).parent().after(html);
	}else{
		$(str).parent().find("input").val(number);
		$(str).parents(".item").find("[name=goodsNumber]").val(number);
		var goodsList = new Array();
		var goods = new Object();
		$(str).parents(".item").find(".goods").each(function(){
			goods[$(this).attr('name')] = $(this).val();
		});
		if(ty == "1"){
			$(str).parents(".border-first").find(".item").each(function(){
				var goods = new Object();
				$(this).find(".goods").each(function(){
					goods[$(this).attr('name')] = $(this).val();
					goods.goodsName="";
				});
				$(this).find("[name=checked]").val("true");
			});
			goods.goodsName="";
			goodsList.push(goods);
		}else if(ty == "2"){
			var goodsListdto = new Array();
			var goodsGroupDtoListWeb = new Object();
			var goodsListWeb = new Object();
			var gooddto = new  Object();
			var goodsGroupDtoListWeb = new Object();
			var goodsGroupDtoList = new Array();
			var goodsGroupList = new Array();
			var goodsDtoWeb = new Object();
		 	goodsGroupDtoListWeb["orderAmount"] = $(str).parents(".cart-table-list").find("#orderAmount").val();
		 	goodsGroupDtoListWeb["orderPay"] = $(str).parents(".cart-table-list").find("#orderPay").val();
//		 	goodsGroupDtoListWeb["showOrderDiscount"] =$(str).parents(".cart-table-list").find("#showOrderDiscount").val();
		 	$(str).parents(".item").find(".goods").each(function(){
				gooddto[$(this).attr('name')] = $(this).val();
			});
		 	gooddto["goodsNumber"] = $(str).parents(".item").find("[name=goodsNumber]").val();
		 	gooddto["salePrice"] = $(str).parents(".item").find("[name=salePrice]").val();
		 	gooddto["checked"] = $(str).parents(".item").find("[name=checked]").val();
		 	gooddto["goodsId"] = $(str).parents(".item").find("[name=goodsId]").val();
		 	gooddto["checkedOriginal"] = $(str).parents(".item").find("[name=checkedOriginal]").val();
		 	gooddto["goodsOriginalNumber"] = $(str).parents(".item").find("[name=goodsOriginalNumber]").val();
//		 	gooddto["showOrderDiscount"] = $(str).parents(".item").find("[name=showOrderDiscount]").val();
		 	goodsListdto.push(gooddto);
//		 	goodsListWeb["showOrderDiscount"] = $(str).parents(".cart-table-list").find(".showOrderDiscount3").val();
//		 	goodsListWeb["showDiscountAmount"] = $(str).parents(".cart-table-list").find(".showDiscountAmount3").val();
		 	goodsListWeb["showOrderAmount"] = $(str).parents(".cart-table-list").find(".showOrderAmount2").val();
 			goodsListWeb.goodsList = goodsListdto;
			goodsGroupList.push(goodsListWeb);
			goodsGroupDtoListWeb.goodsGroupList = goodsGroupList;
//			goodsGroupDtoListWeb["showOrderDiscount"] = $(str).parents(".cart-table-list").find(".showOrderDiscount2").val();
//			goodsGroupDtoListWeb["showDiscountAmount"] = $(str).parents(".cart-table-list").find(".showDiscountAmount2").val();
			goodsGroupDtoListWeb["showOrderAmount"] = $(str).parents(".cart-table-list").find(".showOrderAmount1").val();
		 	goodsGroupDtoList.push(goodsGroupDtoListWeb);
		 	goodsDtoWeb.goodsGroupDtoList = goodsGroupDtoList;
		 	goodsDtoWeb.timestamp = Date.parse(new Date());
		 	goodsDtoWeb.orderAmount = $("#orderAmount").val();
		 	goodsDtoWeb.totalcheckedGoodsNumber = $(".totalcheckedGoodsNumber").val();
//		 	goodsDtoWeb.showOrderDiscount = $(str).parents(".cart-table-list").find(".showOrderDiscount1").val();
//		 	goodsDtoWeb.showDiscountAmount = $(str).parents(".cart-table-list").find(".showDiscountAmount1").val();
		 	goodsDtoWeb.showOrderAmount = $(str).parents(".cart-table-list").find("#showOrderAmount").val();
		 	goodsDtoWeb.orderPay = $(str).parents(".cart-table-list").find("#orderPay1").val();
			calcFastCart(goodsDtoWeb,str);
		}else{
			var goods = new Object();
			$(str).parents(".item").find(".goods").each(function(){
				goods[$(this).attr('name')] = $(this).val();
			});
			$(str).parents(".item").find("[name=checked]").val(true);			
			goods.goodsName="";
			goodsList.push(goods);
		}
		
		if(ty != "2"){
			var goodsWeb = new Object();
			goodsWeb.goodsList = goodsList;
			goodsWeb.tag = 3;
			updateTime = setTimeout(function(){
				updateCart(goodsWeb);
					},500); 
		}
	}
}
//-
function downButton(str,ty){
	clearTimeout(updateTime);
	var number = $(str).parent().find("input").val()*1 - 1;
	if (number == 1) {
		$(str).attr("class","reduce disable");
	}
	if (number > 0) {
		$(str).parent().find("input").val(number);
		$(str).parents(".item").find("[name=goodsNumber]").val(number);
		var goodsList = new Array();
		var goods = new Object();
		$(str).parents(".item").find(".goods").each(function(){
			goods[$(this).attr('name')] = $(this).val();
		});
		if(ty == "1"){
			$(str).parents(".border-first").find(".item").each(function(){
				var goods = new Object();
				$(this).find(".goods").each(function(){
					goods[$(this).attr('name')] = $(this).val();
					goods.goodsName="";
				});
				$(this).find("[name=checked]").val("true");
			});
			goods.goodsName="";
			goodsList.push(goods);
		}else if(ty == "2"){
			var goodsListdto = new Array();
			var goodsGroupDtoListWeb = new Object();
			var goodsListWeb = new Object();
			var gooddto = new  Object();
			var goodsGroupDtoListWeb = new Object();
			var goodsGroupDtoList = new Array();
			var goodsGroupList = new Array();
			var goodsDtoWeb = new Object();
		 	goodsGroupDtoListWeb["orderAmount"] = $(str).parents(".cart-table-list").find("#orderAmount").val();
		 	goodsGroupDtoListWeb["orderPay"] = $(str).parents(".cart-table-list").find("#orderPay").val();
//		 	goodsGroupDtoListWeb["showOrderDiscount"] =$(str).parents(".cart-table-list").find("#showOrderDiscount").val();
		 	$(str).parents(".item").find(".goods").each(function(){
				gooddto[$(this).attr('name')] = $(this).val();
			});
		 	gooddto["goodsNumber"] = $(str).parents(".item").find("[name=goodsNumber]").val();
		 	gooddto["salePrice"] = $(str).parents(".item").find("[name=salePrice]").val();
		 	gooddto["checked"] = $(str).parents(".item").find("[name=checked]").val();
		 	gooddto["goodsId"] = $(str).parents(".item").find("[name=goodsId]").val();
		 	gooddto["checkedOriginal"] = $(str).parents(".item").find("[name=checkedOriginal]").val();
		 	gooddto["goodsOriginalNumber"] = $(str).parents(".item").find("[name=goodsOriginalNumber]").val();
//		 	gooddto["showOrderDiscount"] = $(str).parents(".item").find("[name=showOrderDiscount]").val();
		 	goodsListdto.push(gooddto);
//		 	goodsListWeb["showOrderDiscount"] = $(str).parents(".cart-table-list").find(".showOrderDiscount3").val();
//		 	goodsListWeb["showDiscountAmount"] = $(str).parents(".cart-table-list").find(".showOrderDiscount3").val();
		 	goodsListWeb["showOrderAmount"] = $(str).parents(".cart-table-list").find(".showOrderDiscount2").val();
 			goodsListWeb.goodsList = goodsListdto;
			goodsGroupList.push(goodsListWeb);
			goodsGroupDtoListWeb.goodsGroupList = goodsGroupList;
//			goodsGroupDtoListWeb["showOrderDiscount"] = $(str).parents(".cart-table-list").find(".showOrderDiscount2").val();
//			goodsGroupDtoListWeb["showDiscountAmount"] = $(str).parents(".cart-table-list").find(".showDiscountAmount2").val();
			goodsGroupDtoListWeb["showOrderAmount"] = $(str).parents(".cart-table-list").find(".showOrderAmount1").val();
		 	goodsGroupDtoList.push(goodsGroupDtoListWeb);
		 	goodsDtoWeb.goodsGroupDtoList = goodsGroupDtoList;
		 	goodsDtoWeb.timestamp = Date.parse(new Date());
		 	goodsDtoWeb.orderAmount = $("#orderAmount").val();
		 	goodsDtoWeb.totalcheckedGoodsNumber = $(".totalcheckedGoodsNumber").val();
//		 	goodsDtoWeb.showOrderDiscount = $(str).parents(".cart-table-list").find(".showOrderDiscount1").val();
//		 	goodsDtoWeb.showDiscountAmount = $(str).parents(".cart-table-list").find(".showDiscountAmount1").val();
		 	goodsDtoWeb.showOrderAmount = $(str).parents(".cart-table-list").find("#showOrderAmount").val();
		 	goodsDtoWeb.orderPay = $(str).parents(".cart-table-list").find("#orderPay1").val();
			calcFastCart(goodsDtoWeb,str);
		}else{
			var goods = new Object();
			$(str).parents(".item").find(".goods").each(function(){
				goods[$(this).attr('name')] = $(this).val();
			});
			$(str).parents(".item").find("[name=checked]").val(true);			
			goods.goodsName="";
			goodsList.push(goods);
		}
		
		if(ty != "2"){
		var goodsWeb = new Object();
		goodsWeb.goodsList = goodsList;
		goodsWeb.tag = 3;
		updateTime = setTimeout(function(){
			updateCart(goodsWeb);
				},500); 
		}
	}
}
//输入修改
function inputUpdata(str,ty){
	clearTimeout(updateTime);
	var number = $(str).val();
	var reg = new RegExp("^[0-999]*$");
	if(!reg.test(number)){
		$(str).val($(str).parents(".item").find("[name=goodsNumber]").val());
	}else{
		var stro = $(str).parents(".item").find("[name=stor]").val()*1;
		var limitBuySum = $(str).parents(".item").find("[name=limitBuySum]").val()*1
		if (number > limitBuySum && limitBuySum > 0 ) {
			$(str).parents(".number-box").find(".error").remove();
			var html  = "<div class=\"error\">最多只能购买"+limitBuySum+"件</div>";
			$(str).parent().after(html);
			 $(str).val($(str).parents(".item").find("[name=goodsNumber]").val());
		}else if(number > stro && stro<99 ){
			$(str).parents(".number-box").find(".error").remove();
			var html  = "<div class=\"error\">最多只能购买"+stro+"件</div>";
			$(str).parent().after(html);
			 $(str).val($(str).parents(".item").find("[name=goodsNumber]").val());
		}else if(number > 99 && stro>99 ){
			$(str).parents(".number-box").find(".error").remove();
			var html  = "<div class=\"error\">最多只能购买99件</div>";
			$(str).parent().after(html);
			 $(str).val($(str).parents(".item").find("[name=goodsNumber]").val());
		}else{
			if (number > 0 ) {
				if (number > 99) {
					number = 99;
					$(str).parent().find(".add").attr("class","add  disable");
				}else if(number == 1){
					$(str).parent().find(".reduce").attr("class","reduce  disable");
				}
				$(str).val(number);
				$(str).parents(".item").find("[name=goodsNumber]").val(number);
				var goodsList = new Array();
				if(ty == "1"){
					$(str).parents(".border-first").find(".item").each(function(){
						var goods = new Object();
						$(this).find(".goods").each(function(){
							goods[$(this).attr('name')] = $(this).val();
							goods.goodsName="";
						});
						$(this).find("[name=checked]").val("true");
					});
				}else if(ty == "2"){
					var goodsListdto = new Array();
					var goodsGroupDtoListWeb = new Object();
					var goodsListWeb = new Object();
					var gooddto = new  Object();
					var goodsGroupDtoListWeb = new Object();
					var goodsGroupDtoList = new Array();
					var goodsGroupList = new Array();
					var goodsDtoWeb = new Object();
				 	goodsGroupDtoListWeb["orderAmount"] = $(str).parents(".cart-table-list").find("#orderAmount").val();
				 	goodsGroupDtoListWeb["orderPay"] = $(str).parents(".cart-table-list").find("#orderPay").val();
				 	$(str).parents(".item").find(".goods").each(function(){
						gooddto[$(this).attr('name')] = $(this).val();
					});
				 	gooddto["goodsNumber"] = $(str).parents(".item").find("[name=goodsNumber]").val();
				 	gooddto["salePrice"] = $(str).parents(".item").find("[name=salePrice]").val();
				 	gooddto["checked"] = $(str).parents(".item").find("[name=checked]").val();
				 	gooddto["goodsId"] = $(str).parents(".item").find("[name=goodsId]").val();
				 	gooddto["checkedOriginal"] = $(str).parents(".item").find("[name=checkedOriginal]").val();
				 	gooddto["goodsOriginalNumber"] = $(str).parents(".item").find("[name=goodsOriginalNumber]").val();
//				 	gooddto["showOrderDiscount"] = $(str).parents(".item").find("[name=showOrderDiscount]").val();
				 	goodsListdto.push(gooddto);
//				 	goodsListWeb["showOrderDiscount"] = $(str).parents(".cart-table-list").find(".showOrderDiscount3").val();
//				 	goodsListWeb["showDiscountAmount"] = $(str).parents(".cart-table-list").find(".showDiscountAmount3").val();
				 	goodsListWeb["showOrderAmount"] = $(str).parents(".cart-table-list").find(".showOrderAmount2").val();
		 			goodsListWeb.goodsList = goodsListdto;
					goodsGroupList.push(goodsListWeb);
					goodsGroupDtoListWeb.goodsGroupList = goodsGroupList;
//					goodsGroupDtoListWeb["showOrderDiscount"] = $(str).parents(".cart-table-list").find(".showOrderDiscount2").val();
//					goodsGroupDtoListWeb["showDiscountAmount"] = $(str).parents(".cart-table-list").find(".showDiscountAmount2").val();
					goodsGroupDtoListWeb["showOrderAmount"] = $(str).parents(".cart-table-list").find(".showOrderAmount1").val();
				 	goodsGroupDtoList.push(goodsGroupDtoListWeb);
				 	goodsDtoWeb.goodsGroupDtoList = goodsGroupDtoList;
				 	goodsDtoWeb.timestamp = Date.parse(new Date());
				 	goodsDtoWeb.orderAmount = $("#orderAmount").val();
				 	goodsDtoWeb.totalcheckedGoodsNumber = $(".totalcheckedGoodsNumber").val();
//				 	goodsDtoWeb.showOrderDiscount = $(str).parents(".cart-table-list").find(".showOrderDiscount1").val();
//				 	goodsDtoWeb.showDiscountAmount = $(str).parents(".cart-table-list").find(".showDiscountAmount1").val();
				 	goodsDtoWeb.showOrderAmount = $(str).parents(".cart-table-list").find("#showOrderAmount").val();
				 	goodsDtoWeb.orderPay = $(str).parents(".cart-table-list").find("#orderPay1").val();
				 	calcFastCart(goodsDtoWeb,str);
				}{
					var goods = new Object();
					$(str).parents(".item").find(".goods").each(function(){
						goods[$(this).attr('name')] = $(this).val();
					});
					$(str).parents(".item").find("[name=checked]").val(true);			
					goods.goodsName="";
					goodsList.push(goods);
				}
				if(ty != "2"){
				var goodsWeb = new Object();
				goodsWeb.goodsList = goodsList;
				goodsWeb.tag = 3;
				updateTime = setTimeout(function(){
					updateCart(goodsWeb);
						},500); 
				}
			}else{
				$(str).val($(str).parents(".item").find("[name=goodsNumber]").val());
			}
		}
	}
}
//结算按钮
function payButton(str){
	/*if ($("#isLogin").val()==false) {
		login();
		return;
	}*/
	if ($(".login-message").html()!=undefined) {
		login();
		return;
	}
	var isMore = false;
	var a = 0;
	var b = 0;
	var c = 0;
	var d = 0;
	var e = 0;
	var f = 0;
	var stkTrue = false;
	var zyTrue =false;
	var bsTrue = false;
	var blkTrue = false;
	$(".goodsType").each(function(){
		if ($(this).val()*1 ==0&&$(this).parent().find("[name=checked]").val()=="true") {
			a = 1;
		}
		if ($(this).val()*1 ==1&&$(this).parent().find("[name=checked]").val()=="true") {
			b += 1;
		}
		if ($(this).val()*1 ==2&&$(this).parent().find("[name=checked]").val()=="true") {
			c += 1;
		}
		if ($(this).val()*1 ==3&&$(this).parent().find("[name=checked]").val()=="true") {
			d = 1;
		}
		if ($(this).val()*1 ==4&&$(this).parent().find("[name=checked]").val()=="true") {
			e = 1;
		}
		if ($(this).val()*1 ==5&&$(this).parent().find("[name=checked]").val()=="true") {
			f = 1;
		}
		if (a+b+c+d+e+f > 1) {
			isMore = true;
		}
	});
	var ptGoods =new Array();
	var dzkGoods = new Array();
	var stkGoods = new Array();
	var zyGoods = new Array();
	var bsGoods = new Array();
	var blkGoods =new Array();
	$(".cart-table-list").each(function(){
		if ($(this).find(".goodsType").eq(0).val() == "0") {
			$(this).find(".item").each(function(){
				if ($(this).find("[name=checked]").val()=="true") {
					var goods = new Object();
					goods.id=$(this).find(".goods").each(function(){
						goods[$(this).attr("name")] = $(this).val();
					});
					ptGoods.push(goods);
				}
			});
		}
		if ($(this).find(".goodsType").eq(0).val() == "1") {
			var zy = new Array();
			$(this).find(".item").each(function(){
				if ($(this).find("[name=checked]").val()=="true") {
					var goods = new Object();
					goods.id=$(this).find(".goods").each(function(){
						goods[$(this).attr("name")] = $(this).val();
					});
					var index=$(".cart-table-list").index($(this).parents(".cart-table-list"));
					var pName = $(".cart-table-name").eq(index).find(".global-list").find("span").html();
					if(pName == null || pName == ""){
						goods["pName"] = "直邮商品" ;
					}else{
						goods["pName"] = pName ;
					}
					zy.push(goods);
				}
			});
			if (zy.length > 0) {
				zyGoods.push(zy);
			}
		}
		if ($(this).find(".goodsType").eq(0).val() == "2") {
			var bs = new Array();
			$(this).find(".item").each(function(){
				if ($(this).find("[name=checked]").val()=="true") {
					var goods = new Object();
					goods.id=$(this).find(".goods").each(function(){
						goods[$(this).attr("name")] = $(this).val();
					});
					var index=$(".cart-table-list").index($(this).parents(".cart-table-list"));
					var pName = $(".cart-table-name").eq(index).find(".global-list").find("span").html();
					if(pName == null || pName == ""){
						goods["pName"] = "保税商品" ;
					}else{
						goods["pName"] = pName ;
					}
					bs.push(goods);
				}
			});
			if (bs.length > 0 ) {
				bsGoods.push(bs);
			}
		}
		if ($(this).find(".goodsType").eq(0).val() == "3") {
			$(this).find(".item").each(function(){
				if ($(this).find("[name=checked]").val()=="true") {
					var goods = new Object();
					goods.id=$(this).find(".goods").each(function(){
						goods[$(this).attr("name")] = $(this).val();
					});
					var index=$(".cart-table-list").index($(this).parents(".cart-table-list"));
					goods["pName"] = $(".cart-table-name").eq(index).find(".chk-line global-list").find("span").html();
					dzkGoods.push(goods);
				}
			});
		}
		if ($(this).find(".goodsType").eq(0).val() == "4") {
			$(this).find(".item").each(function(){
				if ($(this).find("[name=checked]").val()=="true") {
					var goods = new Object();
					goods.id=$(this).find(".goods").each(function(){
						goods[$(this).attr("name")] = $(this).val();
					});
					var index=$(".cart-table-list").index($(this).parents(".cart-table-list"));
					goods["pName"] = $(".cart-table-name").eq(index).find(".chk-line global-list").find("span").html();
					stkGoods.push(goods);
				}
			});
		}
		if ($(this).find(".goodsType").eq(0).val() == "5") {
			$(this).find(".item").each(function(){
				if ($(this).find("[name=checked]").val()=="true") {
					var goods = new Object();
					goods.id=$(this).find(".goods").each(function(){
						goods[$(this).attr("name")] = $(this).val();
					});
					var index=$(".cart-table-list").index($(this).parents(".cart-table-list"));
					goods["pName"] = $(".cart-table-name").eq(index).find(".chk-line global-list").find("span").html();
					blkGoods.push(goods);
				}
			});
		}
	});
	if ($(str).attr("class")=="btn btn-notsecondary" || $(str).attr("class")=="pay disable") {
		return;
	}else{
		if (isMore) {
			$("#pay-list").find("dd").remove();
			var ptHtml = "";
			if ( ptGoods.length > 0) {
				ptHtml +="<dd>";
				ptHtml +="<div class=\"name\">普通商品（"+ptGoods.length+"件）</div>";
				ptHtml +="<div class=\"flex\">";
				ptHtml +="<ul class=\"slides\">";
				var ptGoodsHtml = "";
				var liPt = "";
				for (var i = 0; i < ptGoods.length; i++) {
					var goodsHtml = "";
					if (ptGoods.length > 4) {
						liPt += "<a href=\""+ptGoods[i].goodsUrl+"\" title=\""+ptGoods[i].goodsName+"\" class=\"item\">";
						liPt += "<img src=\""+ptGoods[i].goodsPicUrl+"\"/>";
						liPt += "</a>";
						if (i == 3) {
							goodsHtml = "<li  style=\"display:block;\">"+liPt+"</li>";
							liPt = "";
						}else if((i+1)%4 == 0 || (i+1)-ptGoods.length==0){
							goodsHtml = "<li >"+liPt+"</li>";
							liPt = "";
						}
					}else{
						liPt += "<a href=\""+ptGoods[i].goodsUrl+"\" title=\""+ptGoods[i].goodsName+"\" class=\"item\">";
						liPt += "<img src=\""+ptGoods[i].goodsPicUrl+"\"/>";
						liPt += "</a>";
						if ((i+1)-ptGoods.length==0) {
							goodsHtml = "<li  style=\"display:block;\">"+liPt+"</li>";
							liPt = "";
						}
					}
					ptGoodsHtml += goodsHtml;
				}
				ptHtml += ptGoodsHtml;
				ptHtml += "</ul>";
				ptHtml +="<ul class=\"flex-direction-nav\">";
				ptHtml +="<li>";
				ptHtml +="<a class=\"prev\" href=\"#\" style=\"display: none;\">←</a>";
				ptHtml +="</li>";
				ptHtml +="<li>";
				ptHtml +="<a class=\"next\" href=\"#\" style=\"display: none;\">→</a>";
				ptHtml +="</li>";
				ptHtml +="</ul>";
				ptHtml += "</div>";
				ptHtml += "<button type=\"button\"  onclick=\"payCart(0)\" class=\"btn btn-secondary pay\">结 算</button>";
				ptHtml += "</dd>";
			}
			
			var dzkHtml = "";
			if ( dzkGoods.length > 0) {
				dzkHtml +="<dd>";
				dzkHtml +="<div class=\"name\">    i百联提货卡（电子）（"+dzkGoods.length+"件）</div>";
				dzkHtml +="<div class=\"flex\">";
				dzkHtml +="<ul class=\"slides\">";
				var dzkGoodsHtml = "";
				var liDzk = "";
				for (var i = 0; i < dzkGoods.length; i++) {
					var goodsHtml = "";
					if (dzkGoods.length > 4) {
						liDzk += "<a href=\""+dzkGoods[i].goodsUrl+"\" title=\""+dzkGoods[i].goodsName+"\" class=\"item\">";
						liDzk += "<img src=\""+dzkGoods[i].goodsPicUrl+"\"/>";
						liDzk += "</a>";
						if (i == 3) {
							goodsHtml = "<li  style=\"display:block;\">"+liDzk+"</li>";
							liDzk= "";
						}else if((i+1)%4 == 0 || (i+1)-dzkGoods.length==0){
							goodsHtml = "<li >"+liDzk+"</li>";
							liDzk="";
						}
					}else{
						liDzk += "<a href=\""+dzkGoods[i].goodsUrl+"\" title=\""+dzkGoods[i].goodsName+"\" class=\"item\">";
						liDzk += "<img src=\""+dzkGoods[i].goodsPicUrl+"\"/>";
						liDzk += "</a>";
						if ((i+1)-dzkGoods.length==0) {
							goodsHtml = "<li  style=\"display:block;\">"+liDzk+"</li>";
							liDzk="";
						}
					}
					dzkGoodsHtml += goodsHtml;
				}
				dzkHtml += dzkGoodsHtml;
				dzkHtml += "</ul>";
				dzkHtml +="<ul class=\"flex-direction-nav\">";
				dzkHtml +="<li>";
				dzkHtml +="<a class=\"prev\" href=\"#\" style=\"display: none;\">←</a>";
				dzkHtml +="</li>";
				dzkHtml +="<li>";
				dzkHtml +="<a class=\"next\" href=\"#\" style=\"display: none;\">→</a>";
				dzkHtml +="</li>";
				dzkHtml +="</ul>";
				dzkHtml += "</div>";
				dzkHtml += "<button type=\"button\"  onclick=\"payCart(3)\" class=\"btn btn-secondary pay\">结 算</button>";
				dzkHtml += "</dd>";
			}
			

			
			var stkHtml = "";
			if (stkGoods.length > 0) {
				stkHtml +="<dd>";
				stkHtml +="<div class=\"name\">百联卡（实体）（"+stkGoods.length+"件）</div>";
				stkHtml +="<div class=\"flex\">";
				stkHtml +="<ul class=\"slides\">";
				var stkGoodsHtml = "";
				var liStk="";
				var stkPic = 0;
				for (var i = 0; i < stkGoods.length; i++) {
					var goodsHtml = "";
					if (stkGoods.length > 4) {
						liStk += "<a href=\""+stkGoods[i].goodsUrl+"\" title=\""+stkGoods[i].goodsName+"\" class=\"item\">";
						liStk += "<img src=\""+stkGoods[i].goodsPicUrl+"\"/>";
						liStk += "</a>";
						stkPic += stkGoods[i].totalPrice*1;
						if (i == 3) {
							goodsHtml = "<li  style=\"display:block;\">"+liStk+"</li>";
							liStk="";
						}else if((i+1)%4 == 0 || (i+1)-stkGoods.length==0){
							goodsHtml = "<li >"+liStk+"</li>";
							liStk="";
						}
					}else{
						liStk += "<a href=\""+stkGoods[i].goodsUrl+"\" title=\""+stkGoods[i].goodsName+"\" class=\"item\">";
						liStk += "<img src=\""+stkGoods[i].goodsPicUrl+"\"/>";
						liStk += "</a>";
						stkPic += stkGoods[i].totalPrice*1;
						if ((i+1)-stkGoods.length==0) {
							goodsHtml = "<li  style=\"display:block;\">"+liStk+"</li>";
							liStk="";
						}
					}
					stkGoodsHtml += goodsHtml;
				}
				stkHtml += stkGoodsHtml;
				stkHtml += "</ul>";
				stkHtml +="<ul class=\"flex-direction-nav\">";
				stkHtml +="<li>";
				stkHtml +="<a class=\"prev\" href=\"#\" style=\"display: none;\">←</a>";
				stkHtml +="</li>";
				stkHtml +="<li>";
				stkHtml +="<a class=\"next\" href=\"#\" style=\"display: none;\">→</a>";
				stkHtml +="</li>";
				stkHtml +="</ul>";
				stkHtml += "</div>";
				if (stkPic > 10000) {
					stkTrue = true;
				}
				stkHtml += "<button type=\"button\" onclick=\"payCart(4)\"  class=\"btn btn-secondary pay\">结 算</button>";
				stkHtml += "</dd>";
			}
			
			var blkHtml = "";
			if ( blkGoods.length > 0) {
				blkHtml +="<dd>";
				blkHtml +="<div class=\"name\">    百联卡（电子）（"+blkGoods.length+"件）</div>";
				blkHtml +="<div class=\"flex\">";
				blkHtml +="<ul class=\"slides\">";
				var blkGoodsHtml = "";
				var liDzk = "";
				var blkPic = 0;
				for (var i = 0; i < blkGoods.length; i++) {
					var goodsHtml = "";
					if (blkGoods.length > 4) {
						liDzk += "<a href=\""+blkGoods[i].goodsUrl+"\" title=\""+blkGoods[i].goodsName+"\" class=\"item\">";
						liDzk += "<img src=\""+blkGoods[i].goodsPicUrl+"\"/>";
						liDzk += "</a>";
						blkPic += blkGoods[i].totalPrice*1;
						if (i == 3) {
							goodsHtml = "<li  style=\"display:block;\">"+liDzk+"</li>";
							liDzk= "";
						}else if((i+1)%4 == 0 || (i+1)-blkGoods.length==0){
							goodsHtml = "<li >"+liDzk+"</li>";
							liDzk="";
						}
					}else{
						liDzk += "<a href=\""+blkGoods[i].goodsUrl+"\" title=\""+blkGoods[i].goodsName+"\" class=\"item\">";
						liDzk += "<img src=\""+blkGoods[i].goodsPicUrl+"\"/>";
						liDzk += "</a>";
						blkPic += blkGoods[i].totalPrice*1;
						if ((i+1)-blkGoods.length==0) {
							goodsHtml = "<li  style=\"display:block;\">"+liDzk+"</li>";
							liDzk="";
						}
					}
					blkGoodsHtml += goodsHtml;
				}
				blkHtml += blkGoodsHtml;
				blkHtml += "</ul>";
				blkHtml +="<ul class=\"flex-direction-nav\">";
				blkHtml +="<li>";
				blkHtml +="<a class=\"prev\" href=\"#\" style=\"display: none;\">←</a>";
				blkHtml +="</li>";
				blkHtml +="<li>";
				blkHtml +="<a class=\"next\" href=\"#\" style=\"display: none;\">→</a>";
				blkHtml +="</li>";
				blkHtml +="</ul>";
				blkHtml += "</div>";
				blkHtml += "<button type=\"button\"  onclick=\"payCart(5)\" class=\"btn btn-secondary pay\">结 算</button>";
				blkHtml += "</dd>";
				if (blkPic > 10000) {
					blkTrue = true;
				}
			}			
			var zyHtml = "";
			for (var j = 0; j < zyGoods.length; j++) {
				var zyList = zyGoods[j];
				if (zyList.length > 0) {
					zyHtml +="<dd>";
					zyHtml +="<div class=\"name\">"+zyList[0].pName+"（"+zyList.length+"件）</div>";
					zyHtml +="<div class=\"flex\">";
					zyHtml +="<ul class=\"slides\">";
					var zyGoodsHtml = "";
					var lizy="";
					var zyPic = 0;
					var zyGroupId="";
					for (var i = 0; i < zyList.length; i++) {
						var goodsHtml = "";
						zyGroupId = zyList[i].groupId;
						if (zyList.length > 4) {
							lizy += "<a href=\""+zyList[i].goodsUrl+"\" title=\""+zyList[i].goodsName+"\" class=\"item\">";
							lizy += "<img src=\""+zyList[i].goodsPicUrl+"\"/>";
							lizy += "</a>";
							zyPic += zyList[i].totalPrice*1;
							if (i == 3) {
								goodsHtml = "<li  style=\"display:block;\">"+lizy+"</li>";
								lizy="";
							}else if((i+1)%4 == 0 || (i+1)-zyList.length==0){
								goodsHtml = "<li >"+lizy+"</li>";
								lizy="";
							}
						}else{
							lizy += "<a href=\""+zyList[i].goodsUrl+"\" title=\""+zyList[i].goodsName+"\" class=\"item\">";
							lizy += "<img src=\""+zyList[i].goodsPicUrl+"\"/>";
							lizy += "</a>";
							zyPic += zyList[i].totalPrice*1;
							if ((i+1)-zyList.length==0) {
								goodsHtml = "<li  style=\"display:block;\">"+lizy+"</li>";
								lizy="";
							}
						}
						zyGoodsHtml += goodsHtml;
					}
					zyHtml += zyGoodsHtml;
					zyHtml += "</ul>";
					zyHtml +="<ul class=\"flex-direction-nav\">";
					zyHtml +="<li>";
					zyHtml +="<a class=\"prev\" href=\"#\" style=\"display: none;\">←</a>";
					zyHtml +="</li>";
					zyHtml +="<li>";
					zyHtml +="<a class=\"next\" href=\"#\" style=\"display: none;\">→</a>";
					zyHtml +="</li>";
					zyHtml +="</ul>";
					zyHtml += "</div>";
					if (zyPic > 2000) {
						zyTrue = true;
					}
					zyHtml += "<button type=\"button\" onclick=\"payCart(1,'"+zyGroupId+"')\" class=\"btn btn-secondary pay\">结 算</button>";
					zyHtml += "</dd>";
				}
			}
			
			var bsHtml = "";
			for (var j = 0; j < bsGoods.length; j++) {
				var bsList = bsGoods[j];
				if (bsList.length > 0) {
					bsHtml +="<dd>";
					bsHtml +="<div class=\"name\">"+bsList[0].pName+"（"+bsList.length+"件）</div>";
					bsHtml +="<div class=\"flex\">";
					bsHtml +="<ul class=\"slides\">";
					var bsGoodsHtml = "";
					var libs="";
					var bsPic = 0;
					var bsGroupId = "";
					for (var i = 0; i < bsList.length; i++) {
						bsGroupId = bsList[i].groupId;
						var goodsHtml = "";
						if (bsList.length > 4) {
							libs += "<a href=\""+bsList[i].goodsUrl+"\" title=\""+bsList[i].goodsName+"\" class=\"item\">";
							libs += "<img src=\""+bsList[i].goodsPicUrl+"\"/>";
							libs += "</a>";
							bsPic += bsList[i].totalPrice*1;
							if (i == 3) {
								goodsHtml = "<li  style=\"display:block;\">"+libs+"</li>";
								libs="";
							}else if((i+1)%4 == 0 || (i+1)-bsList.length==0){
								goodsHtml = "<li >"+libs+"</li>";
								libs="";
							}
						}else{
							libs += "<a href=\""+bsList[i].goodsUrl+"\" title=\""+bsList[i].goodsName+"\" class=\"item\">";
							libs += "<img src=\""+bsList[i].goodsPicUrl+"\"/>";
							libs += "</a>";
							bsPic += bsList[i].totalPrice*1;
							if ((i+1)-bsList.length==0) {
								goodsHtml = "<li  style=\"display:block;\">"+libs+"</li>";
								libs="";
							}
						}
						bsGoodsHtml += goodsHtml;
					}
					bsHtml += bsGoodsHtml;
					bsHtml += "</ul>";
					bsHtml +="<ul class=\"flex-direction-nav\">";
					bsHtml +="<li>";
					bsHtml +="<a class=\"prev\" href=\"#\" style=\"display: none;\">←</a>";
					bsHtml +="</li>";
					bsHtml +="<li>";
					bsHtml +="<a class=\"next\" href=\"#\" style=\"display: none;\">→</a>";
					bsHtml +="</li>";
					bsHtml +="</ul>";
					bsHtml += "</div>";
					if (bsPic > 2000) {
						bsTrue = true;
					}
					bsHtml += "<button type=\"button\" onclick=\"payCart(2,'"+bsGroupId+"')\"  class=\"btn btn-secondary pay\">结 算</button>";
					bsHtml += "</dd>";
				}
			}
			var allHtml = "";
			if (ptGoods.length > 0) {
				allHtml += ptHtml;
			}
			if (dzkGoods.length > 0) {
				allHtml += dzkHtml;
			}
			if (stkGoods.length > 0) {
				allHtml += stkHtml;
			}
			if (zyGoods.length > 0 && zyGoods[0].length > 0) {
				allHtml += zyHtml;
			}
			if (bsGoods.length > 0 && bsGoods[0].length > 0) {
				allHtml += bsHtml;
			}
			if (blkGoods.length > 0) {
				allHtml += blkHtml;
			}
			var msg = "";
			if (zyTrue||bsTrue) {
				if (stkTrue) {
					msg += "全球购单笔订单总价不可超过￥2000.00/<br/>";
				}else{
					msg += "全球购单笔订单总价不可超过￥2000.00";
				}
			}
			if (stkTrue) {
				msg += "百联卡（实体）单笔订单最高不能超过￥10000.00"
			}
			if (blkTrue) {
				msg += "百联卡（电子）单笔订单最高不能超过￥10000.00"
			}
			if (stkTrue||zyTrue||bsTrue||blkTrue) {
				$("#deletenull-message").find("div.name").html(msg);
				$("#deletenull-message").popbox({title:'提示'});
			}else{
				$("#pay-list").find("dl").html(allHtml);
				$(".item-flex").flexslider({controlNav: false});
			     $(".flex").flexslider({controlNav: false});
				$("#pay-list").popbox({title:'结算'});
			}
		}else{
			if (a == 1) {
				payCart(0);
			}
			if (b == 1) {
				var sumPic = 0 ;
				$(".cart-table-list").each(function(){
					$(this).find(".item").each(function(){
						if ($(this).find("[name=checked]").val()=="true") {
							sumPic += $(this).find("[name=totalPrice]").val()*1;
						}
					});
				});
				if (sumPic > 2000) {
					$("#deletenull-message").find("div.name").html("全球购单笔订单总价不可超过 ￥2000.00");
	    			 $("#deletenull-message").popbox({title:'提示'});
				}else{
					var zyGroup = zyGoods[0];
					payCart(1,zyGroup[0].groupId);		
				}
			}
			if (c == 1) {
				var sumPic = 0 ;
				$(".cart-table-list").each(function(){
					$(this).find(".item").each(function(){
						if ($(this).find("[name=checked]").val()=="true") {
							sumPic += $(this).find("[name=totalPrice]").val()*1;
						}
					});
				});
				if (sumPic > 2000) {
					$("#deletenull-message").find("div.name").html("全球购单笔订单总价不可超过 ￥2000.00");
					$("#deletenull-message").popbox({title:'提示'});
				}else{
					var bsGroup = bsGoods[0];
					payCart(2,bsGroup[0].groupId);
				}
			}
			if (d == 1) {
				payCart(3);
			}
			if (e == 1) {
				var sumPic = 0 ;
				$(".cart-table-list").each(function(){
					$(this).find(".item").each(function(){
						if ($(this).find("[name=checked]").val()=="true") {
							sumPic += $(this).find("[name=totalPrice]").val()*1;
						}
					});
				});
				if (sumPic > 10000) {
					$("#deletenull-message").find("div.name").html("百联卡（实体）单笔订单最高不能超过￥10000.00");
	    			 $("#deletenull-message").popbox({title:'提示'});
				}else{
					payCart(4);
				}
			}
			if (f == 1) {
				var sumPic = 0 ;
				$(".cart-table-list").each(function(){
					$(this).find(".item").each(function(){
						if ($(this).find("[name=checked]").val()=="true") {
							sumPic += $(this).find("[name=totalPrice]").val()*1;
						}
					});
				});
				if (sumPic > 10000) {
					$("#deletenull-message").find("div.name").html("百联卡（电子）单笔订单最高不能超过￥10000.00");
	    			 $("#deletenull-message").popbox({title:'提示'});
				}else{
					payCart(5);
				}
			}
		}
	}
}

function payCart(type,groupId){
	var goodsWeb = new Object();
	var goodsList = new Array();
	var selectcart = new Array();
	var addressInfo = new Object();  
	var  orderAmount = 0;
	var orderPay = 0;
	var isNotLKgoods = true;
	var isNotDZK=false;
	$(".cart-table-list").each(function() {
		var newOrderAmount = 0;
		var x = 0;
		$(this).find(".item").each(function() {
			if ($(this).find("[name=checked]").val() == "true" && $(this).find(".goodsType").val() == type) {
				var good = new Object();
				$(this).find(".goods").each(function() {
					good[$(this).attr('name')] = $(this).val();
					if ($(this).attr('name') == "type" && $(this).val()=="6") {
						isNotLKgoods = false;
					}
				});
				good.goodsName="";
				if (type == 2||type == 1) {
					if (good.groupId == groupId) {
						goodsList.push(good);
						if (x==0) {
							orderAmount +=$(this).parents("ul").find("[name = orderAmount]").val()*1;
							orderPay +=$(this).parents("ul").find("[name = orderPay]").val()*1;
							x = 1;
						}
					}
				}else{
					goodsList.push(good);
					if (x==0) {
						orderAmount +=$(this).parents("ul").find("[name = orderAmount]").val()*1;
						orderPay +=$(this).parents("ul").find("[name = orderPay]").val()*1;
						x = 1;
					}
				}
			}

		});
	});

	if (!goodsList.length > 0) {
		return;
	}
	addressInfo.province = $(".provinceId").val();
	addressInfo.city = $(".cityId").val();
	addressInfo.district = $(".districtId").val();
	goodsWeb.addressInfo = addressInfo;
	goodsWeb.orderAmount=(orderAmount).toFixed(2);
	goodsWeb.orderPay=(orderPay).toFixed(2);
	goodsWeb.goodsList = goodsList;
	$.ajax({
		 type: "POST",
		 data: $.toJSON(goodsWeb),
		 dataType:"json",
	     contentType: "application/json",
	     url: domain.cart + "/nj/nl/submitShoppingCart.html",
	     async:false,
	      error:function(data){
	     	alert(data);
	     },
	     success:function(data){
	    	 if (null == data) {
	    		 $("#pop-close").click();
	    		 setTimeout(function(){
	    			 $("#deletenull-message").find("div.name").html("提交结算失败");
						$("#deletenull-message").popbox({title:'提示'});
						},1000); 
	    		 return;
			}
	    	if (data.resultCode == "200") {
			    $("body").append('<form id="orderForm" action="" method="post"><input id="goodsList" name="goodsList" type="hidden"></form>');
	    		$("#goodsList").val($.toJSON(goodsWeb));
	    		var addUrl = "";
	    		if (bl_mmc!=undefined && bl_mmc != "") {
					addUrl +="?bl_mmc="+bl_mmc;
				}
	    		if (bl_ad!=undefined && bl_ad != "") {
	    			if (bl_mmc!=undefined && bl_mmc != "") {
	    				addUrl +="&bl_ad="+bl_ad;
					}else{
						addUrl +="?bl_ad="+bl_ad;
					}
				}
				 $("#orderForm").attr("action", domain.cart+"/new/nl/neworderConfirm.html"+addUrl);  // "/nl/orderConfirm.html"
				 if (data.resultInfo.pricechange == true) {
					 $("#pop-close").click();
					 setTimeout(function(){
						 $("#pay-message-1").find("div.name").html(data.resultMsg);
						 $("#pay-message-1").popbox({title:'结算'});
							},1000); 
				 }else{
					 $("#orderForm").submit();
				 }
	    	} else if (data.resultCode == "0002") {
	    		if($("#rside").length > 0){
					$(this).attr("href","javascript:;");
					$("#rsidein>div:eq(0)").click();
					event=event?event:window.event;
					event.cancelBubble=true;
					event.stopImmediatePropagation();
					event.stopPropagation();
				}else{
					$("#btnTag").val("submitCart");
					login();
					//window.location.href = domain.passport + '/loginDisplay.html'+'?returnurl='+domain.cart +'/shoppingCartList.html';
				}
	    		
	    	}else if(data.resultCode == "400112099"){
	    		var goodsListErro = new Array();
	    		var noStockGoodsList = data.resultInfo.noStockGoodsList;
	    		var offShelfGoodsList = data.resultInfo.offShelfGoodsList;
	    		var exceedNumGoodsList = data.resultInfo.exceedNumGoodsList;
	    		for (var t = 0; t < noStockGoodsList.length; t++) {
	    			goodsListErro.push(noStockGoodsList[t]);
				}
	    		for (var p = 0; t < offShelfGoodsList.length; t++) {
	    			goodsListErro.push(offShelfGoodsList[p]);
				}
	    		for(var e = 0; e<exceedNumGoodsList.length;e++){
	    			goodsListErro.push(exceedNumGoodsList[e]);
	    		}
	    		var erroHtml = "";
	    		for (var b = 0; b < goodsListErro.length; b++) {
	    			var erroGoods = goodsListErro[b];
					if (b%4==0||b==0) {
						if (b==0) {
							erroHtml += "<li style=\"display:block;\">";
						}else{
							erroHtml += "<li>";
						}
					}
					if(erroGoods.goodsType == "15" ){
						erroHtml += "<a class=\"item\" title=\"\" href=\""+"javascript:void(0);"+"\" >";
						isNotDZK = true;
					}else{
						erroHtml += "<a class=\"item\" title=\"\" href=\""+erroGoods.goodsUrl+"\" >";						
					}
					erroHtml += "<img src="+erroGoods.goodsPicUrl+" />";
					erroHtml += "</a>";
					if ((b!=0&&b%3==0)||b+1==goodsListErro.length) {
						erroHtml += "</li>"
					}
				}
	    		 $("#pop-close").click();
	    		 var buttonHtml = "";
	    		 if ( data.resultInfo.effectiveGoodsList.length > 0 &&isNotLKgoods) {
	    			buttonHtml += "<button type=\"button\" class=\"btn btn-greysubmit\" onclick=\"loadShoppingCart()\">返回购物车修改</button>";
	    			if(isNotDZK){
	    				
	    			}else{
	    				buttonHtml += "<button type=\"button\" class=\"btn btn-secondary\" onclick=\"$('#orderForm').submit()\">移除无货商品</button>";  				
	    			}
	    			$("#pay-message-2").find("div.pop-alert").find("div.txt").html(" 温馨提示：以下商品/赠品部分无货或超出可购数量");
	    			 $("body").append('<form id="orderForm" action="" method="post"><input id="goodsList" name="goodsList" type="hidden"></form>');
	    			 var addUrl = "";
	 	    		if (bl_mmc!=undefined && bl_mmc != "") {
	 					addUrl +="?bl_mmc="+bl_mmc;
	 				}
	 	    		if (bl_ad!=undefined && bl_ad != "") {
	 	    			if (bl_mmc!=undefined && bl_mmc != "") {
	 	    				addUrl +="&bl_ad="+bl_ad;
	 					}else{
	 						addUrl +="?bl_ad="+bl_ad;
	 					}
	 				}
	    			 $("#orderForm").attr("action", domain.cart+"/new/nl/neworderConfirm.html"+addUrl);  // "/nl/orderConfirm.html"
	    			 goodsWeb.goodsList = data.resultInfo.effectiveGoodsList;
	    			 goodsWeb.quickBuyFlag = 1;
	    			 $("#goodsList").val($.toJSON(goodsWeb));
				}else if (data.resultInfo.effectiveGoodsList.length > 0 && !isNotLKgoods) {
					buttonHtml += "<button type=\"button\" class=\"btn btn-greysubmit\" onclick=\"loadShoppingCart()\">返回购物车修改</button>";
					$("#pay-message-2").find("div.pop-alert").find("div.txt").html(" 温馨提示：以下商品/赠品部分无货或超出可购数量");
				}else{
					buttonHtml += "<button type=\"button\" class=\"btn btn-greysubmit\" onclick=\"loadShoppingCart()\">返回购物车修改</button>";
					$("#pay-message-2").find("div.pop-alert").find("div.txt").html(" 温馨提示：以下商品/赠品暂时无货或超出可购数量");
				}
	    		 $("#pay-message-2").find("div.line-center").html(buttonHtml);
	    		 $("#pay-message-2").find("ul.slides").html(erroHtml);
				 setTimeout(function(){
					 $("#pay-message-2").popbox({title:'结算'});
						},1000); 
		     }else{
		    	 $("#pop-close").click();
		    	 $("#deletenull-message").find("div.name").html(data.resultMsg);
	    		 setTimeout(function(){
	 				$("#deletenull-message").popbox({title:'提示'});
						},1000); 
	    		
				return;
		     }
	     }
	   }); 
}
function delNoGoods(){
	 var goodsList = new Array();
	 $(".no-item").each(function(){
		 var good = new Object();
		 $(this).parents(".item").find(".goods").each(function(){
		        good[$(this).attr("name")] = $(this).val();
	      });
		   goodsList.push(good);
		   $(this).parents("li").remove();
	});
	 if (goodsList.length > 0) {
		 var goodsWeb = new Object();
		  goodsWeb.goodsList = goodsList;
		  goodsWeb.tag = 1;
		  updateCart(goodsWeb);
		  $("#deletenull-message").find("div.name").html("成功清除"+goodsList.length+"件失效商品!");
			$("#deletenull-message").popbox({title:'提示'});
	}else{
		$("#deletenull-message").find("div.name").html("暂无失效商品!");
		$("#deletenull-message").popbox({title:'提示'});
	}
}

function downZhtc(str,goodsId,goodsNumber){
	clearTimeout(updateTime);
	var number = goodsNumber - 1;
	if (number == 1) {
		$(str).attr("class","reduce disable");
	}
	if (number > 0) {
		$(str).parent().find("input").val(number);
		$(str).parents("li").find("[name=goodsNumber]").val(number);
		var goodsList = new Array();
		var goods = new Object();
		$(str).parents("li").find(".goods").each(function(){
			goods[$(this).attr('name')] = $(this).val();
		});
		$(str).parents("li").find("[name=checked]").val(true);
		goods.goodsName="";
		goodsList.push(goods);
		var goodsWeb = new Object();
		goodsWeb.goodsList = goodsList;
		goodsWeb.tag = 3;
		updateTime = setTimeout(function(){
			updateCart(goodsWeb);
				},500); 
	}
}

function inputZhtc(str,goodsId,goodsNumber){
	clearTimeout(updateTime);
	var number = $(str).val();
	var reg = new RegExp("^[0-999]*$");
	if(!reg.test(number)){
		$(str).val($(str).parents("li").find("[name=goodsNumber]").val());
	}else{
		var stro = $(str).parents("li").find("[name=stor]").val()*1;
		var limitBuySum = $(str).parents("li").find("[name=limitBuySum]").val()*1
		if (number > limitBuySum && limitBuySum > 0 ) {
			$(str).parents(".number-box").find(".error").remove();
			var html  = "<div class=\"error\">最多只能购买"+limitBuySum+"件</div>";
			$(str).parent().after(html);
			 $(str).val($(str).parents("li").find("[name=goodsNumber]").val());
		}else if(number > stro && stro<99 ){
			$(str).parents(".number-box").find(".error").remove();
			var html  = "<div class=\"error\">最多只能购买"+stro+"件</div>";
			$(str).parent().after(html);
			 $(str).val($(str).parents("li").find("[name=goodsNumber]").val());
		}else if(number > 99 && stro>99 ){
			$(str).parents(".number-box").find(".error").remove();
			var html  = "<div class=\"error\">最多只能购买99件</div>";
			$(str).parent().after(html);
			 $(str).val($(str).parents("li").find("[name=goodsNumber]").val());
		}else{
			if (number > 0 ) {
				if (number > 99) {
					number = 99;
					$(str).parent().find(".add").attr("class","add  disable");
				}else if(number == 1){
					$(str).parent().find(".reduce").attr("class","reduce  disable");
				}
				$(str).val(number);
				$(str).parents("li").find("[name=goodsNumber]").val(number);
				var goodsList = new Array();
				var goods = new Object();
				$(str).parents("li").find(".goods").each(function(){
					goods[$(this).attr('name')] = $(this).val();
				});
				$(str).parents("li").find("[name=checked]").val(true);
				goods.goodsName="";
				goodsList.push(goods);
				var goodsWeb = new Object();
				goodsWeb.goodsList = goodsList;
				goodsWeb.tag = 3;
				updateTime = setTimeout(function(){
					updateCart(goodsWeb);
						},500); 
			}else{
				$(str).val($(str).parents("li").find("[name=goodsNumber]").val());
			}
		}
	}
}

function upZhtc(str,goodsId,goodsNumber){
	clearTimeout(updateTime);
	var number = goodsNumber + 1;
	if (number > 99) {
		number = 99;
		$(str).attr("class","add disable");
	}
	var stro = $(str).parents("li").find("[name=stor]").val()*1;
	var limitBuySum = $(str).parents("li").find("[name=limitBuySum]").val()*1
	if (number > limitBuySum && limitBuySum > 0 ) {
		$(str).parents(".number-box").find(".error").remove();
		var html  = "<div class=\"error\">最多只能购买"+limitBuySum+"件</div>";
		$(str).parent().after(html);
	}else if(number > stro){
		$(str).parents(".number-box").find(".error").remove();
		var html  = "<div class=\"error\">最多只能购买"+stro+"件</div>";
		$(str).parent().after(html);
	}else{
		$(str).parent().find("input").val(number);
		$(str).parents("li").find("[name=goodsNumber]").val(number);
		var goodsList = new Array();
		var goods = new Object();
		$(str).parents("li").find(".goods").each(function(){
			goods[$(this).attr('name')] = $(this).val();
		});
		$(str).parents("li").find("[name=checked]").val(true);
		goods.goodsName="";
		goodsList.push(goods);
		var goodsWeb = new Object();
		goodsWeb.goodsList = goodsList;
		goodsWeb.tag = 3;
		updateTime = setTimeout(function(){
			updateCart(goodsWeb);
				},500); 
	}
}

function addFavoriteZHTC(str){
	if ($(".login-message").html() != undefined) {
		login();
		return;
	}
	var goodsId =  $(str).parents("li").find("[name=goodsId]").val();
	var url = "/favorite/joinFavorite.html";
	$.ajax({
		url : url + "?goodsId="+goodsId,
		success:function(data){
			if (null == data) {
				alert("网络超时，请重试");
				return;
			}
			if(data.resCode == "0002"){
				window.location.href = domain.passport+'/loginDisplay.html?requestUrl='+encodeURIComponent(window.location.href);
				return;
			}else{
				$('a.add-favourite').poshytip({
			       	content:'<div class="icon-cart"></div><div class="collect-txt">已移入收藏夹</div>',
				      className: 'tip-yellow',
				      alignTo: 'target',
				      alignX: 'center',
				      showOn:	'none',
				      offsetX: 0,
				      offsetY: 5,
				      showTimeout: 100
			      });
				 $(str).poshytip('show').poshytip('hideDelayed', 1500); 
				var goodsList = new Array();
				var good = new Object();
				$(str).parents("li").find(".goods").each(function() {
						good[$(this).attr('name')] = $(this).val();
				});
				good.goodsName="";
				goodsList.push(good);
				var goodsWeb = new Object();
				goodsWeb.goodsList = goodsList;
				goodsWeb.tag = 1;
				setTimeout(function(){
					$(str).parents("li").remove();
					updateCart(goodsWeb);
					},2000); 
			}
		},error:function(){
			alert("网络超时，请重试","提示");
		}
	});
}
function removeGoodsZHTC(str){
	var goodsList = new Array();
	var good = new Object();
	$(str).parents("li").find(".goods").each(function(){
		good[$(this).attr("name")] = $(this).val();
	});
	good.goodsName="";
	goodsList.push(good);
	$(str).parents("li").remove();
	var goodsWeb = new Object();
	goodsWeb.goodsList = goodsList;
	goodsWeb.tag = 1;
	updateCart(goodsWeb);
}

function calcFastCart(goodsWeb,str,ty){
	$.ajax({
		type : "POST",
		data : $.toJSON(goodsWeb),
		dataType : "json",
		contentType : "application/json",
		url : domain.cart + "/nj/calcCartFast.html",
		async : true,
		success : function(data) {
			if (data.resultInfo != null && data.resultCode == "200") {
				//顶部结算
				$("#orderAmount").val((data.resultInfo.orderAmount*1).toFixed(2));
				//尾部结算
				$(".pay-line").find("div.price-line").find("span.price").html("<i>&#165;</i><strong>"+(data.resultInfo.orderAmount*1).toFixed(2)+"</strong>");
				//尾部的商品总数
				$(".item-show").find("span").html(data.resultInfo.totalcheckedGoodsNumber);
				$(".totalcheckedGoodsNumber").val(data.resultInfo.totalcheckedGoodsNumber);
				var goodsGroupDtoList = data.resultInfo.goodsGroupDtoList;
				for (var i = 0; i < goodsGroupDtoList.length; i++) {
					var goodsGroupList = goodsGroupDtoList[i].goodsGroupList;
					for (var o = 0; o < goodsGroupList.length; o++) {
						var goodsListdto = goodsGroupList[o].goodsList;
						//遍历商品集合
						for (var j = 0; j < goodsListdto.length; j++) {
							var goods = goodsListdto[j];
							$(str).parents(".number-box").siblings(".price-box").find(".price").html("¥"+(goods.totalPrice*1).toFixed(2));
							$(str).parents(".item ").find("input[name='totalPrice']").val((goods.totalPrice*1).toFixed(2));
							$(str).parents(".item ").find("input[name='goodsOriginalNumber']").val(goods.goodsNumber);
							$(str).parents(".item ").find("input[name='goodsNumber']").val(goods.goodsNumber);
						}
					}
				}
				if(ty != "2"){
				var goods = new Object();
				var goodsWeb = new Object();
				var goodsList = new Array();
				$(str).parents(".item").find(".goods").each(function(){
					goods[$(this).attr('name')] = $(this).val();
				});
				$(str).parents(".item").find("[name=checked]").val(true);			
				goodsList.push(goods);
				goodsWeb.goodsList = goodsList;
				goodsWeb.tag = 3;

				updateTime = setTimeout(function(){
					updateCart(goodsWeb);
						},500); 
				}else{
					calcCart();
				}
				
			}
		}
	});
}
