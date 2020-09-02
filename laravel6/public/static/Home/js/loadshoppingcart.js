
$(function(){
	loadShoppingCart();
	coAddress();
	guessLike();
});
function checkcov_big(v){
	//console.log("==========",v)
	$("#package-add-1 .selarea .cur b").html(v.titmsg);
	var pagegoid = '';
	var typeid = v['type']?"_"+v['type']:"";
	var ruleid = v['ruleId']?"_"+v['ruleId']:"";
	pagegoid = v['goodsId']+typeid+ruleid;
	var oli = "";
	oli+='<li style="" class="sel" id="sel_'+pagegoid+'"><div class="chk_cov" _tgclick="goodsid_'+pagegoid+'"></div>';
	oli+='<div class="pic"><img border="0" width="70" height="70" title="'+v['goodsName']+'" src="'+v['goodsPicUrl']+'" style="display: inline;"></div>';
	oli+='<div class="comment-frame comment-frame-'+pagegoid+'"><div class="price" _price="'+v['showSalePrice']+'">¥'+v['totalPrice']+'</div>';
	oli+='<div class="cbuygood">'+v['goodsNumber']+'</div></div></li>';
	var ofind = "#sel_"+pagegoid;
	$("#basketShopcart").find(ofind).remove();
	$("#basketShopcart").prepend(oli);
	//cov ui init
	covercd.cart_ui();
}
var iscdcov = false;
//初始加载购物车
function loadShoppingCart(str,bigcg){
	$(".pay-form").hide();
	 var goodsIdsAcc="";
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json",
			url : domain.cart + "/nj/loadShoppingCartList.html",
			async : false,
			success : function(data) {
				if(data.cartReqerstDto && data.cartReqerstDto.topPopList.length>0){
					cgbuyshow(data.cartReqerstDto.topPopList)
				}

				if(str != 1){
					$('#pop-close').click();	
				}
				$(".no-points").remove();
				$(".cart-table-name").remove();
				$(".cart-table-list").remove();
				$(".cart-list").remove();
				if (null != data) {
					data = data.cartReqerstDto;
				}
				//购物车中无商品显示内容
				if (data == null || data.totalGoodsAmount == 0) {
					var html = "";
					html +="<div class=\"no-points\">";
					html +="<i></i>";
					html +="<div class=\"message\">购物车快饿扁了 /(ToT)/~~</div>";
					html +="<div class=\"txt\">尝试买些东西再回来看看，快去 <a href=\""+domain.main+"\">i百联首页</a> 挑选商品吧！</div>";
					html +="	</div>";
					$(".cart-head").after(html);
					$(".cart-head").find("div.chk").hide();
					return;
				}
				var goodsIds = "";
				//购物车中SKU商品数量
				$(".cart-title").find("div.name").find("span").html(data.totalGoodsAmount);
				//顶部结算
				$(".cart-title").find("div.pay-message").find("span.price").html("&#165;"+(data.orderPay*1).toFixed(2));
				$("#orderAmount").val((data.orderPay*1).toFixed(2));
				$(".cart-title").find("div.pay-message").find("span.reduce").html("-&#165;"+(data.showOrderDiscount*1).toFixed(2));
				//尾部结算
				$(".pay-line").find("div.price-line").find("span.price").html("<i>&#165;</i><strong>"+(data.orderPay*1).toFixed(2)+"</strong>");
				$(".pay-line").find("div.reduce-line").find("span.black").html("-<i>&#165;</i>"+(data.showOrderDiscount *1).toFixed(2));
				$(".item-show").find("span").html(data.totalcheckedGoodsNumber);
				$(".totalcheckedGoodsNumber").val(data.totalcheckedGoodsNumber);
				//结算按钮
				if (data.orderPay*1 > 0) {
					$(".cart-title").find("button").attr("class","btn btn-secondary");
					$(".pay-line").find("a.pay").attr("class","pay");
				}else{
					$(".cart-title").find("button").attr("class","btn btn-notsecondary");
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
				//shop5标签
				//shopTag(data);
				var goodsGroupDtoList = data.goodsGroupDtoList;
				//遍历商家集合
				var htmlList = "";
				var freight = [];
				for (var i = 0; i < goodsGroupDtoList.length; i++) {
					
					var goodsGroupList = goodsGroupDtoList[i].goodsGroupList;
					var groupDtoHtml = "";
					freight[i] = goodsGroupDtoList[i]['freightImbodyMap'];
//					console.info(goodsGroupList);
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
						if(goodsGroupList[o].popTypeMark == "12"){
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
							goodsIds += goods.goodsId+",";
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
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"proSellBit\" name=\"proSellBit\" value =\""+goods.proSellBit+"\" >";
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"activeCode\" name=\"activeCode\" value =\""+goods.activeCode+"\" >";
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"originalPrice\" name=\"originalPrice\" value =\""+goods.originalPrice+"\" >";
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
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"activityTypeForProm\" name=\"activityTypeForProm\" value =\""+goods.activityTypeForProm+"\" >";
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"activityRuleForProm\" name=\"activityRuleForProm\" value =\""+goods.activityRuleForProm+"\" >";
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"showSalePrice\" name=\"showSalePrice\" value =\""+goods.showSalePrice+"\" >";
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
									if (isMJ || isXY||isMLJ) {
										if (goods.proSellBit == "4" && goods.stor*1 > 0) {
											if(goods.priceType == "18"){
												goodsHtml += "<div class=\"no-item\">失效</div>";
											}else{
												goodsHtml += "<div class='chk goodsid_"+pagegoid+"' onclick='checkBox(this)'>";
											}
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
									if(goods.goodsName != undefined || goods.goodsName != null ){
										if (goods.goodsName.length > 30) {
											goodsName = goods.goodsName.substr(0,30)+"...";
										}else{
											goodsName = goods.goodsName;
										}
									}
									//goodsHtml += "<a target=\"blank\" href=\""+goods.goodsUrl+"\" title=\""+goods.goodsName+"\">"+goodsName+"</a>";

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
//									if (isMJ || isXY) {
										if (goods.proSellBit == "4" ) {
											if (goods.goodsType == "15") {
												goodsHtml += "<a class=\"add-favourite\" href=\"javascript:void(0);\" onclick=\"\"></a> <br />";
											}else{
												goodsHtml += "<a class=\"add-favourite\" href=\"javascript:void(0);\" onclick=\"addFavorite(this)\">移入收藏夹</a> <br />";											
											}
										}
										if(goods.type=="16"){
											goodsHtml += "<a class='delete goodsid_"+pagegoid+"'' href='javascript:void(0);' onclick='removeGoods(this)'>删除</a>";
										}else{
											goodsHtml += "<a class=\"delete\" href=\"javascript:void(0);\" onclick=\"removeGoods(this)\">删除</a>";
										}
										
//									}
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
//															goodsHtml +=" <a href=\""+domain.search+"/fr/"+popList.activityId+".html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
															goodsHtml +=" <a href=\""+domain.search+"/fr/0.html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
														}else if(popList.popType  == "2"){
															goodsHtml += " 已优惠"+goodsGroupList[o].showOrderDiscount+"元";
//															goodsHtml +=" <a href=\""+domain.search+"/fr/"+popList.activityId+".html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
															goodsHtml +=" <a href=\""+domain.search+"/fr/0.html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
														}else if(popList.popType  == "6"){
															goodsHtml += " 可领取赠品";
														}
													}else{
														goodsHtml += " 未满足促销条件";
														if(popList.popType  != "6"){
//															goodsHtml +=" <a href=\""+domain.search+"/fr/"+popList.activityId+".html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">去凑单 ></a>";
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
//												mzHtml+=" <div class=\"price\">¥400.00</div>";
//												mzHtml+=" <div class=\"number\">x1</div>";
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
//												mzHtml+=" <div class=\"price\">¥400.00</div>";
//												mzHtml+=" <div class=\"number\">x1</div>";
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
//								console.info(goods);
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
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"promotionMark\" name=\"promotionMark\" value =\""+goods.promotionMark+"\" >";
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"proSellBit\" name=\"proSellBit\" value =\""+goods.proSellBit+"\" >";
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"activeCode\" name=\"activeCode\" value =\""+goods.activeCode+"\" >";
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"originalPrice\" name=\"originalPrice\" value =\""+goods.originalPrice+"\" >";
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
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"activityRuleForProm\" name=\"activityRuleForProm\" value =\""+goods.activityRuleForProm+"\" >";
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"activityTypeForProm\" name=\"activityTypeForProm\" value =\""+goods.activityTypeForProm+"\" >";
									goodsHtml += "<input type = \"hidden\" class=\"goods\" id=\"showSalePrice\" name=\"showSalePrice\" value =\""+goods.showSalePrice+"\" >";
									goodsHtml += "<input type = \"hidden\" class=\"checkedOriginal\" id=\"checkedOriginal\" name=\"checkedOriginal\" value =\""+goods.checked+"\" >";
									goodsHtml += "<input type = \"hidden\" class=\"goodsOriginalNumber\" id=\"goodsOriginalNumber\" name=\"goodsOriginalNumber\" value =\""+goods.goodsNumber+"\" >";

									goodsHtml += "<input type = \"hidden\" class=\"showOrderDiscounto\" name=\"showOrderDiscount\" value =\""+goods.showOrderDiscount+"\" >";
									//0-普通商品;1-直邮;2-保税;3-i百联提货卡（电子）;4-实体卡；5-百联卡（电子）
									if (goodsGroupList[o].groupType == "0" ||goodsGroupList[o].groupType == "7") {
										goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"ptGoods\" name=\"ptGoods\" value =\"0\" >";
									}else if (goodsGroupList[o].groupType == "5" ||goodsGroupList[o].groupType == "75") {
										//直邮
										goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"zyGoods\" name=\"zyGoods\" value =\"1\" >";
									}else if (goodsGroupList[o].groupType == "6" ||goodsGroupList[o].groupType == "76") {
										//保税
										goodsHtml += "<input type = \"hidden\" class=\"goodsType\" id=\"bsGoods\" name=\"bsGoods\" value =\"2\" >";
									}else if (goodsGroupList[o].groupType == "9" ) {
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
										if (goods.proSellBit == "4" && goods.stor*1 > 0) {
										if(goods.priceType == "18"){
											goodsHtml += "<div class=\"chk\"></div>";
											}else{
	//											if(goodsGroupList[o].popDetails == null){
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
										if(goods.type=="16"){
											goodsHtml += "<del>&#165;"+(goods.normalsaleprice).toFixed(2)+"</del>";
											goodsHtml += "<div class=\"price\">&#165;"+(goods.showSalePrice).toFixed(2)+"</div>";
											goodsHtml += "<div class=\"icon\">";
											goodsHtml += "<i class=\"red\">换购价</i>";
										}else{
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
	//												if(goodsGroupList[o].popDetails == null){
													if(goods.popDetails == null){
													goodsHtml += "<em class='reduce' id='reduce_"+pagegoid+"' onclick='downButton(this,2)'>-</em> " ;
													}else{
													goodsHtml += "<em class='reduce' id='reduce_"+pagegoid+"' onclick='downButton(this)'>-</em> " ;
													}	
												}
	//											if(goodsGroupList[o].popDetails == null){
												if(goods.popDetails == null){
													goodsHtml +=	"<input class=\"text\" onchange=\"inputUpdata(this,2)\" type=\"text\" value=\""+goods.goodsNumber+"\" /> ";
												}else{
													goodsHtml +=	"<input class=\"text\" onchange=\"inputUpdata(this)\" type=\"text\" value=\""+goods.goodsNumber+"\" /> ";
												}
												if (goods.goodsNumber*1>= 99) {
													goodsHtml +=	"<em class=\"add disable\" >+</em>";
												}else{
	//												if(goodsGroupList[o].popDetails == null){
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
											goodsHtml += "<a class='delete goodsid_"+pagegoid+"'' href='javascript:void(0);' onclick='removeGoods(this)'>删除</a>";
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
										//促销标签
//										if (goods.globalType == "8" ) {
//											goodsHtml += "<i class=\"global\"></i>";
//										}
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
//										console.info(subGoods);
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
									/***********满赠已选列表************/
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
									/***********满赠已选列表************/
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
//															goodsHtml +=" <a href=\""+domain.search+"/fr/"+popList.activityId+".html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
															goodsHtml +=" <a href=\""+domain.search+"/fr/0.html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
														}else if(popList.popType  == "2"){
															goodsHtml += " 已优惠"+goodsGroupList[o].showOrderDiscount+"元";
//															goodsHtml +=" <a href=\""+domain.search+"/fr/"+popList.activityId+".html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
															goodsHtml +=" <a href=\""+domain.search+"/fr/0.html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">查看活动 ></a>";
														}else if(popList.popType  == "6"){
															goodsHtml += " 可领取赠品";
														}
													}else{
														goodsHtml += " 未满足促销条件";
														if(popList.popType  != "6"){
//															goodsHtml +=" <a href=\""+domain.search+"/fr/"+popList.activityId+".html?rn="+popList.popRuleId+"&atp="+popList.popType+"\" class=\"link\">去凑单 ></a>";
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
//										console.info(goods.seleGiftList);
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
//												mzHtml+=" <div class=\"price\">¥400.00</div>";
//												mzHtml+=" <div class=\"number\">x1</div>";
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
												if(mzData.stor*1 > 0 && mzData.goodsNumber*1 > 0){
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
//												mzHtml+=" <div class=\"price\">¥400.00</div>";
//												mzHtml+=" <div class=\"number\">x1</div>";
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
									/***mz*/
									goodsHtml += "</li>";
								}
							groupDto += goodsHtml;
						}
						if (isLK||isMJ||isXY||isMLJ) {
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
//									x元Y件  去凑单
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
								var popRuleId = goodsGroupList[o].popRuleId;
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
							if (isMJ||isMLJ ) {
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
						}else  if(goodsGroupDtoList[i].groupType == "12"){
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

					emHtml += "</div>";
					htmlList += emHtml+ "<ul class=\"cart-table-list\"><input type = \"hidden\" id=\"orderPay\" name=\"orderPay\" value =\""+goodsGroupDtoList[i].orderPay+"\" ><input type = \"hidden\" id=\"orderAmount\" name=\"orderAmount\" value =\""+goodsGroupDtoList[i].orderAmount+"\" ><input type = \"hidden\" id=\"showOrderAmount\" name=\"showOrderAmount\" value =\""+data.showOrderAmount+"\" ><input type = \"hidden\" id=\"orderPay1\" name=\"orderPay\" value =\""+data.orderPay+"\" >"+groupDtoHtml+"</ul>"	
				}//最后一层循环
				//console.log(freight,'freight')
				$(".cart-head").after(htmlList);
				covercd.showcdbtn(freight);

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

				if(!$("#package-add-1").is(":hidden")){
		
					if(bigcg){
						var zznb = bigcg.zznb; //_pid_tid = 3563
						var zztid = bigcg.tid;
						var zzgoodsid = bigcg.goodsid;

						var otit = {}; 
						var allgoods =[];

						//pid_tid对应后再对应打包内的allgoods
						//console.log(data.goodsGroupDtoList,'dadada')
						for(var a1=0;a1<data.goodsGroupDtoList.length;a1++){
							for(var a2 in data.goodsGroupDtoList[a1].freightImbodyMap){
								if(a2==zznb){
									var allgoods = data.goodsGroupDtoList[a1].goodsGroupList;
								}
							}
						}
						//pid_tid对应后更新msg
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
								if( vpt == zznb ){
									//covercd.nowbox = arrbox_i;
									//console.log(arrbox_i,'tttttt22222')
									var otit = arrbox_i[j];
									//console.log(otit,'otit')
								}	
							}
						}
						if(JSON.stringify(otit) == "{}"){
							var titmsg = "免运费";
						}else{
							if(otit.deliveryCharge==0 && otit.freightLessPrice==0){
								var titmsg = "免运费";
							}else{
								if(otit.freightLessWeight==0){
									var titmsg = "运费"+otit.deliveryCharge+"元，再买"+otit.freightLessPrice+"元免运费";
								}else{
									var titmsg = "运费"+otit.deliveryCharge+"元，再买"+otit.freightLessPrice+"元免运费（"+otit.freightLessWeight+"kg以内）";
								}
							}
						}
						//console.log(titmsg,'titmsgtitmsgtitmsg',allgoods)
						for(var zi=0;zi<allgoods.length;zi++){
							for(zt=0;zt<allgoods[zi].goodsList.length;zt++){
								if(allgoods[zi].goodsList[zt].goodsId == zzgoodsid && allgoods[zi].goodsList[zt].type!="16" &&  bigcg.saleprice == allgoods[zi].goodsList[zt].showSalePrice){
									var bigoods = {
										"goodsId":allgoods[zi].goodsList[zt].goodsId,
										"ruleId":allgoods[zi].goodsList[zt].ruleId,
										"type":allgoods[zi].goodsList[zt].type,
										"goodsName":allgoods[zi].goodsList[zt].goodsName,
										"goodsPicUrl":allgoods[zi].goodsList[zt].goodsPicUrl,
										"totalPrice":allgoods[zi].goodsList[zt].totalPrice,
										"goodsNumber":allgoods[zi].goodsList[zt].goodsNumber,
										"titmsg":titmsg
									}
								}
							}
						}
						//console.log(bigoods,"bigoodsbigoodsbigoods")

						checkcov_big(bigoods);
					}
					
				}
				//更新包裹
				/*if(!$("#package-add-1").is(":hidden")){
						if(covercd.rendertab || covercd.rendertab1){
							covercd.rendertab = false;
							covercd.rendertab1 = false;
							if($(".boxtab_d").length==1){
								$('#pop-close').click();
								
							}else{
								$(".package-link").eq(parseInt(covercd.rendertabn)).click();
							}
						}
				}*/

				/**----- 免运费去凑单 start----*/
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
				/**---- 免运费去凑单 end------*/
				
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
			
				$(".pay-form").show();
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
			      	var t = $(".pay-form").offset().top;
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
				(function(w,n){
			         w[n] = function(){
			            (w[n].c = w[n].c || []).push(arguments);
			         }
			         _qha('send', {
			             et: 32,
			             goods: [{
			               id: goodsIds.substr(0, goodsIds.length - 1),/*商品ID,必填项*/
			               name: '',/*商品名称*/
			               price: '',/*商品价格*/
			               quantity: '',/*商品数量*/
			               stock: '',/*商品库存*/
			               img: ''/*商品图片url*/
			             }]
			         });
				})(window, '_qha');
			}
		});
		buttonToPay();
}

function buttonToPay(){
	var stk = false;
	var qqg = false;
	var blk = false;
	var blkSum = 0;
	var stkSum = 0;
	$(".cart-table-list").each(function(){
		var qqgSum = 0;
		var zySum = 0;
		$(this).find(".goodsType").each(function(){
			if ($(this).val()*1 ==1&&$(this).parent().find("[name=checked]").val()=="true") {
				qqgSum += $(this).parents(".item").find("[name = totalPrice]").val()*1;
			}
			if ($(this).val()*1 ==2&&$(this).parent().find("[name=checked]").val()=="true") {
				qqgSum += $(this).parents(".item").find("[name = totalPrice]").val()*1;
			}
			if ($(this).val()*1 ==4&&$(this).parent().find("[name=checked]").val()=="true") {
				stkSum += $(this).parents(".item").find("[name = totalPrice]").val()*1;
			}
			if ($(this).val()*1 ==5&&$(this).parent().find("[name=checked]").val()=="true") {
				blkSum += $(this).parents(".item").find("[name = totalPrice]").val()*1;
			}
		});
		if (qqgSum > 2000) {
			qqg = true;
		}
	});
	if (stkSum > 10000) {
		stk = true;
	}
	if(blkSum >10000){
		blk = true;
	}
	if (stk|| qqg || blk) {
		$(".cart-title").find("button").attr("class","btn btn-notsecondary");
		$(".pay-line").find("a.pay").attr("class","pay disable");
	}
}

function shopTag(data){
	var goodsGroupDtoList = data.goodsGroupDtoList;
	for (var i = 0; i < goodsGroupDtoList.length; i++) {
		var goodsGroupList = goodsGroupDtoList[i].goodsGroupList;
		for (var j = 0; j < goodsGroupList.length; j++) {
			var goodsList = goodsGroupList[j].goodsList;
			for (var k = 0; k < goodsList.length; k++) {
				var goods = goodsList[k];
				 var blList = [];
				 var zywId="";
				 var zywnrId="";
				 var zywlx="";
					if (bl_ad.length > 0) {
						blList = bl_ad.split("_-_");
    						zywId = blList[0]==undefined?"":blList[0];
   							zywnrId = blList[1]==undefined?"":blList[1];
    						zywlx = blList[2]==undefined?"":blList[2];
					}
					clickCart(goods.goodsId,goods.goodsType,goods.goodsName,goods.goodsNumber,goods.salePrice,zywId,unescape(zywnrId),zywlx,goods.brandSid,"",goods.originalPrice,goods.priceType);
			}
		}
		
	}
}

function guessLike(){
	var cardId="";
	$(".cart-table-list li").each(function(){
	   var c = $(this).find("#goodsId").val();
	   if(!c){
		   cardId=c;
	   }else{
		   cardId+=c+","
	   }
	  });	
	 $.ajax({     
         type: "Post",    
         data:{"cardId":cardId},
         url: domain.cart +"/GuessLike.html",   
         dataType: "html",     
         success: function(data) {
        	 $(".guessLike").append(data);
         }     
     }); 
}

function coAddress(){
	var g = BL.Global;
	if(g.cookie.get("IOKBL_P_S_A")){
		var address = JSON.parse(g.cookie.get("IOKBL_P_S_A"));
		$("#provinceName").html(address.provinceName);
		$("#cityName").html(address.cityName);
		$("#districtName").html(address.districtName);
		$("#provinceName").append("<input class=\"provinceId\" type=\"hidden\" name=\"provinceId\" value=\""+address.province+"\"/>");
		$("#cityName").append("<input class=\"cityId\" type=\"hidden\" name=\"cityId\" value=\"" +address.city+ "\"/>");
		$("#districtName").append("<input class=\"districtId\" type=\"hidden\" name=\"districtId\" value=\"" +address.district+ "\"/>");	
	}

}
