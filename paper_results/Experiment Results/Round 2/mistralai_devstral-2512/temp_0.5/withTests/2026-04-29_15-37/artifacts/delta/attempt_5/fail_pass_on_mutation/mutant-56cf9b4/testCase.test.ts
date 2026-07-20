import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with delete operation', () => {
  it('should correctly invert a delete operation and preserve attributes', () => {
    const delta = new Delta().delete(2);
    const base = new Delta().insert('12', { bold: true }).insert('34', { italic: true });
    const expected = new Delta().insert('12', { bold: true });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});