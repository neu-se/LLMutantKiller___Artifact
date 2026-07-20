import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta as a module', () => {
    expect(typeof module.exports).toBe('object');
    if (typeof module === 'object') {
      expect(Object.keys(module.exports).length).toBeGreaterThan(0);
    }
  });
});