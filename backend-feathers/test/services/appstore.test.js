const assert = require('assert');
const app = require('../../src/app');

describe('\'appstore\' service', () => {
  it('registered the service', () => {
    const service = app.service('appstore');

    assert.ok(service, 'Registered the service');
  });
});
