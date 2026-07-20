import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should correctly export Delta when module is an object', () => {
    // This test verifies the module export logic by checking if Delta is properly exported
    // The mutation changes the condition from `typeof module === 'object'` to `typeof module === ""`
    // which would prevent the module export in Node.js environments
    expect(typeof Delta).toBe('function');
    const delta = new Delta().insert('test');
    expect(delta.ops).toEqual([{ insert: 'test' }]);
  });
});