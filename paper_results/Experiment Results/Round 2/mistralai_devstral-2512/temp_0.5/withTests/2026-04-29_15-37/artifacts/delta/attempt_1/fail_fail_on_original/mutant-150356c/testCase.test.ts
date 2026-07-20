import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with insert optimization', () => {
  it('should not apply retain start optimization when firstOther is not a plain retain', () => {
    const a = new Delta().insert('A').insert('B', { bold: true });
    const b = new Delta().retain(1, { italic: true }).insert('C');
    const expected = new Delta()
      .insert('A', { italic: true })
      .insert('BC', { bold: true, italic: true });
    expect(a.compose(b)).toEqual(expected);
  });
});