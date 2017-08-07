let mongoose = require('mongoose')
let tokenService = require('../services/token')
const config = require('../conf/config')
const log = require('../utils/log')
//let passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema


let adminSchema = new Schema({
    code: String,//学号或老师工号
    displayName: String,
    password: String,
    email: String,
    isAdmin: { type: Boolean, default: true }//是否是管理员
})
/*
adminSchema.plugin(passportLocalMongoose,{ 
 	usernameField :'code', 
 	hashField:'password', 
 	saltlen:8, 
 	keylen:32 
 })
 */
adminSchema.virtual('fullName')
  .get(function() { return this.code + '-' + this.displayName })
  .set(function(v) {
     let ss = v.split('-')
     this.code =ss[0]
     this.displayName =ss[1]
  })

 adminSchema.pre('save', function (next) { 
    if(this.password&&this.password.length <10){  
         this.password=tokenService.createHash(this.password)
 	}
    next()
 })
 
adminSchema.set('toJSON', { getters: true, virtuals: true })
adminSchema.set('toObject', { getters: true, virtuals: true })
adminSchema.index({ 
  code: 1
})
module.exports = mongoose.model('admin', adminSchema)