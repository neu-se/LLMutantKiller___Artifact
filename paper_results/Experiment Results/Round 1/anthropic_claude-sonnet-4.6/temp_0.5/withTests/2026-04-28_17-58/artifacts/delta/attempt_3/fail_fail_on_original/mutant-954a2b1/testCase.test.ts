import Delta from "../../src/Delta";

describe('compose()', () => {
  it('correctly composes when first op in other is a retain with attributes', () => {
    // The mutation changes && to || in the retain start optimization condition.
    // When firstOther is a retain WITH attributes, original code skips the optimization
    // block (attributes != null fails the &&). The mutated code enters the block anyway
    // because firstOther != null is true (short-circuits the ||).
    // This causes inserts from `this` to be moved before the retain is processed,
    // producing wrong output.
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(3, { italic: true });
    const result = a.compose(b);
    const expected = new Delta()
      .insert('A', { bold: true, italic: true })
      .insert('B', { italic: true })
      .insert('C', { bold: true, italic: true });
    expect(result).toEqual(expected);
  });
});