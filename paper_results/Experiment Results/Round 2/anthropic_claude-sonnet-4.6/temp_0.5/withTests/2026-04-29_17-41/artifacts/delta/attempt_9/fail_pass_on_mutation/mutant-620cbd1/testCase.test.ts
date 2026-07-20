import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('does not duplicate ops when optimization pre-copies inserts and early return fires', () => {
    // With optimization: insert('A') pre-copied into ops, thisIter advanced.
    // otherIter.next(1) called, otherIter exhausted.
    // Main loop: thisIter has insert('B'), otherIter exhausted -> only thisIter inserts pushed.
    // With mutation: otherIter has retain(1), main loop: retain(1) vs insert('A') -> insert('A').
    // Then otherIter exhausted, thisIter has insert('B') -> pushed. Same result?
    // Need early-return path to differ. Use retain(2) so otherIter consumed mid-way.
    const a = new Delta()
      .insert('A')
      .insert('B')
      .retain(3, { bold: true });
    const b = new Delta().retain(2);
    const expected = new Delta()
      .insert('A')
      .insert('B')
      .retain(3, { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});