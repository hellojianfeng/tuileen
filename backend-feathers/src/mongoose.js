const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

module.exports = function (app) {
  mongoose.connect(app.get('mongodb'), {});
  mongoose.Promise = global.Promise;
  mongoose.plugin(toJson);

  app.set('mongooseClient', mongoose);
};
