const path = require('path')
const fs = require('fs')
const fsx = require('fs-extra')
const extname = path.extname;
const log = require('../utils/log')

exports.playVideo = async function (ctx, next) {

  let fname = ctx.query.fn || 'demo2.mp4'
  if (fname == 'undefined') fname = 'demo2.mp4'
  let file = path.resolve(__dirname, "../upload/" + fname);
  let stats = {}
  try {
    stats = await fsx.stat(file)

    let range = ctx.headers.range || "bytes=0-"
     log.debug(range)
    if (!range) {
      // 416 Wrong range
      log.debug("Wrong range")
      res.statusCode = 416;
      ctx.throw(416, "Wrong range")
    }
    let positions = range.replace(/bytes=/, "").split("-")
    let start = parseInt(positions[0], 10)
    let total = stats.size
    let end = positions[1] ? parseInt(positions[1], 10) : total - 1
    if (start > end) {
      start = end / 2
    }

    let chunksize = (end - start) + 1
    let str = "bytes " + start + "-" + end + "/" + total
   
    ctx.status = 206
    ctx.type = extname(file)
    //ctx.set("Content-Type", 'video/mp4')
    ctx.set("Content-Range", str)
    ctx.set("Accept-Ranges", "bytes")
    ctx.set("Content-Length", chunksize)
   
    ctx.body = fs.createReadStream(file, {
      start: start,
      end: end
    })
  } catch (err) {
    log.debug(err.message)
    //ctx.throw(400, err.message)
  }
}