import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with mixed operations', () => {
  it('should correctly invert a delta with delete and retain operations', () => {
    const delta = new Delta().delete(1).retain(2, { bold: true });
    const base = new Delta().insert('123456');
    const expected = new Delta().insert('1').retain(2, { bold: null });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});