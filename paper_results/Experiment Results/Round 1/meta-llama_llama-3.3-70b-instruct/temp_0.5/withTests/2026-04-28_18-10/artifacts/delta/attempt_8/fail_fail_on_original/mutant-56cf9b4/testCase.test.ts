import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the invert method when op.delete is present and op.retain is not present but op.delete has an attribute', () => {
    const delta = new Delta().delete(1, { bold: true });
    const base = new Delta().insert('1');
    const expected = new Delta().insert('1', { bold: true });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});