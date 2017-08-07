const { upload } = require('./services/upload')
const { upload2 } = require('./services/upload2')
const { playVideo } = require('./services/play')
const { vote, getAllPublishArtworks } = require('./services/api')
const { login, logout, permission,tea_login,ad_login } = require('./services/auth')
const models = require('./models')
const koa2RestMongoose = require('./mongo_rest/index')

const { setup } = require('./services/setup')
const { excle } = require('./services/excle')

let mockPermission = async function (ctx, next) {
  return next()
}

module.exports =function (app,router) {
  router.get('/play', playVideo)


  router.post('/login', login)
  router.post('/logout', logout)
  router.post('/upload', upload)
  router.post('/upload2', upload2)
  router.post('/tea_login', tea_login)
  router.post('/ad_login', ad_login)
  
  router.post('/api/vote', vote)
  router.post('/api/published', getAllPublishArtworks)

  router.post('/setup', setup)
  router.post('/excle', excle)
  
  let ms = Object.keys(models)
  for (let m of ms) {
    // koa2RestMongoose( router, models[m], '/db', permission)
    koa2RestMongoose(router, models[m], '/db', mockPermission)
  }
  app.use(router.routes())
  app.use(router.allowedMethods())
}

