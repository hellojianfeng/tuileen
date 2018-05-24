// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');

  const userRole = new Schema({
    path: { type: String }, //for example, ready, start, end, ....
    oid: { type: Schema.Types.ObjectId },
    org: { 
      oid: { type: Schema.Types.ObjectId },
      name: { type: String }
    }
});

  const users = new mongooseClient.Schema({
  
    email: {type: String, unique: true},
    mobile: {
      number: String,//null or unique
      verified: { type: Boolean, default: false },
      data: {
        type: Schema.Types.Mixed
      }
     }, 
    userid: {type: String }, //null or unique
    roles: [ { type: userRole }],
    password: { type: String },
  
  
    auth0Id: { type: String },
  
    googleId: { type: String },
  
    facebookId: { type: String },
  
    githubId: { type: String },
  
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
