const path = require('path')
const Koa = require('koa')
const cors = require('koa2-cors');
const koaBody = require('koa-body')
const koaRouter = require('koa-router')
//const favicon = require('koa-favicon')
const serve = require('koa-static')
const restc = require('restc')
const log = require('./utils/log')
let {start} = require('./services/socket')
let route = require('./route')
const app = new Koa()






app.on('error', err =>
  log.error('server error', err.message)
)

app.use(koaBody({ multipart: true }))
app.use(cors(({
  allowMethods: ['GET', 'POST','PUT','PATCH', 'DELETE']
})))
app.use(async (ctx, next) => {
  const start = new Date();
  let url = decodeURIComponent(ctx.url)
  await next();
  const ms = new Date() - start;
  log.info(`${ctx.method} ${url} - ${ms}ms`)
})
/*
app.use(async (ctx, next) => {
  await next();
  if (ctx.body || !ctx.idempotent) return;
  ctx.redirect('/404.html');
}) 
*/
//app.use(restc.koa2)
const router = koaRouter()
app.use(serve(path.join(__dirname, '/public')))
app.use(serve(path.join(__dirname, '/upload')))
app.use(serve(path.join(__dirname, '/excle')))

route(app,router)
//app.use(router.routes())
//app.use(router.allowedMethods())

let server = require('http').Server(app.callback())
let io = require('socket.io')(server)
start(io)


server.listen(3000)
log.info(`koa2 is running at 3000`)

