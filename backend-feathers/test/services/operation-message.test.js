const assert = require('assert');
const app = require('../../src/app');

describe('\'operation-message\' service', () => {
  it('registered the service', () => {
    const service = app.service('operation-message');

    assert.ok(service, 'Registered the service');
  });
});
