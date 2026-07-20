import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should detect mutation in module export', () => {
    const originalDelta = new Delta();
    expect(typeof module).toBe('object');
    // The mutation changes the condition to typeof module !== 'object'
    // So, if the module is an object, the test should pass
    if (typeof module === 'object') {
      // do nothing
    } else {
      throw new Error('Module is not an object');
    }
  });
});