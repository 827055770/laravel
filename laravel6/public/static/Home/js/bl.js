//BL object
var BL = BL || {};
BL.Global=BL.Global||{};
BL.Global = {
		version:"1.0",
		cookie:{
			f:function (c){
				return"string"===typeof c && ""!==c;
			},
			get:function(key){
				var a = "",d;
				if(this.f(key)&&(d=(""+document.cookie).match(RegExp("(?:^| )"+key+"(?:(?:=([^;]*))|;|$)")))){
					a=d[1]?decodeURIComponent(d[1].replace(/\+/g," ")):"";
				}
				return a;
			},
			set:function(key,val,d,domain,path){
				if(!path){path = "/";} 
				var a=""+encodeURIComponent(val),e=d;"number"===typeof e && (e=new Date,e.setTime(e.getTime()+864E5*d));
				e instanceof Date&&(a+="; expires="+e.toUTCString());this.f(domain)&&(a+="; domain="+domain);this.f(path)&&(a+="; path="+path);
				/*secure&&(a+="; secure");*/
				document.cookie=key+"="+a;
			},
			remove:function(key,domain,path){
				this.set(key,"",-1,domain,path);
			}
		},
		productCookie:{
			init : function(productid) {
				var cook = BL.Global.cookie.get("_IOKBL_B_P");
				if (cook == null || cook == "" || cook == "undefined") {
					BL.Global.cookie.set("_IOKBL_B_P", productid, 365, domain.cookie);

				} else {
					cook = BL.Global.cookie.get("_IOKBL_B_P");
					var proList = cook.split("_");// eval('('+cook+')');
					var type = true;
					if (proList.length < 25) {
						for (var i = 0; i < proList.length; i++) {
							if (proList[i] == productid) {
								type = false;
								break;
							}
						}
						if (type) {
							cook = cook + "_" + productid;
							BL.Global.cookie.set("_IOKBL_B_P", cook, 365, domain.cookie);
						}
					} else {
						for (var i = 0; i < proList.length; i++) {
							if (proList[i] == productid) {
								type = false;
								break;
							}
						}
						if (type) {
							proList.splice(0, 1);
							proList.push(productid);
							var proIds = proList.join("_");
							BL.Global.cookie.set("_IOKBL_B_P", proIds, 365,
									domain.cookie);
						}
					}
				}
			},
			del : function(productid) {
				var cook = BL.Global.cookie.get("_IOKBL_B_P");
				var proList = cook.split("_");
				for (var i = 0; i < proList.length; i++) {
					if (proList[i] == productid) {
						proList.splice(i, 1);
						break;
					}
				}
				var proIds = proList.join("_");
				BL.Global.cookie.set("_IOKBL_B_P", proIds, 365, domain.cookie);
			}
		},
		isLogin:function(){
		    var t=this.cookie.get("_m_t_i");
		    var m=this.cookie.get("__mn");
		    return !!(t&&m);
		},
		getNick:function(){
			return this.cookie.get("__mn");
		},
		getHost:function(){
			if(window.location.host.indexOf(".dev.")>0){
	           return "dev.bl";
			}else if(window.location.host.indexOf(".st.")>0){
               return "st.bl";
			}else if(window.location.host.indexOf(".ut.")>0){
               return "ut.bl";
			}else if(window.location.host.indexOf(".bl.")>0 || window.location.host.indexOf(".ibl.cn")>0){
               return "bl";
			}else{

			}
		},
		getUrlParam:function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		},
		include_js:function(file, callback){
		    var _doc = document.getElementsByTagName('body')[0];
		    var js = document.createElement('script');
		    js.setAttribute('type', 'text/javascript');
		    js.setAttribute('src', file);
		    _doc.appendChild(js);
		    if (!/*@cc_on!@*/0) { //if not IE
		        js.onload = function () {
		            if (callback) {
		                callback();
		            }
		        }
		    } else {
		        js.onreadystatechange = function () {
		            if (js.readyState == 'loaded' || js.readyState == 'complete') {
		                if (callback) {
		                    callback();
		                }
		            }
		        }
		    }
		    return false;
		},
		base64Decode:function(str){
			var c1, c2, c3, c4;
			var base64DecodeChars = new Array(
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
			58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0,  1,  2,  3,  4,  5,  6,
            7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
            37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,
            -1, -1);
			var i=0, len = str.length, string = '';
			while (i < len){
				do{
					c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
				} while (
					i < len && c1 == -1
		        );
				if (c1 == -1) break;
				do{
					c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
	            } while (
	            	i < len && c2 == -1
	            );
				if (c2 == -1) break;
				string += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
				do{
					c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61) return string;
                    c3 = base64DecodeChars[c3];
                } while (
                	i < len && c3 == -1
                );
				if (c3 == -1) break;
				string += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
	           do{
	        	   c4 = str.charCodeAt(i++) & 0xff;
	        	   if (c4 == 61) return string;
	        	   c4 = base64DecodeChars[c4];
	           } while (
        		   i < len && c4 == -1
	           );
	           if (c4 == -1) break;
	           string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
			}
			return string;
		},
		encodeUTF8:function(s){
			var i, r = [], c, x;
			for (i = 0; i < s.length; i++)
				if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
				else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
				else {
					if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
						c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
							r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
					else r.push(0xE0 + (c >> 12 & 0xF));
					r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
				};
			return r;
		},
		sha1:function(s){
            var data = new Uint8Array(BL.Global.encodeUTF8(s))
            var i, j, t;
            var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
            s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
            for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
            s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
            s[l - 1] = data.length << 3;
            var w = [], f = [
                    function () { return m[1] & m[2] | ~m[1] & m[3]; },
                    function () { return m[1] ^ m[2] ^ m[3]; },
                    function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
                    function () { return m[1] ^ m[2] ^ m[3]; }
                ], rol = function (n, c) { return n << c | n >>> (32 - c); },
                k = [1518500249, 1859775393, -1894007588, -899497514],
                m = [1732584193, -271733879, null, null, -1009589776];
            m[2] = ~m[0], m[3] = ~m[1];
            for (i = 0; i < s.length; i += 16) {
                var o = m.slice(0);
                for (j = 0; j < 80; j++)
                    w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
                        t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
                        m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
                for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
            };
            t = new DataView(new Uint32Array(m).buffer);
            for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);

            var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
                return (e < 16 ? "0" : "") + e.toString(16);
            }).join("");
            return hex;
		},
		isMobile:function(){var e=navigator.userAgent;return!!e.match(/AppleWebKit.*Mobile.*/)||"ontouchstart"in document.documentElement;}

};
//是否弱密码
function isWeakPw(){
	//弱密码弹框
	if(BL.Global.cookie.get("_l_p_p") == "pool"){
		var str='<div style="background: rgba(0,0,0,.3);*background:#000;*filter:alpha(opacity=30);position:fixed;left:0;top:0;width:100%;height:100%;z-index:11000;display:none;" id="j-password-back"></div>';
		str=str+'<div style="left:50%;margin-left:-190px;top:50%;margin-top:-150px;position: fixed;background: #fafafa;border:1px solid #aaa;box-shadow:0 0 2px 2px rgba(0,0,0,.1);z-index:11001;font-family:Microsoft Yahei;display:none;" id="j-password-box">'
		str=str+'<div style="background:#eee;position:relative;">'
		str=str+'<div style="line-height:44px;height:44px;padding-left:20px;font-size:14px;color:#666;font-weight:700;">温馨提示</div>'
		str=str+'<a href="javascript:void(0);" id="j-password-close" title="关闭" style="width:30px;height:36px;line-height:36px;text-align:center;color:#a8a8a3;font-size:32px;text-decoration:none;cursor:pointer;position:absolute;right:6px;top:4px;">×</a>'
		str=str+'</div>'
		str=str+'<div style="float:left;display:inline;background:#fff;">'
		str=str+'<div style="padding:20px 20px 24px;float:left;display:inline;width:340px;">'
		str=str+'<div style="width:340px;height:36px;border-bottom:1px solid #e4e4e4;padding-bottom:18px;text-align:center;">您的密码过于简单，<br>为了您的账户安全，请尽快修改密码。</div>'
		str=str+'<div style="width:100%;height:auto;padding-top:15px;text-align:center;">'
		str=str+'<button style="width:125px;height:26px;background:#E6133C;color:#fff;text-align:center;border:0 none;cursor:pointer;" id="toUpdatep">立即修改</button>'
		str=str+'</div>'
		str=str+'</div>'
		str=str+'</div>'
		str=str+'</div>'
        
		$("body").after(str);
		$("#toUpdatep").click(function(){
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
			location.href=domain.my + "/user/personal/toUpdatePass.html"+addUrl;
		});
		
//		var nowHost = window.location.host;
//		
//		if(nowHost != ""){
//			BL.Global.cookie.remove("_l_p_p",nowHost,"/");
//		}else{
			BL.Global.cookie.remove("_l_p_p",domain.cookie,"/");
//		}
		
		
		$('#j-password-back').show();
		$('#j-password-box').show();
		
		$('#j-password-close').click(function(){
			$('#j-password-back').hide();
		  $('#j-password-box').hide();
		});
	}
}

var openStatus = null;
$.ajax({
    type : "get",
    url : domain.main+"/sidebar/openStatus.html",
    dataType : "jsonp",
    async : false,
    error : function(){
        xiaonengKf()
    },
    success : function(data){
       if(null != data && null != data.obj && null != data.obj.customerFlag){
           openStatus = data.obj.customerFlag;
	   }
        if(openStatus == "1"){
            udesk_kf_jcfunc()
        }else{
            xiaonengKf()
        }
    }
});
/**********************************udesk客服***************************************/

function udesk_kf_jcfunc(){
	var script = document.createElement('script');
	script.setAttribute('src', domain.js+'/resources/v4.2/unit/kf-udesk.js');
	script.onload = function() {
	}
	document.body.appendChild(script);
}
/**********************************udesk客服***************************************/
function  xiaonengKf(){
    /**********************************小能客服***************************************/
    /**********************************小能客服***************************************/
    /**********************************小能客服***************************************/
    /**********************************小能客服***************************************/
//获取砖石积分
    BL.Global.xninit = false;
    var xiaoneng_kf_uid = null;
    var xiaoneng_kf_uname = null;
    var xiaoneng_loading_page = null;
    if(BL.Global.getHost()=="bl"){
        var xiaoneng_settingid = "bc_1000_template_5";
    }else{
        var xiaoneng_settingid = "bc_1000_template_3";
    }
//首页头部客服类型
    function xiaoneng_kf_sy(){
        var data = {
            siteid:"bc_1000",
            settingid:xiaoneng_settingid,
            uid:xiaoneng_kf_uid,          //uid：用户ID，未登录可以为空，但不能给null
            uname: xiaoneng_kf_uname,       //uname：用户名称，未登录可以为空，但不能给null，
            isvip:isvip,        //isvip：是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端上
            userlevel:"0"   //userlevel：网站自定义会员级别，0-N，可根据选择判断，取值显示到小能客户端上
        };

        return data;
    }
//单品页客服类型
    function xiaoneng_kf_spxqy(){
        var data = {
            siteid:"bc_1000",
            settingid:xiaoneng_settingid,
            uid:xiaoneng_kf_uid,          //uid：用户ID，未登录可以为空，但不能给null
            uname: xiaoneng_kf_uname,       //uname：用户名称，未登录可以为空，但不能给null，
            isvip:isvip,        //isvip：是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端上
            userlevel:"0",   //userlevel：网站自定义会员级别，0-N，可根据选择判断，取值显示到小能客户端上
            itemid:$("#q_productid").val()      //itemid：(必填)商品ID
        };
        return data;
    }
//地方Js 加载
    function xiaoneng_kf_jcfunc(){
        var script = document.createElement('script');
        script.setAttribute('id', 'xiaonengjs');
        script.setAttribute('src', 'https://nx-v1-bc1000-visitor.ntalker.com/visitor/js/xiaoneng.js?siteid=bc_1000');
        script.onload = function() {

        }
        document.body.appendChild(script);
    }
    function xiaoneng_updatePageInfo(){
        console.info("setCustomerInfo");
        var updateID=BL.Global.cookie.get("_m_t_i").length > 0 ? BL.Global.base64Decode(BL.Global.cookie.get("_m_t_i")).split("&mi=")[1] : "";
        //地方Js 加载
        //NTKF.im_updatePageInfo({"uname":""+decodeURI(BL.Global.getNick()),"uid":""+updateID});
        xn('setCustomerInfo', {
                uid: updateID,
                uname: decodeURI(BL.Global.getNick()),
            }
        );

    }
    function xninit(){
        if(!BL.Global.xninit && location.hostname !="payment.bl.com"){
            isvip="0";
            $.ajax({
                type : "get",
                url : domain.my+"/sidebar/isVip.html",
                dataType : "jsonp",
                async : false,
                error : function(){
                },
                success : function(data){
                    isvip=data;
                }
            });
            //获取用户信息

            xiaoneng_kf_uid = BL.Global.cookie.get("_m_t_i").length > 0 ? BL.Global.base64Decode(BL.Global.cookie.get("_m_t_i")).split("&mi=")[1] : "";
            xiaoneng_kf_uname = decodeURI(BL.Global.getNick());
            //选择加载方式
            /*xiaoneng_loading_page="http://"+document.location.hostname;
            NTKF_PARAM ="";
            if(xiaoneng_loading_page === domain.product){
                NTKF_PARAM=xiaoneng_kf_spxqy();
            }else{
                NTKF_PARAM=xiaoneng_kf_sy();
            }*/

            xiaoneng_kf_jcfunc();
            //确认小能已经初始化
            BL.Global.xninit = true;

            $(".c_ntkf").click(function(){
                if(BL.Global.isLogin()){
                    xn('setCustomerInfo', {
                            uid: xiaoneng_kf_uid,
                            uname: xiaoneng_kf_uname,
                        }
                    );
                    //NTKF.im_openInPageChat('bm_1000_1522426708583')
                    xiaoneng_loading_page="https://"+document.location.hostname;
                    NTKF_PARAM ="";
                    if(xiaoneng_loading_page === domain.product){
                        var goodsId = $("#q_productid").val();
                        xn('openChat', xiaoneng_settingid, {
                                'erpparam': '',
                                'robot':{
                                    'itemid': goodsId,
                                    'orderid': ''
                                }
                            },
                            true);
                    }else{
                        xn('openChat', xiaoneng_settingid);
                    }

                }else{
                    BL.Global.cookie.set('c_ntkf',window.location.href,1,domain.cookie);
                    window.location.href = domain.passport+ "?returnurl="+ encodeURIComponent(window.location.href);
                }
            });
            $(".xn_openChat").click(function(){
                xn('setCustomerInfo', {
                        uid: xiaoneng_kf_uid,
                        uname: xiaoneng_kf_uname,
                    }
                );
                xn('openChat', xiaoneng_settingid);
            });
            $(".openInPageChat").click(function(){
                xn('setCustomerInfo', {
                        uid: xiaoneng_kf_uid,
                        uname: xiaoneng_kf_uname,
                    }
                );
                var orderid = $(this).attr("data-orderid");
                var goodsId = $(this).attr("data-goodsId");
                xn('openChat', xiaoneng_settingid, {
                        'erpparam': orderid,
                        'robot':{
                            'itemid': goodsId,
                            'orderid': orderid
                        }
                    },
                    true)
            });
            if(BL.Global.cookie.get('g_ntkf')){
                var timer = null;
                clearInterval(timer);
                timer = setInterval(function(){
                    if(window.NTKF){
                        clearInterval(timer);
                        //NTKF.im_openInPageChat('bm_1000_1522426708583');
                        xn('openChat', xiaoneng_settingid);
                    }
                },500)
                BL.Global.cookie.remove('g_ntkf',domain.cookie);
            }
        }
    }
    if($(".aftermarket-service").length>0){
        xninit();
    }
    if($(".order-online").length>0){
        xninit();
    }
    if($(".left-side .nav").length>3){
        $(".left-side .nav").mouseenter(function(){
            xninit();
        });
    }
    $(".order-online").live("mouseenter",function(){
        xninit();
    });
    $(".tools-right,.right-slidebar").mouseenter(function(){
        xninit();
    });
//若是登录回调后自动打开聊天窗口
    if($(".c_ntkf").length>0){
        if(BL.Global.cookie.get('g_ntkf')){
            xninit();
        }
    }
    /**********************************小能客服***************************************/
    /**********************************小能客服***************************************/
    /**********************************小能客服***************************************/
    /**********************************小能客服***************************************/
}


function useChannel(channel){
	var infoVal = "此优惠券仅限 ";
	var channelVal = "";
	if(channel.indexOf("1")>=0){
		channelVal += "APP端/";
	}
	if(channel.indexOf("2")>=0){
		channelVal += "H5端/";
	}
	if(channel.indexOf("4")>=0){
		channelVal += "线下门店/";
	}
	channelVal = channelVal.substring(0,channelVal.lastIndexOf("/"));
	infoVal = infoVal + channelVal +" 使用！";
	var str='<div style="background: rgba(0,0,0,.3);*background:#000;*filter:alpha(opacity=30);position:fixed;left:0;top:0;width:100%;height:100%;z-index:11000;display:none;" id="j-tip-back"></div>';
	str=str+'<div style="left:50%;margin-left:-190px;top:50%;margin-top:-150px;position: fixed;background: #fafafa;border:1px solid #aaa;box-shadow:0 0 2px 2px rgba(0,0,0,.1);z-index:11001;font-family:Microsoft Yahei;display:none;" id="j-tip-box">'
	str=str+'<div style="background:#eee;position:relative;">'
	str=str+'<div style="line-height:44px;height:44px;padding-left:20px;font-size:14px;color:#666;font-weight:700;">温馨提示</div>'
	str=str+'<a href="javascript:void(0);" id="j-tip-close" title="关闭" style="width:30px;height:36px;line-height:36px;text-align:center;color:#a8a8a3;font-size:32px;text-decoration:none;cursor:pointer;position:absolute;right:6px;top:4px;">×</a>'
	str=str+'</div>'
	str=str+'<div style="float:left;display:inline;background:#fff;">'
	str=str+'<div style="padding:20px 20px 24px;float:left;display:inline;width:340px;">'
	str=str+'<div style="width:340px;height:36px;border-bottom:1px solid #e4e4e4;padding-bottom:18px;text-align:center;">'+infoVal+'</div>'
	str=str+'<div style="width:100%;height:auto;padding-top:15px;text-align:center;">'
	str=str+'<button style="width:125px;height:26px;background:#E6133C;color:#fff;text-align:center;border:0 none;cursor:pointer;" id="tip-ok">确认</button>'
	str=str+'</div>'
	str=str+'</div>'
	str=str+'</div>'
	str=str+'</div>'
	$("body").after(str);
	$('#j-tip-close').click(function(){
		$('#j-tip-back').remove();
		$('#j-tip-box').remove();
	});
	$('#j-tip-back').show();
	$('#j-tip-box').show();
	$("#tip-ok").click(function(){
		$('#j-tip-close').click();
	});
}
window.BL.Init = (function(){
	/*domain*/
	var domain = window.domain || {};
	var selfHttp = window.location.protocol + "//";
	domain.nowHost= BL.Global.getHost();  //判断环境,本地环境返回空
	domain.Static = function(restype){
		if(BL.Global.getHost()=="dev.bl"){
		   return selfHttp+"img.iblimg.com/respc-1";
		}else if(BL.Global.getHost()=="st.bl"){
		   return selfHttp+"img.iblimg.com/respc-1";
		}else if(BL.Global.getHost()=="ut.bl"){
		   return selfHttp+"res11.ut.iblimg.com/respcp-1";
		}else if(BL.Global.getHost()=="bl"){
		   return selfHttp+"res11.iblimg.com/respc-1";
		}else{
	
		}
	};
	domain.Mobile = function(){
		if(BL.Global.getHost()=="dev.bl"){
		   return selfHttp+"m.st.bl.com/h5-web/page/view_Index.html";
		}else if(BL.Global.getHost()=="st.bl"){
		   return selfHttp+"m.st.bl.com/h5-web/page/view_Index.html";
		}else if(BL.Global.getHost()=="ut.bl"){
		   return selfHttp+"m.ut.bl.com/h5-web/page/view_Index.html";
		}else if(BL.Global.getHost()=="bl"){
		   return "http://m.bl.com/h5-web/page/view_Index.html";
		}else{
	
		}
	};
	domain.GetPayment = function(){
		if(BL.Global.getHost()=="dev.bl"){
		   return selfHttp+"zf.dev.bl.com";
		}else if(BL.Global.getHost()=="st.bl"){
		   return selfHttp+"zf.st.bl.com";
		}else if(BL.Global.getHost()=="ut.bl"){
		   return "https://payment.ut.bl.com";
		}else if(BL.Global.getHost()=="bl"){
		   return "https://payment.bl.com";
		}else{
		   
		}
	};
	domain.v = 179117;
	domain.version = (new Date()).getTime();
	domain.main = domain.nowHost?window.location.protocol+"//www."+domain.nowHost+".com":domain.main;
	domain.help = domain.nowHost?window.location.protocol+"//help."+domain.nowHost+".com":domain.help;
	domain.my = domain.nowHost?window.location.protocol+"//my."+domain.nowHost+".com":domain.my;
	domain.global = domain.nowHost?window.location.protocol+"//global."+domain.nowHost+".com":domain.global;
	domain.cart = domain.nowHost?"//cart."+domain.nowHost+".com":domain.cart;
	domain.fashion = domain.nowHost?window.location.protocol+"//fashion."+domain.nowHost+".com":domain.fashion;
	domain.life = domain.nowHost?window.location.protocol+"//life."+domain.nowHost+".com":domain.life;
	domain.product = domain.nowHost?window.location.protocol+"//product."+domain.nowHost+".com":domain.product;
	domain.search = domain.nowHost?window.location.protocol+"//search."+domain.nowHost+".com":domain.search;
	domain.qiang = domain.nowHost?window.location.protocol+"//qiang."+domain.nowHost+".com":domain.qiang;
	domain.tuan = domain.nowHost?window.location.protocol+"//tuan."+domain.nowHost+".com":domain.tuan;
	domain.hot = domain.nowHost?window.location.protocol+"//hot."+domain.nowHost+".com":domain.hot;
	domain.order= domain.nowHost?window.location.protocol+"//channel."+domain.nowHost+".com":domain.order;
	domain.chongzhi = domain.nowHost?window.location.protocol+"//chongzhi."+domain.nowHost+".com":domain.chongzhi;
	domain.jiaofei = domain.nowHost?window.location.protocol+"//jiaofei."+domain.nowHost+".com":domain.jiaofei;
	domain.coupon = domain.nowHost?window.location.protocol+"//coupon."+domain.nowHost+".com":domain.coupon;
	domain.trade = domain.nowHost?window.location.protocol+"//trade."+domain.nowHost+".com":domain.trade;
	domain.promotion = domain.nowHost?"http://promotion."+domain.nowHost+".com":domain.promotion;
	domain.cookie = "."+domain.nowHost+".com";
	domain.dc1= domain.nowHost?window.location.protocol+"//dc1."+domain.nowHost+".com":domain.dc1;
	domain.dt1 = domain.nowHost?window.location.protocol+"//dt1."+domain.nowHost+".com":domain.dt1;
	domain.dc2 = domain.nowHost?window.location.protocol+"//dc2."+domain.nowHost+".com":domain.dc2;
	domain.s = domain.nowHost?window.location.protocol+"//s."+domain.nowHost+".com":domain.s;
	domain.blk = domain.nowHost?window.location.protocol+"//blk."+domain.nowHost+".com":domain.blk;
	//https
	domain.passport = domain.nowHost?"https://passport."+domain.nowHost+".com":domain.passport;
	domain.reg = domain.nowHost?"https://reg."+domain.nowHost+".com":domain.reg;
	domain.payment = domain.GetPayment()?domain.GetPayment():domain.payment;
	domain.safe = domain.nowHost?"https://safe."+domain.nowHost+".com":domain.safe;
	domain.httpsImg = "https://res11.iblimg.com";
	//特殊的
	domain.js = domain.Static("js")?domain.Static("js"):domain.js;
	domain.image = domain.Static("image")?domain.Static("image"):domain.image;
	domain.m = domain.Mobile()?domain.Mobile():domain.m;
	
	window.domain = domain;
	
	//整站传递
	window.bl_mmc = "";
	window.bl_ad = "";
	var sUrl = window.location.search;
	if(sUrl.indexOf("cm_mmc")>0){
		window.bl_mmc =  BL.Global.getUrlParam("cm_mmc").replace(/-_-/g, "_-_");
	}
	if(sUrl.indexOf("bl_mmc")>0){
		window.bl_mmc =  BL.Global.getUrlParam("bl_mmc");
	}
	if(sUrl.indexOf("bl_ad")>0){
		window.bl_ad =  BL.Global.getUrlParam("bl_ad");
	}
	//营销投放
	if(BL.Global.getUrlParam("cm_mmc") != null){
		var g = window.BL;
		var c = domain.cookie;
		g.Global.cookie.set("cm_mmc", BL.Global.getUrlParam("cm_mmc"), 1, c);
		g.Global.cookie.set("ads_token", BL.Global.getUrlParam("cm_mmc"), 1, c);
		// 业态
		g.Global.cookie.set("buid", BL.Global.getUrlParam("buid"), 1, c);
		// 门店
		g.Global.cookie.set("store_id", BL.Global.getUrlParam("store_id"), 1, c);
		// 投放批次号
		g.Global.cookie.set("batch_id", BL.Global.getUrlParam("batch_id"), 1, c);
		// 来源渠道
		g.Global.cookie.set("adverChannel", BL.Global.getUrlParam("adverChannel"), 1, c);
		// 合作渠道(对方会员ID)
		g.Global.cookie.set("ads_uid", BL.Global.getUrlParam("ads_uid"), 1, c);
	}
	isWeakPw();
	//foot copyright
	$(".bottom-nav .copyright").html('百联集团有限公司版权所有 <span>|</span>  客服电话：400-900-8800  <span>|</span> <a href="http://www.beian.miit.gov.cn" target="_blank">沪ICP备15028847号-1</a>');
    var aLength = $(".bottom-nav").find(".drug-message").length;
    if(aLength < 3){
        $(".bottom-nav .drug-message").eq(0).after('<br/><a target="_blank" href="'+domain.js+'/resources/v4.0/img/yiliaoqixiepingzheng.pdf" class="drug-message">医疗器械网络交易服务第三方平台备案凭证-（沪）网械平台备字[2020]第00002号</a>')
    }
	if($(".police a").eq(3).find("span").html()!="网购大家评"){
		$(".police a").eq(1).find("img").attr("src","https://res12.iblimg.com/respc-1/resources/v4.1/widget/footer1200/i/wangjing1.png").css("width","21px");
		$(".police a").eq(1).appendTo($(".police"));
	}
	
})();
/*
    
*/
$.ajaxSetup({
     headers: { "chnflg": "pc","channelId":"3" }
});




