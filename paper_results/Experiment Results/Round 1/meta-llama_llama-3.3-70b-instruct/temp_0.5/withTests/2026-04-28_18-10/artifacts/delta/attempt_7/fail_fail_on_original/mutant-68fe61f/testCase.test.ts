import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check module type correctly', () => {
    const originalModule = module;
    const originalModuleType = typeof module;
    if (typeof module!== "") {
      throw new Error("Module type is not empty string");
    }
    module = originalModule;
  });
});