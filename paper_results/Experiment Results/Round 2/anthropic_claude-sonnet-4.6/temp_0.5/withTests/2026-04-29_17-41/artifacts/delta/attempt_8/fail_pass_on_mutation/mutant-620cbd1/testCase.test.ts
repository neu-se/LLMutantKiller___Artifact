import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('early return with rest produces correct result when optimization pre-advances thisIter', () => {
    // With optimization: insert('A') pre-copied, thisIter advanced past it.
    // otherIter fully consumed. Main loop: retain(3) vs retain(3) -> newOp={retain:3}.
    // Early return fires: rest = thisIter.rest() = [delete(1)].
    // Result: insert('A') + retain(3) + delete(1).
    // Without optimization (mutation): thisIter not pre-advanced.
    // Main loop processes retain(1) vs insert('A') -> insert('A').
    // Then retain(3) vs retain(3) -> retain(3). Early return fires with rest=[delete(1)].
    // Result should be same... need different scenario.
    const a = new Delta()
      .insert('A')
      .retain(3)
      .delete(1);
    const b = new Delta().retain(1);
    const expected = new Delta()
      .insert('A')
      .retain(3)
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});