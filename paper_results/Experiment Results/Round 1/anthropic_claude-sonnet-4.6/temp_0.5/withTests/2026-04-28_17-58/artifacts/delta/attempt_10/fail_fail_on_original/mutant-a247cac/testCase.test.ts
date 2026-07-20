import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain end optimization with remaining other retain', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .insert('E', { bold: true })
      .insert('F');
    const b = new Delta()
      .retain(1)
      .delete(1)
      .retain(1, { color: 'red' })
      .retain(1, { italic: true });
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('C', { bold: true, color: 'red' })
      .insert('D')
      .insert('E', { bold: true })
      .insert('F');
    expect(a.compose(b)).toEqual(expected);
  });
});