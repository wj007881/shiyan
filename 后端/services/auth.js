const tokenService = require('./token')
const User = require('../models/user')
const Teacher = require('../models/teacher')
const Admin = require('../models/admin')

//学生登录
exports.login = async function (ctx, next) {
  var error, result;
  let users, user;

  try {
    //exec执行其他方法
    users = await User.find({ code: ctx.request.body.code }).exec()
    user = {
      name: users[0].code,
      //valueOf返回原始值
      timestamp: (new Date()).valueOf(),
    };
    const password = users[0].password;

if (password == ctx.request.body.password) {
    // if (password == tokenService.createHash(ctx.request.body.password)) {
      let token = tokenService.createToken(user)
      return ctx.body = {
        success: true,
        token: token
      }
    }else {
      return ctx.body = {
        success: false,
        //密码错误
        description: 1
      }
    }

  } catch (_error) {
    error = _error;
    return ctx.body = {
      success: false,
      //用户错误
      description: 2,
    }
  }
console.log(response)
}

//教师登录
exports.tea_login = async function (ctx, next) {
  var error, result;
  let users, user;

  try {
    //exec执行其他方法
    users = await Teacher.find({ code: ctx.request.body.code }).exec()
    user = {
      name: users[0].code,
      //valueOf返回原始值
      timestamp: (new Date()).valueOf(),
    };
    const password = users[0].password;

if (password == ctx.request.body.password) {
    // if (password == tokenService.createHash(ctx.request.body.password)) {
      let token = tokenService.createToken(user)
      return ctx.body = {
        success: true,
        token: token
      }
    }else {
      return ctx.body = {
        success: false,
        //密码错误
        description: 3
      }
    }

  } catch (_error) {
    error = _error;
    return ctx.body = {
      success: false,
      //用户错误
      description: 4
    }
  }
console.log(response)
}

//管理员登录
exports.ad_login = async function (ctx, next) {
  var error, result;
  let users, user;

  try {
    //exec执行其他方法
    users = await Admin.find({ code: ctx.request.body.code }).exec()
    user = {
      name: users[0].code,
      //valueOf返回原始值
      timestamp: (new Date()).valueOf(),
    };
    const password = users[0].password;

if (password == ctx.request.body.password) {
    // if (password == tokenService.createHash(ctx.request.body.password)) {
      let token = tokenService.createToken(user)
      return ctx.body = {
        success: true,
        token: token
      }
    }else {
      return ctx.body = {
        success: false,
        //密码错误
        description: 5
      }
    }

  } catch (_error) {
    error = _error;
    return ctx.body = {
      success: false,
      //用户错误
      description: 6
    }
  }
console.log(response)
}


exports.logout = async function (ctx, next) {
  // const headers = ctx.request.headers;
  // let token;
  // await redis.del(tokenService.createHash(token));//'token'
  console.log('logout')
  ctx.body = {
    success: true,
    description: 'Token deleted'
  }


};

exports.permission = async function (ctx, next) {
  const headers = ctx.request.headers;
  let token;
  try {
    token = headers['authorization'];
  } catch (err) {
    return ctx.body = {
      success: false,
      description: err
    };
  }

  if (!token) {
    return ctx.body = {
      success: false,
      description: 'Token not found'
    };

  }

  const result = tokenService.verifyToken(token);
  if (result == false) {
    return ctx.body = {
      success: false,
      description: 'Token verify failed'
    };
  }
  return next();


}

