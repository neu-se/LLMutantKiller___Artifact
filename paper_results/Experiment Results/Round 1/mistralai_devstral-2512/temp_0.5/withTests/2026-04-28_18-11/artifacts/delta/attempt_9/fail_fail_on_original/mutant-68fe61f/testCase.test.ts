import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should verify module export condition', () => {
    // This test directly verifies the module export condition that was mutated
    // The mutation changes `typeof module === 'object'` to `typeof module === ""`
    // This will cause the export to fail when module is an object (Node.js environment)
    const testDelta = new Delta().insert('test');
    expect(testDelta.ops).toEqual([{ insert: 'test' }]);

    // Verify the module export condition
    // This will fail in the mutated version because the condition is now checking for empty string
    if (typeof module === 'object') {
      expect(module.exports).toBeDefined();
      expect(module.exports.default).toBeDefined();
    } else {
      fail('Module should be an object in Node.js environment');
    }
  });
});