import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta as a module', () => {
    if (typeof module === 'object' && module.exports) {
      const originalModule = module;
      const originalExports = { ...module.exports };
      const delta = new Delta();
      expect(module.exports).toHaveProperty('default');
      expect(module.exports.default).toBe(Delta);
      module.exports = originalExports;
    }
  });
});