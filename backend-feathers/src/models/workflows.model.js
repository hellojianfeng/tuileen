// workflows-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const workSchema = new Schema({
    name: String, //in each workflow work name should be unique
    display_name: String,
    description: String,
    org: {
      oid: { type: Schema.Types.ObjectId, required: true } //must belong to org
    },
    app: { 
      oid: {type: Schema.Types.ObjectId, required: true}  
    },
    operations: [ { type: Schema.Types.ObjectId }],//sub operations
    workflows: [ { type: Schema.Types.ObjectId }] //sub workflows
  }); 

  const workflows = new Schema({
    name: { type: String, required: true },
    display_name: { type: String },
    description: { type: String },
    works: [ workSchema ]
  }, {
    timestamps: true
  });

  return mongooseClient.model('workflows', workflows);
};
