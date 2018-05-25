// operations-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { progressSchema } = require('./common.schemas')(app);

  const operationRole = new Schema({
    oid: { type: Schema.Types.ObjectId },
    include: {
      roles: [ { type: String } ],//array of role path
      recursive_roles: [ { type: String } ],//array of role path
      children: { type: String, enum: ['recursive','true','false'] },
      parent: { type: String, enum: ['recursive','true','false'] },
    },
    exclude: {
      roles: [ { type: String } ],//array of role path
      recursive_roles: [ { type: String } ],//array of role path
      children: { type: String, enum: ['recursive','true','false'] },
      parent: { type: String, enum: ['recursive','true','false'] },
    },
    data: { type: Schema.Types.Mixed }
  });

  const operationStage = new Schema({
    name: { type: String }, //for example, ready, start, end, ....
    display_name: { type: String },
    start: { type: Schema.Types.Mixed }, //usually it is a expression for start
    end: { type: Schema.Types.Mixed },//usually it is a expression for start
    expire: { type: Schema.Types.Mixed },//usually it is a expression for start
    data: { type: Schema.Types.Mixed }
});

  const operations = new Schema({
    name: { type: String, required: true },
    display_name: { type: String },
    appid: { type: Schema.Types.ObjectId, required: true  },
    org: { type: Schema.Types.ObjectId, required: true  },
    roles: [ operationRole ],
    concurrent: { type: Number },
    allow_concurrent:{ type: Number },
    stages: [ operationStage ],
    progress: progressSchema , //percentage value
  }, {
    timestamps: true
  });

  return mongooseClient.model('operations', operations);
};
