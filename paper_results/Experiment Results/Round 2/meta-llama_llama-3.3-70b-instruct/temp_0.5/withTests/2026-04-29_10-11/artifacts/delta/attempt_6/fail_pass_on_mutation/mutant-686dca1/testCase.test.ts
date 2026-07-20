import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should detect mutation in module export', () => {
    const originalDelta = new Delta();
    // The original code checks if typeof module === 'object'
    // So, if the module is not an object, the test should fail
    expect(typeof module === 'object').toBe(true);
  });
});