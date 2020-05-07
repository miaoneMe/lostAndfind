module.exports = app => {
    const express = require('express')

    const router = express.Router()

    const SendLost = require('../../models/Lost')
    const SendFind = require('../../models/Find')
    const User = require('../../models/User')

/**
 * @api {get} /sendlost 失物列表
 * @apiName GetUser
 * @apiGroup Sendlost
 *
 *  @apiParam {String} name 丢失物品名
 *  @apiParam {String} pace 丢失地点
 *  @apiParam {Number} classify 丢失物品类型
 *  @apiParam {String} losttime 丢失时间
 *  @apiParam {String} desc 丢失物品描述
 *  @apiParam {String} tel 联系方式
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.get('/sendlost',async(req,res) => {
    const items = await SendLost.find().limit(10)
    res.send(items)
   })

/**
 * @api {get} /sendfind 招领列表
 * @apiName GetUser
 * @apiGroup SendFind
 *
 *  @apiParam {String} name 丢失物品名
 *  @apiParam {String} pace 丢失地点
 *  @apiParam {Number} classify 丢失物品类型
 *  @apiParam {String} losttime 丢失时间
 *  @apiParam {String} desc 丢失物品描述
 *  @apiParam {String} tel 联系方式
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.get('/sendfind',async(req,res) => {
    const items = await SendFind.find().limit(10)
    res.send(items)
   })

/**
 * @api {post} /sendlost 发布失物
 * @apiName GetUser
 * @apiGroup Sendlost
 *
 *  @apiParam {String} name 丢失物品名
 *  @apiParam {String} pace 丢失地点
 *  @apiParam {Number} classify 丢失物品类型
 *  @apiParam {String} losttime 丢失时间
 *  @apiParam {String} desc 丢失物品描述
 *  @apiParam {String} tel 联系方式
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
  router.post('/sendlost',async(req,res) => {
     const model = await SendLost.create(req.body)
     res.send(model)
    })
/**
 * @api {post} /sendfind 发布招领
 * @apiName GetUser
 * @apiGroup Sendlost
 *
 *  @apiParam {String} name 拾到的物品名
 *  @apiParam {String} pace 拾物地点
 *  @apiParam {Number} classify 拾物物品类型
 *  @apiParam {String} losttime 拾物时间
 *  @apiParam {String} desc 拾到的物品描述
 *  @apiParam {String} tel 联系方式
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/sendfind',async(req,res) => {
    const model = await SendFind.create(req.body)
    res.send(model)
   })





   
   
   /**
    * @api {post} /user/reg 用户注册
    * @apiName 用户注册
    * @apiGroup User
    *
    * @apiParam {String} us 用户名.
    * @apiParam {String} ps 用户密码.
    * @apiParam {String} code 邮箱验证码.
    *
    * @apiSuccess {String} firstname Firstname of the User.
    * @apiSuccess {String} lastname  Lastname of the User.
    */
   //注册

router.post('/reg', (req, res) => {
    //获取数据
  let {  ps, userid, name } = req.body
    if( ps && userid && name) {
        User.find({ userid })
            .then((data) => {
                if (data.length === 0) {
                       // 学号不存在 可以注册
                    return User.insertMany({ userid:userid, ps: ps,name:name })
                } else {
                    res.send({ err: -3, msg: '用户名已存在' })
                }
            })
            .then(() => {
                res.send({ err: 0, msg: '注册ok' })
            })
            .catch((err) => {
                console.log(err)
                res.send({ err: -2, msg: '注册err' })
            })
    } else {
        return res.send({ err: -1, msg: '参数未填写完整' })
    }


})

   /**
    * @api {post} /user/login 用户登录
    * @apiName login
    * @apiGroup User
    *
    * @apiParam {String} us 用户名.
    * @apiParam {String} ps 用户密码.
    *
    * @apiSuccess {String} firstname Firstname of the User.
    * @apiSuccess {String} lastname  Lastname of the User.
    */
   //登录
   router.post('/login', (req, res) => {
    let { userid, ps } = req.body
    console.log(req.body)
    if (!userid || !ps ) {
        return res.send({ err: -1, msg: '参数错误' })
    }
    User.find({ userid: userid, ps: ps })
        .then((data) => {
            if (data.length > 0) {
                // 登录成功后将用户的想换信息存到 session 中去
                // req.session.login = true
                // req.session.name = mail
                // req.session.headPortrait = data[0].img
                res.send({ err: 0, msg: '登录成功' })
            } else {
                res.send({ err: -2, msg: '用户名和密码不正确' })
            }
        })
        .catch((err) => {
            return res.send({ err: -1, msg: '内部错误' })
        })

})

/**
 * @api {post} /user/logout 用户退出
 * @apiName logout
 * @apiGroup User
 *
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/logout', (req,res,next)=>{
    if(req.session.login){
        next()
    }else{
        res.send({err: -999,msg: '请先登录'})
    }
}, (req, res) => {
    req.session.destroy()   // 销毁保存的 session
    res.send({err: 0, msg: '已退出'})
})

    app.use('/web/api',router)
    //发送邮箱验证码
}
