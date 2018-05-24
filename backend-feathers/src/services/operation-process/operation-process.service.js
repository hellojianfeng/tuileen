// Initializes the `operation-process` service on path `/operation-process`
const createService = require('feathers-mongoose');
const createModel = require('../../models/operation-process.model');
const hooks = require('./operation-process.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'operation-process',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/operation-process', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('operation-process');

  service.hooks(hooks);
};
