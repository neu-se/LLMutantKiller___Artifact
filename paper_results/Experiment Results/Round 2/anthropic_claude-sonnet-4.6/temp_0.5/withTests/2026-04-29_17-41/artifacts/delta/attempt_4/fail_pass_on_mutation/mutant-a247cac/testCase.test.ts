import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain end optimization join', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .insert('E', { bold: true })
      .insert('F');
    const b = new Delta().retain(1).delete(1);
    const expected = new Delta()
      .insert('AC', { bold: true })
      .insert('D')
      .insert('E', { bold: true })
      .insert('F');
    expect(a.compose(b)).toEqual(expected);
  });
});