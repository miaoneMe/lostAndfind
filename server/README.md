### nodemon 
 +  Nodemon是一个使用工具，它将会见监视源文件中任何的更改并自动重启服务器。Nodemon不会对你的代码产生额外的更改，它只是node命令的替代品。因为当你修改源文件后，如果你用的是原来的node 则必须手动重启 你的更改才会有效。但是如果用的是nodemon，则你不需要手动操作，它会检测你的代码改动自动重启。

#### cors
解决跨域问题

##### apidoc
安装
```
npm install apidoc -g
```
自动转换文件下的所有api接口到apidoc文件(此文件需要手动创建)下
```
apidoc -i routes/admin -o apidoc/admin
apidoc -i routes/web -o apidoc/web
```

### MongoDB
+ populate 关联查询

###   inflection
+ inflection专门处理单复数，大小写格式转换

### npm i  bcrypt    (报错)  然后安装的 npm i bcryptjs  require(bcryptjs)
 + 用于做密码的散列的模块

### npm i jsonwebtoken
+ jsonwebtoken   web token验证

### npm i http-assert 断言
 可以处理大量判断if else