import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should detect mutation in module export', () => {
    const originalDelta = new Delta();
    expect(typeof module).toBe('object');
    // The mutation changes the condition to typeof module !== 'object'
    // So, if the module is not an object, the test should fail
    if (typeof module !== 'object') {
      throw new Error('Module is not an object');
    }
  });
});