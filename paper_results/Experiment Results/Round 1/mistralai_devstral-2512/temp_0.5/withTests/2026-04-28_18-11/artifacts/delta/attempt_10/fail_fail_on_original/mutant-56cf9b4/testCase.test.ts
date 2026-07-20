import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with delete operation', () => {
  it('should correctly invert a delete operation with retain and attributes', () => {
    const delta = new Delta().retain(2, { bold: true }).delete(1);
    const base = new Delta().insert('123', { color: 'red' });
    const expected = new Delta().retain(2, { bold: null, color: 'red' }).insert('3', { color: 'red' });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});