import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta correctly', () => {
    if (typeof module === 'object' && module.exports) {
      expect(module.exports.Delta).toBeDefined();
      expect(module.exports.Delta).toBe(Delta);
    }
  });
});