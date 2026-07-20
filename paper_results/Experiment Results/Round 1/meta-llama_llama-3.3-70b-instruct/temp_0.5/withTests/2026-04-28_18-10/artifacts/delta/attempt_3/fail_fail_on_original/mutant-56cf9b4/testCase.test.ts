import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the invert method when op.delete is present', () => {
    const delta = new Delta().retain(2, { bold: true }).delete(1);
    const base = new Delta().insert('12', { bold: true });
    const expected = new Delta().retain(2, { bold: null });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});