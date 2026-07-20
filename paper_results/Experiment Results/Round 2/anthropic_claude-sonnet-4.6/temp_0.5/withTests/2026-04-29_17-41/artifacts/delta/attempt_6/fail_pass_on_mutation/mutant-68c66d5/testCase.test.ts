import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS module export', () => {
  it('module.exports.default should be explicitly set to the Delta class', () => {
    // Use a fresh require with cache busting to get the raw module.exports
    // Delete from cache to force re-evaluation
    const modulePath = require.resolve('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');
    delete require.cache[modulePath];
    
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');
    
    // In original: module.exports = Delta, module.exports.default = Delta
    // required.default === Delta (the class)
    // In mutated: if(false) so neither line runs
    // required.default may be undefined or the ES module default
    
    // Create an instance using required.default to verify it's the actual Delta class
    const instance = new required.default({ ops: [{ insert: 'test' }] });
    expect(instance.ops).toEqual([{ insert: 'test' }]);
    
    // In original, required.default === required (both are Delta)
    // In mutated, required is the exports namespace object, required.default is Delta
    // So required.default.Op should exist in both, but required.Op only in original
    expect(required.Op).toBeDefined();
    expect(required.Op).toBe(required.default.Op);
  });
});