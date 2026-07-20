import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('correctly advances otherIter past the consumed portion of the leading retain', () => {
    // The optimization consumes leading inserts from `this` within the first retain of `other`,
    // then advances otherIter by (firstOther.retain - firstLeft), leaving the remainder.
    // Without the optimization (mutation), the full retain stays and produces a different result.
    const a = new Delta().insert('A').retain(1);
    const b = new Delta().retain(3).insert('X');
    // Original: optimization consumes 'A' (1 of 3), advances otherIter by 1,
    // leaving retain(2) for main loop against retain(1) from `this` → retain(2) in result
    const expected = new Delta().insert('A').retain(2).insert('X');
    expect(a.compose(b)).toEqual(expected);
  });
});