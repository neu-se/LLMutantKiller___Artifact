import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('retain start optimization split - correctly handles partial retain advance', () => {
    // From existing test: retain start optimization split
    // a has inserts+retain+delete, b starts with retain(4) then insert
    // This specifically tests that the optimization correctly handles
    // the case where firstLeft is partially consumed
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