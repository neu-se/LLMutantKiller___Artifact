import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with retain and attributes', () => {
  it('should correctly invert a retain operation with attributes', () => {
    const delta = new Delta().retain(2, { bold: true });
    const base = new Delta().insert('123456');
    const expected = new Delta().retain(2, { bold: null });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});