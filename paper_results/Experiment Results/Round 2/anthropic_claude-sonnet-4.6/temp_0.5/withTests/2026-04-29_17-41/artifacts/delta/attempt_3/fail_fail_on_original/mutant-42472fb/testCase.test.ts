import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization with exact retain length matching inserts', () => {
    // When b starts with retain(n) where n exactly covers all inserts in a,
    // the optimization pre-advances otherIter so it hasNext()===false,
    // triggering the early-return concat path differently than the mutated version
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .retain(5)
      .delete(1);
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .retain(4)
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});