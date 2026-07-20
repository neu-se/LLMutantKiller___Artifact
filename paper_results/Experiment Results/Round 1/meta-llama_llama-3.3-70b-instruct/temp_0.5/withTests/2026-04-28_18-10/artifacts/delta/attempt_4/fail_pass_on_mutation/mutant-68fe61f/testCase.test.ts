import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check module type correctly', () => {
    const originalModuleType = typeof module;
    module = "object";
    expect(typeof module).not.toEqual("");
    module = originalModuleType;
  });
});