import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export verification', () => {
  it('should have Delta available as default export', () => {
    // This test verifies the module exports work correctly
    const testDelta = new Delta().insert('test');
    expect(testDelta.ops).toEqual([{ insert: 'test' }]);

    // Also verify the static properties are accessible
    expect(Delta.Op).toBeDefined();
    expect(Delta.OpIterator).toBeDefined();
    expect(Delta.AttributeMap).toBeDefined();
  });
});