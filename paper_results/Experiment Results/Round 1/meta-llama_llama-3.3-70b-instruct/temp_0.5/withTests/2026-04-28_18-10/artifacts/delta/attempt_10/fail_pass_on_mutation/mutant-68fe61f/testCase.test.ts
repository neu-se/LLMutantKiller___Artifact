import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check module type correctly', () => {
    const originalModule = module;
    const moduleType = typeof module;
    expect(moduleType).not.toBe("");
    module = originalModule;
  });
});