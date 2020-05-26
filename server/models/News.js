const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    news:{ type:String},
})


module.exports = mongoose.model('News',schema)