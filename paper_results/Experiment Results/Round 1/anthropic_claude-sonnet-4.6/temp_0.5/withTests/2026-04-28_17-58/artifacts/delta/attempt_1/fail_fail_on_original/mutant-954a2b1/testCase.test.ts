import Delta from "../../src/Delta";

describe('compose() retain start optimization with attributes', () => {
  it('should not apply retain start optimization when first other op has attributes', () => {
    // If firstOther is a retain WITH attributes, the original code skips the optimization
    // (because firstOther.attributes != null). The mutated code enters the block anyway
    // due to || instead of &&, potentially producing wrong results.
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(3, { italic: true });
    // With original: optimization is skipped (attributes != null), normal compose runs
    // With mutated: optimization block is entered (firstOther != null is true),
    // then firstLeft = undefined, while loop skipped, otherIter.next(NaN) may be called
    const result = a.compose(b);
    const expected = new Delta()
      .insert('A', { bold: true, italic: true })
      .insert('B', { italic: true })
      .insert('C', { bold: true, italic: true });
    expect(result).toEqual(expected);
  });
});