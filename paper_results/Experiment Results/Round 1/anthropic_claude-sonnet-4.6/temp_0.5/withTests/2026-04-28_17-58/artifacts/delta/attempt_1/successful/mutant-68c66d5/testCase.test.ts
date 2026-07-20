import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('CommonJS module.exports compatibility', () => {
  it('should export Delta as module.exports for CommonJS require compatibility', () => {
    // The original code sets module.exports = Delta when typeof module === 'object'
    // The mutation changes this to `if (false)`, so module.exports is never set
    // We can detect this by requiring the compiled output or by checking the behavior
    // of the module system. Since we're in a Node.js environment, we can use require().
    
    // Use require to load the module - this tests the CommonJS export path
    // which relies on `module.exports = Delta` being executed
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../subject_repositories/delta/src/Delta');
    
    // In the original code, module.exports = Delta is set, so requiring the module
    // should give us the Delta class directly (or an object with default property)
    // The key test: module.exports.default should equal the Delta class
    // AND the required module itself should be usable as a constructor
    
    // With the original code: module.exports = Delta AND module.exports.default = Delta
    // With the mutated code: only the ES module default export works, module.exports is not set to Delta
    
    // Check that module.exports.default is set (this is set by `module.exports.default = Delta`)
    // Both lines are inside the if block, so with mutation both are skipped
    expect(required.default).toBe(Delta);
    
    // Also verify that the required module itself is the Delta constructor
    // (module.exports = Delta makes the module itself callable as a constructor)
    const instance = new required({ ops: [{ insert: 'hello' }] });
    expect(instance).toBeInstanceOf(Delta);
    expect(instance.ops).toEqual([{ insert: 'hello' }]);
  });
});