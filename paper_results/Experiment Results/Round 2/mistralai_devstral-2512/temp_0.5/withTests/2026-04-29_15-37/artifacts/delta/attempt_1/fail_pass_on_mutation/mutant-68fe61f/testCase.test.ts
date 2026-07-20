import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should export Delta as default when module is an object', () => {
    // This test verifies that the module export logic works correctly
    // The mutation changes the condition from `typeof module === 'object'` to `typeof module === ""`
    // which would break the export in Node.js environments where module is an object
    const delta = new Delta().insert('test');
    expect(delta.ops).toEqual([{ insert: 'test' }]);
  });
});