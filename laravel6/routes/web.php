<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\Admin\IndexController;

Route::resource('/',"Home\IndexController");
//前台首页无限分类递归 及前台页面 及友情链接 及轮播图
//Route::resource("/index","Home\IndexController");

//后台登录
Route::resource('/adminlogin',"Admin\AdminLoginController");

//把后台所有模块放入路由组
//Route::group(['middleware'=>"adminlogin"],function()
//{
//后台界面路由控制器
Route::resource("/adminindex","Admin\IndexController");
//后台用户管理路由控制器
Route::resource("/adminuser","Admin\User\UserController");
//后台用户地址信息路由控制器
Route::get("/address/{id}","Admin\User\UserController@address");
//后台分类管理路由控制器
Route::resource("/cate","Admin\Cate\CateController");
//后台管理员路由器
Route::resource("/admin","Admin\AdminUserController");

//后台管理员分配角色
Route::get("/adminrole/{id}","Admin\AdminUserController@role");
//后台管理员角色
Route::resource("/role","Admin\RoleController");
//后台管理员ajax传值方法
Route::get("/admindel","Admin\AdminUserController@del");

//执行后台角色分配
Route::post("/saverole","Admin\AdminUserController@saverole");

//后台分配权限
Route::get("/auth/{id}","Admin\RoleController@auth");

//后台执行分配权限
Route::post("/saveauth","Admin\RoleController@saveauth");

//后台公告
Route::resource("/adminarticles","Admin\ArticleController");
//后台公告批量操作删除
Route::get("/articledel","Admin\ArticleController@del");
//后台公告测试redis
Route::get("/redis","Admin\ArticleController@redis");
//后台商品
Route::resource("/adminshops","Admin\ShopsController");
//后台订单管理
Route::resource("/adminorders","Admin\AdminOrdersController");
//后台订单详情
Route::get("/ordergoods/{id}","Admin\AdminOrdersController@ordergoods");


//});


//后台友情链接
Route::resource("/adminlist","Admin\AdminListController");
//后台评价
Route::resource("/admincomment","Admin\AdminCommentController");
//广告模块
Route::resource("/poster","Admin\PosterController");
//轮播图
Route::resource("/lunbotu","Admin\LunbotuController");





//邮箱测试
Route::get("/send","Home\RegisterController@send");
//邮箱视图测试
Route::get("/sendview","Home\RegisterController@sendview");
//需要测试跳转的方法
Route::get("/jihuo","Home\RegisterController@jihuo");
//验证码测试
Route::get("/img","Home\RegisterController@img");

//前台邮箱注册
Route::resource("/register","Home\RegisterController");
//前台激活需要跳转的方法
Route::get("/jihuo1","Home\RegisterController@jihuo1");


//前台手机号校验
Route::get("/checkphones","Home\RegisterController@checkphones");
//前台手机号注册
Route::post("/registers","Home\RegisterController@registers");

//前台登录
Route::resource("/login","Home\HomeLoginController");
//前台退出
Route::get("/loginout","Home\HomeLoginController@loginout");
//前台忘记密码
Route::get("/forget","Home\HomeLoginController@forget");
//前台忘记密码 邮箱发送
Route::post("/doforget","Home\HomeLoginController@doforget");
//前台忘记密码  重置密码
Route::get("/reset","Home\HomeLoginController@reset");
//前台忘记密码  密码重置成功
Route::post("/doreset","Home\HomeLoginController@doreset");




//前台详情评论
Route::get("/comments/{id}","Home\IndexController@comments");

//前台点赞
Route::get("/addgive","Home\IndexController@addgive");
//前台取消点赞
Route::get("/delgive","Home\IndexController@delgive");

//用户前台评论增删改查
Route::resource("/comment","Home\CommentController");

//用户前台评论增页面(1)
Route::get("/commentadd/{id}","Home\CommentController@commentadd");
//用户前台评论增页面(2)
Route::post("/commentcreate","Home\CommentController@commentcreate");


//前台友情链接的添加
Route::get("/listadd","Home\IndexController@list");
//前台友情链接的入库
Route::post("/listadds","Home\IndexController@listadds");
//前台轮播图的入库
Route::get("/chartindex","Home\IndexController@chartindex");


//前台中间件
Route::group(["middleware"=>"login"], function(){
//前台购物车
Route::resource("/cart","Home\HomeCartController");
//前台购物车全部删除
Route::get("/cartdelete","Home\HomeCartController@cartdelete");
//购物车ajax减操作
Route::get("/cartjianjian","Home\HomeCartController@cartjianjian");
//购物车ajax加操作
Route::get("/cartjiajia","Home\HomeCartController@cartjiajia");
//购物车ajax复选框选中操作
Route::get("/carttot","Home\HomeCartController@carttot");

//把勾选的数据传进来
Route::get("/accounts","Home\OrdersController@accounts");
//结算页加载
Route::get("/order/insert","Home\OrdersController@insert");
//结算页面
Route::resource("/orders","Home\OrdersController");
//城市级联ajax
Route::get("/address","Home\AddressController@address");
//添加收货地址
Route::post("/addresss/insert","Home\AddressController@insert");
//创建订单提交
Route::post("/order/create","Home\OrdersController@insertorder");
//ajax查询地址信息返回
Route::get("/chooseaddres","Home\AddressController@chooseaddres");

//支付成功界面
Route::get("/zhifuok","Home\OrdersController@zhifuok");

//个人中心界面
Route::resource("/person","Home\PersonController");

//我的收货地址模块
Route::resource("/myaddress","Home\MyAddressController");
//我的订单模块
Route::resource("/myorder","Home\MyOrderController");
//我的订单模块之待付款页面
Route::get("/waitpay","Home\MyOrderController@waitpay");
//我的订单模块之待发货界面
Route::get("/remind","Home\MyOrderController@remind");

//我的订单模块之提醒发货方法
Route::get("/tixingreceipt","Home\MyOrderController@tixingreceipt");

//我的订单之待收货页面
Route::get("/daireceipt","Home\MyOrderController@daireceipt");
//我的订单之确认收货界面
Route::get("/yesreceipt/{id}","Home\MyOrderController@yesreceipt");
//我的订单之待评价界面
Route::get("/daiaccess","Home\MyOrderController@daiaccess");
//我的订单之支付界面
Route::get("/yespay/{id}","Home\MyOrderController@yespay");
//我的收藏列表
Route::resource("/collect","Home\CollectController");
//我的评论
Route::get("/mycomment","Home\CommentController@mycomment");
});




