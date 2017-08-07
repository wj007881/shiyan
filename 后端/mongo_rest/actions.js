const log = require('../utils/log')
module.exports = function generateActions(model) {
  return {

    findAll:async function(ctx, next) {////条件查询
      // next();
   
      let error, result;
      try {
        let conditions = {}
        let select={}
        let query = ctx.request.query
        if (query.conditions) {
            conditions = JSON.parse(query.conditions)
        }
        let builder = model.find(conditions)
        if (query.select) {
          select = JSON.parse(query.select)
          builder = builder.select(select)
        }
        
        ;['limit', 'skip', 'sort', 'count'].forEach(function(key){
          if (query[key]) {
            let arg = query[key];
            if (key == 'limit' || key == 'skip'){
              arg = parseInt(arg);
            }
            if (key == 'sort') {
              arg = { "_id": "desc" }
            }
            if (key != 'count')
              builder[key](arg)
            else
              builder[key]()
          }
        })

        result = await builder.exec()
        return ctx.body = result
        console.log(ctx.body)
      } catch (_error) {
        error = _error;
        log.error(error.message)
        return ctx.body = error
      }
    },

    findById: async function(ctx, next) {//按id查找
      // await next;
      let error, result;
      try {
        let select={};
        let query = ctx.request.query;
        let builder = model.findById(ctx.params.id);
        if (query.select) {
          select = JSON.parse(query.select)
          builder = builder.select(select)
        }
        result = await builder.exec()

        return ctx.body = result;
      } catch (_error) {
        error = _error
        log.error(error.message) //todo: set code 500
        return ctx.body = error
      }
    },

    deleteById: async function(ctx, next) {//删除
      // await next;
      let error, result;
      console.log(ctx.params.id);
      try {
        result = await model.findByIdAndRemove(ctx.params.id).exec();
        return ctx.body = result;
      } catch (_error) {
        error = _error
        log.error(error.message)
        return ctx.body = error
      }
      console.log(result);
    },

    replaceById: async function(ctx, next) {//替代
      // await next;
      let error, newDocument, result;
      try {
        await model.findByIdAndRemove(ctx.params.id).exec();
        newDocument = ctx.request.body;
        newDocument._id = ctx.params.id;
        result = await model.create(newDocument);
        return ctx.body = result;
      } catch (_error) {
        error = _error
        log.error(error.message)
        return ctx.body = error
      }
    },

    updateById: async function(ctx, next) {//局部修改
      // await next;
      var error, result;
      try {
        console.log(ctx.params.id);
        console.log(ctx.request.body);
        result = await model.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true}).exec();
        return ctx.body = result
      } catch (_error) {
        error = _error
        log.error(error.message)
        return ctx.body = error
      }
    },
    
    create: async function(ctx, next) {
      // await next;
      let error, result;
      console.log(ctx.request.body)
      try {
        result = await model.create(ctx.request.body)
        ctx.status = 201;
        return ctx.body = result;
      } catch (_error) {
        error = _error
         log.error(error.message)
        return ctx.body = error
      }
    }
  };
};