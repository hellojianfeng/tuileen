// Initializes the `operation-reminder` service on path `/operation-reminder`
const createService = require('feathers-mongoose');
const createModel = require('../../models/operation-reminder.model');
const hooks = require('./operation-reminder.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'operation-reminder',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/operation-reminder', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('operation-reminder');

  service.hooks(hooks);
};
