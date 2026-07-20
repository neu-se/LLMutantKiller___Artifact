import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain end optimization fires and skips remaining other retains with attributes', () => {
    const a = new Delta()
      .insert('A')
      .insert('B', { bold: true })
      .insert('C');
    const b = new Delta()
      .retain(1)
      .retain(1, { italic: true })
      .retain(1, { color: 'red' });
    const expected = new Delta()
      .insert('A')
      .insert('B', { bold: true, italic: true })
      .insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});