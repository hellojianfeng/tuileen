// Initializes the `workflows` service on path `/workflows`
const createService = require('feathers-mongoose');
const createModel = require('../../models/workflows.model');
const hooks = require('./workflows.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'workflows',
    Model,
    paginate
  };

  const docs = {
    //if we want to add the mongoose model to the 'definitions' so it is a named model in the swagger ui:
    definitions: {
      workflows: {
        "type": "object",
        "required": [
          "name","org"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "role name, it is a unique name in organization"
          },
          "display_name": {
            "type": "string",
            "description": "role's display name"
          },
          "org": {
            "type": "object",
            "required": ["oid","name"],
            "properties":{
              "oid": {
                "type": "objectId",
                "description": "objectId of organization"
              },
              "name": {
                "type": "string",
                "description": "name of organization"
              },
            },  
          },
          "app": {
            "type": "object",
            "required": ["oid"],
            "properties":{
              "oid": {
                "type": "objectId",
                "description": "objectId of app"
              },
              "data": {
                "type": "mixed",
                "description": "operation data in app"
              },
            },  
          },
          "works":{
            "type":"array",
            "items":{
              "type":"object",
              "properties":{
                "name": {
                  "type": "string",
                  "description": "role name, it is a unique name in workflow"
                },
                "display_name": {
                  "type": "string",
                  "description": "role's display name"
                },
                "operations":{
                  "type":"array",
                  "items":{
                    "type":"object",
                    "properties":{
                      "oid": {
                        "type": "objectId",
                        "description": "objectId of app"
                      },
                      "data": {
                        "type": "mixed",
                        "description": "operation data in app"
                      },
                    }
                  }
                },
                "workflows":{
                  "type":"array",
                  "items":{
                    "type":"object",
                    "properties":{
                      "oid": {
                        "type": "objectId",
                        "description": "objectId of app"
                      },
                      "data": {
                        "type": "mixed",
                        "description": "operation data in app"
                      },
                    }
                  }
                },
              }
            }
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
  app.use('/workflows', Object.assign(createService(options),{docs: docs}));

  // Initialize our service with any options it requires
  //app.use('/workflows', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('workflows');

  service.hooks(hooks);
};
