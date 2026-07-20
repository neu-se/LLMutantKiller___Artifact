import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization does not apply when first other op has attributes', () => {
    // When firstOther is a retain WITH attributes, original skips the optimization.
    // Mutated code enters the block (firstOther != null is true), consumes inserts
    // into ops array bypassing attribute application, producing wrong result.
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