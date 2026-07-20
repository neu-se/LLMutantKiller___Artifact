import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should only export Delta when using CommonJS', () => {
    const module = { exports: {} };
    if (typeof module !== 'object') {
      module.exports = Delta;
      module.exports.default = Delta;
    }
    expect(module.exports).toEqual({});
  });
});