const Artwork = require('../models/artwork')
const Like = require('../models/like')
const log = require('../utils/log')

let vote = async function (ctx, next) {
  const userId=ctx.request.body.userId||''
  const artworkId = ctx.request.body.artworkId||''
  let conditions={userId,artworkId}
  //log.debug(conditions)
  try{
    let result = await Like.find(conditions).exec()
    if (result.length==0){
       await Like.create(conditions)
       await Artwork.update({_id:artworkId},{'$inc':{likeNum:1}})
    }
    return ctx.body={success: true}
  }catch(err){
     log.error(err.message)
     return ctx.body = {success: false,error:err}
  }

}
let getAllPublishArtworks= async function (ctx, next) {
  //ctx.query
  const name=ctx.request.body.name||''
  const catId = ctx.request.body.category||''
  const tagIds =ctx.request.body.tags||''
  const likeNum= !ctx.request.body.likeNum?0:+ctx.request.body.likeNum
  const page =  !ctx.request.body.page ?1:+ctx.request.body.page
  const limit = !ctx.request.body.limit ?10:+ctx.request.body.limit
  let skip = 0
  let result
  let allPage
  let allNum
  let conditions={
    isPublic: true,
    likeNum:{'$gte': likeNum}
  }

if (page <= 0) {
  page=1
}
 skip = limit * (page - 1)
  if (name.length>0) {
     conditions['name']=new RegExp(name)
  }

  if (catId .length>0) {
     conditions['category']=catId
  }
  if (tagIds.length>0) {
    let ids = tagIds.split(',')
    conditions['tags']={ "$in": ids }
  }
   
 // log.debug("catId:"+catId)
 // log.debug("page:"+page)
 // log.debug("limit:"+limit)
  log.debug(conditions)
  try{
    result = await Artwork.find(conditions)
      .populate("category tags")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip).exec()
    //  log.debug(result)
    allNum = await Artwork.find(conditions).count().exec()
    allPage = Math.ceil(allNum / limit)
    //log.debug(allPage)
  }catch(err){
     log.error(err.message)
     return ctx.body = {success: false,error:err}
  }
  return ctx.body = {
    success: true,
    result,
    allPage: allPage
  }
}

module.exports =  {
   getAllPublishArtworks,
   vote
}
/*
Model 
.where('age').gte(25) 
.where('tags').in(['movie','music','art']) 
.select('name','age','tags') 
.skip(20) 
.limit(10) 
.asc('age')
*/