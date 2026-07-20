import Delta from '../../../src/Delta';

describe('Delta module exports', () => {
  it('should be importable and usable as a constructor, with module.exports set correctly for CommonJS compatibility', () => {
    // In the original code, the block `if (typeof module === 'object') { module.exports = Delta; }`
    // ensures that in a CommonJS environment, require('delta') returns Delta directly.
    // With the mutation (`!== 'object'`), this block is skipped in Node.js (where module IS an object),
    // meaning module.exports is NOT set to Delta.
    //
    // We can detect this by requiring the compiled output directly via require(),
    // which uses the CommonJS path and would return different values.
    
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../src/Delta');
    
    // In the original: module.exports = Delta, so required === Delta (the constructor)
    // In the mutated: module.exports is NOT set, so required is the module namespace object
    // with a 'default' property, not the Delta constructor itself.
    
    // The Delta constructor should be callable directly when required via CommonJS
    const DeltaFromRequire = required.default !== undefined ? required.default : required;
    
    // With original code: required itself is Delta (a function/class)
    // With mutated code: required is a module namespace, not Delta directly
    expect(typeof required).toBe('function');
    
    // Also verify it works as a constructor
    const delta = new required();
    expect(delta).toBeInstanceOf(Delta);
    expect(delta.ops).toEqual([]);
  });
});