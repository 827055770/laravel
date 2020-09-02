<?php

namespace App\Http\Middleware;

use Closure;

class AdminLoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   //request请求报文
        //判断是否登录
        if(request()->session()->has('islogin')){
            //4.获取访问的模块的控制器和方法  和权限列表作对比
            //获取权限列表
            $nodelist=session('nodelist');
            //获取访问模块控制器和方法名
            $actions=explode('\\', \Route::current()->getActionName());
            //或$actions=explode('\\', \Route::currentRouteAction());
            $modelName=$actions[count($actions)-2]=='Controllers'?null:$actions[count($actions)-2];
            $func=explode('@', $actions[count($actions)-1]);
            $controllerName=$func[0];
            $actionName=$func[1];
            //echo $controllerName.':'.$actionName;
            //对比
            if(empty($nodelist[$controllerName]) || !in_array($actionName,$nodelist[$controllerName])){
                //提示
                return redirect("/adminindex")->with("error","您没有权限访问请联系超级管理员");

            }
            //如果有执行下一步请求
            return $next($request);
        }
        else{
            //跳转到登录界面
            return redirect("/adminlogin/create");
        }
        
    }
}
