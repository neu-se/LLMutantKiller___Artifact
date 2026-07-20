import Delta from '../../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS module export', () => {
  it('should export Delta as module.exports.default for CommonJS compatibility', () => {
    // Use require to test CommonJS exports - the original code sets:
    // module.exports = Delta
    // module.exports.default = Delta
    // The mutated code removes these assignments, so module.exports.default won't be Delta
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // In the original code, module.exports.default = Delta is set explicitly
    // In the mutated code, this assignment is removed
    // The ES module default export compiled by TypeScript sets module.exports.default
    // but the explicit assignment in the original ensures it's the Delta class
    expect(typeof required.default).toBe('function');
    expect(required.default.name).toBe('Delta');

    // Verify it's actually the Delta class by instantiating it and checking behavior
    const instance = new required.default();
    expect(instance.ops).toEqual([]);
    expect(instance).toBeInstanceOf(Delta);
  });
});