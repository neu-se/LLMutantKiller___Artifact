import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should only export Delta when typeof module is object', () => {
    const module = { exports: {} };
    const originalExports = JSON.stringify(module.exports);
    if (typeof module === 'object') {
      module.exports = Delta;
      module.exports.default = Delta;
    }
    expect(JSON.stringify(module.exports)).toEqual(originalExports);
  });
});