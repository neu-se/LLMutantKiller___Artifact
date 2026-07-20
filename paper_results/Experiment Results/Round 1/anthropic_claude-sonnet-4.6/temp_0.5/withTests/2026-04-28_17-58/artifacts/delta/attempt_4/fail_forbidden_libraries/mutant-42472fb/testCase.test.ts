import Delta = require("quill-delta");

describe('compose() retain start optimization', () => {
  it('retain start optimization split produces correct result', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .retain(5)
      .delete(1);
    const b = new Delta().retain(4).insert('D');
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .retain(1)
      .insert('D')
      .retain(4)
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});