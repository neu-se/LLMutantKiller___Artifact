import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('retain start optimization with inserts longer than initial retain', () => {
    const a = new Delta()
      .insert('ABCD')
      .delete(1);
    const b = new Delta()
      .retain(3)
      .insert('X');
    const expected = new Delta()
      .insert('ABC')
      .insert('X')
      .insert('D')
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});