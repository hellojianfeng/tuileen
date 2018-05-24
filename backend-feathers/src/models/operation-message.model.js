// operation-alert-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const operationMessage = new Schema({
    name: { type: String },
    title: { type: String },
    description: { type: String },
    contents: [ { type: Schema.Types.Mixed } ],
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
      operation: {
        oid: { type: Schema.Types.ObjectId },
        user: {
          oid: { type: Schema.Types.ObjectId },
          data: { type: Schema.Types.Mixed }
        },
        data: { type: Schema.Types.Mixed }
      },
      data: { type: Schema.Types.Mixed }
    },
    reminders: { //define reminders for message
      levels: { //level will be populated by client base on levels
        urgent: { type: String },//for example: now - alert_time < 1d(1h,1m)
        warn: { type: String },
        info: { type: String }
      },//urgent, warn, info or other
      items: [
        {
          start: {
            time: { type: Schema.Types.Date },
            expression: { type: String } //like alert_time - 5d(before alert time 5 days )
          },
          end: { 
            time: { type: Schema.Types.Date },
            expression: { type: String } //like alert_time - 5d(before alert for time 5 days )
          },
          interval:{
            period: { type: String }, //year(y), month(m), week(w), day(d), hour(h), minute(m), second(s), milisecond(ms),
            number: { type: Number }, //times to divid from start to end
          },
          repeat: {
            period: { type: String }, //year(y), month(m), week(w), day(d), hour(h), minute(m), second(s), milisecond(ms),
            number: { type: Number }, //times to repeat
          },
          level: String, //one of levels, if not specify, will populate from levels
          data: { type: Schema.Types.Mixed }, 
        }
      ],
    },
    data: { type: Schema.Types.Mixed }
  }, {
    timestamps: true
  });

  return mongooseClient.model('operationMessage', operationMessage);
};
