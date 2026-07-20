import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta correctly', () => {
    if (typeof module === 'object') {
      expect(module.exports).toHaveProperty('default');
      expect(module.exports.default).toBe(Delta);
    }
  });
});