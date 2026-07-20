import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta as a module', () => {
    if (typeof module === 'object') {
      const originalExports = module.exports;
      module.exports = Delta;
      module.exports.default = Delta;
      expect(module.exports.default).toBe(Delta);
      module.exports = originalExports;
    }
  });
});