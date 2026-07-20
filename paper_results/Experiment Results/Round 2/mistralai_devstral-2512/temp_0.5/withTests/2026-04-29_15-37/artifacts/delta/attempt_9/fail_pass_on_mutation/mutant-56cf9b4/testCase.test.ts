import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with delete operation', () => {
  it('should correctly invert delete operation and verify the inverted delta structure', () => {
    const delta = new Delta().delete(2);
    const base = new Delta().insert('123456');
    const inverted = delta.invert(base);
    // This test specifically checks the structure of the inverted delta
    // The mutation changes the condition from checking op.retain && op.attributes to always true
    // which would cause incorrect behavior when inverting delete operations
    expect(inverted.ops).toEqual([{ insert: '12' }]);
    expect(inverted.ops[0]).toHaveProperty('insert');
    expect(inverted.ops[0].insert).toBe('12');
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});