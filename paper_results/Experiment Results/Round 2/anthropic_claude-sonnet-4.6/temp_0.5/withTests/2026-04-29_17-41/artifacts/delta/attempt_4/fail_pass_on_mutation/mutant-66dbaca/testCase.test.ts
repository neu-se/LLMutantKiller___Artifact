import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export', () => {
  it('module.exports should be set to Delta for CommonJS compatibility', () => {
    // The original code sets module.exports = Delta and module.exports.default = Delta
    // The mutated code has an empty if block, so these assignments are skipped
    // When required via CommonJS, module.exports.default should be the Delta class
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // With original code: module.exports.default = Delta is explicitly set
    // With mutated code: the assignment is removed, so .default may be undefined or different
    expect(required.default).toBeDefined();
    expect(required.default).toBe(Delta);

    // Verify we can use it as a constructor
    const instance = new required.default([{ insert: 'hello' }]);
    expect(instance.ops).toEqual([{ insert: 'hello' }]);
  });
});