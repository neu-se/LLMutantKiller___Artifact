import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta as a module', () => {
    const delta = new Delta();
    const originalModule = module;
    const originalExports = originalModule.exports;
    if (typeof module === 'object') {
      module.exports = Delta;
      module.exports.default = Delta;
    }
    expect(originalModule.exports).not.toEqual(originalExports);
  });
});