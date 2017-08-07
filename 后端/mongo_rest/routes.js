

module.exports = function generateRoutes(router, modelName, actions, prefix, permission) {

  router.get(prefix + ("/" + modelName), actions.findAll);
  router.get(prefix + ("/" + modelName + "/:id"), actions.findById);

  router.post(prefix + ("/" + modelName), permission, actions.create);
 // router.post(prefix + ("/" + modelName + "/:id"), permission, actions.updateById);
  router.del(prefix + ("/" + modelName + "/:id"), permission, actions.deleteById);
  //router.put(prefix + ("/" + modelName), permission, actions.create);
  router.put(prefix + ("/" + modelName + "/:id"), permission, actions.replaceById);
  router.patch(prefix + ("/" + modelName + "/:id"), permission, actions.updateById);

  
}