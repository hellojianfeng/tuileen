
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { progressSchema } = require('./common-schemas');
    
    const progressSchema = new Schema({
      percentage: Number,
      processData: [{ type: processDataSchema }],
      data: {
        type: Schema.Types.Mixed
      }
    });
  
    return 
    { progressSchema }
  };
  