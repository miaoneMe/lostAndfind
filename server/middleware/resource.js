//获取数据模型中间件
module.exports = options => {
    return async (req,res,next) => {
        const modeName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modeName}`) 
        next()
    }
}
