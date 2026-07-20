import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain start optimization', () => {
  it('should not apply retain start optimization when firstOther has attributes', () => {
    const a = new Delta().insert('A').insert('B', { bold: true });
    const b = new Delta().retain(1, { italic: true });
    const expected = new Delta()
      .insert('A', { italic: true })
      .insert('B', { bold: true, italic: true });
    const result = a.compose(b);
    expect(result).toEqual(expected);
  });
});