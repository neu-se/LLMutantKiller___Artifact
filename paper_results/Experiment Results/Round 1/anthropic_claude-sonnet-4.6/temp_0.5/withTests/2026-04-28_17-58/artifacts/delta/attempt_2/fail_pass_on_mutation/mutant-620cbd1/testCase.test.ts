import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization with only retain in other', () => {
  it('should correctly compose inserts when other is only a plain retain covering all inserts', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(3);
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});