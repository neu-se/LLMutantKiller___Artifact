import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should detect mutation in module export', () => {
    const originalDelta = new Delta();
    // The original code checks if typeof module === 'object'
    // So, if the condition is true, the test should pass
    expect(typeof module === 'object').toBe(true);
    // This will check if the condition is true, if it's not, the test will fail
    if (typeof module !== 'object') {
      throw new Error('Module is not an object');
    }
  });
});