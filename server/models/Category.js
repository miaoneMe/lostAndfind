const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{ type:String },
    parent:{type:mongoose.SchemaTypes.ObjectId,erf:'Category'},
})


module.exports = mongoose.model('Category',schema)