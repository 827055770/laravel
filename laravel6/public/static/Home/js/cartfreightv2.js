//console.log('20191028')
var covercd = {
	rendertab:false,
	rendertab1:false,
	rendertabn:0,
	oarrs:[],
	firstajax:false,
	pid_tid:'',
	allbox:[],
	nowbox:[],
	onetag:'',
	closecov:function(){
		window.location.href = window.location.href;
	},
	showcdbtn: function(farr){		//显示运费凑单按钮
		var that = this;
		//console.log(farr,'farr',covercd.rendertab1)
		//var allarr = [];
		$.each(farr,function(i,v){
			if(v){
				var arr = Object.keys(v).map(function (key) { return v[key]; });
				//var arr = $.makeArray(v);
				var oarr = [];
				for(var t=0;t<arr.length;t++){
					//allarr.push(arr[t]);
					if(arr[t].deliveryCharge != 0){
						oarr.push(arr[t]);
					}
				}
				var emHtml = "";
				var isfree = false; //是否免邮
				emHtml += "<div class=\"package-message\">";
				emHtml += "<div class=\"package-price\">";	
				$.each(arr,function(i2,v2){
					if(v2['deliveryCharge'] != 0){
						isfree = true;
					}
				});
				if(!isfree){
						emHtml += "<div class='price price_ok'>已免运费</div>";
					  emHtml +="</div>";
					emHtml +="</div>";
				}else{
						emHtml +="<a href='javascript:void(0);' _btag='"+i+"' class='package-link' onclick='covercd.getCovinfo(this)'>凑单省运费&gt;</a>";
					  emHtml +="</div>";
					emHtml +="</div>";
				}
				$(".cart-table-name").eq(i).append(emHtml);
				
				$(".cart-table-name").eq(i).find(".package-link").data("_boxinfo",oarr);
				//covercd.allbox = allarr;
				if(!covercd.rendertab1){
					//console.log("firtab",oarr)
				}else{
					//$(".cart-table-name").eq(i).find(".package-link").data("_allbox",covercd.allbox);
					
				}
			}
		})
	},
	getCovinfo: function(_this){	//初始化弹窗显示包裹tab
		var bosti = [];
		for(var i=0;i<$(".boxtab_d").length;i++){
			bosti.push($(".boxtab_d").eq(i).attr("_pid_tid"));
			//console.log('兄弟',bosti[i])
		}
		if(covercd.rendertab1){  //若是单个更新

			for(var m=0;m<covercd.nowbox.length;m++){
				if(covercd.nowbox[m].isMergeTemplete=="0"){
					var vt = covercd.nowbox[m].freightTemplateId+"_"+covercd.nowbox[m].packageId;
				}else{
					var vt = covercd.nowbox[m].freightTemplateId;
				}
				if(bosti.indexOf(vt)<0){
				
					//console.log(vt,'不是组');
					covercd.nowbox.splice(m,1);
				}	
			}
			//console.log(covercd.nowbox,'前')
			covercd.rendertab1 = false;
			if($("#basketShopcart .sel").length<=0){  //若全勾掉了
				yfstr = "未选商品";

				for(var i=0;i<covercd.nowbox.length;i++){
					if(covercd.nowbox[i].isMergeTemplete=="0"){
						var ono = covercd.nowbox[i].freightTemplateId+"_"+covercd.nowbox[i].packageId;
					}else{
						var ono = covercd.nowbox[i].freightTemplateId;
					}
					if(ono==covercd.pid_tid){
						//covercd.nowbox.splice(i,1);
						
					}
				}
				
			}else{
				var allarr = covercd.nowbox;
				//console.log("单个更新吧alltab",allarr);
				
				var yfstr="未选商品";
				$.each(allarr,function(i,v){
					if(v['isMergeTemplete']=="0"){
						var vpt = v['freightTemplateId']+"_"+v['packageId'];
					}else{
						var vpt = v['freightTemplateId'];
					}
					//console.log('jjg',vpt,covercd.pid_tid);
					if(vpt == covercd.pid_tid){
						//alert(1)
						if(v.deliveryCharge==0 && v.freightLessPrice==0){
							yfstr = "免运费";
						}else{
							if(v.freightLessWeight==0){
								yfstr = "运费"+v.deliveryCharge+"元，再买"+v.freightLessPrice+"元免运费";
							}else{
								yfstr = "运费"+v.deliveryCharge+"元，再买"+v.freightLessPrice+"元免运费（"+v.freightLessWeight+"kg以内）";
							}
						}
					}else{
						//alert(2)
					}
				});
			}

			//alert(yfstr)
			//alert($(".selarea .cur b").html())
			$(".selarea .cur b").html(yfstr);
			return false;
		}

		if(_this){ //是页面点击进来
			var arr = $(_this).data("_boxinfo");
			covercd.nowbox = arr;
			//console.log(covercd.nowbox,"o444444444")
			if(covercd.rendertabn==0){
				if(covercd.nowbox[0].isMergeTemplete=="0"){
					var vpt = covercd.nowbox[0].freightTemplateId + covercd.nowbox[0].packageId;
				}else{
					var vpt = covercd.nowbox[0].freightTemplateId;
				}
				covercd.rendertabn = vpt;
			}


			for(var i=0;i<covercd.nowbox.length;i++){
				if(covercd.nowbox[i].isMergeTemplete=="0"){
					var vpt = covercd.nowbox[i].freightTemplateId + covercd.nowbox[i].packageId;
				}else{
					var vpt = covercd.nowbox[i].freightTemplateId;
				}
				if(vpt == covercd.rendertabn){
					var rearr = covercd.nowbox.concat([]);
					//console.log(rearr,covercd.nowbox,'991')
					//console.log(rearr,'rearraa')
					if(covercd.nowbox.length>1){
						rearr.splice(i,1);
					}
					//rearr.remove(covercd.nowbox[i]);
					if(rearr[0].isMergeTemplete=="0"){
						var vpt2 = rearr[0].freightTemplateId +"_"+ rearr[0].packageId;
					}else{
						var vpt2 = rearr[0].freightTemplateId;
					}
					covercd.onetag = vpt2;
					//console.log(rearr,'rearrbb',vpt2,covercd.nowbox)
				}
			}
			/*for(k in redarr){
				if(k == covercd.rendertabn){

				}else{
					var onetag = redarr[k]
				}
			}
			if(onetag){
				if(onetag.isMergeTemplete == "0"){
					covercd.onetag = onetag.freightTemplateId+"_"+onetag.packageId
				}else{
					covercd.onetag = onetag.freightTemplateId;
				}
			}*/
			//console.log(arr,'arrrrrr111')
			var _btag = $(_this).attr("_btag");
		}else{
			//批量删除触发
			for(var m=0;m<covercd.nowbox.length;m++){
				if(covercd.nowbox[m].isMergeTemplete=="0"){
					var vt = covercd.nowbox[m].freightTemplateId+"_"+covercd.nowbox[m].packageId;
				}else{
					var vt = covercd.nowbox[m].freightTemplateId;
				}
				if(bosti.indexOf(vt)<0){
				
					//console.log(vt,'不是组');
					covercd.nowbox.splice(m,1);
				}	
			}
			covercd.rendertab = false;
			var arr = covercd.nowbox;
			//console.log('批量取消1',covercd.nowbox)
			/*for(var t=0;t<covercd.nowbox.length;t++){
				//allarr.push(arr[t]);
				if(covercd.nowbox[t].deliveryCharge != 0){
					if(covercd.nowbox[t].isMergeTemplete=="0"){
						var oqid = covercd.nowbox[t].freightTemplateId+"_"+covercd.nowbox[t].packageId;
					}else{
						var oqid = covercd.nowbox[t].freightTemplateId;
					}
					if(oqid!=covercd.rendertabn){
						console.log(arr,'z1111')
						arr.push(covercd.nowbox[t]);
						console.log(arr,'z2222',covercd.nowbox)
					}
				}
			}*/
			//console.log(arr,'arrrrrr222')
			if($("#basketShopcart .sel").length<=0){ //当前弹窗所有tab中都未勾选
				//alert('kong')
				//$('#pop-close').click();
				//console.log('全部未勾选点击取消');
				if($(".boxtab_d").length==1){			
					$('#pop-close').click();
				}else{
					var oslen = $(".boxtab_d").length;
					var _index = $(".boxtab .cur").index();
					var osli = $(".boxtab .cur").siblings(".boxtab_d:visible");
					if(osli.length<=0){
						$('#pop-close').click();
					}
					$(".boxtab .cur").hide();
					$(".selarea .cur").hide();
					osli.eq(0).click();
					//$(".selarea_d").eq(0).addClass("cur");

					//ocur.remove();
				}
				return false;
			}else{
				//console.log('没有全部未勾选点击取消',arr);
			}
		}
		var ocovmsg = "<div class='ocovmsg'><i></i><b></b></div>"
		//arr[i].freightRuleDesc
		var boxtab = "<div class='boxtab'>";
		var selarea = "<div class='selarea'>";
		for(var i=0;i<arr.length;i++){
			if(arr[i]['isMergeTemplete']=="0"){
				var pid_tid = arr[i]['freightTemplateId']+"_"+arr[i]['packageId'];
			}else{
				var pid_tid = arr[i]['freightTemplateId'];
			}
			if(arr[i].deliveryCharge==0 && arr[i].freightLessPrice==0){
				var yfstr = "免运费";
			}else{
				if(arr[i].freightLessWeight==0){
					var yfstr = "运费"+arr[i].deliveryCharge+"元，再买"+arr[i].freightLessPrice+"元免运费";
				}else{
					var yfstr = "运费"+arr[i].deliveryCharge+"元，再买"+arr[i].freightLessPrice+"元免运费（"+arr[i].freightLessWeight+"kg以内）";
				}
			}
			if(i==0){
				boxtab +="<div class='boxtab_d cur' _pid_tid='"+pid_tid+"' _btag2='"+_btag+"_"+i+"'>包裹"+(i+1)+"</div>";
				selarea +="<div class='selarea_d cur'><b style='font-weight:400;'>"+yfstr+"</b><i _cgt='"+pid_tid+"'>取消选择</i></div>";
			}else{
				selarea +="<div class='selarea_d'><b style='font-weight:400;'>"+yfstr+"</b><i _cgt='"+pid_tid+"'>取消选择</i></div>";
				boxtab +="<div class='boxtab_d' _pid_tid='"+pid_tid+"' _btag2='"+_btag+"_"+i+"'>包裹"+(i+1)+"</div>";
			}
		}
		boxtab+="</div>";
		selarea +="</div>";
		var myinfo = ocovmsg+boxtab+selarea;
		if(!$("#package-add-1").is(":hidden")){ //显示时
			var myinfo = boxtab+selarea;
			$("#package-add-1 .boxtab").remove();
			$("#package-add-1 .selarea").remove();
			$("#package-add-1 .ocovmsg").after(myinfo);
			//console.log($(".boxtab_d").length,"22222??")
			if($(".boxtab_d").length>1){
				var onow = $(".boxtab .cur").siblings(".boxtab_d").attr("_pid_tid");
				covercd.onetag = onow;
			}
			/*if(covercd.rendertab1){
				//如果是单个数据更新不删除tab,msg和购物车数据,主要对应tab下的msg	
			}else{
				$("#package-add-1 .boxtab").remove();
				$("#package-add-1 .selarea").remove();
				$("#package-add-1 .ocovmsg").after(myinfo);
			}*/
		}else{
			var myinfo = ocovmsg+boxtab+selarea;
			$("#package-add-1").html("");
			$("#package-add-1").append(myinfo);
			$("#package-add-1").popbox({title:'凑单省运费'});
			clickButton("PC_凑单免运费","","","购物车页面","PC_Cart","");
			$("#package-add-1").parents(".pop_in").find("#pop-close").click(function(){
				//window.location.href = window.location.href;
			});
			if($(".ocovmsg b").html()==""){
				var resourceId = $.trim($("#cartFreightResourceId").val());
				if (resourceId) {
				    $.ajax({
				        url: domain.cart + "/cms/json/getAdDeploy.html",
				        type: "POST",
				        data: {
				            resourceId: resourceId
				        },
				        dataType: "json",
				        error: function () {},
				        success: function (data) {
				            if (data.resCode == '00100000') {
				            	if(typeof data.obj[0] != 'undefined'){
				            		$(".ocovmsg b").html(data.obj[0].hint);
				            	}
				     
				            }
				        }
				    });
				}
			}
		}
		
		iscdcov = true;
		$("#pop-body").prev().find("#pop-close").bind("click",function(){
			window.location.href = window.location.href;
			iscdcov = false;
		});
		$(".ocovmsg i").click(function(){
			$(".ocovmsg").hide();
		});

		this.renderCov(arr);
	},
	renderCov: function(arr){   //开弹窗初始化包裹按钮
		//console.log(arr,'arrrrrrrr')
		var that = this;
		function getcart_info(_index){
			var freightGoodDto = {};
			var addressInfo = {};
			addressInfo.province = $(".provinceId").val();
			addressInfo.city = $(".cityId").val();
			addressInfo.district = $(".districtId").val();

			freightGoodDto.packageId=(arr[_index]['isMergeTemplete']=="0")?arr[_index]['packageId']:"";
			freightGoodDto.tid=arr[_index]['freightTemplateId'];
			freightGoodDto.addressInfo=addressInfo;

			$("#package-add-1 .nowgood,#package-add-1 .tab,#package-add-1 .tab-list,#package-add-1 .btn-line").remove();


			$.ajax({
			     type: "POST",   
			     data : $.toJSON(freightGoodDto),
			     url: domain.cart +"/nj/queryFreightImbodyGoods.html",   
			     dataType: "json",
			  	 contentType : "application/json",
			     success: function(data) {
				  	//console.info(data,'goggoo');
				  	var covcartlist = [];
				  	if(data.resultInfo.goodsGroupDtoList[0].goodsGroupList.length>1){
				  		for(var i=0;i<data.resultInfo.goodsGroupDtoList[0].goodsGroupList.length;i++){
				  			for(var j=0;j<data.resultInfo.goodsGroupDtoList[0].goodsGroupList[i].goodsList.length;j++){
				  				covcartlist.push(data.resultInfo.goodsGroupDtoList[0].goodsGroupList[i].goodsList[j]);
				  			}
				  		}
				  	}else{
				  		covcartlist = data.resultInfo.goodsGroupDtoList[0].goodsGroupList[0].goodsList;
				  	}
				  	//console.log(covcartlist,data.resultInfo.goodsGroupDtoList[0].goodsGroupList[0].goodsList,"yyyuuuuuuu")
				  	that.renderCov_cart(covcartlist,_index);
				  	var tdata = data.resultInfo.goodsGroupDtoList[0].freightImbody;
				  	var freightTemplateId = tdata.freightTemplateId;
				 	var isMerge = tdata.isMergeTemplete;
				 	var packageid = (isMerge=="0")?tdata.packageId:"";
				 	var freightLessWeight = tdata.freightLessWeight;
				 	var chkItems = [];
				 	var unchkItems = [];

				 	
					
				 	for(var u=0;u<data.resultInfo.goodsGroupDtoList[0].goodsGroupList.length;u++){
				 		$.each(data.resultInfo.goodsGroupDtoList[0].goodsGroupList[u].goodsList,function(i,v){
					 		if(v['checked']){
					 			chkItems.push(v['goodsId']);
					 		}else{
					 			unchkItems.push(v['goodsId']);
					 		}
					 	});
				 	}
				 	chkItems = chkItems.length>0?chkItems.join()+",":"";
				 	unchkItems = unchkItems.length>0?unchkItems.join()+",":"";
				 	var biddata = {
				 		'packageid':packageid,
				 		'freightTemplateId':freightTemplateId,
				 		'freightLessWeight':freightLessWeight,
				 		'isMerge':isMerge,
				 		'chkItems':chkItems,
				 		'unchkItems':unchkItems
				 	}
				 	covercd.firstajax = false;
				 	if(!biddata.chkItems){ //为空
				 		biddata.chkItems = $(".boxtab_d").eq(_index).data("_chkItems")?$(".boxtab_d").eq(_index).data("_chkItems"):"";
				 	}else{
				 		$(".boxtab_d").eq(_index).data("_chkItems",biddata.chkItems);
				 	}
				 	that.renderCov_big(biddata,freightGoodDto.tid);
				 },
				 error:function(){
				 	covercd.firstajax = false;
				 	covercd.rendertab1 = false;
				 }
			});
		}
		//取消包裹
		$(".selarea i").unbind().click(function(){
			if(!covercd.rendertab){
				covercd.rendertab = true;
				covercd.rendertabn = $(this).attr("_cgt");
				if($("#basketShopcart .sel").length>0){ //如果还有勾选商品
					//console.log("dbbbb")
					$("#basketShopcart .sel .chk_cov").each(function(i,o){
						var cname = $(o).attr("_tgclick");
						var ol = $("."+cname).length -1;
						if($("."+cname).eq(ol).hasClass("delete")){
							setTimeout(function(){
								$("."+cname).eq(ol).trigger("click");
							},1000);
							if($(this).parents("li").hasClass("sel")){
								$(this).parents("li").removeClass("sel");
							}else{
								$(this).parents("li").addClass("sel");
							}
						}else{
							$("."+cname).eq(ol).trigger("click");
							if($(this).parents("li").hasClass("sel")){
								$(this).parents("li").removeClass("sel");
							}else{
								$(this).parents("li").addClass("sel");
							}
						}
					});
				}else{
					//console.log("取消选择")
					calcCart();
					return false;
				}
			}
		});
		$(".boxtab .boxtab_d").click(function(){
			if(covercd.firstajax==true){
				return false;
			}
			var _i = $(".boxtab .cur").index();
			var _index= $(this).index();
			$(this).addClass("cur").siblings(".boxtab_d").removeClass("cur");
			$(".selarea_d").eq(_index).addClass("cur").siblings(".selarea_d").removeClass("cur");
			if(_i!=_index){
				var ino = $(this).attr("_pid_tid");
				var arrs = [];
				$(".boxtab_d").each(function(i,o){
					arrs.push($(o).attr("_pid_tid"));
				});
				
				for(var i=0;i<arrs.length;i++){
					if(arrs[i] == ino ){
						arrs.splice(i,1);
					}
				}
				covercd.onetag = arrs[0];
				covercd.firstajax=true;
				getcart_info(_index)
			}
		});
		getcart_info(0); //默认加载包裹1
	},
	renderCov_cart: function(data,k){ //渲染弹窗购物车
		//console.log(data,"goodlist");
			var nowgood = "<div class='nowgood'>";
			nowgood+='<div class="prev"></div>';
			nowgood+='<div class="next"></div>';
			nowgood+='<div class="flex" id="itemflex">';
			nowgood+='<ul class="slides" _eq="'+k+'" id="basketShopcart">';
			$.each(data,function(i,v){
				var pagegoid = '';
				var typeid = v['type']?"_"+v['type']:"";
				var ruleid = v['ruleId']?"_"+v['ruleId']:"";
				pagegoid = v['goodsId']+typeid+ruleid;
				if(v['checked']){
					nowgood+='<li style="" class="sel" id="sel_'+pagegoid+'"><div _type="'+typeid+'" class="chk_cov" _tgclick="goodsid_'+pagegoid+'"></div>';
				}else{
					nowgood+='<li style="" id="sel_'+pagegoid+'"><div _type="'+typeid+'" class="chk_cov" _tgclick="goodsid_'+pagegoid+'"></div>';
				}
				nowgood+='<div class="pic"><img border="0" width="70" height="70" title="'+v['goodsName']+'" src="'+v['goodsPicUrl']+'" style="display: inline;"></div>';
				nowgood+='<div class="comment-frame comment-frame-'+pagegoid+'"><div class="price" _price="'+v['showSalePrice']+'">¥'+v['totalPrice']+'</div>';
				nowgood+='<div class="cbuygood">'+v['goodsNumber']+'</div></div></li>';
			});
			nowgood+='</ul></div></div>';
			var myinfo = nowgood;
			$("#package-add-1 .selarea").after(myinfo);
			//$(".boxtab_d").eq(k).data("_chkItems",data[k].chkItems);
			covercd.cart_ui();

	},
	cart_ui:function(){
		var olit = 159;
		var olen = $("#basketShopcart").find("li").length;
		var oul = $("#basketShopcart");
		oul.width(olen*159);
		oul.css("left",0);
		$(".nowgood .next").unbind().bind("click",function(){
			if(oul.is(":animated")){ return false;}
			var oleft = parseInt(oul.css("left"));
			if(oleft<=((olen-3)*-159)){
				return false;
			}
			oul.animate({"left":"-=159px"},300);
		});
		$(".nowgood .prev").unbind().bind("click",function(){
			if(oul.is(":animated")){ return false;}
			var oleft = parseInt(oul.css("left"));
			if(oleft==0){
				return false;
			}
			oul.animate({"left":"+=159px"},300);
		});
		//勾选框
		$(".chk_cov").each(function(i,o){
			$(o).unbind().bind("click",function(){
				var cname = $(o).attr("_tgclick");
				var ol = $("."+cname).length -1;
				if(covercd.rendertab){  //批量
					
				}else{
					
					if(!covercd.rendertab1){
						covercd.rendertab1 = true;
						var _eq = $(this).parents(".nowgood").prev(".selarea").find(".cur").find("i").attr("_cgt");
						covercd.rendertabn = _eq;
						covercd.pid_tid = $(".boxtab .cur").attr("_pid_tid");
						//console.log($("."+cname).eq(ol).length)
						if($(o).attr("_type")=="_16"){
							$("."+cname).eq(ol).trigger("click");
							$(o).parents("li").remove();
						}else{
							$("."+cname).eq(ol).trigger("click");
							if($(this).parents("li").hasClass("sel")){
								$(this).parents("li").removeClass("sel");
							}else{
								$(this).parents("li").addClass("sel");
							}
						}
					}
				}
			});
		});
	},
	renderCov_big: function(odata,tid){  //查大数据
		if(covercd.rendertab1){
			//return false;
		}
		var pkgid= odata.packageid?odata.packageid:'';
		$.ajax({     
		     type: "POST",   
		     data : {
		       freightTemplateId : odata.freightTemplateId,
		       freightLessWeight : odata.freightLessWeight,
		       chkItems:odata.chkItems,
		       unchkItems: odata.unchkItems,
			   isMerge:odata.isMerge,
			   packageid:pkgid
			 },
			 url: domain.cart +"/getNewMakeSingle.html",   
			 dataType: "json",     
			 success: function(data) {
			  		//console.log(data,'bigggggggg');
			  		$("#package-add-1").removeClass("cdbig_no");
			  		if(!data){
			  			$("#package-add-1").addClass("cdbig_no");
			  			return false;
			  		}
			  		var list = data.list;
			  		if(list && list.length>0){ //大数据有数据
			  			var pricetab ='<ul class="tab">';
			  			var addgoods = '<ul class="tab-list"><li class="select">';
			  			$.each(list,function(i,v){
			  				if(i==0){
			  					pricetab+='<li class="select select_t">'+v['pr']+'</li>';
			  					addgoods +='<dl style="display:block;">';
			  				}else{
			  					pricetab+='<li class="select_t">'+v['pr']+'</li>';
			  					addgoods +='<dl style="display:none;">';
			  				}
			  				$.each(list[i].goodsList,function(i2,v2){
			  					var aurl = domain.product+"/"+v2['sid']+".html";
			  					addgoods +='<dd>';
				  				addgoods +='<a data_wa_type="ad" data_wa_val="pstg_-_pstg_normv1_-_2" target="blank" href="'+aurl+'" title="'+v2['goods_sales_name']+'">';
				  				addgoods +='<img src="'+v2['url']+'"></a>';
				  				addgoods +='<div class="name">';
				  				addgoods +='<a data_wa_type="ad" data_wa_val="pstg_-_pstg_normv1_-_2" target="blank" href="'+aurl+'" title="'+v2['goods_sales_name']+'">'+v2['goods_sales_name']+'</a>';
								addgoods +='</div>';
								addgoods +='<div class="line">';
								addgoods +='<input id="sid" value="'+v2['sid']+'" type="hidden">';
				                addgoods +='<input id="sale_price" value="'+v2['sale_price']+'" type="hidden">';
								addgoods +='<a class="addtocart addtocart_bg" href="javascript:void(0);">加入购物车</a>';
								addgoods +='<div class="price">￥'+v2['sale_price']+'</div><div class="weight">'+v2['weight']+'kg</div>';
								addgoods +='</div>';
								addgoods +='</dd>';
			  				});
							addgoods +='</dl>';
			  			});
			  			pricetab+='</ul>';
						addgoods +='</li></ul>';
						var backcart = '<div class="btn-line clearfix"><div class="line-center"><button type="button" class="btn btn-secondary" onclick="covercd.closecov()">返回购物车修改</button></div></div>';
			  			var biginfo = pricetab+addgoods+backcart;
			  			$(".nowgood").after(biginfo);
			  			//ui
			  			$(".select_t").click(function(){
			  				var _i = $(this).index();
			  				$(this).addClass("select").siblings(".select_t").removeClass("select");
			  				$(".tab-list li dl").hide();
			  				$(".tab-list li dl").eq(_i).show();
			  			});
			  			//add cart
			  			$(".addtocart_bg").click(function(){
			  				  //var zznum = $(this).parents(".tab-list").siblings(".boxtab").find(".cur").attr("_btag2");
			  				  var zznb = $(this).parents(".tab-list").siblings(".boxtab").find(".cur").attr("_pid_tid");
		  					  var goodsId = $(this).siblings("#sid").val();
							  var goodsNumber = "1";
							  var salePrice = $(this).siblings("#sale_price").val();
							  var tag = "0";
							  var province = $(".provinceId").val();
							  var city = $(".cityId").val();
							  var district = $(".districtId").val();
							  var addressInfo = new Object();  
							  addressInfo.province = province;
							  addressInfo.city = city;
							  addressInfo.district = district;
							  var json = updateShoppingCartObj(goodsId, goodsNumber, salePrice, tag, "","", "", "", "","","","","","","","","0.00",addressInfo,"pstg_-_pstg_normv1_-_2");
							  var data =  eval(json); 
							  if(data.isSuccess){
							  		var bigcg = {
							  			//'zznum':zznum,
							  			'zznb':zznb,
							  			'tid':tid,
							  			'saleprice':salePrice,
							  			'goodsid':goodsId
							  		}

								  	loadShoppingCart(1,bigcg);

							  }else{
							  	  alert('加入购物车失败');
								  //$("#deletenull-message").find("div.name").html("加入购物车失败。");
								  //$("#deletenull-message").popbox({title:'提示'});
							  }
			  			});
			  		}else{
			  			$("#package-add-1").addClass("cdbig_no");
			  		}
			  		
			  		
			 }
	   });
	}

}
