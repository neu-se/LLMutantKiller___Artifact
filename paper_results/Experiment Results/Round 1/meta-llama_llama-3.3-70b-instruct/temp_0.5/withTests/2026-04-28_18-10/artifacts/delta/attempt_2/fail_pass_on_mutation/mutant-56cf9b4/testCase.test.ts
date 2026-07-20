import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with a delete operation and an op with attributes', () => {
    const delta = new Delta().retain(2, { bold: true }).delete(3);
    const base = new Delta().insert('123456');
    const expected = new Delta().retain(2, { bold: null }).insert('345');
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});