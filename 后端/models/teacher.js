let mongoose = require('mongoose')
let tokenService = require('../services/token')
const config = require('../conf/config')
const log = require('../utils/log')
//let passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema


let teacherSchema = new Schema({
    code: String,//学号或老师工号
    displayName: String,
    password: String,
    email: String,
    isAdmin: { type: Boolean, default: false }//是否是管理员
})
/*
teacherSchema.plugin(passportLocalMongoose,{ 
 	usernameField :'code', 
 	hashField:'password', 
 	saltlen:8, 
 	keylen:32 
 })
 */
teacherSchema.virtual('fullName')
  .get(function() { return this.code + '-' + this.displayName })
  .set(function(v) {
     let ss = v.split('-')
     this.code =ss[0]
     this.displayName =ss[1]
  })

 teacherSchema.pre('save', function (next) { 
    if(this.password&&this.password.length <10){  
         this.password=tokenService.createHash(this.password)
 	}
    next()
 })
 
teacherSchema.set('toJSON', { getters: true, virtuals: true })
teacherSchema.set('toObject', { getters: true, virtuals: true })
teacherSchema.index({ 
  code: 1
})
module.exports = mongoose.model('Teacher', teacherSchema)