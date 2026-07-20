import Delta from '../Delta';

describe('Delta', () => {
  it('should export Delta as a module', () => {
    const originalModule = module;
    const originalExports = originalModule.exports;
    Delta;
    expect(originalModule.exports).not.toEqual(originalExports);
  });
});