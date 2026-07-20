import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check module type correctly', () => {
    const originalModule = module;
    const originalModuleType = typeof module;
    module = {};
    expect(typeof module).toEqual('object');
    module = originalModule;
    expect(typeof module).toEqual(originalModuleType);
  });
});