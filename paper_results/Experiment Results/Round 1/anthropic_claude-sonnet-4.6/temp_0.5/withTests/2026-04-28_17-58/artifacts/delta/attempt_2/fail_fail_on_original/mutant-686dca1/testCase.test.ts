import Delta from '../../../src/Delta';

describe('Delta CommonJS module export', () => {
  it('should export Delta directly as module.exports so that require returns a callable constructor', () => {
    // The original code sets module.exports = Delta when typeof module === 'object' (true in Node.js)
    // The mutated code inverts the condition, so module.exports is NOT set in Node.js
    // This means require() returns different things:
    // - Original: returns Delta directly (a function/class)
    // - Mutated: returns the ES module namespace object (an object, not a function)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../src/Delta');

    // With original code: required is Delta itself (typeof === 'function')
    // With mutated code: required is a module namespace (typeof === 'object')
    expect(typeof required).toBe('function');

    // Additionally verify it's actually the Delta constructor by instantiating it
    const instance = new required();
    expect(instance).toBeInstanceOf(Delta);
    expect(instance.ops).toEqual([]);
  });
});