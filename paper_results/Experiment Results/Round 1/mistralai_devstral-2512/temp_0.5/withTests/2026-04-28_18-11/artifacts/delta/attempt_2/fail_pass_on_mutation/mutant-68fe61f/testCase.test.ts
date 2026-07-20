import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should have Delta available as default export in Node.js environment', () => {
    // This test verifies that Delta is properly exported as default in a Node.js environment
    // The mutation changes the module export condition, which should break this behavior
    const testDelta = new Delta().insert('test');
    expect(testDelta.ops).toEqual([{ insert: 'test' }]);
    // Verify that the default export exists and is the Delta class
    expect(typeof Delta).toBe('function');
    expect(Delta.name).toBe('Delta');
  });
});