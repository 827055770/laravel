
/**-----省市区  start----*/
function selectArea(deep,flag) {
	var areaDeep;
	var areaParentId;
	if(deep === "sheng"){
		$("#" + deep + "").addClass("select").siblings().removeClass();
			areaParentId="";
			areaDeep = 1;
			$("#cityName").html("");
			$("#districtName").html("");
	}else if(deep === "shi"){
		$("#" + deep + "").addClass("select").siblings().removeClass();
			areaParentId = $("input[name='provinceId']").val();
			areaDeep = 2;
			$("#districtName").html("");
	}else if(deep === "qu"){
		areaParentId = $("input[name='cityId']").val();
		areaDeep = 3;
		$("#" + deep + "").addClass("select").siblings().removeClass();
	}
	$.ajax({
		type : "POST",
		dataType : "json",
		contentType : "application/json",
		async : false,
		url : domain.cart+"/new/nj/queryAreaList.html?areaParentId=" + areaParentId + "&areaDeep="+ areaDeep + "&isGroup=1",
		success : function(data) {
			var areaListAll = data.areaList;
			var htmlText = "";
			if(null!=areaListAll){
				for (var i = 0; i < areaListAll.length; i++) {
					var areaList = areaListAll[i];
					areaList = areaListAll[i].areaList;
					for (var j = 0; j < areaList.length; j++) {
						var id = "";
						if (!flag) {
							id = (areaList[j].areaId) + "_new";
						} else {
							id = (areaList[j].areaId) + "_new"+areaDeep;
						}
						htmlText += "<dd><a id=\""+ id+ "\" href=\"javascript:void(0);\" class=\"cate\"  onclick=\"queryAreaList('" + id+ "'," + (areaDeep + 1) + ",'','"+ areaList[j].areaId + "','" +
						areaList[j].areaId + "','" + flag+ "')\">" + areaList[j].areaName + "</a></dd>";
					}
				}
			}
			
			$("#selectCity").html(htmlText);
		}
	});
}

/**
 * id：select节点id,areaDeep:地区等级(1-一级，2-二级，3-三级),areaId:地区id，areaParentId：上一级地区id，curAreaId：需要选中的地区id
 * 级联选择收货地址
 */
function queryAreaList(id, areaDeep, areaId, areaParentId, curAreaId, flag) {
	var obj = $("#" + id + "");
	if (!areaParentId && areaDeep !== 1 ) {
		return;
	}
	if(areaDeep === 2){
		obj.addClass("active");
		obj.parent("dd").siblings().find("a").removeClass("active");
	}
	if(areaDeep === 3){
		obj.addClass("active");
		obj.parent("dd").siblings().find("a").removeClass("active");
	}
	if(areaDeep === 4){
		obj.addClass("active");
		obj.parent("dd").siblings().find("a").removeClass("active");
	}
	// 选择省级的时候
	if (areaDeep === 2) {
		$("#provinceName").html(obj.text());
		$("#provinceName").append("<input class=\"provinceId\" type=\"hidden\" name=\"provinceId\" value=\""+curAreaId+"\"/>");
		$("#shi").addClass("select").siblings().removeClass();
	}
	// 选择市级的时候
	if (areaDeep === 3) {
		if ($(".address-name").find("input[name='provinceId']").length === 0) {
			return;
		}
		$("#cityName").html(obj.text());
		$("#cityName").append("<input class=\"cityId\" type=\"hidden\" name=\"cityId\" value=\"" +curAreaId+ "\"/>");
		$("#qu").addClass("select").siblings().removeClass();
	}
	// 选择最后一级 区
	if (areaDeep === 4) {
		$("#districtName").html(obj.text());
		$("#districtName").append("<input class=\"districtId\" type=\"hidden\" name=\"districtId\" value=\"" +curAreaId+ "\"/>");
		calcCart();
	}
	$.ajax({
		type : "POST",
		data : {
			areaId : areaId,
			areaParentId : areaParentId,
			areaDeep : areaDeep
		},
		dataType : "json",
		contentType : "application/json",
		async : false,
		url : domain.cart+"/new/nj/queryAreaList.html?areaId=" + areaId+ "&areaParentId=" + areaParentId + "&areaDeep="+ areaDeep + "&isGroup=1",
		error : function() {
			$("#box-up-success").popbox({title:'收货地址'});
			$("#box-up-success").find("i").attr("class","failure");
			$("#textName").html("加载地区列表失败");
			$(".btn-secondary").click(function() {
				$("#pop-close").click();
			});
		},
		success : function(data) {
			var areaListAll = data.areaList;
			var htmlText = "";
			if(null!=areaListAll){
				for (var i = 0; i < areaListAll.length; i++) {
					var areaList = areaListAll[i];
					areaList = areaListAll[i].areaList;
					for (var j = 0; j < areaList.length; j++) {
						var id = "";
						if (!flag) {
							id = (areaList[j].areaId) + "_new";
						} else {
							id = (areaList[j].areaId) + "_new" + areaDeep;
						}
						htmlText += "<dd><a id=\""+ id+ "\" href=\"javascript:void(0);\" class=\"cate\"  onclick=\"queryAreaList('" + id+ "'," + (areaDeep + 1) + ",'','"+ areaList[j].areaId + "','" +
						areaList[j].areaId + "','" + flag+ "')\">" + areaList[j].areaName + "</a></dd>";
					}
				}
			}
			$("#selectCity").html(htmlText);
		}
	});
}
/**-----省市区  end----*/
/**----- 免运费去凑单 start----*/
var falgId;
function MakeSingle(str){
	 /*******免运费凑单按钮埋点******/
	 clickButton("PC_凑单免运费",null,"","购物车页面","PC_Cart","");
	 ViewResource("pstg","pstg_normv1",2,$(str));
	var freightLessPrice = $(str).siblings().find(".freightLessPrice").val();
	var freightTemplateId = $(str).siblings().find(".freightTemplateId").val();
	var freightLessWeight = $(str).siblings().find(".freightLessWeight").val();
	falgId = $(str).siblings().find(".freightTemplateId").val();
	var chkItems="";
	var unchkItems="";
	$(".cart-table-list li").each(function(){
		   var check = $(this).find("#checked").val();
		   var goodsId = "";
		   if(check == "true"){
			  goodsId = $(this).find("#goodsId").val();
			  if(!goodsId){
				  chkItems=goodsId;
			   }else{
				   chkItems+=goodsId+","
			   }
		   }else{
			   goodsId = $(this).find("#goodsId").val();
				  if(!goodsId){
					  unchkItems=goodsId;
				   }else{
					   unchkItems+=goodsId+","
				   }
		   }
		  });
	 $.ajax({     
     type: "Post",   
     data : {
    	 freightTemplateId : freightTemplateId,
    	 freightLessWeight : freightLessWeight,
    	 chkItems:chkItems,
    	 unchkItems:unchkItems
		},
     url: domain.cart +"/MakeSingle.html",   
     dataType: "html",     
     success: function(data) {
    	 if($(".package-add").length > 0){}else{
    		 var html = "<div id=\"package-add-1\" class=\"package-add\" style=\"display: none;\"></div>"
    		 $(".guessLike").after(html);	 
    	 }
    	 if($(".package-add").html().length != 0){
    		 $(".package-add").html("");
    	 }
    	 $(".package-add").append(data);
    	 $("#yFgz").html("");
    	 $("#package-add-1").popbox({title:'免运费凑单'});
    	 if(freightLessWeight > 0){
        	 $("#yFgz").html("再买￥"+freightLessPrice+"，免运费（"+freightLessWeight+"kg内）");    		 
    	 }else{
        	 $("#yFgz").html("再买￥"+freightLessPrice+"，免运费");
    	 }
     }     
 }); 
}
/**----- 免运费去凑单 end----*/

function querCart(sId,cId,qId,sName,cName,qName){
	$("#provinceName").html(sName);
	$("#cityName").html(cName);
	$("#districtName").html(qName);
	$("#provinceName").append("<input class=\"provinceId\" type=\"hidden\" name=\"provinceId\" value=\""+sId+"\"/>");
	$("#cityName").append("<input class=\"cityId\" type=\"hidden\" name=\"cityId\" value=\"" +cId+ "\"/>");
	$("#districtName").append("<input class=\"districtId\" type=\"hidden\" name=\"districtId\" value=\"" +qId+ "\"/>");
	calcCart();
}
