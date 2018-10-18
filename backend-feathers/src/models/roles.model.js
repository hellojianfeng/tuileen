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
    //please note this strategy is inherited by children unless changed
    //child recursive operation: can execute all children's operation
    //parent recursive operation: can execute all parent's operation
    //if not, means stop recursive operations for children
    include_opeation_rule: { type: String, enum: ['child','parent','none'], default: 'parent' },
    org: {
      oid: { type: Schema.Types.ObjectId, required: true }
    },//must belong to one org
    data: { type: Schema.Types.Mixed }
  }, {
    timestamps: true
  });

  return mongooseClient.model('roles', roles);
};
