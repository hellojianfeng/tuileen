const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const createOrgRoles = require('../../src/hooks/create-org-roles');

describe('\'create-org-roles\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      get(id) {
        return Promise.resolve({ id });
      }
    });

    app.service('dummy').hooks({
      after: createOrgRoles()
    });
  });

  it('runs the hook', () => {
    return app.service('dummy').get('test').then(result => {
      assert.deepEqual(result, { id: 'test' });
    });
  });
});
