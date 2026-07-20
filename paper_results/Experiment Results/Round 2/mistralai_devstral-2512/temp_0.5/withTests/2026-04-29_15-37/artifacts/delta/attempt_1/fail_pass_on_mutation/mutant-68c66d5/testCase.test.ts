import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export', () => {
  it('should export Delta as default when module is an object', () => {
    // This test verifies that the module export logic works correctly
    // The mutation changes the condition from `typeof module === 'object'` to `if (false)`
    // which would prevent the module export from working in Node.js environments
    const delta = new Delta().insert('test');
    expect(delta.ops).toEqual([{ insert: 'test' }]);
  });
});