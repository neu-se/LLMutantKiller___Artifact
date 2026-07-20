import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('should correctly copy leading inserts when other starts with a plain retain', () => {
    // When 'other' starts with a plain retain (no attributes), the compose()
    // method has an optimization that copies leading insert ops from 'this' directly.
    // The condition `thisIter.peekType() === 'insert'` guards this copy loop.
    // With the mutation (`!== 'insert'`), the loop skips inserts and incorrectly
    // processes non-insert ops, producing a wrong result.
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .delete(1);
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});