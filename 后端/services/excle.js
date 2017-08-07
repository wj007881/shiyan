//引入node-xlsx解析excel模块  
const xlsx = require('node-xlsx'); 
const fs = require('fs-extra');  //de.js核心的文件处理模块
const http = require('http');
const path = require('path')
const mime = require('mime')
const formidable = require('koa-formidable')
const log = require('../utils/log')
const Techer = require('../models/techerDate')
const Teacher = require('../models/teacher')
const User = require('../models/user')

//文件上传并解析Excel表
exports.excle =async function(ctx, next){ 
    //对excel文件进行解析，读取数据  

        let id;
        let exclepath =`${__dirname}/../excle`;
        const tmpdir = path.join(exclepath)//path.join(os.tmpdir(), uid())
        log.debug(tmpdir)
        // make the temporary directory
        let ok = await fs.exists(tmpdir)
        if (!ok) await fs.mkdir(tmpdir)
        const filePaths = []
        const files = ctx.request.body.files || []
        
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
 



        let obj = xlsx.parse(`${exclepath}/${file.name}`);
        /*let obj = xlsx.parse("./upload/学生表.xlsx");*/
        let excelObj = obj[0].data;//取得第一个excel表的数据  
        /*console.log(excelObj);*/
        //定义user实体类数组 
        let userArray;
       if(ctx.request.body.fields.co==2){
         userArray = new Array('code','displayName','email',);     
       }else
       {
        userArray = new Array('code','displayName','password','email',);  
       }
        
        //循环遍历表每一行的数据 
        let dataMami=[];
        for(let i=1;i<excelObj.length;i++){  
            let rdata = excelObj[i];  
            //将每一行的数据存进数据库中  
            let dataBaby={}; 
            for(let j=0;j<rdata.length;j++){
                //stu.set(stuArray[j],rdata[j]);
                dataBaby[userArray[j]]=rdata[j]
            }  
            dataMami.push(dataBaby)
            /*console.log(dataBaby);*/        
}
   console.log(dataMami)



   if(ctx.request.body.fields.co==2){
    id =ctx.request.body.fields.code;
     Techer.findOne({
          "_id":id,
        },null,function(err,documents){
          if(err){}else{
              for(let k in dataMami)  {
                  documents.class.push(dataMami[k]);
              }
              documents.save();    
    } })
        }
        else if(ctx.request.body.fields.co==5){
                          for(let k in dataMami)  {
                  Teacher.create(dataMami[k]);
              }
        } else{
            for(let k in dataMami)  {
                  User.create(dataMami[k]);
              }
        }






};
 ctx.redirect('/')
}