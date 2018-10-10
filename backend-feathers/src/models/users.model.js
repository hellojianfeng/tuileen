// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const userRole = new Schema({
    oid: { type: Schema.Types.ObjectId },
    org: { 
      oid: { type: Schema.Types.ObjectId },
      name: { type: String }
    }
});

  const users = new mongooseClient.Schema({
  
    email: {
      address: String,//null or unique
      isVerified: { type: Boolean, default: false },
      data: {
        type: Schema.Types.Mixed
      }
    },
    mobile: {
      number: String,//null or unique
      isVerified: { type: Boolean, default: false },
      data: {
        type: Schema.Types.Mixed
      }
     }, 
    username: { type: String }, //unique, if not provide, will generate automatically
    surname: { type: String },
    familyname: { type:String },
    roles: [ { type: userRole }],
    password: { type: String },
    salt: { type: String },
  
    auth0Id: { type: String },
  
    googleId: { type: String },
  
    facebookId: { type: String },
  
    githubId: { type: String },
  
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
