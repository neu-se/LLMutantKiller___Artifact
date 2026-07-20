import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with delete operation', () => {
  it('should correctly invert a delete operation and handle the case where op.delete is present', () => {
    const delta = new Delta().delete(2);
    const base = new Delta().insert('1234');
    const inverted = delta.invert(base);
    // This test specifically checks that the inverted delta has the expected structure
    // The mutation changes the condition from checking op.retain && op.attributes to always true
    // which would cause incorrect behavior when inverting delete operations
    expect(inverted.ops).toEqual([{ insert: '12' }]);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});