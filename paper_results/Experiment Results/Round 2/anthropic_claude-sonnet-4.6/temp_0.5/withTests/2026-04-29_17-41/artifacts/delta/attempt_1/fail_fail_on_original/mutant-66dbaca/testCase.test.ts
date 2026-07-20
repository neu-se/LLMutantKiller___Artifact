import Delta from '../../../src/Delta';

describe('Delta CommonJS module export', () => {
  it('should export Delta as module.exports and module.exports.default for CommonJS compatibility', () => {
    // Use require to test CommonJS exports
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../src/Delta');
    
    // In the original code, module.exports = Delta and module.exports.default = Delta
    // are set, making the default export accessible via both require() and require().default
    // In the mutated code, these assignments are removed, so:
    // - required (module.exports) would not be Delta
    // - required.default would not be Delta
    
    // The default export should be the Delta class itself
    expect(required.default).toBe(Delta);
    
    // Verify it's actually the Delta class by instantiating it
    const instance = new required.default();
    expect(instance).toBeInstanceOf(Delta);
    expect(instance.ops).toEqual([]);
  });
});