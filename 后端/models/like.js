let mongoose = require('mongoose')

let Schema = mongoose.Schema;


let likeSchema = new Schema({//点赞
    userId: Schema.Types.ObjectId,
    artworkId:Schema.Types.ObjectId
})

module.exports = mongoose.model('Like', likeSchema)
