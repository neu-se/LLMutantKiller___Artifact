import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should create and verify Delta instance', () => {
    // This test verifies basic Delta functionality which depends on proper module export
    // The mutation changes the module export condition, which should break this behavior
    const delta = new Delta();
    delta.insert('test');
    expect(delta.ops).toEqual([{ insert: 'test' }]);

    // Verify Delta class properties exist
    expect(typeof Delta.Op).toBe('object');
    expect(typeof Delta.OpIterator).toBe('function');
    expect(typeof Delta.AttributeMap).toBe('function');
  });
});