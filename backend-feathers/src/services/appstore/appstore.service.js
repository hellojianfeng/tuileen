// Initializes the `appstore` service on path `/appstore`
const createService = require('feathers-mongoose');
const createModel = require('../../models/appstore.model');
const hooks = require('./appstore.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'appstore',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/appstore', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('appstore');

  service.hooks(hooks);
};
