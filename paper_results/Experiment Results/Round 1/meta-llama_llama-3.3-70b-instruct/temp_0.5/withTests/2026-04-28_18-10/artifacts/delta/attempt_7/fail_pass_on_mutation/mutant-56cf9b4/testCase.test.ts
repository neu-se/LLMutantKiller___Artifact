import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the invert method when op.delete is present and the base has an insert operation with attributes', () => {
    const delta = new Delta().delete(1);
    const base = new Delta().insert('1', { bold: true });
    const expected = new Delta().insert('1', { bold: true });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});