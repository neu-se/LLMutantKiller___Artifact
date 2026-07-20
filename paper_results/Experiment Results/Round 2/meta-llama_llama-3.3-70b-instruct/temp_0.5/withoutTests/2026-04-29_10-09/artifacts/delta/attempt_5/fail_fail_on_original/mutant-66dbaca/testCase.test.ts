import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta correctly', () => {
    if (typeof module === 'object' && module.exports) {
      expect(Object.keys(module.exports)).toContain('default');
      expect(module.exports.default).toBe(Delta);
    }
  });
});