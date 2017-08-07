let mongoose = require('mongoose')
let moment = require('moment')
moment.locale('zh-cn')
let Schema = mongoose.Schema

let artworkSchema = new Schema({//艺术品
    name: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    tags: [{
       type: Schema.Types.ObjectId,
       ref: 'Tag'
    }],
    image: String,//图片文件名
    video: String,//视频文件名
    createdAt:{
      type: Date,
      default: Date.now
    },//创建日期
    isPublic: { type: Boolean, default: true },//是否公开
    likeNum: { type: Number, default: 0 }//点赞数
})

artworkSchema.path('createdAt').get(function(v) {
  return moment(v).format('lll');
})
artworkSchema.methods.findSameCategory = function(cb) {
  return this.model('Artwork').find({ category: this.category }, cb)
}
artworkSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb)
}

artworkSchema.index({ 
  name: 1, 
  category:1,
  isPublic:1,
  createdAt:-1,
  likeNum: -1 })
artworkSchema.set('toJSON', { getters: true})
module.exports = mongoose.model('Artwork', artworkSchema)