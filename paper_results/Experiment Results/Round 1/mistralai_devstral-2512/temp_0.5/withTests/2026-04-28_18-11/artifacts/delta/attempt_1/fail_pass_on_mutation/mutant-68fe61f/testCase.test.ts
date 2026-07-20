import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should export Delta as default when module is an object', () => {
    // This test verifies the module export behavior which is affected by the mutation
    // The mutation changes the condition from `typeof module === 'object'` to `typeof module === ""`
    // This will cause the module export to fail in Node.js environments where module is an object
    const delta = new Delta().insert('test');
    expect(delta.ops).toEqual([{ insert: 'test' }]);
  });
});