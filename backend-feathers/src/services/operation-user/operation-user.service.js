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

  const docs = {
    //if we want to add the mongoose model to the 'definitions' so it is a named model in the swagger ui:
    definitions: {
      operationUser: {
        "type": "object",
        "required": [
          "name","path","org"
        ],
        "properties": {
          "operation": {
            "type": "object",
            "required": ["oid"],
            "properties":{
              "oid": {
                "type": "objectId",
                "description": "objectId of operation"
              }
            }
          },
          "user": {
            "type": "object",
            "required": ["oid"],
            "properties":{
              "oid": {
                "type": "objectId",
                "description": "objectId of user"
              }
            }
          },
          "progress":{
            "type":"Number",
            "description":"percentage of progress"
          },
          "data": {
            "type": "mixed",
            "description": "any other data for organization"
          }
        }
      }
    }
  }

  // Initialize our service with any options it requires
  //console.log('json model',Model.schema.obj);
  app.use('/operation-user', Object.assign(createService(options),{docs: docs}));

  // Initialize our service with any options it requires
  //app.use('/operation-user', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('operation-user');

  service.hooks(hooks);
};
