module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router({
        mergeParams:true
    })
  
/**
 * @api {post} /categories 新建分类
 * @apiName GetUser
 * @apiGroup Category
 *
 * @apiParam {String} name
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
    router.post('/',async(req,res) => {
  
     const model = await req.Model.create(req.body)
     res.send(model)
    })
    /**
 * @api {put} /categories/:id 更新分类
 * @apiName GetUser
 * @apiGroup Category
 *
 * @apiParam {String} id
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */    
router.put('/:id',async(req,res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
   })
/**
 * @api {get} /categories 查询分类列表
 * @apiName GetUser
 * @apiGroup Category
 *
 * @apiParam {String} name
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */    

    router.get('/',async(req,res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().populate('parent').limit(10)
        res.send(items)
       })
/**
 * @api {get} /categories/:id 编辑分类
 * @apiName GetUser
 * @apiGroup Category
 *
 * @apiParam {String} id
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */       
    router.get('/:id',async(req,res) => {
     const model = await req.Model.findById(req.params.id)
     res.send(model)
    })
    /**
 * @api {get} /categories/:id 删除分类
 * @apiName delete categories
 * @apiGroup Category
 *
 * @apiParam {String} id
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */       
router.delete('/:id',async(req,res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
        success:true
    })
   })
    /**
 * @api {get} /losts/list 查询失物列表
 * @apiName lostslist
 * @apiGroup SendLost
 *
 * @apiParam {String} name
 * @apiParam {String} region
 * @apiParam {String} classify
 * @apiParam {String} time
 * @apiParam {String} desc
 * @apiParam {String} tel
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */       

    /**
 * @api {get} /finds/list 查询招领列表
 * @apiName  findslist
 * @apiGroup SendFind
 *
 * @apiParam {String} name
 * @apiParam {String} region
 * @apiParam {String} classify
 * @apiParam {String} time
 * @apiParam {String} desc
 * @apiParam {String} tel
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */       

     /**
 * @api {post} /admin/api/upload 图片上传
 * @apiName upload
 * @apiGroup Upload
 *
 * @apiParam {String} name
 * @apiParam {String} region
 * @apiParam {String} classify
 * @apiParam {String} time
 * @apiParam {String} desc
 * @apiParam {String} tel
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */  

// 登录校验中间件
const authMiddleware = require('../../middleware/auth')
const resourceMiddleware = require('../../middleware/resource')
app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


    const multer = require('multer')
    const upload = multer({dest:__dirname + '/../../uploads'})


    app.post('/admin/api/upload',authMiddleware(),upload.single('file'),async (req,res) => {
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
    })

    app.post('/admin/api/login',async(req,res) => {
        const { username, password} = req.body
         //1.根据用户名找用户
             

             const user = await AdminUser.findOne({username}).select('+password')
             
            // 简单粗暴的抛出异常
             assert(user,422,'用户不存在')
            //  if(!user) {
            //      return res.status(422).send({
            //          message:'用户不存在'
            //      })
            //  }
        //2.校验密码
            const isValid =  require('bcryptjs').compareSync(password,user.password)
          
             assert(isValid,422,'密码错误')
            // if(!isValid) {
            //     return res.status(422).send({
            //         message:'密码错误'
            //     })
            // }
      
         //3.返回token
          
           const token = jwt.sign({id: user._id},app.get('secret'))
           res.send({token})
        
    })

    //错误处理函数  最后的捕获异常
    app.use(async (err,req,res,next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}