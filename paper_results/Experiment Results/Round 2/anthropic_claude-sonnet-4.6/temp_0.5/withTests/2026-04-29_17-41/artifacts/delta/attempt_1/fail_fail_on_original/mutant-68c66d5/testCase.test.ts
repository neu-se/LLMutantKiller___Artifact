import Delta from '../src/Delta';

describe('Delta CommonJS module export', () => {
  it('should be accessible via CommonJS require and module.exports should equal the Delta class', () => {
    // Use require to test CommonJS export behavior
    // In the original code: if (typeof module === 'object') { module.exports = Delta; module.exports.default = Delta; }
    // In the mutated code: if (false) { ... } - so module.exports is never set to Delta
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../src/Delta');
    
    // In the original, module.exports = Delta, so required should be the Delta constructor
    // In the mutated version, module.exports is never set, so required would be the default ES module export object
    // The key check: module.exports.default should be the Delta class
    expect(required.default).toBe(Delta);
    
    // Also verify that the required module itself is the Delta class (module.exports = Delta)
    // This should work in original but not in mutated version
    const instance = new required();
    expect(instance).toBeInstanceOf(Delta);
    expect(instance.ops).toEqual([]);
  });
});