// appstore-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const operationStageDefinition = new Schema({
    name: { type: String }, //for example, ready, start, end, ....
    display_name: { type: String },
    start: { type: Schema.Types.Mixed }, //usually it is a expression for start
    end: { type: Schema.Types.Mixed },//usually it is a expression for start
    expire: { type: Schema.Types.Mixed },//usually it is a expression for start
    data: { type: Schema.Types.Mixed }
  });

  const roleDefinition = new Schema({
    path: { type: String },//format like admin.saleAdmin, it define admin and child saleAdmin, it is unique in org
    display_name: { type: String },
    data: { type: Schema.Types.Mixed }
  });

  const workSchema = new Schema({
    name: String, //in each workflow work name should be unique
    display_name: String,
    operations: [String],//operation name array, operation can from other app, but should in one org
    workflows: [String] //workflow name array
  });

  const workflowSchema = new Schema({
    name: String,//in each app, workflow name should be unique
    display_name: String,
    works: [workSchema],
    data: Schema.Types.Mixed
  });

  const appDefinition = new Schema({
    name: { type: String },
    display_name: { type: String },
    roles: [ { type: roleDefinition }],
    operations: [ { type: operationStageDefinition } ],//define of operations
    workflows: [ { type: workflowSchema }],
    data: { type: Schema.Types.Mixed }
  });

  const appstore = new Schema({
    definition: { type: appDefinition },
    installer: { 
      org: { oid: { type: Schema.Types.ObjectId }},
      data: { type: Schema.Types.Mixed }
    },
    creator: {
      org: { oid: { type: Schema.Types.ObjectId }},
      data: { type: Schema.Types.Mixed }
    },
    distributor: {
      org: { oid: { type: Schema.Types.ObjectId }},
      data: { type: Schema.Types.Mixed }
    },
    owner: {
      org: { oid: { type: Schema.Types.ObjectId }},
      data: { type: Schema.Types.Mixed }
    },
    data: { type: Schema.Types.Mixed }
  }, {
    timestamps: true
  });

  return mongooseClient.model('appstore', appstore);
};
