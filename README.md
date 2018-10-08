# appdl
    
解决mac上不能下载pp助手上的越狱App

>在Mac上没有下载越狱App的地方，加上iOS11以后砸壳也不容易了,所以就使用flask+react写了一个单页服务    

问题

#### 1. 如何运行调试？

**①调试运行服务器**
*1.* 进入dl-flask
*2.* 在python3环境下，执行

```
pip install -r requirements.txt  #第一次运行需要安装依赖库，后续不需要 
python manage.py runserver
```

*3.* 在浏览器进入 http://localhost:5000， 此时即可浏览页面


**②调试运行web**
在①的基础上进行下列操作：
*1.* 进入dl-react
*2.* 在node环境下，执行

```
npm install #第一次运行需要安装依赖库，后续不需要 
npm start
```

**③打包web代码**
*1.* 进入dl-react
*2.* 在node环境下，执行

```
npm run build
```
此时会打包web代码到dl-flask的静态文件中，后续可以将dl-flask发布到服务器

<br/>
TODO：

* ~~把这个服务加到服务器~~ [点击浏览](http://67.216.212.74:66/)


