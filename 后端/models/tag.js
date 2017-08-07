let mongoose = require('mongoose')

let Schema = mongoose.Schema


let tagSchema = new Schema({
    name: String
 // ,  color: String//比如中国水墨是黑色，油画是红色
})

module.exports = mongoose.model('Tag', tagSchema)