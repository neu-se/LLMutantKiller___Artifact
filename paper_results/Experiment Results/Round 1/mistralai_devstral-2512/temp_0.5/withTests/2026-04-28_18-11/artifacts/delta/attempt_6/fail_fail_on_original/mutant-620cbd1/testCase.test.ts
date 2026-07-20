import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should trigger retain optimization when firstOther has numeric retain without attributes', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B').insert('C', { bold: true }).retain(5).delete(1);
    const b = new Delta().retain(4);
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .retain(1)
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});