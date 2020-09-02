<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>友情链接添加</title>
</head>
<body>
    <form action="/listadds" method="POST" enctype="multipart/form-data">
        网站图片：<input type="file" name="pic" id=""><br>
        网站地址：<input type="text" name="url" id=""><br>
        {{csrf_field()}}
        <input type="submit" value="申请">
    </form>
</body>
</html>