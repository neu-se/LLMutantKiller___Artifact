import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export structure', () => {
  it('should have proper export structure', () => {
    // Test that Delta is properly exported
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');

    // Test that we can create instances
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);

    // Test that the constructor works with different inputs
    const delta1 = new Delta([{ insert: 'test' }]);
    expect(delta1.ops).toEqual([{ insert: 'test' }]);

    const delta2 = new Delta({ ops: [{ insert: 'test' }] });
    expect(delta2.ops).toEqual([{ insert: 'test' }]);

    // Test that static properties are accessible
    expect(Delta.Op).toBeDefined();
    expect(Delta.OpIterator).toBeDefined();
    expect(Delta.AttributeMap).toBeDefined();
  });
});