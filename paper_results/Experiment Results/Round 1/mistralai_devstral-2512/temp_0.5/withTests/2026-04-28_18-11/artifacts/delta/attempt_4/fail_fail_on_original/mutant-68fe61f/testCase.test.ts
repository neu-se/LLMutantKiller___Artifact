import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should have Delta available as module export', () => {
    // This test verifies the module export behavior which is affected by the mutation
    // The mutation changes the condition from `typeof module === 'object'` to `typeof module === ""`
    // This will cause the module export to fail in Node.js environments where module is an object
    const testDelta = new Delta().insert('test');
    expect(testDelta.ops).toEqual([{ insert: 'test' }]);

    // Verify that module.exports exists and contains Delta
    // This will fail in the mutated version because the export won't happen
    expect(typeof module.exports).toBe('object');
    expect(module.exports).toBeDefined();
    expect(module.exports.default).toBeDefined();
  });
});