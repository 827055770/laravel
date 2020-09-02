var productCv = "pverion_3";
seajs.config({
    base: domain.js + '/resources/',
    alias: {
        "json": "v4.2/unit/json2.js",
        "jqjson": "v4.2/unit/jquery.json-2.2.js",
        "jqzoom": "v4.2/js/product//jquery.jqzoom3.js",
        "flexslider": "v4.2/unit/jquery.flexslider.js",
        "lazyload": "v4.2/unit/jquery.lazyload.min.js",
        "productInit": "v4.2/js/product/productInit.js?v=" + domain.v,
        //鍟嗗搧鍒濆鍖栧姞杞�
        "loadZoom": "v4.2/js/product/loadZoom.js?v=" + domain.v,
        //鏌ヨ鍟嗗搧鍥剧墖
        "loadBasis": "v4.2/js/product/loadBasis.js?v=" + domain.v,
        //鍟嗗搧鍩虹淇℃伅鏉垮潡
        "commonTrace": "v4.2/js/product/commonTrace.js?v=" + domain.v,
        //鑾峰彇娴忚鐥曡抗
        "mlazy": "v4.2/unit/mlazy.js?v=" + domain.v,
        "loadPurchase": "v4.2/js/product/loadPurchase.js?v=" + domain.v,
        //绔嬪嵆璐拱
        "qrcode": "v4.2/js/product/qrcode.js",
        //浜岀淮鐮�
        "sidebar": "v4.2/widget/sidebar/sidebar.js?v=" + domain.v,
        //渚ц竟鏍�
        "tools": "v4.2/unit/tools.js?v=" + domain.v,
        "navshow": "v4.2/js/commons/navshow.js?v=" + domain.v,
        "flowStatistics": "v4.2/js/product/flowStatistics.js?v=" + domain.v,
        //鑾峰彇鍒嗙被id鍜屽垎绫诲悕绉�
        "submitShoppingCart": "v3.0/js/cart/submitShoppingCart.js?v=" + domain.v,
        //绔嬪嵆璐拱
        "loadAttribute": "v4.2/js/product/loadAttribute.js?v=" + domain.v,
        //绯诲垪灞炴€�
        "loadcard": "v4.2/js/product/loadcard.js?v=" + domain.v,
        //绀煎搧缁勫悎
        "sendCity": "v4.2/js/product/sendCity.js?v=" + domain.v,
        //閰嶉€佸尯鍩�
        "hSearch": "v4.2/js/index/autoComplete.js?v=" + domain.v,
        "joinFavorites": "v4.2/js/product/joinFavorites.js",
        //鏀惰棌/鍙栨秷鏀惰棌鍟嗗搧
        "productCommon": "v4.2/js/product/productCommon.js?v=" + productCv,
        //鍔犲叆璐墿杞︽寜閽�,璐拱鏁伴噺淇敼
        "cookie": "v4.2/unit/cookie.js",
        "md5": "v4.1/js/ctrl/md5.js",
        "live800Button": "v4.2/js/product/live800Button.js",
        "loadcombination": "v4.2/js/product/loadcombination.js?v=" + domain.v,
        //杩斿洖鍟嗗搧淇℃伅
        "loadFloor": "v4.2/js/index/loadFloor.js?v=" + domain.v //妤煎眰鍔犺浇
    }
});

define(function(require, exports, module) {
    require('json');
    require('jqjson');
    require('jqzoom');
    require('flexslider');
    require('lazyload');
    require('loadZoom');
    require('loadBasis');
    require('commonTrace');
    require('mlazy');
    require('qrcode');
    require('commonTrace');
    require('productInit');
    require('cookie');
    require("navshow");
    require('loadAttribute');
    require('loadcombination');
    require('live800Button');
    require('md5');
    require('submitShoppingCart');
    require('loadPurchase');
    require('flowStatistics');
    require('loadcard');
    require('sendCity');
    require("sidebar");
    require('v4.2/unit/animate-bl.js');
    require('v4.2/unit/cover.js');
    require('v4.1/widget/pager/jquery.page.js');
    //璁惧畾寮傛鍔犺浇鏈哄埗
    $('div.lazy-fn').each(function(i, o) {
        $(o).mlazyload({
            type: 'fn'
        });
    });
    if (!BL.Global.isLogin()) {
        sidebarCallBack.fun = function() {
            window.location.reload();
        };
    }

    //coremetrics
    (function() {
        var g = BL.Global;
        g.include_js(domain.js + '/resources/v4.2/js/coremetrics/eluminate.js',
        function() {
            g.include_js(domain.js + '/resources/v4.2/js/coremetrics/pageInit.js?' + domain.v,
            function() {
                g.include_js(domain.js + '/resources/v4.2/js/coremetrics/pageInfo.js?' + domain.v);
            });
        });
    })();

    //
    $(".ptuans-i").live("mouseenter",
    function() {
        if ($("#pTuansCode").attr("src")) {
            $("#pTuansCode").show();
        } else {
            var gid = $("#productid").val();
            var pid = $("#groupNo").val();
            if (BL.Global.getHost() == "st.bl") {
                var str = "https://mh5.st.bl.com/h5/fightGroupsDetail?goodsSid=" + gid + "&groupNo=" + pid + "&bl_ad=PCPT002_-_" + pid + "_-_6&apiType=scheme#blmodule://ibaiLian/joinGroupGoodsDetail?p1=" + gid + "&p2=" + pid + "&PCPTSM=PCPT002_-_" + pid + "_-_6";
                var _url = "https://www.st.bl.com/shopd/createUrlQRcode.html?pTuanUrl=" + encodeURIComponent(str);
            } else {
                var str = "https://mh5.bl.com/h5/fightGroupsDetail?goodsSid=" + gid + "&groupNo=" + pid + "&bl_ad=PCPT002_-_" + pid + "_-_6&apiType=scheme#blmodule://ibaiLian/joinGroupGoodsDetail?p1=" + gid + "&p2=" + pid + "&PCPTSM=PCPT002_-_" + pid + "_-_6";
                var _url = "https://www.bl.com/shopd/createUrlQRcode.html?pTuanUrl=" + encodeURIComponent(str);
            }
            $("#pTuansCode").attr("src", _url);
            $("#pTuansCode").show();
        }
    });
    $(".ptuans-i").live("mouseleave",
    function() {
        $("#pTuansCode").hide();
    });

    //MEDIAV-360鍟嗗搧缁熻浠ｇ爜
    (function(w, n) {
        w[n] = function() { (w[n].c = w[n].c || []).push(arguments);
        }
        _qha('send', {
            et: 30,
            id: $("#q_productid").val(),
            /*鍟嗗搧id, 蹇呭～椤�*/
            name: '',
            /*鍟嗗搧鍚嶇О $("#q_productSalesName").val() */
            聽聽聽聽聽聽聽聽聽聽聽聽price: '',
            /*鍟嗗搧鐜颁环 $("#q_promotionPrice").val()*/
            聽聽聽聽聽聽聽聽聽聽聽聽url: '',
            /*鍟嗗搧椤甸潰url window.location.href*/
            聽聽聽聽聽聽聽聽聽聽聽聽img: '',
            /*鍟嗗搧鍥剧墖url $("#q_productUrl").val()*/
            聽聽聽聽聽聽聽聽聽聽聽聽thumb: '',
            /*鍟嗗搧缂╃暐鍥緐rl*/
            聽聽聽聽聽聽聽聽聽聽聽聽originalPrice: '',
            /*鍟嗗搧鍘熶环 $("#q_productSalePrice").val()*/
            聽聽聽聽聽聽聽聽聽聽聽聽stock: '',
            /*搴撳瓨鏁伴噺 parseInt($("#q_stor").val())*/
            聽聽聽聽聽聽聽聽聽聽聽聽mobieUrl: ''聽聽聽聽聽聽聽聽
        });
    })(window, '_qha');
});