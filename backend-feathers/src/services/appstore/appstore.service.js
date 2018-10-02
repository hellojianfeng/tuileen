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

  const docs = {
    //if we want to add the mongoose model to the 'definitions' so it is a named model in the swagger ui:
    definitions: {
      appstore: {
        "type": "object",
        "description":"each organization can own 0 or many appstore, its' appstore can be distributed \n"
        +"organization can also install app from other appstore",
        "required": [
          "name","org"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "app name, it is a unique name in appstore"
          },
          "display_name": {
            "type": "string",
            "description": "app's display name"
          },
          "owner": {
            "type": "object",
            "required": ["oid"],
            "properties":{
              "oid": {
                "type": "objectId",
                "description": "objectId of organization"
              },
              "data": {
                "type": "mixed",
                "description": "app data in organization"
              },
            },  
          },
          "installers": {
            "type":"array",
            "items": {
              "type": "object",
              "required": ["oid"],
              "properties":{
                "oid": {
                  "type": "objectId",
                  "description": "objectId of organization"
                },
                "data": {
                  "type": "mixed",
                  "description": "app data in organization"
                },
              },  
            }
          },
          "distributors": {
            "type":"array",
            "items": {
              "type": "object",
              "required": ["oid"],
              "properties":{
                "oid": {
                  "type": "objectId",
                  "description": "objectId of organization"
                },
                "data": {
                  "type": "mixed",
                  "description": "app data in organization"
                },
              },  
            }
          },
          "creator": {
            "type": "object",
            "required": ["oid"],
            "properties":{
              "oid": {
                "type": "objectId",
                "description": "objectId of organization"
              },
              "data": {
                "type": "mixed",
                "description": "app data in organization"
              },
            },  
          },
          "data": {
            "type": "mixed",
            "description": "any other data for organization"
          },
          "roles": {
            "type": "array",
            "description":"roles definition in app, it is used for creating role in organization",
            "items": {
              "type": "object",
              "properties":{
                "path":{"type":"string"},
                "display_name":{"type":"string"},
                "parent":{
                  "type":"string",
                  "description":"path of parent role, null or empty or no this property means no parent"
                },
                "data": {"type":"mixed"}
              }
            }
          },
          "operations": {
            "type": "array",
            "description":"operations definition in app, it is used for creating operation when install in organization",
            "items": {
              "type": "object",
              "properties":{
                "name":{"type":"string"},
                "display_name":{"type":"string"},
                "data": {"type":"mixed"},
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
              }
            }
          },
          "workflows": {
            "type": "object",
            "required": [
              "name"
            ],
            "properties": {
              "name": {
                "type": "string",
                "description": "workflow name, it is a unique name in organization"
              },
              "display_name": {
                "type": "string",
                "description": "workflow's display name"
              },
              "works":{
                "type":"array",
                "items":{
                  "type":"object",
                  "properties":{
                    "name": {
                      "type": "string",
                      "description": "work name, it is a unique name in workflow"
                    },
                    "display_name": {
                      "type": "string",
                      "description": "work's display name"
                    },
                    "operations":{
                      "type":"array",
                      "items":{
                        "type":"object",
                        "properties":{
                          "name": {
                            "type": "string",
                            "description": "name of operation"
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
                          "name": {
                            "type": "string",
                            "description": "name of workflow"
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
                "description": "any other data for workflow"
              }
            }
          }
        }
      }
    }
  }

  // Initialize our service with any options it requires
  //console.log('json model',Model.schema.obj);
  app.use('/appstore', Object.assign(createService(options),{docs: docs}));

  // Initialize our service with any options it requires
  //app.use('/appstore', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('appstore');

  service.hooks(hooks);
};
