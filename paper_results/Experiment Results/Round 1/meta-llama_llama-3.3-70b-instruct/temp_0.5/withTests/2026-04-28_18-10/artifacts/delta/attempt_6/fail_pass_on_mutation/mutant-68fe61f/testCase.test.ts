import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check module type correctly', () => {
    const originalModule = module;
    const originalModuleType = typeof module;
    expect(typeof module).toEqual('object');
    module = originalModule;
  });
});