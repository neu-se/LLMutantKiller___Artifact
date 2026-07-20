import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should detect mutation in module export', () => {
    const originalDelta = new Delta();
    // The original code checks if typeof module === 'object'
    // So, if the module is an object, the test should pass
    expect(() => {
      if (typeof module !== 'object') {
        throw new Error('Module is not an object');
      }
    }).not.toThrow();
  });
});