window._qha_data = window._qha_data || {
    domain: 73105,
    host: 's.union.360.cn',
    gu: '103846873.2797638588179299840.1591241424001.0012',
    hu: '114jkFcgc9fGMTfqUMwlvS9NcYCLQWeNJGhq5pA21gqCg%3D',
    e360: '2660483271',
    pageClk: null,
    urlClk: 0,
    idClk: null,
    mvid: '220844'
}; !
function(m) {
    var r = {}.constructor;
    r.create = r.create ||
    function(t) {
        function e() {}
        return e.prototype = t,
        new e
    };
    var g = "_qha",
    y = 0,
    o = 3,
    f = 20,
    e = 21,
    l = 6,
    a = 30,
    n = {}.toString;
    function i(t) {
        return n.call(t)
    }
    function s(t) {
        return "[object String]" === i(t)
    }
    function u(t) {
        return "[object Array]" === i(t)
    }
    function c(t) {
        return "[object Object]" === i(t)
    }
    function d(t) {
        return "[object Function]" === i(t)
    }
    function p(t, e, n) {
        for (var r in t) t.hasOwnProperty(r) && (n = e(n, t[r], r, t));
        return n
    }
    function h(r, i) {
        return p(r,
        function(t, e, n) {
            return t.push(i(e, n, r)),
            t
        },
        [])
    }
    function v(t, e, n) {
        for (var r = 0; r < t.length; r++) n = e(n, t[r], r, t);
        return n
    }
    function _(r, i) {
        v(r,
        function(t, e, n) {
            return i(e, n, r)
        })
    }
    function w(r, i) {
        return v(r,
        function(t, e, n) {
            return t.push(i(e, n, r)),
            t
        },
        [])
    }
    var t = "constructor",
    b = function() {},
    x = function(t) {
        return t
    },
    k = "" [t],
    O = b[t],
    C = /s/ [t],
    E = [].slice,
    S = d([].indexOf) ?
    function(t, e) {
        return t.indexOf(e)
    }: function(t, e) {
        if (e != e) return - 1;
        for (var n = 0; n < t.length; n++) if (t[n] === e) return n;
        return - 1
    };
    var j = m.document,
    N = m.location,
    I = m.navigator,
    P = m.screen,
    q = m.history,
    A = m.Math,
    R = m.parseInt,
    T = "https:" === N.protocol ? "https:": "http:",
    L = 3,
    U = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
    function D(t, e, n, r) {
        void 0 === r && (r = !1);
        var i = function(t) {
            t = function(t) {
                if (t || (t = m.event), !t) throw new Error("`event` is not an object");
                t.target || (t.target = t.srcElement || j),
                t.target.nodeType === L && (t.target = t.target.parentNode);
                var e = t.button,
                n = t.type;
                return U.test(n) && !t.which && e && (t.which = 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0),
                t
            } (t),
            n.call(this, t)
        };
        t.addEventListener ? t.addEventListener(e, i, r) : t.attachEvent ? t.attachEvent("on" + e, i) : t["on" + e] = i,
        n.__dlg = i
    }
    function V(o, a, u, t) {
        var c = [],
        s = function(e) {
            var n = this; (void 0 === t || d(t) && t(e)) && _(c,
            function(t) {
                return t.call(n, e)
            })
        },
        f = !1,
        l = new Error("Pool has been destoryed.");
        return D(o, a, s, u),
        {
            append: function(t) {
                if (f) throw l;
                d(t) && c.push(t)
            },
            remove: function(t) {
                if (f) throw l;
                var e = S(c, t); - 1 < e && c.splice(e, 1)
            },
            destroy: function() {
                if (f) throw l;
                var t, e, n, r, i;
                t = o,
                e = a,
                r = u,
                i = (n = s).__dlg,
                t.removeEventListener ? t.removeEventListener(e, i, r) : t.attachEvent ? t.detachEvent("on" + e, i) : t["on" + e] = null,
                i = null,
                n.__dlg = null,
                t = n = null,
                f = !(s = o = c = null)
            }
        }
    }
    function F(t, e) {
        return /^https?:\/\/[^/ ? ] + $ / .test(t) && (t += "/"),
        t === e || -1 < t.indexOf("*") && (n = t, new C((r = n, r.replace(/([.*+?^=!:$}{()|[\]/\\]) / g, "\\$&")).replace("\\*", ".*"))).test(e);
        var n, r
    }
    var J = "CSS1Compat" === j.compatMode;
    function B() {
        var t = -1,
        e = j.body,
        n = j.createElement("div");
        return n.innderHTML = "&nbsp;",
        n.className = "adsbox adwords",
        e && (e.appendChild(n), t = 0 === n.offsetWidth ? 1 : 0, e.removeChild(n)),
        t
    }
    function X(t) {
        var e = "";
        try {
            e = t || m.top.document.referrer
        } catch(t) {}
        if ("" === e) return e;
        var n = /^https?:\/\/e\.so\.com\/search\/(eclk|mclick)\?/.exec(e);
        if (n) {
            var r = function(t) {
                var e = t.indexOf("?");
                if (e < 0) return {
                    base: t,
                    param: {}
                };
                var o = {};
                return v(t.slice(e + 1).split("&"),
                function(t, e) {
                    var n = e.indexOf("=");
                    if ( - 1 < n) {
                        var r = e.slice(0, n),
                        i = e.slice(n + 1);
                        o[r] = i
                    } else o[e] = "";
                    return t
                },
                o),
                {
                    base: t.slice(0, e),
                    param: o
                }
            } (e),
            i = r.base,
            o = r.param,
            a = "mclick" === n[1] ? "asin": "p";
            e = i + "?" + a + "=" + (o[a] || "")
        } else e = e.slice(0, 1e3);
        return e
    }
    var M = "";
    if (void 0 === j.hidden) for (var H = ["webkit", "moz", "ms", "o"], $ = 0; $ < H.length; $++) {
        if (void 0 !== j[H[$] + "Hidden"]) {
            M = H[$];
            break
        }
    }
    var Y = "" === M ? "visibilityState": M + "VisibilityState", z = V(j, M + "visibilitychange", !0);
    function W() {
        return void 0 === j[Y] ? "": j[Y]
    }
    function G() {
        return "preview" === I.loadPurpose
    }
    var K = {};
    function Q(t, e) {
        var n = K[t] = K[t] || [];
        d(e) && n.push(e)
    }
    function Z(t) {
        for (var e = [], n = arguments.length - 1; 0 < n--;) e[n] = arguments[n + 1];
        var r = K[t];
        r && r.length && _(r,
        function(t) {
            return t.apply(void 0, e)
        })
    }
    function tt(t) {
        if (void 0 === t && (t = null), "object" == typeof JSON && JSON && JSON.stringify) return JSON.stringify(t);
        if (null == t) return "null";
        if ("boolean" == typeof t) return k(t);
        if ("string" == typeof t) return '"' + t + '"';
        if ("number" == typeof t) return isFinite(t) ? k(t) : "null";
        if ("object" != typeof t) return "";
        if (u(t)) {
            for (var e = [], n = 0; n < t.length; n++) e.push(tt(t[n]));
            return "[" + e.join(",") + "]"
        }
        var r = [];
        for (var i in t) if (t.hasOwnProperty(i)) {
            var o = t[i];
            void 0 !== o && "function" != typeof o && r.push('"' + i + '":' + tt(o))
        }
        return "{" + r.join(",") + "}"
    }
    K[1] = [], K[ - 1] = [];
    var et = "".trim,
    nt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    rt = d(et) ?
    function(t) {
        return et.call(t)
    }: function(t) {
        return t.replace(nt, "")
    };
    function it(t) {
        return ! 1 == (null != t) ? "": rt("" + t)
    }
    var ot = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\/bfnrt] | \\u[\da - fA - F] {
        4
    }) * "\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;function at(t){var i,e=it(""+t);if("object "==typeof JSON&&JSON&&JSON.parse)return JSON.parse(e);var o=null,n=e.replace(ot,function(t,e,n,r){return i&&e&&(o=0),0===o?t:(i=n||e,o+=!r-!n,"")});if(e&&!it(n))return new O("
    return "+e)();throw new Error("Invalid JSON: "+t)}function ut(e){for(var t=[],n=arguments.length-1;0<n--;)t[n]=arguments[n+1];if(!1===c(e))throw new Error(e+"is not an object ");return _(t,function(t){var n,r,i;t&&c(t)&&(n=e,i=function(t,e){n[e]=t},p(r=t,function(t,e,n){return i(e,n,r)}))}),e}var ct=function(){return+new Date},st=function(){return+new Date/1e3|0},ft={get:function(t){t=encodeURIComponent(t);var e=C(" ( ^ |)"+t+" = ([ ^ ;] * )(; | $)").exec(j.cookie);return decodeURIComponent(e?e[2]:"")},set:function(t,e,n){void 0===n&&(n={});var r,i=encodeURIComponent(t)+" = "+encodeURIComponent(e),o=n.path,a=n.domain,u=n.expires;i+=u?";expires = "+(r=u,new Date(ct()+864e5*r)).toUTCString():"",i+=o?";path = "+o:"",i+=a?";domain = "+a:"";try{j.cookie=i}catch(t){}},del:function(t,e){this.set(t,"",ut({expires:-1},e))}},lt=/micromessenger/.test(I.userAgent.toLowerCase()),dt=T+" //s.union.360.cn",pt=T+"//360fenxi.mediav.com";function ht(t){!function(t){var e=t.domain,n=t.currentPV,r=t.mvid;if(!r||0<n.index)return;if(lt)return vt("wx");if(143225==+e)return;1===B()&&vt("adb");var i=mt(pt+"/mediav0308.html",r),o=mt(dt+"/proxy.html",r);a=r,u=a.split(","),gt(function(t){return-1<t.indexOf(pt)},function(t,e){return t&&-1<S(u,t)}),gt(function(t){return-1<t.indexOf(dt)},function(t,e){return t&&"mid"===t}),j.body?(j.body.appendChild(i),j.body.appendChild(o)):D(m,"load",function(){j.body.appendChild(i),j.body.appendChild(o)});var a,u}(t)}function vt(t){m[g]("send",{et:e,msg:t})}function mt(t,e){var n=null;try{n=j.createElement('<iframe name="'+e+'"></iframe>')}catch(t){(n=j.createElement("iframe")).name=e}return n.height=0,n.width=0,n.border=0,n.style.display="none",n.src=t,n.onload=null,n}function gt(c,s){var e=function(t){var e=t.origin,n=t.data;try{var r=at(n),i=r.vvid||"",o=(""+r.msg).split("|"),a=o[0],u=o[1];c(e)&&s(a,u)&&function(t,e,n){if("mid"===t)return m[g]("send",{et:l,mid:e});var r=e.split(","),i=r[0];void 0===i&&(i="");var o=r[1];void 0===o&&(o="");var a=r[2];void 0===a&&(a="");var u={eid:t,ep:i,vid:o,ctn:a,vvid:n};ft.set("mediav",tt(u)),m[g]("send",ut({et:f},u))}(a,u,i)}catch(t){}};"postMessage"in m?D(m,"message",e):I._qha_message=function(t){return e({origin:pt,data:t})}}function yt(t){var e=t.currentPV.start,n={et:o,ep:st()-e};m[g]("send",n,"beacon")}function _t(t){return j.getElementsByTagName(t)}var wt=function(t){var e,n,r,i,o,a,u,c,s=t.currentPV,f=s.index,l=s.session.isNew,d=t.e360,p=d&&0===f&&l,h=ut({et:y,ck:0|!l},(e=P.pixelDepth,n=P.colorDepth,r=P.width,i=P.height,o=I.language,a=I.browserLanguage,{adb:B(),cl:e||n||0,ds:r+"x"+i,ln:o||a||"unknown"})),v=(c=!(u=function(){return m[g]("send",h)}),function(){if(!c)return c=!0,u.apply(this,arguments)});p?(!function(t,n,e){void 0===n&&(n=b),void 0===e&&(e=b);var r=j.createElement("script");r.type="text/javascript",r.defer=!0,r.async=!0,r.src=t,r.onerror=e,r.onload=n,r.onreadystatechange=function(t){var e=r.readyState;"loaded"!==e&&"complete"!==e||n(t)};var i=_t("script")[0];i?i.parentNode.insertBefore(r,i):_t("head")[0].appendChild(r)}(T+"//e.so.com/search/c.js?u="+d+"&_="+ +new Date,v,v),setTimeout(v,500)):v()},bt=V(j,"mousedown",!0),xt=null;var kt=function(t){this.cf=t};kt.prototype.update=function(t){throw new Error("`update()` method not implemented")},kt.prototype.listener=function(t){throw new Error("`listener()` method not implemented")},kt.prototype.send=function(t,e){m[g]("send",t,e)};var Ot=function(e){function t(t){var r=this;e.call(this,t),t.idClk?(this.map=t.idClk,this.matches=[],this.listener=function(t){var e=function(t){var e=t.id;for(;!e&&(t=t.parentNode);)e=t.id;return t}(t.target),n=e&&e.id;n&&-1<S(r.matches,n)&&r.send({et:11,ep:n})}):this.listener=b}return e&&(t.__proto__=e),((t.prototype=r.create(e&&e.prototype)).constructor=t).prototype.update=function(){this.matches=function(t,r){if(!t)return[];var e=p(t,function(t,e,n){return F(n,r)&&t.push(e),t},[]).join(",").split(",");return n=e,v(n,function(t,e){return S(t,e)<0&&t.push(e),t},[]);var n}(this.map,this.cf.currentPV.url)},t}(kt);var Ct=function(n){function t(t){var e=this;n.call(this,t),this.clk=1==+t.urlClk,this.listener=function(t){return e.clk&&e.resp(t)},this.update=b}return n&&(t.__proto__=n),((t.prototype=r.create(n&&n.prototype)).constructor=t).prototype.resp=function(t){var e,n,r,i,o=function(t){var e=t.target,n={t:e.nodeName},r=0;for(;r<3&&e&&"A"!==e.nodeName;)r++,e=e.parentNode;return n.u=e&&"A"===e.nodeName?e.href:"",n}(t),a=o.u;a&&!/^\s*javascript:/.test(a)&&this.send({et:2,ep:(e=o,n=function(t){var e=t.pageX;void 0===e&&(e=0);var n=t.pageY;void 0===n&&(n=0);return{x:e,y:n}}(t),r=h(e,function(t,e){return e+":"+encodeURIComponent(t)}),i=h(n,function(t,e){return e+":"+encodeURIComponent(t)}),r.concat(i).join(","))},"beacon")},t}(kt);var Et=function(n){function t(t){var e=this;n.call(this,t),this.list=t.pageClk,this.trk=!1,this.listener=function(t){e.trk&&e.clk(t)}}return n&&(t.__proto__=n),((t.prototype=r.create(n&&n.prototype)).constructor=t).prototype.update=function(){this.trk=function(t,e){if(!t||0===t.length)return!1;for(var n=0;n<t.length;n++)if(F(t[n],e))return!0;return!1}(this.list,this.cf.currentPV.url)},t.prototype.clk=function(t){var e,n,r,i=t.clientX,o=t.clientY,a=(e=void 0!==m.pageXOffset,n=J?j.documentElement:j.body,{scrollX:e?m.pageXOffset:n.scrollLeft,scrollY:e?m.pageYOffset:n.scrollTop}),u=a.scrollX,c=a.scrollY,s=(r=J?j.documentElement:j.body,{width:A.max(r.scrollWidth,r.clientWidth),height:A.max(r.scrollHeight,r.clientHeight)}),f=s.width,l=s.height;this.send({et:10,x:i+u,y:o+c,w:f,h:l})},t}(kt);function St(t,e,n){if("send"===t){if(!n||0!==n.index)return;var r=e[0],i=r?r.et:-1;i!==y&&i!==o||ut(r,function(){var t={};m._e360_uid&&ut(t,{e_uid:m._e360_uid||"",e_cid:m._e360_campaignid||"",e_gid:m._e360_groupid||"",e_yid:m._e360_creativeid||"",e_kid:m._e360_keywordid||"",e_clkid:m._e360_clickid||"",e_type:m._e360_type||"",e_query:m._e360_query||"",e_mtype:m._e360_matchtype||"",e_smtype:m._e360_submatchtype||"",e_requery:m._e360_requery||""});m._e360_commerce&&(t.e_com=m._e360_commerce);m._e360_sip&&(t.e_sip=m._e360_sip);return t}())}}var jt=[];function Nt(e,n,r){!function(t,e,n){if("send"===t){var r=e[0];n&&n.getBaseInfo&&c(r)&&ut(r,n.getBaseInfo(),{t:ct()})}}(e,n,r),function(t,e,n){if("send"===t){if(!n||0!==n.index)return;var r=e[0],i=r?r.et:-1;if(a<=i){var o=null;try{o=at(ft.get("mediav"))}catch(t){}ut(r,o)}}}(e,n,r),St(e,n,r),function(t,e){if(m.postMessage&&m.top!==m){var n=tt({type:t,args:e});m.top.postMessage(n,"*")}}(e,n),_(jt,function(t){t(e,n,r)})}var It={version:"3.2.0",currentPV:null},Pt=(c(!1),m._qha_data),qt=ut(It,Pt,{domainId:Pt.domain,pingURL:T+"//"+Pt.host+"/s.gif?lts=1"});function At(){return qt}var Rt=function(t){void 0===t&&(t={});var e=t.callback,n=t.timeout,r=!1,i=null,o=function(){r||(r=!0,clearTimeout(i),d(e)&&e())};return i=setTimeout(o,+n||1e3),o};var Tt=/chrome/i.test(I.userAgent),Lt=function(t,e){return t+(0<t.length?"&":"")+"_mtd="+e},Ut=[function(t,e,n){if(d(I.sendBeacon)&&I.sendBeacon(t,e&&Lt(e,"bc")))return n&&n(),!0;return!1},function(t,e,n){var r=m.XMLHttpRequest;if(!r)return!1;var i=new r;if("withCredentials"in i==!1)return function(t,e,n){var r=m.XDomainRequest;if(!r)return!1;try{var i=new r,o=Lt(e,"xdr");return i.open("POST",t),setTimeout(function(){return i.send(o)}),i.onload=i.onerror=function(){n&&n()},!0}catch(t){return!1}}(t,e,n);try{var o=Lt(e,"xhr");return i.open("POST",t,!0),i.withCredentials=!0,i.setRequestHeader("Content-Type","text/plain"),i.onreadystatechange=function(){2<=i.readyState&&n&&n()},i.onerror=function(){n&&n()},i.send(o),!0}catch(t){return!1}},Ft],Dt={image:[2,0,1],xhr:[1,0,2],beacon:[0,2,1]};function Vt(n,t,e,r){void 0===e&&(e="image");var i=function(t){if(!1===c(t))throw new Error("target is not plain object");return h(t,function(t,e){return"object"==typeof t&&(t=tt(t)),t=null==t?"":t,encodeURIComponent(e)+"="+encodeURIComponent(t)}).join("&")}(t);if(i.length<=2048&&"beacon"!==e)return Ft(n,i,r);v(e in Dt?Dt[e]:[0,1,2],function(t,e){return t||Ut[e](n,i,r)},!1)}function Ft(t,e,n){var r="qha_log_"+A.floor(2147483648*A.random()).toString(36),i=new m.Image;(m[r]=i).onload=i.onerror=i.onabort=function(){i.onload=i.onerror=i.onabort=null,i=m[r]=null,n&&n()},e=Tt&&8153<e.length?e.slice(8153):e;var o,a,u,c=Lt(e,"im");return i.src=(a=c,u=-1<(o=t).indexOf("?")?"&":"?",o+u+a),!0}var Jt={},Bt=function(t,e){c(t)?ut(Jt,t):s(t)&&(Jt[t]=e)};function Xt(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var n=t[0],r=s(t[1])?t[1]:Jt.transport,i=null;c(t[1])?i=Rt(t[1]):c(t[2])&&(i=Rt(t[2]));var o=Jt.guard,a=[At().pingURL,n,r,i];d(o)&&!0!==o.apply(null,a)||Vt.apply(null,a)}var Mt="_qha_ldt_",Ht=m[Mt]=(m[Mt]||0)+1;function $t(){for(var t=[I.appName,I.version,I.language||I.browserLanguage,I.platform,I.userAgent,P.width,"x",P.height,P.colorDepth,j.referrer].join(""),e=t.length,n=q.length;n;)t+=n--^e++;return(2147483647*(A.round(2147483647*A.random())^function(t){var e=0,n=0,r=t.length-1;for(;0<=r;r--){var i=R(t.charCodeAt(r),10);0!=(n=4261412864&(e=(e<<6&4294967295)+i+(i<<14)))&&(e^=n>>21)}return e}(t))).toString()}var Yt=/(msie|trident)/i.test(I.userAgent),zt=j.createElement("a");function Wt(t){Yt&&(zt.setAttribute("href",t),t=zt.href),zt.setAttribute("href",t);var e=zt.href,n=zt.protocol,r=zt.host,i=zt.search,o=zt.hash,a=zt.hostname,u=zt.port,c=zt.pathname;return{href:e,protocol:n?n.replace(/:$/,""):"",host:r,search:i?i.replace(/^\?/,""):"",hash:o?o.replace(/^#/,""):"",hostname:a,port:u,pathname:"/"===c.charAt(0)?c:"/"+c}}var Gt=28800,Kt=0,Qt=function(t){var e=t.conf,n=t.url,r=t.referrer,i=t.domainId,o=t.ckDomain,a=t.init;void 0===a&&(a=b),this.index=Kt++,this.conf=e,this.url=n,this.domainId=i,this.start=st(),this.referrer=r,this.session=new ee({key:"qs_lvt_"+i,ident:st(),domain:o,referrer:r}),this.page=new te({key:"qs_pv_"+i,ident:$t(),domain:o,referrer:r}),a.call(this)};Qt.prototype.getBaseInfo=function(){var t=function(t){return t.slice(-2).reverse()},e=this,n=e.url,r=e.start,i=e.referrer,o=e.domainId,a=e.page,u=e.session,c=e.conf,s=c.gu,f=c.version,l=c.hu,d=t(a.list),p=d[0],h=d[1],v=t(u.list),m=v[0],g=v[1],y={url:n,si:o,su:i,flt:r,lt:m,pt:p,guid:s,huid:l,v:f};return g&&(y.lt2=g),h&&(y.pt2=h),y};var Zt=function(t){var e=t.key,n=t.ident,r=t.domain,i=t.referrer,o=t.expires;void 0===o&&(o=365);var a={path:"/",domain:"."+r};this.ckOption=ut({expires:o},a);var u=this.migrate(e,a);this.ident=""+n,this.key=u.key,this.list=u.list,this.domain=r,this.referrer=i};Zt.prototype.migrate=function(t,e){var n=ft.get(t),r=t.replace(/^[a-z]/,function(t){return t.toUpperCase()});""!==n&&""===ft.get(r)&&ft.set(r,n,this.ckOption),ft.del(t,e);var i=ft.get(r);return{key:r,list:""===i?[]:i.split(",")}},Zt.prototype.init=function(){var t=this.list,e=this.key,n=this.ident,r=this.ckOption;this.list=t.slice(-4).concat(n),ft.set(e,this.list.join(","),r)};var te=function(e){function t(t){e.call(this,t),this.init()}return e&&(t.__proto__=e),(t.prototype=r.create(e&&e.prototype)).constructor=t}(Zt),ee=function(e){function t(t){e.call(this,t);!function(t,e,n,r){if(!t||!t.length)return!1;var i=R(t[t.length-1],10);if(A.abs(e-i)>Gt)return!1;if(function(t,e){var n=Wt(t).hostname,r=n.indexOf(e);if(0<=r&&n.slice(r)===e)return!1;return!0}(r,n))return!1;return!0}(this.list,this.ident,this.domain,this.referrer)?(this.isNew=!0,this.init()):this.isNew=!1}return e&&(t.__proto__=e),(t.prototype=r.create(e&&e.prototype)).constructor=t}(Zt);for(var ne="__qhart",re=(j.domain||location.hostname).split("."),ie="."+re.pop();re.length;)if(ie="."+re.pop()+ie,ft.set(ne,"1",{domain:ie}),"1"===ft.get(ne)){ft.del(ne,{domain:ie});break}var oe,ae,ue=ie.slice(1),ce={set:Bt,intlz:Bt,send:function(){for(var t,e,n,r=[],i=arguments.length;i--;)r[i]=arguments[i];"pageview"===r[0]?(t=Jt.page,e=At(),!1===(n=null==e.currentPV)&&Z(-1,e),e.currentPV=new Qt({conf:e,domainId:e.domainId,ckDomain:Jt.ckDomain||ue,url:t?Wt(t).href:N.href,referrer:n?X():e.currentPV.url}),Z(1,e)):Xt.apply(void 0,r)}},se=At(),fe=function(t){var e,n=u(e=t)?e:e.length&&e.item?w(e,x):E.call(e),r=n[0],i=n.slice(1),o=ce[r];Nt(r,i,se.currentPV),d(o)&&o.apply(null,i)},le=function(){var n;Q(1,ht),Q(1,wt),Q(1,function(){xt&&_(xt,function(t){return t.update()})}),Q(-1,yt),D(m,"unload",function(){Z(-1,se)}),n=se,xt=w([Ct,Ot,Et],function(t){var e=new t(n);return bt.append(e.listener),e})};(function(){var e=At(),n=e.domainId,t=e.version,r=function(t){return!(!t||!s(t))&&-1<t.indexOf("//"+e.host+"/"+n+".js")},i=!1,o=0;if(j.currentScript)i=r(j.currentScript.src);else{for(var a=j.getElementsByTagName("script"),u=0;u<a.length;u++)r(a[u].src)&&(o+=1);i=Ht<=o}if(i)Xt({et:100,si:n,ldt:Ht,vis:W(),prv:+G(),guid:e.gu,huid:e.hu,t:ct(),v:t},"image");else{var c=m.console;c&&d(c.warn)&&c.warn("璇蜂笉瑕佽嚜琛屾墭绠� 360 鍒嗘瀽缁熻鑴氭湰锛侊紒锛�")}return i})()&&!G()&&(oe=function(){if(!m[g]||1!==m[g].__){var t=function(){if(!1===d(m[g])){var n=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return n.c.push(t)};n.c=[],m[g]=n}return m[g]}();if(le(),t("init",se.domainId),m[g]=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return fe(t)},m[g].__=1,u(t.c)&&t.c.length){t.s||t.c.unshift(["send","pageview"]);var e=[],n=[];_(t.c,function(t){"intlz"===t[0]?n.push(t):e.push(t)}),_(n,fe),_(e,fe)}}},(ae=function(){return"prerender"===W()})()?z.append(function(){!1===ae()&&(oe(),z.destroy())}):oe())}(this);
    