// operation-alert-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const operationReminder = new Schema({
    name: { type: String },
    title: { type: String },
    description: { type: String },
    contents: [ { type: Schema.Types.Mixed } ],
    remind_start_time: { type: Schema.Types.Date },
    remind_end_time: { type: Schema.Types.Date },
    type: { 
      type: String,
      data: { type: Schema.Types.Mixed }
    },
    tags: String,
    level: String,
    to: {
      operations: [
        { 
          oid: { type: Schema.Types.ObjectId },
          scope: { type: String, enum: ['operation', 'users'], default: 'operation' },
          users: {
            ids: [],
          },
          data: { type: Schema.Types.Mixed }
        }
      ], 
    },
    from: {
      operation: [
        { 
          oid: { type: Schema.Types.ObjectId },
          user: {
            oid: { type: Schema.Types.ObjectId },
            data: { type: Schema.Types.Mixed }
          },
          data: { type: Schema.Types.Mixed }
        }
      ], 
    },
    data: { type: Schema.Types.Mixed }
  }, {
    timestamps: true
  });

  return mongooseClient.model('operationReminder', operationReminder);
};
