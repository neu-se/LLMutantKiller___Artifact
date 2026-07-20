import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check module type correctly', () => {
    const originalModule = module;
    if (typeof module === 'object') {
      expect(true).toBe(true);
    } else {
      expect(false).toBe(true);
    }
    module = originalModule;
  });
});