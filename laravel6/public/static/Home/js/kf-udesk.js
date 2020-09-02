BL.Global.xninit = false;
var udesk_kf_uid = null;
var udesk_kf_uname = null;
var udesk_kf_token = null;
var isvip="0";
var timestamp = (new Date()).getTime();
var ud_code;
var ud_link;
var ud_key;
var signature;
var order_ip;
if(BL.Global.getHost()=="bl"){
    ud_code = "4kk29k89";
    ud_link = "https://bailian.udesk.cn/im_client/?web_plugin_id=119671";
    ud_key="16b9cdc313920e560087dfe83003f15b";
    order_ip="https://10.199.35.122:8880"
}else{
    ud_code = "56111fie";
    ud_link = "https://udesk-zx-sh-01.udesk.cn/im_client/?web_plugin_id=106761";
    ud_key="b735d189cc958d7698884529c1a0a909";
    order_ip="https://10.199.35.171:8880"
}
function getUID() { // 鑾峰彇鍞竴鍊�
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
var ud_nonce = getUID();
if(BL.Global.isLogin()){
    $.ajax({
        type: "get",
        url: domain.my + "/sidebar/isVip.html",
        dataType: "jsonp",
        async: false,
        error: function () {
        },
        success: function (data) {
            isvip = data;
        }
    });
    var mti = BL.Global.base64Decode(BL.Global.cookie.get("_m_t_i"));
    var index_mi = mti.indexOf("&mi");
    udesk_kf_token =  mti.substring(3, index_mi);
    udesk_kf_uid = mti.split("&mi=")[1];
    udesk_kf_uname = decodeURI(BL.Global.getNick());
}

function udeskLoad(){
    <!-- 浠ヤ笅涓簎desk鎻愪緵鐨凧s缁勪欢 -->
    (function(a,h,c,b,f,g){a["UdeskApiObject"]=f;a[f]=a[f]||function(){(a[f].d=a[f].d||[]).push(arguments)};g=h.createElement(c);g.async=1;g.charset="utf-8";g.src=b;c=h.getElementsByTagName(c)[0];c.parentNode.insertBefore(g,c)})(window,document,"script","https://assets-cli.udesk.cn/im_client/js/udeskApi.js","ud");
}
function udeskInit(){
    udeskLoad();
    ud({
        "code": ud_code,
        "link": ud_link,
        "targetSelector":"#btn_udesk_kf",
        "customer": {
            "nonce":ud_nonce,
            "timestamp":timestamp,
            "c_name": udesk_kf_uname,
            "web_token": udesk_kf_uid,
            "customer_token": udesk_kf_uid,
            "signature": signature,
            "c_vip":isvip
        }
    });
}
function udesk_order(orderId,productUrl){
    udeskLoad();
    ud({
        "code": ud_code,
        "link": ud_link,
        "targetSelector":"#btn_udesk_kf",
        "product": {
            "title": orderId,
            "image": productUrl,
            "url":order_ip+"/orderDetail?memberId="+udesk_kf_uid+"&orderNo="+orderId
        },
        "customer": {
            "nonce":ud_nonce,
            "timestamp":timestamp,
            "c_name": udesk_kf_uname,
            "web_token": udesk_kf_uid,
            "customer_token": udesk_kf_uid,
            "signature": signature,
            "c_vip":isvip
        }
    });
}
function udesk_product(){
    var productId = $("#q_productid").val();
    var salesName = $("#q_productSalesName").val();
    var productUrl = $("#q_productUrl").val();
    var promotionPrice = $("#q_promotionPrice").val();
    udeskLoad();
    ud({
        "code": ud_code,
        "link": ud_link,
        "targetSelector":"#btn_udesk_kf",
        "product": {
            "title": salesName,
            "url": domain.product+"/"+productId+".html",
            "image": productUrl,
            "浠锋牸": "锟�"+promotionPrice
        },
        "customer": {
            "nonce":ud_nonce,
            "timestamp":timestamp,
            "c_name": udesk_kf_uname,
            "web_token": udesk_kf_uid,
            "customer_token": udesk_kf_uid,
            "signature": signature,
            "c_vip":isvip
        }
    });
}
function xninit(){
    if(!BL.Global.xninit){
        BL.Global.xninit = true;
        signature = "nonce="+ud_nonce+"&timestamp="+timestamp+"&web_token="+udesk_kf_uid+"&"+ud_key;
        signature = BL.Global.sha1(signature);
        signature = signature.toUpperCase();
        $(".c_ntkf").click(function(){
            if(BL.Global.isLogin()){

                var loading_page="https://"+document.location.hostname;
                if(loading_page === domain.product){
                    udesk_product();
                }else{
                    udeskInit();
                }
                ud("showPanel");
            }else{
                BL.Global.cookie.set('c_ntkf',window.location.href,1,domain.cookie);
                window.location.href = domain.passport+ "?returnurl="+ encodeURIComponent(window.location.href);
            }
        });
        $(".xn_openChat").click(function(){
            udeskInit();
            ud("showPanel");
        });

        $(".openInPageChat").click(function(){
            var orderId = $(this).attr("data-orderid");
            var parentClass = $(".openInPageChat").parents("div").attr('class');
            var productUrl;
            if("order-detail-top" == parentClass){
                productUrl = $(".good-item-list li").eq(0).find("img").attr('src')
            }else{
                productUrl = $(this).parents(".table-list").find(".table-list-message a img").attr('src');
            }
            udesk_order(orderId,productUrl);
            ud("showPanel");
        });

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
$(".service-main-icon").live("mouseenter",function(){
    xninit();
});
$(".tools-right,.right-slidebar").mouseenter(function(){
    xninit();
});