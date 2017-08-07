let mongoose = require('mongoose')

let Schema = mongoose.Schema


let categorySchema = new Schema({
    //比如A-1 表示中国水墨画 A-2 表示中国陶瓷
    code: { type: String, default: 'Z-0' },
    name: String
})
categorySchema.index({ 
  code: 1
})
module.exports = mongoose.model('Category', categorySchema)