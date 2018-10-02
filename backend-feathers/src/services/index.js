const orgs = require('./orgs/orgs.service.js');
const users = require('./users/users.service.js');
const operations = require('./operations/operations.service.js');
const roles = require('./roles/roles.service.js');
const appstore = require('./appstore/appstore.service.js');
const workflows = require('./workflows/workflows.service.js');
const operationMessage = require('./operation-message/operation-message.service.js');
const operationReminder = require('./operation-reminder/operation-reminder.service.js');
const operationUser = require('./operation-user/operation-user.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(orgs);
  app.configure(users);
  app.configure(operations);
  app.configure(roles);
  app.configure(appstore);
  app.configure(workflows);
  app.configure(operationMessage);
  app.configure(operationReminder);
  app.configure(operationUser);
};
