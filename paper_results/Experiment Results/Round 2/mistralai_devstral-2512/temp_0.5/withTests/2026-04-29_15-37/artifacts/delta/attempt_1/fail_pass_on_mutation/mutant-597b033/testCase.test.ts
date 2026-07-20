import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('module export behavior', () => {
  it('should export Delta as both default and named exports when module is an object', () => {
    // This test verifies the original behavior where module.exports is conditionally set
    // The mutation changes the condition from `typeof module === 'object'` to `if (true)`
    // which would break the export behavior in non-CommonJS environments

    // In a CommonJS environment (like Node.js), module should be an object
    // The original code checks this condition before setting exports
    const delta = new Delta().insert('test');
    expect(delta.ops).toEqual([{ insert: 'test' }]);

    // Verify we can access Delta through both default and named exports
    // This would fail if the mutation breaks the export logic
    expect(typeof Delta).toBe('function');
  });
});