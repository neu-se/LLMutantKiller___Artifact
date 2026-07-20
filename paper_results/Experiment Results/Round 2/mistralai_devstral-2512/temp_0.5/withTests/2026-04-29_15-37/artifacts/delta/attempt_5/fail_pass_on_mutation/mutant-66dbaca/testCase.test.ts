import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export', () => {
  it('should export Delta class with all static properties', () => {
    // Test that Delta is properly exported and has all expected static properties
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');

    // Test that we can create instances
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);

    // Test that static properties are accessible
    expect(Delta.Op).toBeDefined();
    expect(Delta.OpIterator).toBeDefined();
    expect(Delta.AttributeMap).toBeDefined();

    // Test basic functionality
    const testDelta = new Delta().insert('test');
    expect(testDelta.ops).toEqual([{ insert: 'test' }]);
  });
});