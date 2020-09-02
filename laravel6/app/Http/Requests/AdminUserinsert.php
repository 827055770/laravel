<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminUserinsert extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //设置用户名不能为空  required输入的数据不能为空
            //regex根据正则表达式
            //unique唯一性 加表名
            "username"=>"required|regex:/\w{4,16}/|unique:users",
            "password"=>"required|regex:/\w{4,16}/",
            //same 此字段必须和password字段值一样
            "repassword"=>"required|same:password",
            "email"=>"required|email",
            "phone"=>"required|regex:/\d{11}/",
            

        ];
    }
    //自定义错误提示
    public function messages(){
        return[
            "username.required"=>"用户名不能为空",
            //自定义用户名正则
            "username.regex"=>"用户名必须是4-16位数字字母下划线",
            //用户名唯一性
            "username.unique"=>"用户名已存在",
            //regex密码自定义正则
            "password.regex"=>"密码必须是4-16位字母数字下划线",
            "password.required"=>"密码不能为空",
            "repassword.required"=>"确认密码不能为空",
            "repassword.same"=>"两次密码输入不一致",
            "email.required"=>"邮箱不能为空",
            //email邮箱格式
            "email.email"=>"邮箱格式有误",
            //regex自定义正则
            "phone.regex"=>"手机号格式不正确",
            "phone.required"=>"手机不能为空",
        ];
    }
}
