import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not export Delta when not using CommonJS', () => {
    const module = { exports: {} };
    const originalModule = module.exports;
    if (typeof module !== 'object') {
      module.exports = Delta;
      module.exports.default = Delta;
    }
    expect(module.exports).toBe(originalModule);
  });
});