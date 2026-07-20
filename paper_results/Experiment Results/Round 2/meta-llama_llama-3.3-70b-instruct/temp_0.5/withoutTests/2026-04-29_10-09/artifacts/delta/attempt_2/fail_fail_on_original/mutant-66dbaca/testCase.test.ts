import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta correctly as a module', () => {
    expect(typeof module.exports).toBe('object');
    expect(module.exports).toHaveProperty('default');
    expect(module.exports.default).toBe(Delta);
  });
});