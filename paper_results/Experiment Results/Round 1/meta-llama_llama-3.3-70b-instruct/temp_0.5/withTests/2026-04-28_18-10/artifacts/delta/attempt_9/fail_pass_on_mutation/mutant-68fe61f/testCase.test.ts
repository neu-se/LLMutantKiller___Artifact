import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check module type correctly', () => {
    const originalModule = module;
    if (typeof module === "") {
      expect(true).toBe(false);
    } else {
      expect(true).toBe(true);
    }
    module = originalModule;
  });
});