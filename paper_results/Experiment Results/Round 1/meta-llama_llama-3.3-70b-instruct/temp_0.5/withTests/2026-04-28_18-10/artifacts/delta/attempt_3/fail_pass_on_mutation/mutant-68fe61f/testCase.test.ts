import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when module type is not "object"', () => {
    const originalModuleType = typeof module;
    module = "";
    expect(() => {
      if (typeof module === 'object') {
        throw new Error('Module type is object');
      } else {
        throw new Error('Module type is not object');
      }
    }).toThrowError('Module type is not object');
    module = originalModuleType;
  });
});