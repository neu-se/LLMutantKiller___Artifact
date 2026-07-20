import Delta from '../../src/Delta';

describe('Delta module export', () => {
  it('module.exports should be the Delta constructor for CommonJS require compatibility', () => {
    // The original code sets module.exports = Delta, making require() return Delta directly
    // The mutated code removes this, so require() returns the TS module object instead
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../src/Delta');
    
    // With original code: module.exports = Delta, so required === Delta class
    // With mutated code: module.exports is the TS exports object, required.default === Delta
    // but required itself is NOT the Delta constructor
    expect(typeof required).toBe('function');
    expect(required.name).toBe('Delta');
    
    // Should be able to instantiate directly
    const instance = new required();
    expect(instance.ops).toEqual([]);
  });
});