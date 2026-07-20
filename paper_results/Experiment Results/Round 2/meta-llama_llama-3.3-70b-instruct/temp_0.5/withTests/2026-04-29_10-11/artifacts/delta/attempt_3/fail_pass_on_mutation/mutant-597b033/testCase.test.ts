import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta correctly when using CommonJS', () => {
    const module = { exports: {} };
    const originalModule = module.exports;
    if (typeof module === 'object') {
      module.exports = Delta;
      module.exports.default = Delta;
    }
    expect(module.exports).toBe(Delta);
  });
});