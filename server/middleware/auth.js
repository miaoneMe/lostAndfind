
 //封装登录校验中间件
 module.exports = options => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
     return  async(req,res,next) =>{
        //前端传过来的token后端解密出来 得到id 在通过id去数据库里面找到用户
        const token = String(req.headers.authorization || '').split(' ').pop()
        
        assert(token, 401, '请先发送token')
        const { id } = jwt.verify(token,req.app.get('secret'))
        
        assert(id, 401, '请先 发送id')
         req.user = await AdminUser.findById(id)
         
        assert(req.user,401,'请先登录')
    
        await next()
    }
 }