import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization mutation', () => {
  it('correctly composes when this starts with retain and other starts with plain retain', () => {
    const a = new Delta().retain(2, { bold: true }).insert('X');
    const b = new Delta().retain(3);
    // Original behavior: retain(2,bold) composed with retain(2) of b = retain(2,bold)
    // then insert('X') composed with retain(1) of b = insert('X')
    const expected = new Delta().retain(2, { bold: true }).insert('X');
    expect(a.compose(b)).toEqual(expected);
  });
});