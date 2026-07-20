import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not export Delta when typeof module is not an object with exports property', () => {
    const module = {};
    if (typeof module === 'object' && !module.exports) {
      module.exports = Delta;
    }
    expect(module.exports).toBeUndefined();
  });
});