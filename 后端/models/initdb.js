const log = require('../utils/log')
const config = require('../conf/config')
const User = require('./user')
module.exports = async ()=> {
  let count = await User.find().count().exec()
  if (count == 0){
    if (config.defaultAdminPassword === 'admin'){
      log.error('you must change the default passoword at ./conf/config.js');
      log.error('koa2 refused to start because of weak password');
      return process.exit(1);
    }

    let result = await User.create({
      code: config.defaultAdminName,
      password: config.defaultAdminPassword,
      displayName: config.defaultAdminName,
      isAdmin:true,
      email: 'lsj@sise.com.cn'
    })

    log.info(`account '${result.displayName}' is created`);

  }
}