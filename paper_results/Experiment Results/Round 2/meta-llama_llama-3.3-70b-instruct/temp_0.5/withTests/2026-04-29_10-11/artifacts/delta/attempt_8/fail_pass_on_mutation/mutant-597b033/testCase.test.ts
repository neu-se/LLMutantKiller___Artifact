import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta when typeof module is object', () => {
    const module = { exports: {} };
    if (typeof module === 'object') {
      module.exports = Delta;
    }
    expect(module.exports).toEqual(Delta);
  });
});