import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta correctly when using CommonJS', () => {
    const module = { exports: {} };
    const originalModule = module.exports;
    Delta;
    expect(module.exports).not.toBe(originalModule);
  });
});