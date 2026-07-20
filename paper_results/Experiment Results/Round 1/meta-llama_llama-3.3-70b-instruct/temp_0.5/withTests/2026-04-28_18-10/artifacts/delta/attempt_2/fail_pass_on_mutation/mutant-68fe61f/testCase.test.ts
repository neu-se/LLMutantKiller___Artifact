import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not throw an error when checking module type', () => {
    const originalModuleType = typeof module;
    module = "";
    expect(() => {
      if (typeof module === 'object') {}
    }).not.toThrowError();
    module = originalModuleType;
  });
});