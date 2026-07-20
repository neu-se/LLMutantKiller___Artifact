import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta export verification', () => {
  it('should be able to create and use Delta instances', () => {
    // Test basic functionality that would fail if exports were broken
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().insert('World');

    // Test composition which requires proper class methods
    const composed = delta1.compose(delta2);
    expect(composed.ops).toEqual([
      { insert: 'World' },
      { insert: 'Hello' }
    ]);

    // Test that static properties are accessible
    expect(Delta.Op).toBeDefined();
    expect(typeof Delta.Op.length).toBe('function');
  });
});