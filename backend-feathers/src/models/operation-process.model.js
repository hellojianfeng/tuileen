// operation-processing-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
/**
 * operation-processing save data for processing operation, usages for the model:
 * 1) once process reach 100, then means process operation is done, progress is 0, means start
 * 2) processing operation will list in user's operation list, meanwhile, ready operation will
 * also list for user to process
 * 3) when operation is belong to workflow, once processing operation is done(processing operation progress 
 * is 100%), it will call back to operation, if all processing-operation is done and operation is done(
 * operation progress in 100%), operation will call back to work(workflow item), then work will determine
 * to start next operation(set next operation is ready), if operation is ready, then all users under that 
 * operation can access that operation and then can start that operation, once operation is start by someon
 * , then that operation is added into this operation-process table
 */
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const operationProcessing = new Schema({
    operation: { 
      oid: { type: Schema.Types.ObjectId },
      data: { type: Schema.Types.Mixed }
    },
    user: {
      oid: { type: Schema.Types.ObjectId },
      data: { type: Schema.Types.Mixed }
    },
    progress: { type: progressSchema }, //percentage value
    data: { type: Schema.Types.Mixed },
  }, {
    timestamps: true
  });

  return mongooseClient.model('operationProcessing', operationProcessing);
};
