let mongoose = require('mongoose')

let Schema = mongoose.Schema;


let techerDate = new Schema({//课程列表
    kechengID:String,
    class:[{
           code:String,
           displayName:String,
           email:String,
    }],

    kechengName:String,
    displayName:String,
    code:String,
    
    shiyanfabu:[{
        fabu:String
    }],

    shiyanbaogao:[{
        fabuname:String,
        baogaocount:[{baogao:String,}]
    }]

})

techerDate.index({ 
  kechengID: 1, 
 })
/*techerDate.set('toJSON', { getters: true})*/

module.exports = mongoose.model('Techer', techerDate)