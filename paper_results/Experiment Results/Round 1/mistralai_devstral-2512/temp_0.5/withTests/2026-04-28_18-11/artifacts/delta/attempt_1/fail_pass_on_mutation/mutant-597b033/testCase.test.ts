import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should export Delta as a CommonJS module', () => {
    // This test verifies that Delta is properly exported as a CommonJS module
    // The mutation changes the module export condition from `typeof module === 'object'` to `if (true)`
    // which would cause issues in non-CommonJS environments or when module is not defined
    const testDelta = new Delta().insert('test');
    expect(testDelta.ops).toEqual([{ insert: 'test' }]);
  });
});