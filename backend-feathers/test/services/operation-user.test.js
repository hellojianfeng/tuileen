const assert = require('assert');
const app = require('../../src/app');

describe('\'operation-user\' service', () => {
  it('registered the service', () => {
    const service = app.service('operation-user');

    assert.ok(service, 'Registered the service');
  });
});
