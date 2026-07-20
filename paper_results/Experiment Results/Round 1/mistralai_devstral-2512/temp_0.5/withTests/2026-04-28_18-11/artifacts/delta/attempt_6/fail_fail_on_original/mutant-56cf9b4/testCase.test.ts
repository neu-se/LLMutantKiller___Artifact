import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with delete operation', () => {
  it('should correctly invert a delete operation with retain', () => {
    const delta = new Delta().retain(2).delete(1);
    const base = new Delta().insert('123');
    const expected = new Delta().retain(2).insert('2');
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});