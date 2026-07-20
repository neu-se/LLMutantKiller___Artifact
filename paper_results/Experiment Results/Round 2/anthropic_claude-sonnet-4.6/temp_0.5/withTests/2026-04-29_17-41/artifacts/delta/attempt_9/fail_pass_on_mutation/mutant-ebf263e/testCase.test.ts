import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('handles insert longer than the leading retain in other', () => {
    // Optimization: firstLeft=2, thisIter.peekLength()=3 > 2, so while loop does NOT execute.
    // otherIter is NOT advanced (firstOther.retain - firstLeft = 0).
    // Main loop processes normally: insert('ABC') vs retain(2) -> insert('AB'), then insert('C') vs insert('X') -> insert('X') pushed first, then insert('C').
    // Without optimization (mutation): same main loop processing.
    // These should differ because optimization leaves otherIter at retain(2).
    const a = new Delta().insert('ABC');
    const b = new Delta().retain(2).insert('X');
    const expected = new Delta().insert('ABX').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});