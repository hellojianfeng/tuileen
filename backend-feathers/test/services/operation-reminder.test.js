const assert = require('assert');
const app = require('../../src/app');

describe('\'operation-reminder\' service', () => {
  it('registered the service', () => {
    const service = app.service('operation-reminder');

    assert.ok(service, 'Registered the service');
  });
});
