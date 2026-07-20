import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS export', () => {
  it('should export Delta as module.exports for CommonJS compatibility', () => {
    // In the original code, module.exports = Delta is set when typeof module === 'object'
    // (which is true in Node.js). With the mutation (typeof module !== 'object'),
    // module.exports would NOT be set, so require() would return the default module object
    // rather than the Delta class itself.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../subject_repositories/delta/src/Delta');
    
    // In the original code, module.exports = Delta, so required should be the Delta constructor
    // and required.default should also be Delta (set by module.exports.default = Delta)
    // With the mutation, module.exports is never set, so required would be the raw module
    // exports object (with just a 'default' property from the ES module interop)
    
    // The original sets module.exports = Delta (a function/class)
    // and module.exports.default = Delta
    // So required itself should be the Delta class (callable as a constructor)
    const instance = new required({ ops: [{ insert: 'hello' }] });
    expect(instance.ops).toEqual([{ insert: 'hello' }]);
    
    // Also verify that required is the Delta class itself
    expect(required).toBe(Delta);
  });
});