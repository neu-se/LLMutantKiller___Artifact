import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('correctly handles case where initial retain in other is less than total inserts in this', () => {
    const a = new Delta().insert('ABC').insert('D', { bold: true });
    const b = new Delta().retain(3).retain(1, { italic: true });
    const expected = new Delta()
      .insert('ABC')
      .insert('D', { bold: true, italic: true });
    expect(a.compose(b)).toEqual(expected);
  });
});