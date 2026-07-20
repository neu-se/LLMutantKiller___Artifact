import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export', () => {
  it('module.exports.default should explicitly equal the Delta class', () => {
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // Original code explicitly sets module.exports.default = Delta
    // after setting module.exports = Delta
    // Without this explicit assignment, required.default would be undefined
    // because module.exports was replaced with the Delta function (not an object with .default)
    // Only the original code restores .default on the new module.exports
    expect(required.default).toBe(Delta);
    
    const instance = new required.default();
    expect(instance).toBeInstanceOf(Delta);
    expect(instance.ops).toEqual([]);
  });
});