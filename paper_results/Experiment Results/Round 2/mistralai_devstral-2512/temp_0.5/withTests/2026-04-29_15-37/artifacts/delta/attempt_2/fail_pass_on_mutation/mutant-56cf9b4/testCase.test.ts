import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with delete operation', () => {
  it('should correctly invert a delete operation', () => {
    const delta = new Delta().delete(3);
    const base = new Delta().insert('123456');
    const expected = new Delta().insert('123');
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});