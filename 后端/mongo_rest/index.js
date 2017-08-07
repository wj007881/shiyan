
const generateRoutes = require('./routes');
const generateActions = require('./actions');

module.exports = function generateRest(router, model, prefix = '', permission) {
  const actions = generateActions(model);
  generateRoutes( router, model.modelName+'s', actions, prefix, permission)
};