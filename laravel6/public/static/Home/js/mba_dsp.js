(function(){var a=window.mediav||{};window.mediav=a;a.paramFilter=function(g,c,f){if(document.domain.indexOf("jiuxian")>=0&&c.pageType=="cartview"){for(var e=0,b=g.length;e<b;e++){var d=g[e].split("=")[0];if(d=="qzjgo"){g[e]=g[e].replace("qzjgo","qzjgono")}}}if(f=="m-6-0"||f=="m-21037-0"||f=="m-21039-1"){for(var e=0,b=g.length;e<b;e++){var d=g[e].split("=")[0];if(d=="qzjgo"){g[e]=g[e].replace("qzjgo","qzjgono")}}}if(f=="m-214-0"){g.push("qzjurl="+encodeURIComponent(window.location.href))}}})();(function(){try{var b=window.mediav||{};window.mediav=b;b.test=function(c){};if(window.dsp_lite){return}window.dsp_lite=1;window.$mat=1;b.cookie={};b.$version="3.3.8.18";b.cookie._isValidKey=function(c){return(new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24')).test(c)};if(window._mv_loader&&!window._mv_loader.$version&&window._mv_loader.getRandom){(function(){var c=new Date()-0;window._mv_loader.getRandom=function(e){var d;if(e=="mv"){_mv_loader.mv++;d=_mv_loader.mv}else{_mv_loader.mba++;d=_mv_loader.mba}return _mv_loader.random&&_mv_loader.random[d]||(c+""+d)}})()}b.cookie.getRaw=function(d){if(b.cookie._isValidKey(d)){var e=new RegExp("(^| )"+d+"=([^;]*)(;|\x24)"),c=e.exec(document.cookie);if(c){return c[2]||null}}return null};b.cookie.get=function(c){var d=b.cookie.getRaw(c);if("string"==typeof d){try{d=decodeURIComponent(d)}catch(f){}return d}return null};b.cookie.setRaw=function(e,f,d){d=d||{};var c=d.expires;if("number"==typeof d.expires){c=new Date();c.setTime(c.getTime()+d.expires)}document.cookie=e+"="+f+(d.path?"; path="+d.path:"/")+(c?"; expires="+c.toGMTString():"")+(d.domain?"; domain="+d.domain:"")+(d.secure?"; secure":"")};b.cookie.remove=function(d,c){c=c||{};c.expires=new Date(0);b.cookie.setRaw(d,"",c)};b.cookie.set=function(d,e,c){b.cookie.setRaw(d,encodeURIComponent(e),c)};b.oOrganic=function(d,c){this.srcName=d;this.keyword=c};b.cOrganics=[new b.oOrganic("baidu","word"),new b.oOrganic("baidu","wd"),new b.oOrganic("google","q"),new b.oOrganic("sogou","query"),new b.oOrganic("zhongsou","w"),new b.oOrganic("soso","w"),new b.oOrganic("search.114.vnet.cn","kw"),new b.oOrganic("youdao","q"),new b.oOrganic("gougou","search"),new b.oOrganic("bing","q"),new b.oOrganic("msn","q"),new b.oOrganic("live","q"),new b.oOrganic("aol","query"),new b.oOrganic("aol","q"),new b.oOrganic("aol","encquery"),new b.oOrganic("lycos","query"),new b.oOrganic("ask","q"),new b.oOrganic("altavista","q"),new b.oOrganic("netscape","query"),new b.oOrganic("cnn","query"),new b.oOrganic("looksmart","qt"),new b.oOrganic("about","terms"),new b.oOrganic("pchome","q")];b.queryToJson=function(e){var g={};var k=e.split("?");k.shift();var j=k.shift();if(k.length>=1){var h=k.join("?")}var j=e.split("?")[1];if(j){j=j.split("&");for(var f=0,c=j.length;f<c;f++){var d=j[f].split("=");g[d[0]]=d[1];if(h&&f==c-1){g[d[0]]=d[1]+"?"+h}}}return g};b.jsonp=function(f,c){var e=(new Date).getTime();var i="jsonp"+e+Math.floor(Math.random()*10000);f=f+"&cb="+i;window[i]=window[i]||function(j){h(j);window[i]=undefined;try{delete window[i]}catch(k){}if(g){g.removeChild(d)}};var g=document.getElementsByTagName("head")[0]||document.documentElement;var d=document.createElement("script");d.src=f;g.insertBefore(d,g.firstChild);function h(j){if(typeof(c)=="function"){c(j)}}};b.truncation=function(g,d,e){for(var f=0,h=0;f<g.length&&h<d;f++){h++;if(g.charCodeAt(f)>128){h+=8}}return g.substr(0,f)+((e&&g.length)>f?"":"")};b.sendRequestByJsonp=function(c,d){b.jsonp(c,d)};b.createCampaignSource=function(d){var c=d["_mvsrc"]||d["_mvmix"];var e=d["_mvcam"];if(c){return new b.sourceX("(camp)",c,e)}};b.createSearchSource=function(c){if(c==null||c.indexOf("://")<0){return}var k=function(l){var i="";i=l.split("://")[1];if(i){(i.indexOf("/")>=0)&&(i=i.split("/")[0])}return i};var j=k(c);var m=b.cOrganics;var d=b.queryToJson(c);for(var f=0,e=m.length;f<e;f++){var h=m[f];if(j.indexOf(h.srcName)>=0){var g=d[h.keyword];if(g){return new b.sourceX("(search)",h.srcName,g)}}}};b.createRefSource=function(c){if(c==null||c.indexOf("://")<0){return}var e=c.split("://")[1].toLowerCase();if(e.indexOf("/")>=0){var d=e.substring(e.indexOf("/"));if(d.indexOf("?")>=0){d=d.split("?")[0]}e=e.split("/")[0]}if(0==e.indexOf("www.")){e=e.substring(4)}return new b.sourceX("(ref)",e,d)};b.sourceX=function(d,c,e){this.srcName=c;this.content=e};b.updateSingleSource=function(d,h,c,f,i){if(!c){return}var e="jzqsr="+c.srcName+"|"+"jzqct="+c.content;var g=h.split(".");if(g.length<6){g[0]=1;g[1]=f;g[2]=f;g[3]=1;g[4]="jzqsr="+c.srcName+"|"+"jzqct="+c.content;g[5]=g[4]}else{if(g[4]!=e){g[3]=g[3]-0+1;g[2]=f;g[5]=e}}return g.join(".")};b.sendRequest=function(d,e){var c=new Image(1,1);c.onload=function(){c.onload=null;e&&e()};c.src=d;window["mv_"+(new Date()-0)]=c};b.sendByAjaxRequest=function(f,g,c){var e,d=window.XDomainRequest;if(d){e=new d;e.open("POST",c)}else{if(d=window.XMLHttpRequest){d=new d;if("withCredentials" in d){e=d;e.open("POST",c,true);e.setRequestHeader("Content-Type","text/plain")
}}}if(e){e.onreadystatechange=function(){if(e.readyState==4){g&&g();e=null}};e.send(f);return true}return false}}catch(a){b.test("t3=error1"+a.type)}(function(){function G(m){return encodeURIComponent(m)}var ae=new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g");function ac(m){return String(m).replace(ae,"")}function e(q,m){q[m]=""+(q[m]?q[m]*1+1:1)}var k;var w={};var z=true;var p=b.commands={};var i=function(ah){ah=[].slice.call(ah,0);var ag=[],q=[],m=[];for(var af=0;ah[af];af++){switch(ah[af][0]){case"$setGeneral":ag.push(ah[af]);break;case"$setAccount":ag.unshift(ah[af]);break;case"$logConversion":q.push(ah[af]);break;case"$logData":q.unshift(ah[af]);break;default:m.push(ah[af])}}return ag.concat(m).concat(q)};b.runCmd={push:function(){var q=arguments.length;arguments=i(arguments);for(var af=0;af<q;af++){var m=[];Array.prototype.push.apply(m,arguments[af]);var ag=m.shift();p[ag]&&p[ag].apply(this.runner,m)}}};function C(){var m=window.location.host;return m}function H(){if(document.domain.indexOf("banggo.com")>=0){return".banggo.com"}if(document.domain.indexOf("xueersi.com")>=0){return".xueersi.com"}if(document.domain.indexOf("cn100.com")>=0){return".cn100.com"}if(document.domain.indexOf("shangpin.com")>=0){return".shangpin.com"}return""}function Y(ag){var af=1,q=0,m;if(ag){af=0;for(m=ag.length-1;m>=0;m--){q=ag.charCodeAt(m);af=(af<<6&268435455)+q+(q<<14);q=af&266338304;af=q!=0?af^q>>21:af}}return af}function T(){return Math.round(Math.random()*2147483647)^Y(r+s)&2147483647}function M(){var m=(new Date()-0);return[1,T(),m,m,m,m,m,0,0,0,0,0]}function K(){var m=(new Date()-0);return[1,m,0,0,1,0]}function I(){return 1}function f(){return[0,0,0]}var Z=new Date();Z.setDate(Z.getDate()+1);Z.setHours(0);Z.setMinutes(0);Z.setSeconds(0);var t=Z-new Date();var A=63072000000;var v=15768000000;var O=1800000;var g=new Date()-0;var r=document.referrer;var s=C();var u=H();var F=b.cookie;var N=F.get("_qzja");var L=F.get("_qzjb");var J=F.get("_qzjc");var aa=F.get("_qzjto");var h=F.get("_jzqosr");var B=F.get("_jzqco");var D=[];window.random=D;if(!B){var o=F.get("_jzqx");var n=F.get("_jzqy");var l=F.get("_jzqz")}else{var X=B.split("|");o=X[0];n=X[1];l=X[2];o=decodeURIComponent(o);n=decodeURIComponent(n);l=decodeURIComponent(l)}if(u){b.cookie.remove("_qzja");b.cookie.remove("_qzjb");b.cookie.remove("_qzjc");b.cookie.remove("_qzjto");b.cookie.remove("_qzja",{path:"/"});b.cookie.remove("_qzjb",{path:"/"});b.cookie.remove("_qzjc",{path:"/"});b.cookie.remove("_qzjto",{path:"/"})}if(window.location.pathname!="/"){b.cookie.remove("_qzja");b.cookie.remove("_qzjb");b.cookie.remove("_qzjc");b.cookie.remove("_qzjto")}var ab=!N||!L||!J;N=N?N.split("."):M();L=L?L.split("."):K();J=J||I();aa=aa?aa.split("."):f();var R;function d(){var m=new Date()-0;if(ab){N[3]=N[4];N[4]=m;L[4]=1;e(N,11);e(aa,1)}else{L[4]=0}N[5]=N[6];N[6]=m;e(N,10);e(L,2);e(aa,0)}function S(){F.set("_qzja",N.join("."),{expires:A,domain:u,path:"/"});F.set("_qzjb",L.join("."),{expires:O,domain:u,path:"/"});F.set("_qzjc",J,{domain:u,path:"/"});F.set("_qzjto",aa.join("."),{expires:t,domain:u,path:"/"});var m=encodeURIComponent(o||"")+"|"+encodeURIComponent(n||"")+"|"+encodeURIComponent(l||"")}function ad(ag,af){try{if(L[5]&&w.userName){N[8]=1;S()}var aj=[N[0],N[1],(N[2]+"").substring(0,10),(N[3]+"").substring(0,10),(N[4]+"").substring(0,10),N[10]].join(".");var ah=["_jzqa="+aj];o&&(ah.push("_jzqx="+o));n&&(ah.push("_jzqy="+n));l&&(ah.push("_jzqz="+l));ah=encodeURIComponent(ah.join(";+"));ag=ag||[];ag.push("type=3&db=none");if(!af){ag.push("qzja="+N.join("."),"qzjb="+L.join("."),"qzjto="+aa.join("."));ag.push("jzqh="+s);ag.push("jzqpt="+G(w.pageTitle||b.truncation(document.title,400)));ag.push("jzqre="+G(r.substr(0,400)));N[7]&&ag.push("qzjhn="+N[7]);w.userId&&ag.push("qzjui="+G(w.userId));w.userName&&ag.push("qzjun="+G(w.userName));w.pageType&&ag.push("qzjpt="+G(w.pageType));w.pageId&&ag.push("qzjpi="+G(w.pageId))}h&&ag.push("jzqosr="+h);ag.push("jzqc="+ah);ag.push("jzqs="+k);ag.push("jzqv="+b.$version);if(ag[0].indexOf("logtype")<0){ag.push("jzqrd="+((window["_mv_loader"]&&window["_mv_loader"].getRandom&&window["_mv_loader"].getRandom("mba"))||(new Date()-0)))}else{if(w.goodsId){ag.push("qzjgoi="+w.goodsId)}if(w.sign){ag.push(w.ss?"qzjcode=":"qzjsign="+w.sign)}ag.push("jzqrd="+"0"+g+(new Date()-0))}if(document.domain.indexOf("yougou.com")>=0){ag.push("ref="+encodeURIComponent(window.location.href))}if(document.domain.indexOf("nuomi.com")>=0){ag.push("ref="+encodeURIComponent("http://"+document.location.host+document.location.pathname))}if(b.paramFilter){b.paramFilter(ag,w,k)
}var ai=ag.join("&").replace(/%0A|%0D|%09/g,"")}catch(ak){b.test("t3=err3"+ak.type)}var m=document.location.protocol+"//secure.dsp.com/t?"+ai;if(m.length<2036){if(ai.indexOf("logtype=ecom")<0&&ai.indexOf("jzqt=")<0){m=m.replace("type=3&db=none","type=6&db=none");b.sendRequestByJsonp(m,function(ap){ap="?status="+ap.replace("_mvctn=","");var at=b.queryToJson(ap);var am=at.status;if(am=="0"){var ao=at.time;var ar=at.rdom;h=at.osr;var an=b.createCampaignSource(at);l=b.updateSingleSource("_jzqz=",l,an,ao);try{ar=decodeURIComponent(ar)}catch(aq){}if(ar!=""){an=b.createSearchSource(ar);if(an){n=b.updateSingleSource("_jzqy=",n,an,ao)}else{an=b.createRefSource(ar);o=b.updateSingleSource("_jzqx=",o,an,ao)}}}if(L[4]==0){return}L[4]=0;S()})}else{b.sendRequest(m,function(){if(L[4]==0){return}L[4]=0;S()})}if(document.domain.indexOf("masamaso.com")>=0){ai=ai.replace(/m-6-0/g,"m-23111-1");b.sendRequest(document.location.protocol+"//secure.dsp.com/t?"+ai)}}else{b.sendByAjaxRequest(ai,function(){if(ai.indexOf("logtype=ecom")>=0||L[4]==0){return}L[4]=0;S()},document.location.protocol+"//secure.dsp.com/t?")}function al(am){var an=document.createElement("iframe");an.style.width="1px";an.style.border=0;an.style.position="absolute";an.style.left="-100px";an.style.top="-100px";an.style.height="1px";an.src=am;an.id="mediav_cookiemapping";document.body.insertBefore(an,document.body.childNodes[0])}var q=document["cookie"];if(!(q.indexOf("_jzqckmp_v2=")>-1)){al(document.location.protocol+"//ckmap.dsp.com/b?type=10&jzqs="+k);b.cookie.set("_jzqckmp_v2",1,{expires:86400000})}}function U(q,m,af){m=m.replace(/%0A|%0D|%09/g,"");var ag=q+m+(af||"");return Y(ag)}p.$setDomainName=function(m){u=m};p.$setAccount=function(m){k=m;if(k.indexOf("m-")!=0){k="m-"+k+"-0"}if(k=="m-26165-0"){window._mv_loader&&(_mv_loader.reg=function(){});window.$mvt&&($mvt.$getTrackerByName=function(){return{}})}};p.$setGeneral=function(q,m,ah,af,ag){if(q!=w.pageType){if(z==false&&(q=="goodsdetail"||q=="cartview"||q=="ordercreate")){z=false}else{z=true}}ag&&(w.pageTyp=ag);w.pageType=q||w.pageType||"";w.pageId=m||"";w.userName=ah||"";N[7]=G(ah).replace(/\./g,"_");w.userId=af||w.userId||"";if(q=="registered"||(L[5]==1&&ah&&N[8]!=1)){p.$logOrder(af||("rad"+new Date()-0),0,ah||"","","","0");N[8]=1;L[5]=1;L[6]=1;S()}if(q=="cartview"){p["$addItem"]=function(){if(arguments[3]){p["$addGoods"].apply(p,arguments)}else{for(var aj=0,ai=arguments.length;aj<ai;aj++){if(arguments[aj]){w.goodsId?(w.goodsId+=","+arguments[aj]):(w.goodsId=arguments[aj])}}}p["$logData"]("&")}}};p.$logConversion=function(m){if(z||m){if(w.pageType){ad()}else{setTimeout(function(){ad()},10)}}else{window["_mv_loader"]&&window["_mv_loader"].getRandom&&window["_mv_loader"].getRandom("mba")}z=false};p.$setRef=function(m){b.ref=m};p.$log=function(m){ad(m,1)};p.$logData=function(ag){try{var aj=["qzjecom=1&logtype=ecom"];for(var af=0,m=c.length;af<m;af++){var q=c[af],ah=y[q];if(ah){aj.push(ac(q)+"="+ah)}if(q=="qzjor"){delete y[q]}if(q=="qzjgo"&&!w.sign){w.sign=U(k,ah,w.pageUrl)}}if(ag){aj.push(ag)}if(aj.length==1&&!w.goodsId){return}if(w.ref){aj.push("ref="+G(w.ref))}c=[];ad(aj)}catch(ai){throw (ai)}};p.$logAction=function(m,ah,ag,af,q){p.$logData("jzqe="+G(m)+"&jzqt=evnt")};var y={};var c=[];function j(af,q){var m=q;while(af[m]){m=m+" "}return m}function V(ah,af,ag,q,ai,m){q=q||"|";p[ah]=function(){if(ai){if(ai.apply(window,arguments)===true){return}}var ao=[];var ak=m?m.apply(window,arguments):arguments;for(var am=0,aj=ak.length;am<aj;am++){try{ao[am]=ak[am]==null?"0":(ak[am]+"").replace(/\|/g," ")}catch(ap){}}if(ao[ao.length-1]==""){ao[ao.length-1]="-"}if(af=="qzjgo"){ao[4]=ao[4]?parseFloat(ao[4].toString().replace(/[^0-9.]+/g,"")):ao[4]}var an=ao.join(q);if(af=="qzjgo"&&!arguments[2]){return}var al=j(y,af);c.push(al);y[al]=encodeURIComponent(an)}}p["custom"]=function(){var af=arguments[0];var aj=arguments;var ah=[];for(var ai=1,q=aj.length;ai<q;ai++){try{ah[ai-1]=aj[ai]==null?"0":(aj[ai]+"").replace(/\|/g," ")}catch(ak){}}if(ah[ah.length-1]==""){ah[ah.length-1]="-"}var m=G(ah.shift());var ag=G(ah.shift());var al=ah.join("|");var am=j(y,af);c.push("jzqval");y["jzqval"]=encodeURIComponent(al);p["$logData"]("&jzqotp=5&jzqt=tran&jzqkey="+am+"&jzqo="+m+"&jzqot="+ag)};var E=(function(){var m=document.domain.indexOf("yougou")>=0;return m})();V("$addBrand","qzjbr",null,function(m,q){w.pageId=q});V("$addCategory","qzjca");V("$addGoods",E?"qzjgono":"qzjgo",0,null,function(ai,ak,m,af,ah,aj){w.pageId=af;w.goodsId=af;ah=ah?parseFloat(ah.toString().replace(/[^0-9.]+/g,"")):ah;if(b.ref){var q=document.location.href.split("#")[0];var ag=b.ref.replace("#{url}",q);w.ref=ag}},function(){var m=Array.prototype.slice.apply(arguments);var q=m[11];if(q&&isNaN(q)){q=q.replace(/-/g,"/");m[11]=parseInt((new Date(q)-0)/1000)}return m});V("$addPricing","qzjpricing",0);V("$addCartGoods","qzjcag",0);
V("$addCartPackage","qzjcap",0);V("$addCartPackageGoods","qzjcapg",0);V("$addOrderInner","qzjor",0,null,function(q){w.pageId=q;try{e(N,9);e(L,3);e(aa,2);S()}catch(m){}},function(m,af,ai,ah,ag,q){return[m,af]});p["$logOrder"]=function(m,af,aj,ah,ag,q){m=m+"";var ai=["jzqt=tran"];ai.push("jzqo="+G(m));ai.push("jzqot="+G(af));aj=aj||w.userName;ah=ah||w.userId;aj&&ai.push("jzqo1="+G(aj));ah&&ai.push("jzqo2="+G(ah));ag&&ai.push("jzqo3="+G(ag));q&&ai.push("jzqo4="+G(q));p.$log(ai);if(q+""=="0"){N[8]=1;L[5]=1;return}if(m==""||m=="0"){return}p.$addOrderInner(m,af,aj,ah,ag,q);p.$logData()};p["$addOrder"]=p["$logOrder"];p["$logItem"]=function(m,ai,q,af,ag){var ah=["jzqt=item"];ah.push("jzqo="+G(m));ah.push("jzqix="+G(ai));ah.push("jzqin="+G(q));ah.push("jzqip="+G(af));ah.push("jzqiq="+G(ag));p.$log(ah)};p["$addSign"]=function(m){w.sign=m;w.ss=true};V("$addOrderPackage","qzjorp",0);V("$addOrderPackageGoods","qzjorpg",0);V("$addItem","qzjorg",0,null,null,function(m,ak,ag,ai,aj){if(document.domain.indexOf("banggo.com")>=0){ak=(""+ak).substr(0,6)}var af=[];for(var ah=0,q=arguments.length;ah<q;ah++){af[ah]=arguments[ah]}af[4]=af[4]-0;isNaN(af[4])&&(af[4]=0);if(af[5]&&af[5].indexOf("http")!=0){af[5]="http://"+window.location.hostname+af[5]}p.$logItem(m,ak,ag,ai,aj);return af});V("$addSearchResult","qzjse");V("$addComparedGoods","qzjcog",0);V("$addGoodsFavorite","qzjgof",0,null,function(m){w.pageType="concern";w.goodsId=m});V("$setPageUrl","qzjurl",0,null,function(m){if(!m){return true}w.pageUrl=m});V("setPageUrl","qzjurl",0,null,function(m){if(!m){return true}w.pageUrl=m});V("$addGift","qzjgi",0);V("$addHistory","qzjorg",0);V("$addOrderDetail","qzjord");V("$addRecentOrderedGoods","qzjreog");window._MBAInit=false;if(!window._MBAInit){d();S()}else{return}window._MBAInit=true;var P=window._mvq;if(window["_mv_loader"]){var Q=window["_mv_loader"],W=Q.cmdList;Q.reg(b.runCmd,b.runCmd.push);b.runCmd.push.apply(b.runCmd,W);return}else{if(P instanceof Array){b.runCmd.push.apply(b.runCmd,P)}window._mvq=b.runCmd}})()})();