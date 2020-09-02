<?php

namespace App\Http\Middleware;

use Closure;

class HomeLoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //检测用户是否具有登录的session
        if($request->session()->has("username")){
            //如果有的话执行下一步操作
            return $next($request);
        }
        else{
            //如果没有转跳到登录界面
            return redirect("/login/create");
        }
        
    }
}
