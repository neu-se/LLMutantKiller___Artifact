import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the invert method when op.retain and op.delete are present and op.retain has no attributes', () => {
    const delta = new Delta().retain(2).delete(1);
    const base = new Delta().insert('123');
    const expected = new Delta().retain(2).insert('1');
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
    // Check the length of the inverted delta
    expect(inverted.length()).toBe(3);
    // The mutation should not change the length of the inverted delta
  });
});