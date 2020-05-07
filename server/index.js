const express = require('express')
const cookieParse = require('cookie-parser')
const session = require('express-session')
const app = express()

const bodypaser = require('body-parser')
// //app.use 使用中间件（插件）
// //解析表单数据 x-www-form-urlencoded
app.use(bodypaser.urlencoded({ extended: false }))
// //解析json数据
app.use(bodypaser.json())

// session 的整体配置
app.use(session({
    secret: 'Odasbhn41854asdqw',     //秘钥
    resave: true,   // 即使 session 没有修改也保存 session 值
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 * 60 * 24 }   //回话保存时间 一小时
}))

app.set('secret','i2asdfhasfhoa')

app.use(require('cors')())
app.use(express.json())

app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)


app.listen(3000,() => {
    console.log('http://localhost:3000');
});