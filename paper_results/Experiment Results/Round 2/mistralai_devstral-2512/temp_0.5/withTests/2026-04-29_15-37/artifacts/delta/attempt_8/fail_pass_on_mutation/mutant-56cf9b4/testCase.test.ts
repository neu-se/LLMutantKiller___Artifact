import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with delete operation', () => {
  it('should correctly handle delete operation inversion', () => {
    const delta = new Delta().delete(1);
    const base = new Delta().insert('abc');
    const inverted = delta.invert(base);
    // The mutation changes the condition from checking op.retain && op.attributes to always true
    // This test verifies that delete operations are properly inverted
    expect(inverted.ops).toEqual([{ insert: 'a' }]);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});