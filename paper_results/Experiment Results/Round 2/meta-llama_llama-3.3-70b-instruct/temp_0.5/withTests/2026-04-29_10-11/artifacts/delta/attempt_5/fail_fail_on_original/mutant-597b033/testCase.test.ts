import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should only export Delta once when using CommonJS', () => {
    const module = { exports: {} };
    const originalModule = module.exports;
    if (typeof module === 'object') {
      module.exports = Delta;
      module.exports.default = Delta;
    }
    if (typeof module === 'object') {
      module.exports = Delta;
      module.exports.default = Delta;
    }
    expect(Object.keys(module.exports)).toEqual(['default']);
  });
});