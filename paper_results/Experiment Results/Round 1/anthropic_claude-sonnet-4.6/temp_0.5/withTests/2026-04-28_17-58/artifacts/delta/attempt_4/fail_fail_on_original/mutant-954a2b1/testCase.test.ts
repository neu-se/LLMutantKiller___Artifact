import Delta from "../../../../../../../../../../../../src/Delta";

describe('compose()', () => {
  it('correctly composes when first op in other is a retain with attributes', () => {
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