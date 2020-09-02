<!DOCTYPE html>
<html>

  <head lang="en">
    <meta charset="UTF-8">
    <title>注册</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />

    <link rel="stylesheet" href="/static/HomeRegister//AmazeUI-2.4.2/assets/css/amazeui.min.css" />
    <link href="/static/HomeRegister//css/dlstyle.css" rel="stylesheet" type="text/css">
    <script src="/static/HomeRegister//AmazeUI-2.4.2/assets/js/jquery.min.js"></script>
    <script src="/static/HomeRegister//AmazeUI-2.4.2/assets/js/amazeui.min.js"></script>
    <link rel="stylesheet" type="text/css" href="/static/HomeRegister//bootstrap/css/bootstrap.min.css">
    
  </head>
  
  <style type="text/css">
    .cur{
      border:1px solid red;
    }

     .curs{
      border:1px solid green;
    }
  </style>
  
  <body>

    <div class="login-boxtitle">
      <a href=""><img alt="" src="/static/Home/header-logo.png" /></a>
    </div>

    <div class="res-banner">
      <div class="res-main">
        <div class="login-banner-bg"><span></span><img src="/static/HomeRegister/images/big.jpg" /></div>
        <div class="login-box">

            <div class="am-tabs" id="doc-my-tabs">
              <ul class="am-tabs-nav am-nav am-nav-tabs am-nav-justify">
                <li class="am-active"><a href="">邮箱注册</a></li>
                <li><a href="">手机号注册</a></li>
              </ul>

              <div class="am-tabs-bd">
                <div class="am-tab-panel am-active">
                  <form  action="/register" method="post">
                    @if(session('error'))
                  <h3 style="color: brown">{{session('error')}}</h3>
                    @endif
                 <div class="user-email">
                    <label for="email"><i class="am-icon-envelope-o"></i></label>
                    <input type="email" name="email" id="email" placeholder="请输入邮箱账号">
                 </div>                   
                 <div class="user-pass">
                    <label for="password"><i class="am-icon-lock"></i></label>
                    <input type="password" name="password" id="password" placeholder="设置密码">
                 </div>                   
                 <div class="user-pass">
                    <label for="passwordRepeat"><i class="am-icon-lock"></i></label>
                    <input type="password" name="repassword" id="passwordRepeat" placeholder="确认密码">
                 </div> 

                  <div class="user-pass">
                    <label for="passwordRepeat"><i class="am-icon-code-fork"></i></label>
                    <img src="/img" onclick="this.src=this.src+'?a=1'" style="float:right"> 
                 </div>

                  <div class="verification">
                      <label for="code"><i class="am-icon-code-fork"></i></label>
                      <input type="tel" name="code" id="code" placeholder="请输入验证码">
                    </div> 
                 
                 
                 <div class="login-links">
                  </div>
                    <div class="am-cf">
                      {{csrf_field()}}
                      <input type="submit" name="" value="注册" class="am-btn am-btn-primary am-btn-sm am-fl">
                    </div>

                </div>

                </form>

                <div class="am-tab-panel">
                  <form method="post" action="/registers" id="ff">
                 <div class="user-phone" style="margin-top:20px">
                    <label for="phone"><i class="am-icon-mobile-phone am-icon-md"></i></label>
                    <input type="tel" name="phone" id="phone" placeholder="请输入手机号" class="ll" reminder="请输入正确的手机号"><span></span>
                 </div>                                     
                    <div class="verification" style="margin-top:20px">
                      <label for="code"><i class="am-icon-code-fork"></i></label>
                      <input type="tel" name="code" id="code" placeholder="请输入验证码"  style="width:140px" class="ll" reminder="请输入验证码"><span></span>
                      <a href="javascript:void(0)"class="btn btn-info" style="float:right" id="ss">获取</a>
                    </div>
                 <div class="user-pass" style="margin-top:20px">
                    <label for="password"><i class="am-icon-lock"></i></label>
                    <input type="password" name="password1" id="password" placeholder="设置密码" class="ll" reminder="请输入正确的密码"><span></span>
                 </div>                   
                 <div class="user-pass" style="margin-top:20px">
                    <label for="passwordRepeat"><i class="am-icon-lock"></i></label>
                    <input type="password" name="repassword1" id="passwordRepeat" placeholder="确认密码" class="ll" reminder="请再次重复密码"><span></span>
                 </div> 
                    <div class="am-cf">
                      {{csrf_field()}}
                      <input type="submit" name="" value="注册" id="ff" class="am-btn am-btn-primary am-btn-sm am-fl">
                    </div>
                    </form>
                
                  <hr>
                </div>

                <script>
                  $(function() {
                      $('#doc-my-tabs').tabs();
                    })
                </script>

              </div>
            </div>

        </div>
      </div>
      
          <div class="footer ">
            <div class="footer-hd ">
              <p>
                <a href="# ">恒望科技</a>
                <b>|</b>
                <a href="# ">商城首页</a>
                <b>|</b>
                <a href="# ">支付宝</a>
                <b>|</b>
                <a href="# ">物流</a>
              </p>
            </div>
            <div class="footer-bd ">
              <p>
                <a href="# ">关于恒望</a>
                <a href="# ">合作伙伴</a>
                <a href="# ">联系我们</a>
                <a href="# ">网站地图</a>
                <em>© 2015-2025 Hengwang.com 版权所有</em>
              </p>
            </div>
          </div>
  </body>
  
  <script type="text/javascript">
    PHONE=false;
    PASSWORD1=false;
    REPASSWORD1=false;
  //1.获取焦点给提示信息
  $(".ll").focus(function(){
    //获取提示信息
    reminder=$(this).attr("reminder");
    //alert(reminder);
    //把此标签的下一个标签里添加内容
    $(this).next("span").css("color","red").html(reminder)
    //添加类样式
    $(this).addClass("cur");
  });
  //2.获取手机号的input 绑定失去焦点
  $("input[name='phone']").blur(function(){
    //获取输入的手机号
    p=$(this).val();
    o=$(this);
    //正则 match 返回null的话正则规则没有匹配到
    if(p.match(/^\d{11}$/)==null){
      $(this).next("span").css("color","red").html("手机号不合法");
      $(this).addClass("cur");
      PHONE=false;
    }else{
      //Ajax
      //alert("手机号合法");
      $.get("/checkphones",{p:p},function(data){
       // alert(data);
       //判断如果数据库没有此手机号可以使用
       if(data.msg=="error"){
        o.next("span").css("color","red").html("手机号已被使用");
       PHONE=false;
       }
       else{
         //如果数据库有此手机号不可使用
         o.next("span").css("color","green").html("手机号可以注册");
         o.addClass("curs");
         PHONE=true;
       }
      },'json');
    }
  });
  
  //密码做失去焦点操作
  $("input[name='password1']").blur(function(){
    //alert('aa');
    //获取输入的密码
    password=$(this).val();
    //用正则判断密码是否合法
    //如果匹配的正则为空
    if(password.match(/^\w{6,18}$/)==null){
      $(this).next("span").css("color","red").html("密码必须是6-18位");
      $(this).addClass('cur');
      PASSWORD1=false;
    }
    else{
      $(this).next("span").css("color","green").html("密码合法");
      $(this).addClass("curs");
      PASSWORD1=true;
    }
  });

  //确认密码失去焦点的设置
  $("input[name='repassword1']").blur(function(){
    //alert("哈哈");
    //获取确认输入的密码
    repassword=$(this).val();
    //alert(repassword);
    //获取输入的密码
    password=$("input[name='password1']").val();
    //alert(password);
    if(repassword==""){
      $(this).next("span").css("color","red").html("不能为空");
      REPASSWORD1=false;
    }else{
    //判断和密码是否两者一致
    if(repassword==password){

      $(this).next("span").css("color","green").html("两者一致");
      REPASSWORD1=true;
    }
    else{
      $(this).next("span").css("color","red").html("两者不一致");
      REPASSWORD1=false;
    }
  }
    
  });

  //onsubmit 表单提交事件 返回true时可以提交 false时不可以提交
  $("#ff").submit(function(){
    //return false;
    //trigger 使某个元素触发某个事件
    $(".ll").trigger("blur");
    if(PHONE && PASSWORD && REPASSWORD){
      return true;
    }else{
      return false;
    }
  });

  </script>
</html>