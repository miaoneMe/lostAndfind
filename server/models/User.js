const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String },
    userid: { type: String },
    mail:{type:String},
    ps: { type: String, required: true },
    sex: { type: Number, default: 0 },
    age: { type: Number, default: 0 },
    tel: { type: Number, default: 0 },
    integral: { type: Number, default: 0 },
    img: { type: String },
});
// 将 scheme 对象转化为数据模型
module.exports= mongoose.model('User', schema);  //该数据对象和集合相关联
