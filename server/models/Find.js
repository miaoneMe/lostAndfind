const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{ type:String },
    region:{ type:String },
    classify:{ type:String},
    time:{ type:String},
    desc:{ type:String},
    tel:{ type:String},
    img:{ type:String}
})


module.exports = mongoose.model('Find',schema)