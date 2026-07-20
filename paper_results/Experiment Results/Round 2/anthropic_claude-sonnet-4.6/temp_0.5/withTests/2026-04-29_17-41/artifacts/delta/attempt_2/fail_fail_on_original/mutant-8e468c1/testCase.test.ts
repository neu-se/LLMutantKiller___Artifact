import Delta from "../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('should correctly compose when other starts with a plain retain covering insert ops', () => {
    // 'a' has multiple insert ops at the start, followed by a delete
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .delete(1);
    // 'b' starts with a plain retain (no attributes) of length 3, then inserts 'D'
    const b = new Delta().retain(3).insert('D');
    // The expected result: the first 3 insert ops from 'a' are preserved,
    // then 'D' is inserted, then the delete from 'a'
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});