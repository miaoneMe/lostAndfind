module.exports = app => {
    const express = require('express')

    const router = express.Router()

    const SendLost = require('../../models/Lost')
    const SendFind = require('../../models/Find')
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

    app.use('/web/api',router)
}
