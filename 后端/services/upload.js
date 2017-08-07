const os = require('os')
//const util = require('util')

const path = require('path')
const log = require('../utils/log')
const fs = require('fs-extra')

let Techer = require('../models/techerDate')


let upload = async   function (ctx, next) {
  let result;
  let fabuname =ctx.request.body.fields.fabuname;
  let id = ctx.request.body.fields.id;
  let path1 = ctx.request.body.fields.kechengID;
  let path2;

  console.log(fabuname)

  path2 = '../upload/' + path1;
 

  const tmpdir = path.join(__dirname,path2)//path.join(os.tmpdir(), uid())
  log.debug(tmpdir)
  // make the temporary directory
  let ok = await fs.exists(tmpdir)
  if (!ok) await fs.mkdir(tmpdir)
  const filePaths = []
  const files = ctx.request.body.files || []
  //log.debug(files)
 // if (!util.isArray(files))

  for (let key in files) {
    const file = files[key]
    if (''==file.name)
      continue
    log.debug('uploading %s ', file.name)
    const filePath = path.join(tmpdir, file.name)
    const reader = fs.createReadStream(file.path)
    const writer = fs.createWriteStream(filePath)
    reader.pipe(writer)
    filePaths.push(filePath)




        Techer.findOne({
          "_id":id,
        },null,function(err,documents){
          if(err){}else{
        documents.shiyanfabu.push({fabu: file.name});
        documents.shiyanbaogao.push({fabuname: fabuname});
        documents.save();
          }
        })
    
    

   




  }

 // ctx.body = filePaths
 ctx.redirect('/')
}

module.exports =  {
  upload
}

