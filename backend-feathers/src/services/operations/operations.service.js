// Initializes the `operations` service on path `/operations`
const createService = require('feathers-mongoose');
const createModel = require('../../models/operations.model');
const hooks = require('./operations.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'operations',
    Model,
    paginate
  };

  const docs = {
    //if we want to add the mongoose model to the 'definitions' so it is a named model in the swagger ui:
    definitions: {
      operations: {
        "type": "object",
        "required": [
          "name","org","app"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "operation name, it is a unique name in app"
          },
          "display_name": {
            "type": "string",
            "description": "operation's display name"
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
          "org": {
            "type": "object",
            "required": ["oid"],
            "properties":{
              "oid": {
                "type": "objectId",
                "description": "objectId of organization"
              },
              "data": {
                "type": "mixed",
                "description": "operation data in organization"
              },
            },  
          },
          "concurrent": { 
            "type": "Number",
            "description":"concurrent runners for operation"
          },
          "allow_concurrent":{ 
            "type": "Number",
            "description":"allow concurrent runners for operation"
           },
          "roles": {
            "type": "array",
            "items": {
              "type": "object",
              "properties":{
                "include": {
                  "type": "object",
                  "properties":{
                    "paths":{
                      "type":"string",
                      "description":"paths for roles"
                    },
                    "recursive_paths":{
                      "type":"string",
                      "description":"paths for roles"
                    },
                    "children":{
                      "type":"string",
                      "description":"paths for roles"
                    },
                    "recursive_children":{
                      "type":"string",
                      "description":"paths for roles"
                    },
                    "parents":{
                      "type":"string",
                      "description":"included parent paths"
                    },
                    "recursive_parents":{
                      "type":"string",
                      "description":"included recursive parent paths"
                    }
                  }
                },
                "exclude": {
                  "description":"exclude roles for operation, exclude roles is processed first",
                  "type": "object",
                  "properties":{
                    "paths":{
                      "type":"string",
                      "description":"paths for roles"
                    },
                    "recursive_paths":{
                      "type":"string",
                      "description":"paths for roles"
                    },
                    "children":{
                      "type":"string",
                      "description":"paths for roles"
                    },
                    "recursive_children":{
                      "type":"string",
                      "description":"paths for roles"
                    },
                    "parents":{
                      "type":"string",
                      "description":"excluded parent paths"
                    },
                    "recursive_parents":{
                      "type":"string",
                      "description":"excluded recursive parent paths"
                    }
                  }
                }
              }
            }
          },
          "stages": {
            "type": "array",
            "items": {
              "type": "object",
              "properties":{
                "name": { "type":"string"},
                "display_name": { "type":"string"},
                "start":{
                  "type":"string",
                  "description":"expression for stage to start, can be date time or any expression"
                },
                "end":{
                  "type":"string",
                  "description":"expression for stage to end, can be date time or any expression"
                },
                "data": {
                  "type":"mixed"
                }
              }
            }
          },
          "progress":{
            "type":"number",
            "description":"percentage of progress, here is the total progress. if not start, it's 0 or negative,100 means completed"
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
  app.use('/operations', Object.assign(createService(options),{docs: docs}));

  // Initialize our service with any options it requires
  //app.use('/operations', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('operations');

  service.hooks(hooks);
};
