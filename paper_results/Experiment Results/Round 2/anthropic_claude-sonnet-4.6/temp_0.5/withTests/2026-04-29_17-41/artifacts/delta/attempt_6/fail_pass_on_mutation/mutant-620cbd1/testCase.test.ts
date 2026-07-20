import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('handles compose where other starts with retain that partially covers leading inserts', () => {
    // The optimization pre-copies inserts from `this` into ops before the main loop
    // and advances otherIter. With the mutation (typeof retain === ''), the block
    // is skipped. The critical difference: when the optimization runs, it advances
    // otherIter.next(firstOther.retain - firstLeft) which consumes part of the retain.
    // Without it, the full retain remains and is processed differently in the main loop.
    // Here `other` starts with retain(2) but `this` has 3 inserts - partial coverage.
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .delete(1);
    const b = new Delta().retain(2).insert('D');
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('D')
      .insert('C', { bold: true })
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});