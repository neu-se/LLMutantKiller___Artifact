import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('preserves leading inserts when other starts with plain retain longer than this inserts', () => {
    // 'a' has inserts totaling length 3, then a delete
    // 'b' starts with plain retain of length 3 (covers all inserts), then inserts 'D'
    // With original: inserts are fast-pathed, then 'D' is inserted after them, then delete
    // With mutated: loop doesn't run for inserts, result differs
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