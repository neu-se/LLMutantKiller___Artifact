import Delta from '../../../src/Delta';

describe('CommonJS module.exports compatibility', () => {
  it('should export Delta as module.exports for CommonJS require() compatibility', () => {
    // The mutation removes the module.exports assignment inside `if (typeof module === 'object') {}`
    // This tests that the CommonJS export is properly set so that require() returns Delta directly
    // We verify this by checking that the module.exports assignment was made by requiring the compiled dist file
    // Since we're in a Node.js environment where typeof module === 'object', the original code sets
    // module.exports = Delta, making require() return Delta directly (not { default: Delta })
    
    // Use require to load the compiled module - this tests the CommonJS export path
    // The dist file must exist (built from src)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../src/Delta');
    
    // In the original code: module.exports = Delta, so required should be the Delta constructor
    // In the mutated code: module.exports is NOT set, so required would be { default: Delta } (the ES module interop object)
    // The original sets module.exports = Delta directly, meaning required === Delta class
    // We can verify by checking that required itself (or required.default) is the Delta class
    // and that required can be used as a constructor directly
    
    // Original: module.exports = Delta, so `required` IS the Delta class
    // Mutated: module.exports not set, so `required` is the module namespace object with a `default` property
    
    // Check that the required value is the Delta constructor (callable as new required())
    const instance = new required();
    expect(instance).toBeInstanceOf(Delta);
    expect(instance.ops).toEqual([]);
    
    // Also verify that required has static members directly (not nested under .default)
    expect(typeof required.registerEmbed).toBe('function');
    expect(typeof required.unregisterEmbed).toBe('function');
  });
});