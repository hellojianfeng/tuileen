// Initializes the `operation-user` service on path `/operation-user`
const createService = require('feathers-mongoose');
const createModel = require('../../models/operation-user.model');
const hooks = require('./operation-user.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/operation-user', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('operation-user');

  service.hooks(hooks);
};
