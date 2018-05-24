// Initializes the `operation-message` service on path `/operation-message`
const createService = require('feathers-mongoose');
const createModel = require('../../models/operation-message.model');
const hooks = require('./operation-message.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'operation-message',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/operation-message', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('operation-message');

  service.hooks(hooks);
};
