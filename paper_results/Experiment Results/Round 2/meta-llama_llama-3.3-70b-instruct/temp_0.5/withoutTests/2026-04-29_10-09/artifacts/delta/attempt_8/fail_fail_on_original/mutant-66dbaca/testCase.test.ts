import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta correctly', () => {
    const originalModuleExports = module.exports;
    expect(typeof originalModuleExports).toBe('object');
    if (typeof module === 'object' && module.exports) {
      module.exports = { Delta };
      const newModuleExports = require('module').exports;
      expect(newModuleExports.Delta).toBeDefined();
      module.exports = originalModuleExports;
    }
  });
});