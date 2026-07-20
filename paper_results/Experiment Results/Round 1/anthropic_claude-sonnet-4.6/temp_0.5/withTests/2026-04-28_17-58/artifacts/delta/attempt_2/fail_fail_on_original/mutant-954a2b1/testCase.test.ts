import Delta from "../../../../../../../../../../../../../src/Delta";

describe('compose() retain start optimization', () => {
  it('correctly handles retain with attributes as first op in other', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B');
    const b = new Delta().retain(2, { italic: true });
    const result = a.compose(b);
    const expected = new Delta()
      .insert('A', { bold: true, italic: true })
      .insert('B', { italic: true });
    expect(result).toEqual(expected);
  });
});