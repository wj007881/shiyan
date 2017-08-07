const path = require('path')
const fs = require('fs')
const Techer = require('../models/techerDate')
const log = require('../utils/log')


exports.setup = async function (ctx, next) {

   let a;
   let code=ctx.request.body.opp;
  
   await Techer.find({
          "class.code":code,
        },null,function(err,documents){
          if(err){}else{
          a=documents
      return ctx.body=a;  
    } })

         }
