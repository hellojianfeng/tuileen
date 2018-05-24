// roles-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const roles = new Schema({
    name: { type: String, required: true }, 
    display_name: { type: String },
    path: { type: String, required: true }, //dot separated string, like admin.saleAdmin,unique in org
    parent: { type: Schema.Types.ObjectId }, //null or objectId
    org: {
      oid: { type: Schema.Types.ObjectId, required: true }
    },//must belong to one org
    data: { type: Schema.Types.Mixed }
  }, {
    timestamps: true
  });

  return mongooseClient.model('roles', roles);
};
