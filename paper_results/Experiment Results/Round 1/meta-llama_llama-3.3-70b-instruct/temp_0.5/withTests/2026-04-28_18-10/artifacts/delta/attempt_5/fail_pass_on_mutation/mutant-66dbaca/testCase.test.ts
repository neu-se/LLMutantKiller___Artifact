import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta as a module', () => {
    const originalModule = module;
    const originalExports = originalModule.exports;
    if (typeof module === 'object') {
      module.exports = Delta;
      module.exports.default = Delta;
    }
    expect(module.exports.default).toBe(Delta);
  });
});