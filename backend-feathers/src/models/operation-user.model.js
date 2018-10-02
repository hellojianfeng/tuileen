// operation-user-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const operationUser = new Schema({
    operation: { 
      oid: { type: Schema.Types.ObjectId },
      data: { type: Schema.Types.Mixed }
    },
    user: {
      oid: { type: Schema.Types.ObjectId },
      data: { type: Schema.Types.Mixed }
    },
    progress: { type: Number }, //percentage value
    data: { type: Schema.Types.Mixed }
  }, {
    timestamps: true
  });

  return mongooseClient.model('operationUser', operationUser);
};
