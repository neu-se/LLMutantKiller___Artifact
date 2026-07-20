import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta correctly', () => {
    if (typeof module === 'object' && module.exports) {
      expect('default' in module.exports).toBe(true);
      expect(module.exports.default).toBe(Delta);
    }
  });
});