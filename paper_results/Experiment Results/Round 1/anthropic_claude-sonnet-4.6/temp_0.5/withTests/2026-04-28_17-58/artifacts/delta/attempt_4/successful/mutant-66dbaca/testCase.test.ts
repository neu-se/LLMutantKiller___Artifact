import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('CommonJS module.exports compatibility', () => {
  it('should export Delta constructor directly via module.exports for CommonJS require() compatibility', () => {
    // The mutation removes `module.exports = Delta` inside `if (typeof module === 'object') {}`
    // Original: module.exports = Delta (the class itself, usable directly as constructor)
    // Mutated: module.exports not set to Delta, so require() returns the TS module namespace { default: Delta, ... }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // In original code, required IS the Delta class (module.exports = Delta)
    // So new required() works and produces a Delta instance with ops property
    // In mutated code, required is the module namespace object { default: Delta }
    // and new required() would fail or not produce a proper Delta instance

    const instance = new required();
    expect(instance).toBeInstanceOf(Delta);
    expect(instance.ops).toEqual([]);

    // Static methods should be directly accessible on required (not on required.default)
    expect(typeof required.registerEmbed).toBe('function');
    expect(typeof required.unregisterEmbed).toBe('function');
  });
});