import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with delete operation', () => {
  it('should correctly invert delete operation and verify no attributes are added', () => {
    const delta = new Delta().delete(1);
    const base = new Delta().insert('abc');
    const inverted = delta.invert(base);
    // The mutation changes the condition from checking op.retain && op.attributes to always true
    // This test verifies that delete operations don't incorrectly add attributes during inversion
    expect(inverted.ops).toEqual([{ insert: 'a' }]);
    expect(inverted.ops[0]).not.toHaveProperty('attributes');
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});