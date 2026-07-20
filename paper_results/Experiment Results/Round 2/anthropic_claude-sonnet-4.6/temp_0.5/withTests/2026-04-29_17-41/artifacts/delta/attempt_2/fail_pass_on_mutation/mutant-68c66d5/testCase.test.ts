import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS module export', () => {
  it('should export Delta as module.exports so that require() returns the Delta constructor directly', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');
    
    // In the original code: if (typeof module === 'object') { module.exports = Delta; module.exports.default = Delta; }
    // This means required.default should be the Delta class
    // In the mutated code: if (false) { ... } - module.exports is never reassigned,
    // so required.default would be undefined (only the ES module default export exists)
    
    expect(required.default).toBe(Delta);
    
    // Verify the default export is actually the Delta class by instantiating it
    const instance = new required.default();
    expect(instance.ops).toEqual([]);
  });
});