import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the invert method when op.retain and op.delete are present and op.retain has attributes', () => {
    const delta = new Delta().retain(2, { bold: true }).delete(1);
    const base = new Delta().insert('123', { bold: true });
    const expected = new Delta().retain(2, { bold: null }).insert('1');
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});